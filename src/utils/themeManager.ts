/**
 * 主题配置系统
 * 用于管理和切换主题
 */
export class ThemeManager {
  private currentTheme: string;
  private themeVariables: Map<string, string>;

  constructor(initialTheme: string = 'classical') {
    this.currentTheme = initialTheme;
    this.themeVariables = new Map();
  }

  /**
   * 设置当前主题
   * @param themeId 主题 ID
   * @param variables 主题变量
   */
  setTheme(themeId: string, variables: { [key: string]: string }) {
    this.currentTheme = themeId;
    this.themeVariables.clear();
    
    // 存储主题变量
    Object.entries(variables).forEach(([key, value]) => {
      this.themeVariables.set(key, value);
    });
    
    // 应用主题变量到文档
    this.applyTheme();
  }

  /**
   * 应用主题变量到文档
   */
  private applyTheme() {
    const root = document.documentElement;
    
    // 移除所有现有的主题变量
    this.themeVariables.forEach((_, key) => {
      root.style.removeProperty(key);
    });
    
    // 添加新的主题变量
    this.themeVariables.forEach((value, key) => {
      root.style.setProperty(key, value);
    });
  }

  /**
   * 获取当前主题
   * @returns 当前主题 ID
   */
  getCurrentTheme(): string {
    return this.currentTheme;
  }

  /**
   * 获取主题变量
   * @param key 变量名
   * @returns 变量值
   */
  getVariable(key: string): string | undefined {
    return this.themeVariables.get(key);
  }

  /**
   * 获取所有主题变量
   * @returns 主题变量对象
   */
  getAllVariables(): { [key: string]: string } {
    const variables: { [key: string]: string } = {};
    this.themeVariables.forEach((value, key) => {
      variables[key] = value;
    });
    return variables;
  }

  /**
   * 生成主题 CSS 样式字符串
   * @returns CSS 样式字符串
   */
  generateThemeCss(): string {
    const variables = this.getAllVariables();
    let css = '';
    
    // 生成基础样式
    css += `
      :root {
        ${Object.entries(variables)
          .map(([key, value]) => `${key}: ${value};`)
          .join('\n        ')}
      }
    `;
    
    // 生成通用样式
    css += `
      body {
        font-family: ${variables['--font-family'] || 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'};
        line-height: ${variables['--line-height'] || '1.7'};
        color: ${variables['--text-primary'] || '#333'};
        background-color: ${variables['--bg-primary'] || '#fff'};
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.75em;
        color: ${variables['--heading-color'] || variables['--text-primary'] || '#333'};
      }
      
      h1 {
        font-size: 2.5rem;
        border-bottom: 2px solid ${variables['--accent-color'] || '#007bff'};
        padding-bottom: 0.5rem;
      }
      
      h2 {
        font-size: 2rem;
        border-left: 4px solid ${variables['--accent-color'] || '#007bff'};
        padding-left: 1rem;
      }
      
      h3 {
        font-size: 1.5rem;
      }
      
      p {
        margin-bottom: 1rem;
      }
      
      a {
        color: ${variables['--accent-color'] || '#007bff'};
        text-decoration: none;
      }
      
      a:hover {
        text-decoration: underline;
      }
      
      ul, ol {
        margin-bottom: 1rem;
        padding-left: 1.5rem;
      }
      
      li {
        margin-bottom: 0.5rem;
      }
      
      blockquote {
        border-left: 4px solid ${variables['--accent-color'] || '#007bff'};
        padding: 1rem 1.5rem;
        margin: 1.5rem 0;
        background-color: ${variables['--bg-secondary'] || '#f8f9fa'};
        border-radius: 0 8px 8px 0;
        font-style: italic;
      }
      
      code {
        font-family: ${variables['--font-family-mono'] || 'Menlo, Monaco, Consolas, "Courier New", monospace'};
        background-color: ${variables['--code-bg'] || '#f8f9fa'};
        padding: 0.2em 0.4em;
        border-radius: 4px;
        font-size: 0.9em;
      }
      
      pre {
        background-color: ${variables['--code-bg'] || '#f8f9fa'};
        padding: 1.5rem;
        border-radius: 8px;
        overflow-x: auto;
        margin: 1.5rem 0;
      }
      
      pre code {
        background: none;
        padding: 0;
      }
      
      /* macOS 风格代码块 */
      .macos-code-block {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      .macos-title-bar {
        background-color: #f1f1f1;
        padding: 8px 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e0e0e0;
      }
      
      .macos-dots {
        display: flex;
        gap: 8px;
      }
      
      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      
      .dot.close {
        background-color: #ff5f56;
      }
      
      .dot.minimize {
        background-color: #ffbd2e;
      }
      
      .dot.maximize {
        background-color: #27ca3f;
      }
      
      .macos-code-block code {
        display: block;
        padding: 16px;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.5;
        overflow-x: auto;
      }
      
      /* 暗黑主题代码块标题栏 */
      .theme-dark .macos-title-bar {
        background-color: #333333;
        border-bottom-color: #444444;
      }
      
      /* 科技主题代码块标题栏 */
      .theme-tech .macos-title-bar {
        background-color: #1a1f3a;
        border-bottom-color: #2a2f4a;
      }
    `;
    
    return css;
  }
}

// 导出单例实例
export const themeManager = new ThemeManager();