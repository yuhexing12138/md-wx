/**
 * 主题类型定义
 */
export interface ThemeConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  variables: {
    [key: string]: string;
  };
}