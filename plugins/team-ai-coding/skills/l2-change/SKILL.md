---
name: l2-change
description: 为当前项目的 L2 变更创建 OpenSpec 风格的 proposal、tasks 和验证记录。仅在用户明确请求启动/起草高风险或重大变更 Spec 时使用。
disable-model-invocation: false
---

# 创建 L2 change

1. 先依据根 `AGENTS.md` 说明为何这是 L2；如果不满足 L2，不要强行创建 Spec。
2. 阅读 `openspec/project.md`，了解已配置的 L2 审批责任；必要时阅读 `openspec/roadmap.md` 和现有 Specs。未配置时默认由仓库 Owner 或受影响模块维护者批准。额外审批人与审批渠道仅在项目明确配置时适用，不得阻塞 draft、初始化或后续审批。拥有相应决策权的用户明确确认或可追溯的 PR 审核可作为批准，且必须记录在 proposal 中。
3. 选择清晰、唯一的 kebab-case change ID，在 `openspec/changes/<change-id>/` 基于模板创建 proposal、tasks、validation；方案复杂时再创建 design；有长期需求变化时创建 spec。
4. proposal 状态必须是 `draft`。向用户展示范围、风险、验收标准和需其明确确认的决定。
5. 在收到明确人工批准前，停止在 Spec 阶段，不实施业务代码、数据、接口或配置改动。不能把聊天中的模糊认可写作批准。
