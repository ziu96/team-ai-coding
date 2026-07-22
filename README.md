# Team AI Coding Base

面向高级模型的团队 AI Coding 基座。它把高质量协作沉淀为项目内可版本管理的规则，而不是让成员日常运行一套 Runtime 或 CLI。

## 解决什么问题

成员可以继续直接对 Codex、Claude Code 或 Cursor 说“完成这个任务”，但项目会让 AI 先走一致的质量路径：

| 任务 | 路径 |
| --- | --- |
| L0：明确、低风险的小改动 | 直接实现 + 针对性验证 |
| L1：常规开发 | 简短计划 + 实现 + 验证 |
| L2：新能力、接口/数据/安全/架构或高不确定性变更 | Spec → 明确人工批准 → 实现 → 验证 → 归档 |

L2 使用 OpenSpec 风格的产物和目录，但不要求成员安装官方 OpenSpec CLI。它的价值在于留下可审查、可维护的决策与验收记录，而不是把每个任务塞进状态机。

## 安装

发布地址：[ziu96/team-ai-coding](https://github.com/ziu96/team-ai-coding)。成员只安装自己使用的 App；不需要三端都装。

| App | 安装后的一次初始化命令 |
| --- | --- |
| Codex | `$team-ai-coding:init` |
| Claude Code | `/team-ai-coding:init` |
| Cursor | 安装 Team AI Coding Plugin 后执行 `/team-ai-coding-init` |

### Codex

```bash
codex plugin marketplace add ziu96/team-ai-coding
codex plugin add team-ai-coding@team-ai-coding
```

在目标业务仓库中新建一个 Codex 任务，然后输入：

```text
$team-ai-coding:init
```

### Claude Code

在 Claude Code 中输入：

```text
/plugin marketplace add ziu96/team-ai-coding
/plugin install team-ai-coding@team-ai-coding
/reload-plugins
```

然后在目标业务仓库输入：

```text
/team-ai-coding:init
```

### Cursor

本仓库同时提供官方 Cursor Plugin 包和兼容用的 Remote Rule 镜像。**Plugin 是正式主路径**；项目内 `AGENTS.md`、`.cursor/rules/` 与 `openspec/` 仍是实际业务约束的唯一事实来源。

1. **Cursor Team / Enterprise**：由管理员在 Dashboard → Plugins 中导入本仓库的 `.cursor-plugin/marketplace.json`，再选择安装模式。成员会在 **Customize → Plugins** 看到 `Team AI Coding`。
2. **Cursor 公共 Marketplace**：在 Cursor 审核上架后，成员直接在 **Customize → Plugins** 搜索并安装 `Team AI Coding`。
3. 安装后在 Agent 对话输入 `/`，选择 `/team-ai-coding-init`。

公开 GitHub 仓库不会自动出现在 Cursor 公共 Marketplace；公开分发仍需要 Cursor 审核。若团队暂时没有 Team Marketplace 且插件尚未上架，可在 **Customize → Rules** 使用 GitHub Remote Rule；根 `.cursor/skills/` 会继续提供同名 Skill，但它只是兼容兜底，不是主分发方式。

## 一次初始化与日常使用

`init` 会先检查目标仓库已有的 `AGENTS.md`、`CLAUDE.md`、`.cursor/rules/` 和 `openspec/`，展示新增/冲突的文件；只有确认后才写入。它不会改业务代码、安装依赖、限制个人 Skill/MCP，或覆盖已有规则。

在 Cursor 中，L0/L1/L2 的完整规则位于项目根 `AGENTS.md`；`.cursor/rules/00-team-foundation.mdc` 同时提供始终应用的关键路由摘要。它们不会显示在 Plugin 面板中；若 init 后这两个文件不存在，说明尚未完成确认后的项目接入。

初始化成功后，业务仓库将拥有：

```text
AGENTS.md                    # L0 / L1 / L2 的共同路由
CLAUDE.md                    # Claude Code 兼容入口
.cursor/rules/               # Cursor 薄适配
.ai-team/                    # 基座版本与可选扩展说明
openspec/                    # 项目事实、路线图与 L2 Spec
```

之后成员直接正常使用 AI Coding 对话或 Plan 模式即可；项目规则会决定是否直接实现、短计划，或必须先走 L2 Spec 与人工批准。

## 结构

```text
templates/project/                 # 唯一的项目规则模板
├── AGENTS.md                      # 三端共同的 L0/L1/L2 路由
├── CLAUDE.md                      # Claude Code 兼容入口
├── .cursor/rules/                 # Cursor 薄适配
├── .ai-team/                      # 版本与可选扩展声明
└── openspec/                      # L2 Spec、项目事实、路线图

plugins/team-ai-coding/             # 三端共用的 Canonical Plugin
├── .codex-plugin/plugin.json
├── .claude-plugin/plugin.json
├── .cursor-plugin/plugin.json
├── skills/                         # Codex / Claude Code 的 Canonical Skills
├── cursor-skills/                  # 生成的 Cursor Plugin Skills
└── templates/project/              # 随发布包携带的模板快照

.agents/plugins/marketplace.json    # Codex Marketplace 入口
.claude-plugin/marketplace.json     # Claude Code Marketplace 入口
.cursor-plugin/marketplace.json     # Cursor Team Marketplace 入口
.cursor/skills/                     # 兼容用的 Cursor Remote Rule 镜像
```

项目内规则才是唯一事实源。三端插件只负责一次初始化、审计和升级体验，不替代项目规则，也不会静默覆盖它们。

## 更新

插件更新只更新辅助工作流，不会静默改业务仓库中的规则。已有项目要升级基座时，使用 `upgrade` 先生成 diff、人工确认后再写入。

- Codex：`codex plugin marketplace upgrade team-ai-coding`
- Claude Code：`/plugin marketplace update team-ai-coding`，再按提示更新插件
- Cursor：在 **Customize → Plugins** 按 Marketplace 的更新机制更新插件；若仍使用兼容路径，则先更新 Remote Rule。两种情况下均使用 `/team-ai-coding-upgrade` 审阅项目规则差异。

不包含：Runtime、制品安装器、强制全局 CLI、自动安装 Skill/MCP、hooks、CI/GitHub Gate 或对成员个人工具的限制。

详细说明见 [架构与边界](docs/architecture.md)、[安装与一次初始化](docs/installation.md)、[任务路由](docs/task-routing.md) 与 [发布与更新](docs/release-and-update.md)。

## 当前状态

当前版本为 `0.2.0`，发布状态为 preview：Cursor Plugin 已完成本机加载与只读 audit 调用验证；公共 Cursor Marketplace 尚待提交与审核。发布前仍应在 Garden Helper 这类 PRD/原型阶段仓库执行一次初始化和 L0/L1/L2 路由演练，再决定是否需要把官方 OpenSpec CLI 作为维护者可选校验工具。
