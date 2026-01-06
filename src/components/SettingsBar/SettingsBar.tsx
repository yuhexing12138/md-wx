import React, { memo } from 'react';
import './SettingsBar.css';
import ThemeSelector from '../ThemeSelector';
import ViewToggle from '../ViewToggle';
import CopyButton from '../CopyButton';

interface SettingsBarProps {
  theme: string;
  onThemeChange: (theme: string) => void;
  viewMode: 'mobile' | 'desktop';
  onViewModeChange: (mode: 'mobile' | 'desktop') => void;
  onCopy: () => void;
}

/**
 * 顶部设置栏组件
 * 集成主题切换、视图切换和复制按钮
 */
const SettingsBar: React.FC<SettingsBarProps> = ({
  theme,
  onThemeChange,
  viewMode,
  onViewModeChange,
  onCopy
}) => {
  return (
    <div className={`settings-bar theme-${theme}`}>
      {/* 主题选择器 */}
      <ThemeSelector 
        currentTheme={theme}
        onThemeChange={onThemeChange}
      />
      
      {/* 视图切换 */}
      <ViewToggle 
        currentMode={viewMode}
        onModeChange={onViewModeChange}
      />
      
      {/* 复制按钮 */}
      <CopyButton 
        onCopy={onCopy}
      />
    </div>
  );
};

// 使用 React.memo 缓存组件，避免不必要的渲染
export default memo(SettingsBar);