# 安装与一次初始化

## 前提

发布仓库需要先托管到团队 GitHub。以下的 `<owner>/<repo>` 在发布后替换为真实地址；成员只需安装自己使用的 App 入口，不要求安装三种。

## Codex

```bash
codex plugin marketplace add <owner>/<repo>
codex plugin add team-ai-coding@mo-ai-coding
```

在目标业务仓库的新任务中输入：

```text
$team-ai-coding:init
```

## Claude Code

```text
/plugin marketplace add <owner>/<repo>
/plugin install team-ai-coding@mo-ai-coding
/reload-plugins
```

然后在目标业务仓库输入：

```text
/team-ai-coding:init
```

## Cursor

1. 在 **Customize → Rules** 添加 GitHub Remote Rule，选择本基座发布仓库。
2. 在 Agent 对话输入 `/`，选择 `/team-ai-coding-init`。

Cursor 从发布仓库根 `.cursor/skills/` 发现显式工作流。该目录随发布包携带模板快照，不要求成员额外 clone 基座仓库。

## Init 会做什么

`init` 先检查目标仓库已有的规则和上下文，展示会新增或冲突的文件；只有在你确认后才写入。

空白项目会接入：

```text
AGENTS.md
CLAUDE.md
.cursor/rules/
.ai-team/
openspec/
```

已有项目不会被静默覆盖。冲突会由项目负责人选择保留、合并或替换。

## 之后的日常使用

完成一次 init 后，成员直接在项目里正常对话或使用 Plan 模式即可。项目内 `AGENTS.md`、`.cursor/rules/` 和 `openspec/` 会让 AI 判断 L0/L1/L2；只有 L2 才需要先写 Spec 并等待明确人工批准。

## 可选维护命令

- `$team-ai-coding:audit` / `/team-ai-coding:audit` / `/team-ai-coding-audit`：只读检查接入状态。
- `$team-ai-coding:upgrade` / `/team-ai-coding:upgrade` / `/team-ai-coding-upgrade`：先展示版本差异，确认后才更新项目规则。
- `$team-ai-coding:l2-change` / `/team-ai-coding:l2-change` / `/team-ai-coding-l2-change`：为 L2 变更创建 Spec 草稿；不会替代人工批准。
