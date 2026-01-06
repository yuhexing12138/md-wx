import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

/**
 * Markdown 解析工具
 * 用于将 Markdown 文本解析为 HTML
 */
export class MarkdownParser {
  private md: MarkdownIt;

  constructor() {
    // 初始化 markdown-it 实例
    this.md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: (str: string, lang: string) => {
        // 代码高亮处理
        if (lang && hljs.getLanguage(lang)) {
          try {
            return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
          } catch (__) {}
        }
        return `<pre class="hljs"><code>${this.md.utils.escapeHtml(str)}</code></pre>`;
      }
    });
  }

  /**
   * 解析 Markdown 文本为 HTML
   * @param content Markdown 内容
   * @returns 解析后的 HTML 字符串
   */
  parse(content: string): string {
    return this.md.render(content);
  }

  /**
   * 解析 Markdown 文本为 HTML，并添加代码块样式和标题图标
   * @param content Markdown 内容
   * @returns 解析后的 HTML 字符串，包含美化的代码块和标题图标
   */
  parseWithCodeStyle(content: string): string {
    let html = this.parse(content);
    
    // 为代码块添加 macOS 风格装饰
    html = html.replace(/<pre class="hljs">/g, `<pre class="hljs macos-code-block"><div class="macos-title-bar"><div class="macos-dots"><span class="dot close"></span><span class="dot minimize"></span><span class="dot maximize"></span></div></div>`);
    
    // 为 h2 标题添加图标
    html = this.addHeadingIcons(html);
    
    return html;
  }

  /**
   * 为标题添加图标
   * @param html 解析后的 HTML 字符串
   * @returns 添加图标后的 HTML 字符串
   */
  private addHeadingIcons(html: string): string {
    // 标题图标映射
    const headingIcons: { [key: string]: string } = {
      '功能特性': '📋',
      '代码示例': '💻',
      '响应式设计': '📱',
      '主题切换': '🎨'
    };
    
    // 为 h2 标题添加图标
    return html.replace(/<h2>(.*?)<\/h2>/g, (match, headingText) => {
      const icon = headingIcons[headingText.trim()] || '📌';
      return `<h2><span class="heading-icon">${icon}</span>${headingText}</h2>`;
    });
  }
}

// 导出单例实例
export const markdownParser = new MarkdownParser();