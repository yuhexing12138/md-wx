import { THEMES } from '../../constants/themes';

describe('themes', () => {
  it('should have correct theme configuration', () => {
    expect(Array.isArray(THEMES)).toBe(true);
    expect(THEMES.length).toBe(5);
    
    // Check each theme has required properties
    THEMES.forEach(theme => {
      expect(theme.id).toBeDefined();
      expect(theme.name).toBeDefined();
      expect(theme.displayName).toBeDefined();
      expect(theme.description).toBeDefined();
      expect(theme.variables).toBeDefined();
      expect(typeof theme.variables).toBe('object');
    });
  });
  
  it('should have correct theme IDs', () => {
    const themeIds = THEMES.map(theme => theme.id);
    expect(themeIds).toContain('classical');
    expect(themeIds).toContain('dark');
    expect(themeIds).toContain('tech');
    expect(themeIds).toContain('simple');
    expect(themeIds).toContain('dreamy');
  });
});
