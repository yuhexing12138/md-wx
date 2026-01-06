import juice from 'juice';

/**
 * CSS 内联化配置
 */
const JUICE_OPTIONS: juice.Options = {
  applyHeightAttributes: true,
  applyWidthAttributes: true,
  applyAttributesTableElements: true,
  removeStyleTags: true,
  preserveMediaQueries: false,
  preserveImportant: true,
  preserveFontFaces: true,
  inlinePseudoElements: false,
};

/**
 * 将 CSS 样式内联到 HTML 中
 * @param html HTML 字符串
 * @param css CSS 字符串
 * @returns 内联样式后的 HTML 字符串
 */
export const inlineCss = (html: string, css: string): string => {
  try {
    const inlinedHtml = juice.inlineContent(html, css, JUICE_OPTIONS);
    return inlinedHtml;
  } catch (error) {
    console.error('CSS 内联化失败:', error);
    return html;
  }
};

/**
 * 批量处理多个 HTML 片段的 CSS 内联化
 * @param htmls HTML 字符串数组
 * @param css CSS 字符串
 * @returns 内联样式后的 HTML 字符串数组
 */
export const batchInlineCss = (htmls: string[], css: string): string[] => {
  return htmls.map(html => inlineCss(html, css));
};

/**
 * 从 HTML 中提取并内联样式
 * @param html 包含 style 标签的 HTML 字符串
 * @returns 内联样式后的 HTML 字符串
 */
export const extractAndInlineCss = (html: string): string => {
  try {
    const inlinedHtml = juice(html, JUICE_OPTIONS);
    return inlinedHtml;
  } catch (error) {
    console.error('提取并内联 CSS 失败:', error);
    return html;
  }
};
