import juice from 'juice';

/**
 * 微信公众号 HTML 标签映射
 * 将不支持的标签转换为支持的标签
 */
const TAG_MAPPING: Record<string, string> = {
  'article': 'section',
  'main': 'section',
  'nav': 'section',
  'aside': 'section',
};

/**
 * 微信公众号支持的 CSS 属性白名单
 */
const CSS_WHITELIST: Set<string> = new Set([
  'color',
  'font-size',
  'font-family',
  'font-weight',
  'text-align',
  'text-decoration',
  'line-height',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'background-color',
  'border',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
  'border-radius',
  'display',
  'width',
  'height',
  'max-width',
  'max-height',
  'min-width',
  'min-height',
  'overflow',
  'overflow-x',
  'overflow-y',
  'white-space',
  'word-break',
  'word-wrap',
  'letter-spacing',
  'vertical-align',
]);

/**
 * 转换不支持的 HTML 标签
 * @param html 原始 HTML 字符串
 * @returns 转换后的 HTML 字符串
 */
export const transformTags = (html: string): string => {
  let transformedHtml = html;
  
  // 遍历标签映射，替换不支持的标签
  Object.entries(TAG_MAPPING).forEach(([fromTag, toTag]) => {
    const openTagRegex = new RegExp(`<${fromTag}(\\s[^>]*)?>`, 'gi');
    const closeTagRegex = new RegExp(`</${fromTag}>`, 'gi');
    
    transformedHtml = transformedHtml
      .replace(openTagRegex, `<${toTag}$1>`)
      .replace(closeTagRegex, `</${toTag}>`);
  });
  
  return transformedHtml;
};

/**
 * 过滤 CSS 属性，只保留白名单中的属性
 * @param style 原始样式字符串
 * @returns 过滤后的样式字符串
 */
export const filterCssProperties = (style: string): string => {
  const styleMap = new Map<string, string>();
  
  // 解析样式字符串
  const styleRules = style.split(';').filter(rule => rule.trim());
  
  styleRules.forEach(rule => {
    const [property, value] = rule.split(':').map(part => part.trim());
    if (property && value && CSS_WHITELIST.has(property)) {
      styleMap.set(property, value);
    }
  });
  
  // 重构样式字符串
  return Array.from(styleMap.entries())
    .map(([property, value]) => `${property}: ${value}`)
    .join('; ');
};

/**
 * 清理 HTML 元素的内联样式
 * @param html 原始 HTML 字符串
 * @returns 清理后的 HTML 字符串
 */
export const sanitizeInlineStyles = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // 遍历所有元素，清理内联样式
  const elements = doc.querySelectorAll('*');
  elements.forEach(element => {
    if (element.hasAttribute('style')) {
      const originalStyle = element.getAttribute('style') || '';
      const filteredStyle = filterCssProperties(originalStyle);
      element.setAttribute('style', filteredStyle);
    }
  });
  
  return doc.body.innerHTML;
};

/**
 * 处理微信公众号兼容性
 * @param html 原始 HTML 字符串
 * @param css 原始 CSS 字符串
 * @returns 处理后的微信公众号兼容 HTML 字符串
 */
export const processWechatCompatibility = (html: string, css: string): string => {
  // 1. CSS 内联化
  const inlinedHtml = juice.inlineContent(html, css);
  
  // 2. 转换不支持的 HTML 标签
  const transformedHtml = transformTags(inlinedHtml);
  
  // 3. 清理内联样式
  const sanitizedHtml = sanitizeInlineStyles(transformedHtml);
  
  return sanitizedHtml;
};

/**
 * 检查 HTML 是否符合微信公众号规范
 * @param html HTML 字符串
 * @returns 检查结果
 */
export const checkWechatCompatibility = (html: string): {
  isValid: boolean;
  issues: string[];
} => {
  const issues: string[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // 检查是否有不支持的标签
  const elements = doc.querySelectorAll('*');
  elements.forEach(element => {
    const tagName = element.tagName.toLowerCase();
    if (['script', 'iframe', 'object', 'embed', 'form'].includes(tagName)) {
      issues.push(`不支持的标签: ${tagName}`);
    }
  });
  
  // 检查是否有不支持的样式属性
  elements.forEach(element => {
    if (element.hasAttribute('style')) {
      const style = element.getAttribute('style') || '';
      const styleRules = style.split(';').filter(rule => rule.trim());
      
      styleRules.forEach(rule => {
        const [property] = rule.split(':').map(part => part.trim());
        if (property && !CSS_WHITELIST.has(property)) {
          issues.push(`不支持的 CSS 属性: ${property}`);
        }
      });
    }
  });
  
  return {
    isValid: issues.length === 0,
    issues,
  };
};
