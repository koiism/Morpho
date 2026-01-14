---
alwaysApply: false
description: 涉及生成文案时生效，确保所有文案支持多语言
---

# 多语言 (i18n) 开发指南

本项目使用 `next-intl` 进行国际化管理。

## 1. 核心原则

- **禁止硬编码**: 所有用户可见的文本必须提取到语言包中。
- **键名规范**: 使用嵌套结构，键名应具有语义 (e.g., `HomePage.title`, `Common.buttons.submit`)。
- **默认语言**: 英文 (en) 作为默认开发语言，中文 (zh) 为主要目标语言。

## 2. 语言包管理

- 语言文件位于 `src/messages/` 目录下 (e.g., `en.json`, `zh.json`)。
- 新增文本时，需同时更新 `en.json` 和 `zh.json`。

## 3. 组件开发

- **Server Components**: 使用 `getTranslations` 获取翻译函数。

  ```typescript
  import { getTranslations } from 'next-intl/server';

  export default async function Page() {
    const t = await getTranslations('PageName');
    return <h1>{t('title')}</h1>;
  }
  ```

- **Client Components**: 使用 `useTranslations` hook。

  ```typescript
  'use client';
  import { useTranslations } from 'next-intl';

  export default function Button() {
    const t = useTranslations('Common');
    return <button>{t('submit')}</button>;
  }
  ```

## 4. AI 提示词要求

- 当生成或修改 UI 组件时，自动识别其中的文本并替换为 `t('key')` 形式。
- 如果没有现成的键，请建议添加新的键值对到 `src/messages/*.json`。
