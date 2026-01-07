# npm link 与引用使用指南

## 1. npm link 介绍

`npm link` 是 npm 提供的一个功能，允许你在本地开发时，将一个包链接到另一个项目中使用，而不需要发布到 npm  registry。这对于开发库或组件时非常有用。

## 2. 在 md-wx 项目中设置

### 2.1 构建库文件

首先，确保你已经构建了库文件：

```bash
# 在 md-wx 项目目录中运行
npm run build:lib
```

### 2.2 链接库

```bash
# 在 md-wx 项目目录中运行
npm run link
```

这会将 `md-wx-renderer` 包链接到全局 npm 目录中。

## 3. 在其他项目中使用

### 3.1 链接到目标项目

```bash
# 在目标项目目录中运行
npm link md-wx-renderer
```

### 3.2 导入和使用

在你的目标项目中，你可以像使用普通 npm 包一样导入和使用 `md-wx-renderer`：

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

### 3.3 使用工具函数

```tsx
import { useMarkdown, ClipboardUtil } from 'md-wx-renderer';

const App = () => {
  const { parsedHtml } = useMarkdown('# 标题');

  const handleCopy = async () => {
    await ClipboardUtil.copyHtmlAsRichText(parsedHtml, '');
  };

  return (
    <div>
      <button onClick={handleCopy}>复制</button>
    </div>
  );
};
```

## 4. 解除链接

### 4.1 在目标项目中解除链接

```bash
# 在目标项目目录中运行
npm unlink md-wx-renderer
```

### 4.2 在 md-wx 项目中解除链接

```bash
# 在 md-wx 项目目录中运行
npm run unlink
```

## 5. 常见问题

### 5.1 链接失败

- 确保你有足够的权限
- 检查 npm 版本是否兼容
- 确保 md-wx 项目已经构建

### 5.2 组件不显示

- 检查 Markdown 内容是否正确
- 检查主题是否存在
- 检查控制台是否有错误信息

### 5.3 样式问题

- 确保目标项目没有覆盖 md-wx-renderer 的样式
- 检查 CSS 加载是否正常

## 6. 替代方案

如果 `npm link` 遇到问题，你可以尝试以下替代方案：

### 6.1 使用相对路径

在 `package.json` 中使用相对路径：

```json
"dependencies": {
  "md-wx-renderer": "file:../md-wx"
}
```

### 6.2 使用 yalc

[yalc](https://github.com/wclr/yalc) 是一个更高级的本地包管理工具：

```bash
# 安装 yalc
npm i -g yalc

# 在 md-wx 项目中发布
yalc publish

# 在目标项目中添加
yalc add md-wx-renderer
```

## 7. 最佳实践

1. **开发时使用 npm link**：方便实时预览更改
2. **测试时使用正式包**：确保最终效果与发布版本一致
3. **定期更新链接**：当 md-wx 项目有重大更改时，重新运行 `npm run link`
4. **使用类型检查**：确保 TypeScript 类型正确传递

## 8. 故障排除

### 8.1 清理 npm 缓存

```bash
npm cache clean --force
```

### 8.2 重新安装依赖

```bash
# 在目标项目中
rm -rf node_modules
npm install
npm link md-wx-renderer
```

### 8.3 检查版本冲突

确保目标项目的 React 版本与 md-wx-renderer 兼容。
