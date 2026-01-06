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
    } catch (err) {
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
      const wechatCompatibleHtml = processWechatCompatibility(html, css);
      
      // 2. 打印完整的 HTML 源代码到控制台
      console.log('复制到剪贴板的完整 HTML 源代码:', wechatCompatibleHtml);
      
      // 3. 创建富文本数据
      const richTextData = new ClipboardItem({
        'text/html': new Blob([wechatCompatibleHtml], { type: 'text/html' }),
        'text/plain': new Blob([this.extractPlainText(wechatCompatibleHtml)], { type: 'text/plain' })
      });
      
      // 4. 写入剪贴板
      await navigator.clipboard.write([richTextData]);
      return true;
    } catch (err) {
      console.error('复制富文本失败:', err);
      return false;
    }
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
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}