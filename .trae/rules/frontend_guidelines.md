---
alwaysApply: false
globs: src/app/(frontend)/**,src/components/**,src/lib/**
---

# 前端开发指南

本主要用于指导 Morpho 项目的前端代码开发。

## 1. 技术栈核心

- **框架**: Next.js (App Router)
- **UI 组件库**: shadcn/ui
- **AI 交互界面**: assistant-ui (用于构建聊天和 AI 辅助界面)
- **样式**: Tailwind CSS
- **语言**: TypeScript

## 2. 开发规范

### 2.1 Next.js 最佳实践

- 优先使用 React Server Components (RSC) 以获得更好的性能。
- 客户端交互组件需在文件顶部标记 `'use client'`。
- 路由结构遵循 App Router 规范 (`app/` 目录)。
- 数据获取优先在服务端组件中进行。

### 2.2 UI 组件开发

- 保持组件的原子性和可复用性。
- 遵循 Tailwind CSS 的工具类优先原则，避免编写自定义 CSS 文件。
- 确保响应式设计，适配移动端和桌面端。

### 2.3 AI 交互集成 (assistant-ui)

- 使用 `assistant-ui` 构建跑团过程中的对话界面。
- 确保 AI 响应的流式传输 (Streaming) 体验流畅。
- 自定义 `assistant-ui` 组件以匹配项目整体视觉风格。

### 2.4 状态管理

- 优先使用 URL 参数和 Server Component 传递状态。
- 客户端全局状态可使用 Zustand
- 复杂表单使用 `react-hook-form` 配合 `zod` 进行验证。

### 2.5 国际化 (i18n)

- 所有用户可见的文案必须支持多语言，禁止硬编码字符串。
- 使用 `next-intl` 进行国际化管理，翻译文件位于 `src/messages/*.json`。

### 2.6 样式与主题

- **严禁**使用 Tailwind 原生颜色（如 `bg-zinc-900`, `text-blue-500`）。
- **必须**使用 `styles.css` 中定义的语义化 CSS 变量（如 `bg-background`, `text-primary`, `bg-card`）。
- 确保组件在亮色和暗色模式下均有良好的视觉表现。

## 3. 代码风格

- 严格遵循 TypeScript 类型定义，避免使用 `any`。
- 组件命名使用 PascalCase (如 `CharacterCard.tsx`)。
- 工具函数和钩子命名使用 camelCase (如 `useCharacterStats.ts`)。
