import React, { memo } from 'react';

interface ViewToggleProps {
  currentMode: 'mobile' | 'desktop';
  onModeChange: (mode: 'mobile' | 'desktop') => void;
}

/**
 * 视图切换组件
 * 用于切换手机/桌面视图
 */
const ViewToggle: React.FC<ViewToggleProps> = ({
  currentMode,
  onModeChange
}) => {
  const handleModeChange = (mode: 'mobile' | 'desktop') => {
    onModeChange(mode);
  };

  return (
    <div className="view-toggle">
      <button
        className={`view-toggle-button ${currentMode === 'mobile' ? 'active' : ''}`}
        onClick={() => handleModeChange('mobile')}
        aria-label="手机视图"
        title="手机视图"
        aria-pressed={currentMode === 'mobile'}
        style={{
          transition: 'all 0.2s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          if (currentMode !== 'mobile') {
            e.currentTarget.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (currentMode !== 'mobile') {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        <span className="view-icon" style={{ transition: 'transform 0.3s ease' }}>
          📱
        </span>
      </button>
      <button
        className={`view-toggle-button ${currentMode === 'desktop' ? 'active' : ''}`}
        onClick={() => handleModeChange('desktop')}
        aria-label="桌面视图"
        title="桌面视图"
        aria-pressed={currentMode === 'desktop'}
        style={{
          transition: 'all 0.2s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          if (currentMode !== 'desktop') {
            e.currentTarget.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (currentMode !== 'desktop') {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        <span className="view-icon" style={{ transition: 'transform 0.3s ease' }}>
          💻
        </span>
      </button>
    </div>
  );
};

// 使用 React.memo 缓存组件，避免不必要的渲染
export default memo(ViewToggle);