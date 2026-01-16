---
alwaysApply: false
globs: src/app/(payload)/**,src/app/api/**,src/mastra/**,src/payload/**,src/payload.config.ts
---

# 后端开发指南

本主要用于指导 Morpho 项目的后端代码开发。

## 1. 技术栈核心

- **CMS & 数据库**: PayloadCMS (用于内容管理、数据库 Schema 定义和 CRUD 操作)
- **AI Agent 框架**: Mastra (用于构建智能体、工具调用和工作流)
- **BFF / API 层**: Elysia (作为 Backend for Frontend 层，处理前后端通信)

## 2. 架构设计

### 2.1 数据层 (PayloadCMS)

- 使用 Payload 定义 Collection (如 Users, Worlds, Characters, Scripts, Logs)。
- 利用 Payload 的 Local API 或 REST/GraphQL API 进行数据操作。
- 所有的业务实体定义应优先在 Payload Config 中完成。
- 利用 Payload 的 Hooks 处理数据层面的副作用。

### 2.2 AI 逻辑层 (Mastra)

- 定义 Agent (如 DM Agent, World Builder Agent)。
- 封装 Tool (如 D100 骰子工具, 档案查询工具) 供 Agent 调用。
- 使用 Mastra 的 Workflow 编排复杂的跑团流程 (如：用户输入 -> 意图识别 -> DM 叙事 -> 状态更新)。

### 2.3 通信层 (Elysia)

- 使用 Elysia 构建高性能的 API 路由。
- 作为 BFF 层，聚合 PayloadCMS 的数据和 Mastra 的 AI 推理结果，返回给前端。
- 利用 Elysia 的 Type Safety 特性， 通过 Eden 确保前后端类型安全。

## 3. 开发规范

### 3.1 接口设计

- 遵循 RESTful 风格设计 API。
- 统一的错误处理和响应格式。
- 使用 TypeScript 接口定义 Request 和 Response Body。

### 3.2 数据库交互

- 避免在 BFF 层直接操作数据库，应通过 PayloadCMS 提供的 API 进行。
- 确保数据验证逻辑在 Payload Schema 中定义，保持数据一致性。

### 3.3 AI Agent 开发

- 每个 Agent 应有明确的 System Prompt 和职责边界。
- 复杂的逻辑链条应拆分为 Mastra Workflow 的不同 Step。
- 确保 AI 输出的格式化（如 JSON 模式），以便程序解析。
- **Mastra 模块导入规范**: 在 `src/mastra` 目录下的所有代码必须使用相对路径进行导入 (例如 `../../lib/utils` 而不是 `@/lib/utils`)，以确保 mastraStudio 调试工具能正确解析 TypeScript 别名。

## 4. 代码风格

- 严格遵循 TypeScript 类型定义。
- 保持模块化，Controller, Service, Utils 分层清晰。
