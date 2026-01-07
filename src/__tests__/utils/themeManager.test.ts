import { ThemeManager } from '../../utils/themeManager';

describe('themeManager', () => {
  let themeManager: ThemeManager;
  
  beforeEach(() => {
    themeManager = new ThemeManager();
  });
  
  describe('setTheme', () => {
    it('should set theme and variables', () => {
      const themeId = 'test';
      const variables = {
        '--bg-primary': '#ffffff',
        '--text-primary': '#000000'
      };
      
      themeManager.setTheme(themeId, variables);
      
      expect(themeManager.getCurrentTheme()).toBe(themeId);
      expect(themeManager.getVariable('--bg-primary')).toBe('#ffffff');
      expect(themeManager.getVariable('--text-primary')).toBe('#000000');
    });
  });
  
  describe('getCurrentTheme', () => {
    it('should return current theme', () => {
      const themeId = 'test';
      const variables = {
        '--bg-primary': '#ffffff'
      };
      
      themeManager.setTheme(themeId, variables);
      
      expect(themeManager.getCurrentTheme()).toBe(themeId);
    });
  });
  
  describe('getVariable', () => {
    it('should return variable value', () => {
      const variables = {
        '--bg-primary': '#ffffff'
      };
      
      themeManager.setTheme('test', variables);
      
      expect(themeManager.getVariable('--bg-primary')).toBe('#ffffff');
      expect(themeManager.getVariable('--non-existent')).toBeUndefined();
    });
  });
  
  describe('getAllVariables', () => {
    it('should return all variables', () => {
      const variables = {
        '--bg-primary': '#ffffff',
        '--text-primary': '#000000'
      };
      
      themeManager.setTheme('test', variables);
      
      const result = themeManager.getAllVariables();
      
      expect(result).toEqual(variables);
    });
  });
  
  describe('generateThemeCss', () => {
    it('should generate CSS string', () => {
      const variables = {
        '--bg-primary': '#ffffff',
        '--text-primary': '#000000'
      };
      
      themeManager.setTheme('test', variables);
      
      const css = themeManager.generateThemeCss();
      
      expect(typeof css).toBe('string');
      expect(css).toContain('--bg-primary: #ffffff');
      expect(css).toContain('--text-primary: #000000');
    });
  });
});
