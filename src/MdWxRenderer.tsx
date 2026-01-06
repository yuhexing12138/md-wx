import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Preview from './components/Preview';
import SettingsBar from './components/SettingsBar';
import { useMarkdown } from './hooks/useMarkdown';
import { DEFAULT_THEME, THEMES } from './constants/themes';
import { APP_CONFIG } from './constants/config';
import { ClipboardUtil } from './utils/clipboard';
import { themeManager } from './utils/themeManager';
import type { MdWxRendererProps } from './types/component';

/**
 * 微信公众号 Markdown 渲染组件
 * 用于渲染 Markdown 内容并支持主题切换和视图切换
 */
const MdWxRenderer: React.FC<MdWxRendererProps> = ({
  content,
  theme = DEFAULT_THEME,
  defaultTheme = DEFAULT_THEME,
  showSettingsBar = APP_CONFIG.DEFAULT_SHOW_SETTINGS_BAR,
  defaultViewMode = APP_CONFIG.DEFAULT_VIEW_MODE,
  customSettingsBar,
  onThemeChange,
  onViewModeChange
}) => {
  // 当前主题状态
  const [currentTheme, setCurrentTheme] = useState<string>(theme || defaultTheme);
  
  // 当前视图模式状态
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>(defaultViewMode);
  
  // Markdown 处理 Hook
  const { parsedHtml } = useMarkdown(content);

  // 当外部 theme 属性变化时，更新内部状态
  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme);
      updateThemeVariables(theme);
    }
  }, [theme]);

  // 初始化主题
  useEffect(() => {
    updateThemeVariables(currentTheme);
  }, []);

  // 更新主题变量
  const updateThemeVariables = useCallback((themeId: string) => {
    const themeConfig = THEMES.find(t => t.id === themeId);
    if (themeConfig) {
      themeManager.setTheme(themeId, themeConfig.variables);
    }
  }, []);

  // 主题切换处理
  const handleThemeChange = useCallback((newTheme: string) => {
    setCurrentTheme(newTheme);
    updateThemeVariables(newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  }, [onThemeChange, updateThemeVariables]);

  // 视图模式切换处理
  const handleViewModeChange = useCallback((newMode: 'mobile' | 'desktop') => {
    setViewMode(newMode);
    if (onViewModeChange) {
      onViewModeChange(newMode);
    }
  }, [onViewModeChange]);

  // 复制功能处理
  const handleCopy = useCallback(async () => {
    try {
      // 生成主题 CSS
      const themeCss = themeManager.generateThemeCss();
      // 复制为微信公众号兼容的富文本
      const success = await ClipboardUtil.copyHtmlAsRichText(parsedHtml, themeCss);
      if (success) {
        console.log('复制成功');
      } else {
        console.error('复制失败');
      }
    } catch (error) {
      console.error('复制过程中出错:', error);
    }
  }, [parsedHtml]);

  // 缓存渲染属性
  const previewProps = useMemo(() => ({
    content: parsedHtml,
    viewMode,
    theme: currentTheme
  }), [parsedHtml, viewMode, currentTheme]);

  // 缓存设置栏属性
  const settingsBarProps = useMemo(() => ({
    theme: currentTheme,
    onThemeChange: handleThemeChange,
    viewMode,
    onViewModeChange: handleViewModeChange,
    onCopy: handleCopy
  }), [currentTheme, handleThemeChange, viewMode, handleViewModeChange, handleCopy]);

  return (
    <div className="md-wx-renderer">
      {/* 顶部设置栏 */}
      {showSettingsBar && (
        customSettingsBar || (
          <SettingsBar {...settingsBarProps} />
        )
      )}
      
      {/* 预览区域 */}
      <Preview {...previewProps} />
    </div>
  );
};

// 使用 React.memo 缓存组件，避免不必要的渲染
export default React.memo(MdWxRenderer);