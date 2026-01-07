/**
 * 主题类型定义
 */
export interface Theme {
  id: string;
  name: string;
  displayName: string;
  description: string;
}

/**
 * 组件属性类型定义
 */
export interface MdWxRendererProps {
  /**
   * Markdown 内容
   */
  content: string;
  /**
   * 当前主题 ID
   */
  theme?: string;
  /**
   * 默认主题 ID
   */
  defaultTheme?: string;
  /**
   * 是否显示设置面板
   */
  showSettingsBar?: boolean;
  /**
   * 默认视图模式
   */
  defaultViewMode?: 'mobile' | 'desktop';
  /**
   * 自定义设置面板
   */
  customSettingsBar?: React.ReactNode;
  /**
   * 主题切换回调
   */
  onThemeChange?: (theme: string) => void;
  /**
   * 视图模式切换回调
   */
  onViewModeChange?: (mode: 'mobile' | 'desktop') => void;
  /**
   * 复制成功回调
   */
  onCopySuccess?: () => void;
  /**
   * 复制失败回调
   */
  onCopyError?: (error: Error) => void;
}