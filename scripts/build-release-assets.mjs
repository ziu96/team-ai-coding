#!/usr/bin/env node

import { createHash } from "node:crypto";
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const writeMode = process.argv.includes("--write");
const validArgs = process.argv.slice(2).every((arg) => arg === "--check" || arg === "--write");

if (!validArgs) {
  throw new Error("Usage: node scripts/build-release-assets.mjs [--check|--write]");
}

const text = async (path) => readFile(path, "utf8");
const bytes = async (path) => readFile(path);

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      for (const child of await filesIn(path)) result.push(child);
    } else if (entry.isFile()) {
      result.push(path);
    }
  }
  return result;
}

async function hashDirectory(directory) {
  const hash = createHash("sha256");
  for (const path of await filesIn(directory)) {
    hash.update(relative(directory, path));
    hash.update("\0");
    hash.update(await bytes(path));
    hash.update("\0");
  }
  return hash.digest("hex");
}

async function replaceManagedDirectory(source, target) {
  const allowedTargets = new Set([
    resolve(root, "plugins/team-ai-coding/templates/project"),
    resolve(root, ".cursor/templates/project")
  ]);

  if (!allowedTargets.has(target)) {
    throw new Error("Refusing to replace an unmanaged directory: " + target);
  }

  await rm(target, { recursive: true, force: true });
  await mkdir(dirname(target), { recursive: true });
  await cp(source, target, { recursive: true, force: true });
}

async function compareDirectories(source, target) {
  const sourceFiles = await filesIn(source);
  const targetFiles = await filesIn(target);
  const sourceRelative = sourceFiles.map((path) => relative(source, path));
  const targetRelative = targetFiles.map((path) => relative(target, path));

  if (sourceRelative.join("\n") !== targetRelative.join("\n")) {
    return false;
  }

  for (const path of sourceRelative) {
    if (!Buffer.from(await bytes(resolve(source, path))).equals(await bytes(resolve(target, path)))) {
      return false;
    }
  }
  return true;
}

function cursorSkill(source, cursorName) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error("Invalid Skill frontmatter");

  const frontmatter = match[1]
    .split(/\r?\n/)
    .filter((line) => !line.startsWith("name:") && !line.startsWith("disable-model-invocation:"))
    .join("\n");

  return "---\nname: " + cursorName + "\n" + frontmatter + "\ndisable-model-invocation: true\n---\n\n" + match[2].trimEnd() + "\n";
}

async function writeOrCheck(path, expected, failures) {
  if (writeMode) {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, expected);
    return;
  }

  try {
    if ((await text(path)) !== expected) failures.push(relative(root, path) + " is not synchronized");
  } catch {
    failures.push(relative(root, path) + " is missing");
  }
}

const version = (await text(resolve(root, "VERSION"))).trim();
const templateSource = resolve(root, "templates/project");
const pluginTemplate = resolve(root, "plugins/team-ai-coding/templates/project");
const cursorTemplate = resolve(root, ".cursor/templates/project");
const skillNames = ["init", "audit", "upgrade", "l2-change"];
const cursorNames = {
  init: "team-ai-coding-init",
  audit: "team-ai-coding-audit",
  upgrade: "team-ai-coding-upgrade",
  "l2-change": "team-ai-coding-l2-change"
};
const failures = [];
const foundationPath = resolve(templateSource, ".ai-team/foundation.json");
const foundation = JSON.parse(await text(foundationPath));

if (writeMode) {
  foundation.foundationVersion = version;
  await writeFile(foundationPath, JSON.stringify(foundation, null, 2) + "\n");
} else if (foundation.foundationVersion !== version) {
  failures.push("templates/project/.ai-team/foundation.json differs from VERSION");
}

