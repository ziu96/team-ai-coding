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

## 结构

```text
templates/project/                 # 唯一的项目规则模板
├── AGENTS.md                      # 三端共同的 L0/L1/L2 路由
├── CLAUDE.md                      # Claude Code 兼容入口
├── .cursor/rules/                 # Cursor 薄适配
├── .ai-team/                      # 版本与可选扩展声明
└── openspec/                      # L2 Spec、项目事实、路线图

plugins/team-ai-coding/             # Codex + Claude Code 共用的 Canonical Plugin
├── .codex-plugin/plugin.json
├── .claude-plugin/plugin.json
├── skills/                         # init / audit / upgrade / l2-change
└── templates/project/              # 随发布包携带的模板快照

.agents/plugins/marketplace.json    # Codex Marketplace 入口
.claude-plugin/marketplace.json     # Claude Code Marketplace 入口
.cursor/skills/                     # 从 Canonical Skills 生成的 Cursor 原生镜像
```

项目内规则才是唯一事实源。三端插件只负责一次初始化、审计和升级体验，不替代项目规则，也不会静默覆盖它们。

## 使用原则

1. 为一个业务仓库执行一次“初始化团队 AI Coding 基座”。
2. 让使用中的 AI App 写入或合并 `templates/project/` 的内容。
3. 日常直接使用原有的 AI Coding 对话即可；规则会在项目内被读取。
4. 更新基座时必须先生成差异、人工确认，再修改业务仓库。

不包含：Runtime、制品安装器、强制全局 CLI、自动安装 Skill/MCP、hooks、CI/GitHub Gate 或对成员个人工具的限制。

详细说明见 [架构与边界](docs/architecture.md)、[安装与一次初始化](docs/installation.md)、[任务路由](docs/task-routing.md) 与 [发布与更新](docs/release-and-update.md)。

## 当前状态

这是 V1 基座实现。发布前应先在 Garden Helper 这类 PRD/原型阶段仓库执行一次初始化和 L0/L1/L2 路由演练，再决定是否需要把官方 OpenSpec CLI 作为维护者可选校验工具。
