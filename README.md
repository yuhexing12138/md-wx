# 微信公众号 Markdown 渲染组件 - 使用文档

## 1. 项目简介

微信公众号 Markdown 渲染组件是一个专为微信公众号样式优化的通用 Markdown 渲染组件，以 NPM 包形式发布，支持实时预览、主题切换、响应式布局和一键复制功能。

## 2. 安装与使用

### 2.1 安装

```bash
npm install md-wx-renderer
```

### 2.2 基本使用

```tsx
import React, { useState } from 'react';
import { MdWxRenderer } from 'md-wx-renderer';

function App() {
  const [content, setContent] = useState('# 微信公众号 Markdown 渲染组件\n\n## 功能特性\n\n- 实时预览 Markdown 内容\n- 支持 5 个预设主题\n- 响应式布局，支持手机/桌面视图\n- macOS 风格代码块\n- 一键复制到微信公众号\n');

  return (
    <div className="app">
      <MdWxRenderer 
        content={content}
        theme="classical"
        showSettingsBar={true}
        defaultViewMode="desktop"
        onThemeChange={(theme) => console.log('Theme changed:', theme)}
        onViewModeChange={(mode) => console.log('View mode changed:', mode)}
      />
    </div>
  );
}

export default App;
```

## 3. 组件属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `content` | string | '' | Markdown 内容 |
| `theme` | string | 'classical' | 主题 ID |
| `defaultTheme` | string | 'classical' | 默认主题 |
| `showSettingsBar` | boolean | true | 是否显示设置栏 |
| `defaultViewMode` | 'mobile' \| 'desktop' | 'desktop' | 默认视图模式 |
| `customSettingsBar` | React.ReactNode | undefined | 自定义设置栏 |
| `onThemeChange` | (theme: string) => void | undefined | 主题切换回调 |
| `onViewModeChange` | (mode: 'mobile' \| 'desktop') => void | undefined | 视图模式切换回调 |

## 4. 主题系统

组件内置 5 个预设主题：

1. **古典主题**：暖色调设计，模拟古典书籍的配色风格，适合文化类、历史类内容
2. **暗黑主题**：深色背景搭配红色强调色，适合夜间阅读和专业场景
3. **科技主题**：深蓝色背景搭配亮蓝色强调色，科技感十足，适合技术类内容
4. **简约主题**：纯白背景，简洁明了，突出内容，适合干货类、技术类内容
5. **梦幻主题**：淡蓝紫色调，梦幻柔和，适合情感类、生活类内容

## 5. 功能特性

### 5.1 实时预览

组件会实时解析和渲染 Markdown 内容，提供所见即所得的编辑体验。

### 5.2 主题切换

通过顶部设置栏的主题选择器，可以快速切换不同的主题风格。

### 5.3 视图切换

支持手机视图和桌面视图的切换，预览不同设备上的显示效果。

### 5.4 一键复制

点击复制按钮，可以将渲染后的内容直接复制到剪贴板，然后粘贴到微信公众号编辑器中。

### 5.5 代码块样式

支持 macOS 风格的代码块装饰，带有 GitHub Dark 代码高亮。

## 6. 微信公众号兼容性

### 6.1 适配处理

组件会自动处理以下微信公众号兼容性问题：

- HTML 标签适配：转换不支持的标签
- CSS 内联化：将 CSS 转换为内联样式
- 样式兼容性：确保样式在微信公众号中正常显示

### 6.2 使用方法

1. 在组件中编写或粘贴 Markdown 内容
2. 选择合适的主题和视图模式
3. 点击复制按钮
4. 打开微信公众号编辑器，粘贴内容
5. 调整排版和图片位置（如果需要）

## 7. 高级配置

### 7.1 自定义主题

可以通过修改主题配置来创建自定义主题：

```tsx
import { THEMES } from 'md-wx-renderer';

// 扩展主题配置
const customThemes = [...THEMES, {
  id: 'custom',
  name: 'custom',
  displayName: '自定义主题',
  description: '我的自定义主题',
  variables: {
    '--bg-primary': '#f0f0f0',
    '--text-primary': '#333333',
    '--accent-color': '#007bff',
    // 其他主题变量...
  }
}];
```

### 7.2 性能优化

对于大型文档，可以使用以下方法优化性能：

- 启用虚拟滚动
- 减少不必要的重新渲染
- 合理使用 React.memo 和 useMemo

## 8. 常见问题

### 8.1 复制到微信公众号后样式丢失

**解决方案**：确保使用最新版本的组件，复制后在微信公众号编辑器中不要使用"清除格式"功能。

### 8.2 代码块显示异常

**解决方案**：检查代码块的语法是否正确，确保代码块使用三个反引号包围。

### 8.3 主题切换无效果

**解决方案**：确保主题 ID 正确，检查是否有其他 CSS 样式冲突。

## 9. 浏览器兼容性

组件支持所有现代浏览器，包括：

- Chrome
- Firefox
- Safari
- Edge

## 10. 开发与贡献

### 10.1 开发环境搭建

```bash
# 克隆仓库
git clone https://github.com/yourusername/md-wx-renderer.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 10.2 构建与发布

```bash
# 构建生产版本
npm run build

# 运行测试
npm run test

# 检查代码质量
npm run lint
```

## 11. 版本历史

### v1.0.0 (2024-01-07)
- 初始版本发布
- 支持 5 个预设主题
- 实时预览功能
- 微信公众号兼容性处理
- 一键复制功能

## 12. 许可证

MIT License
