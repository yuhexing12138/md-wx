import { ClipboardUtil } from '../../utils/clipboard';

describe('clipboard', () => {
  describe('copyText', () => {
    it('should copy text to clipboard', async () => {
      // Mock navigator.clipboard
      const originalWriteText = navigator.clipboard.writeText;
      navigator.clipboard.writeText = jest.fn().mockResolvedValue(undefined);
      
      const result = await ClipboardUtil.copyText('Test text');
      
      expect(result).toBe(true);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Test text');
      
      // Restore original method
      navigator.clipboard.writeText = originalWriteText;
    });
  });
  
  describe('copyHtmlAsRichText', () => {
    it('should copy HTML as rich text', async () => {
      // Mock navigator.clipboard
      const originalWrite = navigator.clipboard.write;
      navigator.clipboard.write = jest.fn().mockResolvedValue(undefined);
      
      const html = '<div><h1>Test</h1></div>';
      const css = 'h1 { color: red; }';
      
      const result = await ClipboardUtil.copyHtmlAsRichText(html, css);
      
      expect(result).toBe(true);
      expect(navigator.clipboard.write).toHaveBeenCalled();
      
      // Restore original method
      navigator.clipboard.write = originalWrite;
    });
  });
});
