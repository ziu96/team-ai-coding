# 官方来源

下列链接用于核对本基座所依赖的能力边界与原始工作流；项目规则本身仍以本仓库模板为准。

- [OpenAI：Latest model guide](https://developers.openai.com/api/docs/guides/latest-model)
- [OpenAI：Prompt engineering — Coding](https://developers.openai.com/api/docs/guides/prompt-engineering#coding)
- [OpenAI Help：Plugins in Codex](https://help.openai.com/en/articles/20001256-plugins-in-codex/)
- [OpenSpec 官方仓库](https://github.com/Fission-AI/OpenSpec)
- [OpenSpec：命令与工作流说明](https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md)
- [Claude Code：Plugin marketplace](https://code.claude.com/docs/en/plugin-marketplaces)
- [Claude Code：Plugins reference](https://code.claude.com/docs/en/plugins-reference)
- [Cursor：Rules 与 AGENTS.md](https://cursor.com/docs/rules)
- [Cursor：Skills](https://cursor.com/docs/skills)
- [Cursor：Plugins](https://cursor.com/docs/plugins)
- [Cursor：Plugins reference](https://cursor.com/docs/reference/plugins)
- [Cursor：Marketplace publish](https://cursor.com/marketplace/publish)

## 目录结构参考

- [hccnm/software-testing](https://github.com/hccnm/software-testing)：借鉴其 Canonical plugin、Codex/Claude marketplace、版本与发布清单结构；Cursor 现以官方 Plugin 为主，根 `.cursor/skills` 仅保留为兼容镜像；不引入其 Python Runtime、vendor、测试协议或 CI 门禁。
