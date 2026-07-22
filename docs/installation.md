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

1. 输入 `/plugin marketplace add`。在弹出的 **Enter marketplace source** 输入框中，**只填写来源**：

```text
https://github.com/ziu96/team-ai-coding.git
```

不要在该单行输入框中粘贴 `/plugin install` 或 `/reload-plugins`。

2. Marketplace 添加成功后，单独输入：

```text
/plugin install team-ai-coding@team-ai-coding
```

选择 `user` 可跨业务仓库复用；仅测试当前仓库时才选择 `project`。

3. 单独输入：

```text
/reload-plugins
```

4. 然后在目标业务仓库输入：

```text
/team-ai-coding:init
```

## Cursor

### 官方 Plugin（推荐）

本仓库的 `plugins/team-ai-coding/` 是一个正式 Cursor Plugin 包，使用生成的 `cursor-skills/` 保持 `/team-ai-coding-*` 的显式手动调用语义。

### 个人或当前项目直接安装

1. 打开 Cursor，进入 **Settings → Customize → Plugins**。
2. 点击 **Search or Paste Link**。
3. 在输入框中只粘贴仓库地址；不要附带 `/plugin install`、`/reload-plugins` 或其他说明：

   ```text
   https://github.com/ziu96/team-ai-coding
   ```

4. 在结果中选择 `Team AI Coding`，点击 **Add to Cursor**。
5. 选择安装范围：

   | 范围 | 适用情况 |
   | --- | --- |
   | `Project` | 只在当前 Cursor 工作区试点；适合第一次验证。 |
   | `User` | 在这台电脑打开的多个业务仓库复用；适合个人日常使用。 |

6. 等待安装完成，打开插件详情页确认有 **Skills 4** 和 **Rules 1 / `00-team-foundation`**。
7. 打开要接入的业务仓库根目录，新建一个 Agent 对话，输入 `/`，选择：

   ```text
   /team-ai-coding-init
   ```

8. `init` 首先只展示新增和冲突路径。确认目标仓库与清单无误后，明确回复允许写入；随后再按提示决定是否补全 `openspec/project.md` 与 `openspec/roadmap.md`。

安装插件不会自动写入业务仓库；每个业务仓库都需要各自完成一次第 7–8 步。若插件详情已显示 4 个 Skills、1 条 Rule 但 `/team-ai-coding-init` 未出现在命令列表，先新建 Agent 对话；仍未出现时执行 **Developer: Reload Window** 或重启 Cursor。

### 团队统一安装

Cursor Team / Enterprise 管理员在 Dashboard → Plugins → Team Marketplaces 导入本仓库，并由根 `.cursor-plugin/marketplace.json` 解析插件。随后可按团队策略设置 Default Off、Default On 或 Required。成员只需在 **Customize → Plugins** 确认已获得 `Team AI Coding`，再在各自业务仓库执行 init；不需要手动复制插件目录。

### Cursor 公共 Marketplace

插件提交并通过 Cursor 审核后，成员可以在 **Customize → Plugins** 搜索 `Team AI Coding` 安装。

安装完成后，Plugin 已携带一条始终应用的 L0/L1/L2 通用路由；确认完成 init 后，才会为该项目创建完整、可版本管理的规则与 L2 模板。

### 更新已安装的 Cursor Plugin

1. 打开 **Settings → Customize → Plugins**，选择已安装的 `Team AI Coding`。
2. 若界面提供 **Update**，直接更新；若没有更新入口，重新在 **Search or Paste Link** 粘贴同一个 GitHub 地址，按界面提示替换或重新添加。
3. 执行 **Developer: Reload Window**（`Cmd/Ctrl + Shift + P` 后搜索该命令）或重启 Cursor。
4. 再次确认详情页有 **Skills 4** 与 **Rules 1 / 00-team-foundation**。插件更新不会自动更新已接入项目的模板；已有项目使用 `/team-ai-coding-upgrade` 审阅差异。

公开 GitHub 仓库不等于自动上架 Cursor Marketplace；在审核前，它不能被当作公共 Marketplace 搜索结果，但可通过上述 **Search or Paste Link** 直接安装。

### Remote Rule 兼容路径

如果团队暂时没有 Team Marketplace，且公共审核尚未完成，可在 **Customize → Rules** 添加 GitHub Remote Rule，选择本基座发布仓库。根 `.cursor/skills/` 提供同名 Skill 镜像。

这是兼容兜底：它保持工作流可用，但不替代 Cursor Plugin 的正式分发、版本管理和团队安装模式。

### 维护者本地验证

维护者可将完整插件包复制到 `~/.cursor/plugins/local/team-ai-coding`，执行 **Developer: Reload Window**，然后在 **Customize → Plugins** 确认有 4 个 Skill，并在新 Agent 对话验证 L0/L1/L2 Router Rule 生效。此步骤只用于发布前验证，不是团队成员的日常安装流程。

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

已有项目不会被静默覆盖。冲突会由项目负责人选择保留、合并或替换；init 不得生成项目专属 `.cursor/rules/*.mdc` 或改写已有规则。

核心模板写入并验收后，若本次新建的 `openspec/project.md` 或 `openspec/roadmap.md` 仍是空模板，init 会**单独询问**是否根据当前仓库已有资料补全它们。选择继续后，AI 只能先读取仓库中的 README、PRD、架构文档、配置和现有 OpenSpec 资料，展示事实来源与拟写内容；你第二次确认后才会写入。跳过时保留模板，不影响 L0/L1/L2 路由；初始化前已经存在的这两份文件不会被覆盖。

## Cursor 中如何确认 L0/L1/L2 已接入

安装 Plugin 后，Cursor 已有一条通用、始终应用的 Router Rule，可立即按 L0/L1/L2 分级；它不写业务仓库，也不等于项目已经初始化。Cursor 官方支持项目根和子目录的 `AGENTS.md`；确认后的 init 再把 `.cursor/rules/00-team-foundation.mdc` 写入业务仓库，作为可版本管理的薄入口。

完成确认后的 `init`，在业务仓库资源管理器中至少应看到：

```text
AGENTS.md                              # 完整 L0/L1/L2 路由
.cursor/rules/00-team-foundation.mdc   # Cursor 的同一路由摘要
.ai-team/foundation.json               # 接入的基座版本
openspec/AGENTS.md                     # L2 的具体流程
```

L0/L1/L2 不会以“项目文件已生成”的形式显示在 Cursor Plugin 面板中。`init` 在展示固定模板计划后，只有得到明确写入确认才会创建上述项目文件；若上述路径缺失，表示项目仍处于预览、冲突待处理或未接入状态。

## 之后的日常使用

完成一次 init 后，成员直接在项目里正常对话或使用 Plan 模式即可。项目内 `AGENTS.md`、`.cursor/rules/` 和 `openspec/` 会让 AI 判断 L0/L1/L2；只有 L2 才需要先写 Spec 并等待明确人工批准。

## 可选维护命令

- `$team-ai-coding:audit` / `/team-ai-coding:audit` / `/team-ai-coding-audit`：只读检查接入状态。
- `$team-ai-coding:upgrade` / `/team-ai-coding:upgrade` / `/team-ai-coding-upgrade`：先展示版本差异，确认后才更新项目规则。
- `$team-ai-coding:l2-change` / `/team-ai-coding:l2-change` / `/team-ai-coding-l2-change`：为 L2 变更创建 Spec 草稿；不会替代人工批准。