if (writeMode) {
  await replaceManagedDirectory(templateSource, pluginTemplate);
  await replaceManagedDirectory(templateSource, cursorTemplate);
} else {
  if (!(await compareDirectories(templateSource, pluginTemplate))) {
    failures.push("plugins/team-ai-coding/templates/project is not synchronized");
  }
  if (!(await compareDirectories(templateSource, cursorTemplate))) {
    failures.push(".cursor/templates/project is not synchronized");
  }
}

const cursorSkillsRoot = resolve(root, ".cursor/skills");
const expectedCursorDirectories = new Set(Object.values(cursorNames));

if (writeMode) {
  await mkdir(cursorSkillsRoot, { recursive: true });
  for (const entry of await readdir(cursorSkillsRoot, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name.startsWith("team-ai-coding-") && !expectedCursorDirectories.has(entry.name)) {
      await rm(resolve(cursorSkillsRoot, entry.name), { recursive: true, force: true });
    }
  }
} else {
  for (const entry of await readdir(cursorSkillsRoot, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name.startsWith("team-ai-coding-") && !expectedCursorDirectories.has(entry.name)) {
      failures.push(".cursor/skills/" + entry.name + " is a stale generated Skill");
    }
  }
}

for (const name of skillNames) {
  const source = await text(resolve(root, "plugins/team-ai-coding/skills", name, "SKILL.md"));
  const cursorDirectory = resolve(root, ".cursor/skills", cursorNames[name]);
  await writeOrCheck(resolve(cursorDirectory, "SKILL.md"), cursorSkill(source, cursorNames[name]), failures);
  await writeOrCheck(resolve(cursorDirectory, "VERSION"), version + "\n", failures);
}

const codexManifest = JSON.parse(await text(resolve(root, "plugins/team-ai-coding/.codex-plugin/plugin.json")));
const claudeManifest = JSON.parse(await text(resolve(root, "plugins/team-ai-coding/.claude-plugin/plugin.json")));
const claudeMarketplace = JSON.parse(await text(resolve(root, ".claude-plugin/marketplace.json")));

if (codexManifest.version !== version) failures.push("Codex plugin version differs from VERSION");
if (claudeManifest.version !== version) failures.push("Claude plugin version differs from VERSION");
if (claudeMarketplace.metadata?.version !== version) failures.push("Claude marketplace version differs from VERSION");
if (claudeMarketplace.plugins?.[0]?.version !== version) {
  failures.push("Claude marketplace plugin version differs from VERSION");
}
if (claudeMarketplace.plugins?.[0]?.source !== "./plugins/team-ai-coding") {
  failures.push("Claude marketplace must point to the canonical plugin");
}

const pluginPath = resolve(root, "plugins/team-ai-coding");
const releaseManifest = {
  suite: "team-ai-coding",
  distribution: "plugin",
  version,
  releaseStatus: "unreleased",
  marketplaceName: "mo-ai-coding",
  plugin: {
    name: "team-ai-coding",
    path: "plugins/team-ai-coding",
    sha256: await hashDirectory(pluginPath)
  },
  workflow: skillNames.map((name) => "team-ai-coding:" + name),
  supportedHosts: ["codex", "claude-code", "cursor"],
  cursorSkills: skillNames.map((name) => cursorNames[name]),
  template: {
    canonicalPath: "templates/project",
    sha256: await hashDirectory(templateSource),
    bundledIn: [
      "plugins/team-ai-coding/templates/project",
      ".cursor/templates/project"
    ]
  },
  components: await Promise.all(skillNames.map(async (name) => ({
    name,
    path: "plugins/team-ai-coding/skills/" + name,
    sha256: await hashDirectory(resolve(pluginPath, "skills", name))
  })))
};

await writeOrCheck(
  resolve(root, "release-manifest.json"),
  JSON.stringify(releaseManifest, null, 2) + "\n",
  failures
);

if (failures.length > 0) {
  throw new Error("Release asset check failed:\n- " + failures.join("\n- "));
}

console.log(writeMode ? "Release assets synchronized." : "Release assets are synchronized.");
