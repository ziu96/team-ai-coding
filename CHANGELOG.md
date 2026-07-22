# Changelog

## 0.2.1 (Preview)

- 修复 Cursor Plugin：安装后即携带始终应用的 L0/L1/L2 Router Rule；项目 init 仍需明确确认后才写入项目文件。
- 收紧 init：只能复制固定模板，禁止生成项目专属 Cursor 规则或改写既有规则；验收路径缺失时不得宣称成功。
- L2 默认由仓库 Owner 或受影响模块维护者批准；额外审批人与渠道改为可选团队策略，不再阻塞初始化。
- 修正 Claude Code Marketplace 安装说明：Add Marketplace、install 和 reload 必须分步执行。

## 0.2.0 (Preview)

- 新增官方 Cursor Plugin manifest、Team Marketplace manifest 与生成的 Cursor Plugin Skills。
- 将 Cursor Plugin 设为正式分发主路径，根 `.cursor/skills/` 保留为 Remote Rule 兼容镜像。
- 补充 Cursor 公共 Marketplace 审核、Team Marketplace 导入、本地验证与更新边界说明。
- 明确 Cursor 中 L0/L1/L2 的可见验收路径，并强化 init 未写入或冲突未解决时不得宣称接入完成。

## 0.1.0

- 建立跨 Codex、Claude Code、Cursor 的项目级规则模板。
- 建立选择性 L0/L1/L2 路由与人工批准门槛。
- 提供不依赖官方 OpenSpec CLI 的 L2 Spec 产物模板。
- 提供三端轻量初始化、审计、升级入口。
