# 文档索引

这是一个面向团队的 AI Coding 基座：把稳定的任务路由、上下文与变更留痕放进业务仓库，让 Codex、Claude Code 与 Cursor 对同一项目遵循同一套高质量默认路径。Cursor 以官方 Plugin 作为主分发，GitHub Remote Rule 仅作未上架或无 Team Marketplace 时的兼容兜底。

- [架构与边界](architecture.md)：基座由什么组成，以及明确不做什么。
- [安装与一次初始化](installation.md)：三端安装、一次 init 与日常使用方式。
- [任务路由](task-routing.md)：何时走 L0、L1 或 L2。
- [跨 App 支持](cross-app.md)：三个 App 的共同约束与差异边界。
- [发布与更新](release-and-update.md)：模板、适配器与既有项目如何安全演进。
- [官方来源](sources.md)：本方案引用的官方资料。

本基座不要求成员日常运行命令。成员在项目目录中正常使用任一支持的 AI Coding App；项目内规则负责告诉模型先读什么、该走哪个等级、何时必须停下来等待审批。
