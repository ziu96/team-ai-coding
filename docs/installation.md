# 安装与一次初始化

## 前提

发布地址为 [ziu96/team-ai-coding](https://github.com/ziu96/team-ai-coding)。成员只需安装自己使用的 App 入口，不要求安装三种。

## Codex

```bash
codex plugin marketplace add ziu96/team-ai-coding
codex plugin add team-ai-coding@team-ai-coding
```

在目标业务仓库的新任务中输入：

```text
$team-ai-coding:init
```

## Claude Code

```text
/plugin marketplace add ziu96/team-ai-coding
/plugin install team-ai-coding@team-ai-coding
/reload-plugins
```

然后在目标业务仓库输入：

```text
/team-ai-coding:init
```

## Cursor

### 官方 Plugin（推荐）

本仓库的 `plugins/team-ai-coding/` 是一个正式 Cursor Plugin 包，使用生成的 `cursor-skills/` 保持 `/team-ai-coding-*` 的显式手动调用语义。

- **Cursor Team / Enterprise**：管理员在 Dashboard → Plugins → Team Marketplaces 导入本仓库，并由根 `.cursor-plugin/marketplace.json` 解析插件。随后可按团队策略设置 Default Off、Default On 或 Required。
- **Cursor 公共 Marketplace**：插件提交并通过 Cursor 审核后，成员在 **Customize → Plugins** 搜索 `Team AI Coding` 安装。

安装完成后，在目标业务仓库的 Agent 对话中输入 `/`，选择 `/team-ai-coding-init`。

公开 GitHub 仓库不等于自动上架 Cursor Marketplace；在审核前，它不能被当作公共 Marketplace 安装地址。

### Remote Rule 兼容路径

如果团队暂时没有 Team Marketplace，且公共审核尚未完成，可在 **Customize → Rules** 添加 GitHub Remote Rule，选择本基座发布仓库。根 `.cursor/skills/` 提供同名 Skill 镜像。

这是兼容兜底：它保持工作流可用，但不替代 Cursor Plugin 的正式分发、版本管理和团队安装模式。

### 维护者本地验证

维护者可将完整插件包复制到 `~/.cursor/plugins/local/team-ai-coding`，执行 **Developer: Reload Window**，然后在 **Customize → Plugins** 确认有 4 个 Skill。此步骤只用于发布前验证，不是团队成员的日常安装流程。

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

## Cursor 中如何确认 L0/L1/L2 已接入

Cursor 官方支持项目根和子目录的 `AGENTS.md`；本基座同时写入 `.cursor/rules/00-team-foundation.mdc` 作为 Cursor 的显式、始终应用的薄入口。

完成确认后的 `init`，在业务仓库资源管理器中至少应看到：

```text
AGENTS.md                              # 完整 L0/L1/L2 路由
.cursor/rules/00-team-foundation.mdc   # Cursor 的同一路由摘要
.ai-team/foundation.json               # 接入的基座版本
openspec/AGENTS.md                     # L2 的具体流程
```

L0/L1/L2 不会显示在 Cursor Plugin 面板中，也不会因为“安装插件”而自动写进业务仓库。`init` 在展示计划后，只有得到明确写入确认才会创建这些文件；若上述路径缺失，表示仍处于预览、冲突待处理或未接入状态。

## 之后的日常使用

完成一次 init 后，成员直接在项目里正常对话或使用 Plan 模式即可。项目内 `AGENTS.md`、`.cursor/rules/` 和 `openspec/` 会让 AI 判断 L0/L1/L2；只有 L2 才需要先写 Spec 并等待明确人工批准。

## 可选维护命令

- `$team-ai-coding:audit` / `/team-ai-coding:audit` / `/team-ai-coding-audit`：只读检查接入状态。
- `$team-ai-coding:upgrade` / `/team-ai-coding:upgrade` / `/team-ai-coding-upgrade`：先展示版本差异，确认后才更新项目规则。
- `$team-ai-coding:l2-change` / `/team-ai-coding:l2-change` / `/team-ai-coding-l2-change`：为 L2 变更创建 Spec 草稿；不会替代人工批准。
