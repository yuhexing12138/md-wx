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
  content: string;
  theme?: string;
  defaultTheme?: string;
  showSettingsBar?: boolean;
  defaultViewMode?: 'mobile' | 'desktop';
  customSettingsBar?: React.ReactNode;
  onThemeChange?: (theme: string) => void;
  onViewModeChange?: (mode: 'mobile' | 'desktop') => void;
}