import React, { useState, memo } from 'react';

interface CopyButtonProps {
  onCopy: () => void;
}

/**
 * 复制按钮组件
 * 用于复制渲染后的 HTML 内容
 */
const CopyButton: React.FC<CopyButtonProps> = ({
  onCopy
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCopy = () => {
    // 添加点击动画
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    
    // 执行复制操作
    onCopy();
    setIsCopied(true);
    
    // 2秒后重置状态
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      className={`settings-button copy-button ${isCopied ? 'copied' : ''} ${isAnimating ? 'animating' : ''}`}
      onClick={handleCopy}
      aria-label={isCopied ? '已复制' : '复制内容'}
      title={isCopied ? '已复制到剪贴板' : '复制内容到剪贴板'}
    >
      <span className="copy-icon" style={{ transition: 'all 0.3s ease' }}>
        {isCopied ? '✅' : '📋'}
      </span>
    </button>
  );
};

// 使用 React.memo 缓存组件，避免不必要的渲染
export default memo(CopyButton);