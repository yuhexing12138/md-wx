

import MdWxRenderer from './MdWxRenderer';
import { useMarkdown } from './hooks/useMarkdown';
import { ClipboardUtil } from './utils/clipboard';
import { themeManager } from './utils/themeManager';
import { DEFAULT_THEME, THEMES } from './constants/themes';
import type { MdWxRendererProps, Theme } from './types';

// 导出主组件
export default MdWxRenderer;

// 导出类型
export type { MdWxRendererProps, Theme };

// 导出工具函数和 hooks
export { useMarkdown, ClipboardUtil, themeManager, DEFAULT_THEME, THEMES };

// 导出组件工厂函数
export const createMdWxRenderer = (defaultProps: Partial<import('./types').MdWxRendererProps> = {}) => {
  return (props: import('./types').MdWxRendererProps) => {
    return MdWxRenderer({ ...defaultProps, ...props });
  };
};

