# md-wx 组件 API 介绍

## 1. 组件概述

`md-wx-renderer` 是一个用于微信公众号的 Markdown 渲染组件，支持以下功能：
- 实时预览 Markdown 内容
- 支持 5 个预设主题
- 响应式布局，支持手机/桌面视图
- macOS 风格代码块
- 一键复制到微信公众号

## 2. 主要组件

### MdWxRenderer

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| content | string | 必填 | Markdown 内容 |
| theme | string | "classical" | 主题 ID |
| defaultTheme | string | "classical" | 默认主题 ID |
| showSettingsBar | boolean | true | 是否显示设置面板 |
| defaultViewMode | "mobile" \| "desktop" | "desktop" | 默认视图模式 |
| customSettingsBar | React.ReactNode | undefined | 自定义设置面板 |
| onThemeChange | (theme: string) => void | undefined | 主题切换回调 |
| onViewModeChange | (mode: "mobile" \| "desktop") => void | undefined | 视图模式切换回调 |
| onCopySuccess | () => void | undefined | 复制成功回调 |
| onCopyError | (error: Error) => void | undefined | 复制失败回调 |

## 3. 导出的工具函数

### useMarkdown

```ts
import { useMarkdown } from 'md-wx-renderer';

const { parsedHtml } = useMarkdown('# 标题');
```

### ClipboardUtil

```ts
import { ClipboardUtil } from 'md-wx-renderer';

await ClipboardUtil.copyHtmlAsRichText(html, css);
```

### themeManager

```ts
import { themeManager } from 'md-wx-renderer';

themeManager.setTheme('dark', variables);
```

## 4. 导出的常量

- `DEFAULT_THEME`: 默认主题 ID
- `THEMES`: 所有主题配置

## 5. 内置主题

| 主题 ID | 名称 | 描述 |
|---------|------|------|
| classical | 古典主题 | 暖色调设计，模拟古典书籍的配色风格 |
| dark | 暗黑主题 | 深色背景搭配红色强调色，适合夜间阅读 |
| tech | 科技主题 | 深蓝色背景搭配亮蓝色强调色，科技感十足 |
| simple | 简约主题 | 纯白背景，简洁明了，突出内容 |
| dreamy | 梦幻主题 | 淡蓝紫色调，梦幻柔和，适合情感类内容 |

## 6. 基本使用示例

```tsx
import MdWxRenderer from 'md-wx-renderer';

const App = () => {
  return (
    <MdWxRenderer
      content="# 标题\n\n内容"
      theme="classical"
      showSettingsBar={true}
    />
  );
};
```

## 7. 高级使用示例

```tsx
import MdWxRenderer, { createMdWxRenderer } from 'md-wx-renderer';

// 使用组件工厂函数创建预配置的组件
const MyRenderer = createMdWxRenderer({
  theme: 'dark',
  showSettingsBar: false,
});

const App = () => {
  const handleCopySuccess = () => {
    console.log('复制成功！');
  };

  const handleThemeChange = (newTheme: string) => {
    console.log('主题切换为:', newTheme);
  };

  return (
    <MyRenderer
      content={`# 高级示例\n\n\`\`\`javascript\nconsole.log('Hello World!');\n\`\`\``}
      onCopySuccess={handleCopySuccess}
      onThemeChange={handleThemeChange}
    />
  );
};
```
