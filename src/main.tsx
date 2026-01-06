import React from 'react';
import ReactDOM from 'react-dom/client';
import MdWxRenderer from './MdWxRenderer';
import './index.css';

// 示例 Markdown 内容
const sampleMarkdown = `
# 微信公众号 Markdown 渲染组件

## 功能特性

- 实时预览 Markdown 内容
- 支持 5 个预设主题
- 响应式布局，支持手机/桌面视图
- macOS 风格代码块
- 一键复制到微信公众号

## 代码示例

\`\`\`javascript
// 示例代码
function hello() {
  console.log('Hello, World!');
}
\`\`\`

## 响应式设计

组件支持自适应不同设备尺寸，在手机和桌面端都能呈现良好的排版效果。

## 主题切换

通过主题切换功能，可以根据不同的内容类型选择合适的主题风格。
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MdWxRenderer 
      content={sampleMarkdown}
      theme="classical"
      defaultViewMode="mobile"
    />
  </React.StrictMode>,
);