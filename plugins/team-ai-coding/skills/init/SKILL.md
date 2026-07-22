---
name: init
description: 为一个业务仓库一次性接入 Team AI Coding Base；仅在用户明确要求初始化或接入时使用。
argument-hint: "[target-repository]"
disable-model-invocation: false
---

# 初始化团队 AI Coding 基座

这是项目的一次接入动作，不是日常每次编码的前置命令。完成后成员继续正常使用 Codex、Claude Code 或 Cursor 的对话即可。

## 安全边界

- 本 Skill 不安装 marketplace、插件、Skill、MCP、hook、依赖、CLI 或任何外部工具。
- 已发布包内自带与版本绑定的模板快照：相对于本 SKILL.md 的 `../../templates/project`。优先使用它；不要猜测网络地址或擅自下载模板。
- 只操作用户明确指定的目标业务仓库，不修改基座仓库本身。
- 任何已有规则、项目上下文或 Spec 文件都不能静默覆盖、替换、删除、提交或推送。

## 固定模板契约

- 模板树 `../../templates/project` 是唯一来源。只允许复制其中已有的相对路径；不得按项目分析结果编写“等价”的规则或上下文文件。
- 允许写入的候选路径仅为模板树中的 `AGENTS.md`、`CLAUDE.md`、`.cursor/rules/00-team-foundation.mdc`、`.ai-team/` 和 `openspec/` 下的模板文件。目标路径已存在时一律视为 `conflict` 并保留，不得改写。
- `openspec/project.md` 与 `openspec/roadmap.md` 有一个独立、可选的“项目上下文补全”阶段：仅当它们在本次初始化中新建且仍是模板时才可进入；必须先获得用户继续补全的确认、展示事实来源和拟写内容，再获得第二次明确确认后才能写入。初始化请求本身不等于授权补全。
- 严禁生成项目专属的 `.cursor/rules/*.mdc`，例如 `project-overview.mdc`、`admin-app.mdc`、`client-app.mdc`、`agent-workflow.mdc`；严禁编辑任何既有 `.cursor/rules/*`、`openspec/*` 或业务文件。
- 无法逐项读取模板源文件或无法在完成后逐项验证目标文件时，停止并报告失败；不要凭记忆重建、补全或声称初始化完成。

## 流程

1. 确认目标仓库，检查其 Git 根目录以及已有的 `AGENTS.md`、`CLAUDE.md`、`.cursor/rules/`、`openspec/`、`.ai-team/`。
2. 逐项读取打包模板 `../../templates/project`；不可读时报告该精确路径并停止，不凭记忆重建文件。
3. 将模板内每个相对路径分为：`new`（可新增）、`existing`（保留）、`conflict`（需选择）和 `out of scope`（业务代码、依赖、凭据、编辑器个人配置）。
4. 展示固定的 source → target 接入计划：受影响文件、L0/L1/L2 路由、每个冲突的保留/合并/替换选项。首次调用只允许完成此预览，不能写文件。
5. 等待用户对目标路径和列出的精确写入操作作出明确确认。只要求预览时保持只读。
6. 确认后只复制被批准的模板内容；不得分析项目后生成新规则，保留业务代码和团队已有的专有规则。
7. 回读每个批准写入的目标，逐项报告创建项、保留项、未决项。对于 Cursor，明确指出插件安装后已有通用路由；项目级 L0/L1/L2 位于根 `AGENTS.md` 和 `.cursor/rules/00-team-foundation.mdc`。任一验收路径缺失时必须报告“初始化未完成”。
8. 仅当 `openspec/project.md` 或 `openspec/roadmap.md` 在步骤 3 中标记为 `new`，且步骤 7 回读后与对应模板逐字一致时，才视为“仍是模板”。对这些文件，在核心初始化验收后必须单独询问：

   > 初始化已完成，L0/L1/L2 路由已经生效。`<新建的路径>` 仍是待补全模板，不影响正常使用。是否继续根据当前仓库已有事实补全它？

   不得把“继续初始化”或任何模糊认可当成此处的确认。若用户跳过，保留模板并说明可在后续单独请求维护。
9. 用户明确同意补全后，先保持只读：仅检查目标仓库可证明的 README/PRD/架构文档、包或运行配置、OpenSpec 配置与未归档 change；不得读取凭据、调用外部服务、猜测未记录的业务事实或优先级。展示每个拟写事实的来源，以及无法确认的空白项和完整拟写内容或 diff。
10. 仅在用户第二次明确确认该内容后，才修改对应的新建 `project.md` 或 `roadmap.md`。`project.md` 只写长期事实；`roadmap.md` 只写仓库资料能证明的当前目标、风险或 active change，无法证明的优先级保持空白并提出最少必要问题。
11. 若这两份文件在初始化前已存在，一律保留并在报告中标出；不得把上下文补全阶段用于覆盖或合并它们。用户如需维护已有文件，必须另行明确提出并审阅 diff。

## 接入验收

- 根 `AGENTS.md` 明确 L0/L1/L2 路由，且 L2 指向 `openspec/AGENTS.md`；
- `CLAUDE.md` 导入根规则，Cursor 有薄规则入口；
- `openspec/changes/_template/` 至少含 proposal、tasks、validation；
- `.ai-team/foundation.json` 记录实际模板版本；
- 没有安装、启用或限制任何成员个人 Skill、MCP、插件或工具。

项目上下文补全不是基础接入验收项：跳过后，L0/L1/L2 仍可正常使用，`project.md` 与 `roadmap.md` 保持待填模板即可。

默认 L2 批准主体为仓库 Owner 或受影响模块维护者；额外审批人与渠道属于可选项目事实，缺失不能阻塞初始化。

若用户保留了冲突文件，或只要求预览而未确认写入，不能称为“初始化完成”。必须列出缺失的精确路径，并说明该项目尚未获得基座的 L0/L1/L2 路由。
