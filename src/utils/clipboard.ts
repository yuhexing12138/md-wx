import { processWechatCompatibility } from './wechatCompat';

/**
 * 剪贴板工具
 * 用于复制内容到剪贴板
 */
export class ClipboardUtil {
  /**
   * 复制文本到剪贴板
   * @param text 要复制的文本
   * @returns 是否复制成功
   */
  static async copyText(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // 降级方案：使用传统的复制方法
      return this.fallbackCopyTextToClipboard(text);
    }
  }

  /**
   * 复制HTML内容为富文本格式
   * 用于复制到微信公众号等富文本编辑器
   * @param html HTML内容
   * @param css CSS样式
   * @returns 是否复制成功
   */
  static async copyHtmlAsRichText(html: string, css: string = ''): Promise<boolean> {
    try {
      // 1. 处理微信公众号兼容性
      let wechatCompatibleHtml = processWechatCompatibility(html, css);
      
      // 2. 转换代码块HTML结构为微信公众号兼容格式
      wechatCompatibleHtml = this.transformCodeBlocks(wechatCompatibleHtml);
      
      // 3. 打印完整的 HTML 源代码到控制台
      console.log('复制到剪贴板的完整 HTML 源代码:', wechatCompatibleHtml);
      
      // 4. 创建富文本数据
      const richTextData = new ClipboardItem({
        'text/html': new Blob([wechatCompatibleHtml], { type: 'text/html' }),
        'text/plain': new Blob([this.extractPlainText(wechatCompatibleHtml)], { type: 'text/plain' })
      });
      
      // 5. 写入剪贴板
      await navigator.clipboard.write([richTextData]);
      return true;
    } catch (err) {
      console.error('复制富文本失败:', err);
      return false;
    }
  }

  /**
   * 转换代码块HTML结构为微信公众号兼容格式
   * @param html 原始HTML内容
   * @returns 转换后的HTML内容
   */
  private static transformCodeBlocks(html: string): string {
    // 正则表达式匹配代码块
    const codeBlockRegex = /<pre[^>]*class="[^"]*macos-code-block[^"]*"[^>]*>([\s\S]*?)<\/pre>/gi;
    
    return html.replace(codeBlockRegex, (_match, content) => {
      // 提取代码内容
      const codeMatch = content.match(/<code[^>]*>([\s\S]*?)<\/code>/i);
      const codeContent = codeMatch ? codeMatch[1] : '';
      
      // 构建新的代码块结构
      return `
<pre style="background-color: transparent; padding: 0; margin: 0; border-radius: 10px; overflow: hidden; font-size: 0; box-sizing: border-box;">
  <div style="background-color: #f1f1f1; padding: 9px 14px; display: flex; border-bottom: 1px solid #e0e0e0; border-top-left-radius: 10px; border-top-right-radius: 10px; margin: 0; padding: 9px 14px; font-size: 16px; box-sizing: border-box;">
    <div style="display: flex; gap: 9px">
      <span style="width: 13px; height: 13px; border-radius: 50%; background-color: #ff5f56;"></span>
      <span style="width: 13px; height: 13px; border-radius: 50%; background-color: #ffbd2e;"></span>
      <span style="width: 13px; height: 13px; border-radius: 50%; background-color: #27ca3f;"></span>
    </div>
  </div>
  <code style="background-color: #1e1e1e; color: #d4d4d4; display: block; padding: 18px 20px; margin: 0; font-family: 'Consolas', 'Monaco', monospace; font-size: 15px; line-height: 1.6; overflow-x: auto; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; box-sizing: border-box;">
${codeContent}
  </code>
</pre>
      `.trim();
    });
  }

  /**
   * 从HTML中提取纯文本
   * @param html HTML内容
   * @returns 纯文本
   */
  private static extractPlainText(html: string): string {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || '';
  }

  /**
   * 降级复制方法
   * @param text 要复制的文本
   * @returns 是否复制成功
   */
  private static fallbackCopyTextToClipboard(text: string): boolean {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // 隐藏文本区域
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }
}