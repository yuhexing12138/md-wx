import React, { useEffect, useRef, memo } from 'react';
import './Preview.css';

interface PreviewProps {
  content: string;
  viewMode: 'mobile' | 'desktop';
  theme: string;
}

/**
 * 预览组件
 * 用于显示解析后的 Markdown 内容
 */
const Preview: React.FC<PreviewProps> = ({ content, viewMode, theme }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  // 当内容变化时，更新预览
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = content;
    }
  }, [content]);

  // 当主题变化时，更新预览区域的主题类
  useEffect(() => {
    if (previewRef.current) {
      // 移除所有主题类
      previewRef.current.className = previewRef.current.className.replace(/theme-\w+/g, '');
      // 添加新主题类
      previewRef.current.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <div className={`preview-container ${viewMode === 'mobile' ? 'mobile-view' : 'desktop-view'}`}>
      <div className={`preview-content theme-${theme}`} ref={previewRef}></div>
    </div>
  );
};

// 使用 React.memo 缓存组件，避免不必要的渲染
export default memo(Preview);