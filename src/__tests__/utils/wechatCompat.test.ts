import { processWechatCompatibility } from '../../utils/wechatCompat';

describe('wechatCompat', () => {
  describe('processWechatCompatibility', () => {
    it('should process HTML and CSS for WeChat compatibility', () => {
      const html = '<div><h1>Test</h1><p>Content</p></div>';
      const css = 'h1 { color: red; }';
      
      const result = processWechatCompatibility(html, css);
      
      expect(typeof result).toBe('string');
      expect(result).toContain('<h1');
      expect(result).toContain('Test');
      expect(result).toContain('<p');
      expect(result).toContain('Content');
    });
  });
});
