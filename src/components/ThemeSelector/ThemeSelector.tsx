import React, { useState, memo, useRef, useEffect } from 'react';
import { THEMES } from '../../constants/themes';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

/**
 * 主题选择器组件
 * 用于切换不同的主题
 */
const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    setIsOpen(!isOpen);
  };

  const handleThemeSelect = (themeId: string) => {
    onThemeChange(themeId);
    setIsOpen(false);
  };

  return (
    <div className="theme-selector" ref={dropdownRef}>
      <button 
        className={`settings-button ${isAnimating ? 'animating' : ''}`}
        onClick={toggleDropdown}
        aria-label="切换主题"
        title="切换主题"
        aria-expanded={isOpen}
      >
        <span className="theme-icon" style={{ transition: 'transform 0.3s ease' }}>
          🎨
        </span>
      </button>
      
      {isOpen && (
        <div 
          className={`theme-dropdown theme-${currentTheme}`}
          style={{
            animation: 'dropdownFadeIn 0.3s ease-out forwards',
            opacity: 0,
            transform: 'translateY(-10px)'
          }}
        >
          {THEMES.map(theme => (
            <div
              key={theme.id}
              className={`theme-option ${theme.id === currentTheme ? 'active' : ''}`}
              onClick={() => handleThemeSelect(theme.id)}
              style={{
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div 
                className="theme-color-preview"
                style={{ 
                  backgroundColor: theme.variables['--bg-primary'],
                  borderColor: theme.variables['--accent-color']
                }}
              ></div>
              <span style={{ 
                fontWeight: theme.id === currentTheme ? '500' : 'normal',
                color: theme.id === currentTheme ? theme.variables['--accent-color'] : ''
              }}>
                {theme.displayName}
              </span>
              {theme.id === currentTheme && (
                <span style={{ marginLeft: 'auto', color: theme.variables['--accent-color'] }}>
                  ✅
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 使用 React.memo 缓存组件，避免不必要的渲染
export default memo(ThemeSelector);