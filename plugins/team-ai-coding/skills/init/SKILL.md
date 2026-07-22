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

## 流程

1. 确认目标仓库，检查其 Git 根目录以及已有的 `AGENTS.md`、`CLAUDE.md`、`.cursor/rules/`、`openspec/`、`.ai-team/`。
2. 确认打包模板 `../../templates/project` 可读；不可读时报告该精确路径并停止，不凭记忆重建文件。
3. 将候选路径分为：`new`（可新增）、`existing`（保留）、`conflict`（需选择）和 `out of scope`（业务代码、依赖、凭据、编辑器个人配置）。
4. 展示最小接入计划：受影响文件、L0/L1/L2 路由、每个冲突的保留/合并/替换选项。
5. 等待用户对目标路径和列出的写入操作作出明确确认。只要求预览时保持只读。
6. 确认后只实施被批准的操作；保留业务代码和团队已有的专有规则。
7. 回读写入结果，报告创建项、保留项、未决项，以及项目事实仍需负责人填写的内容。

## 接入验收

- 根 `AGENTS.md` 明确 L0/L1/L2 路由，且 L2 指向 `openspec/AGENTS.md`；
- `CLAUDE.md` 导入根规则，Cursor 有薄规则入口；
- `openspec/changes/_template/` 至少含 proposal、tasks、validation；
- `.ai-team/foundation.json` 记录实际模板版本；
- 没有安装、启用或限制任何成员个人 Skill、MCP、插件或工具。
