import type { ThemeConfig } from '../types/theme';

/**
 * 主题配置常量
 */
export const THEMES: ThemeConfig[] = [
  {
    id: 'classical',
    name: 'classical',
    displayName: '古典主题',
    description: '暖色调设计，模拟古典书籍的配色风格，适合文化类、历史类内容',
    variables: {
      '--bg-primary': '#f8f5f0',
      '--bg-secondary': '#f0ebe5',
      '--text-primary': '#3a2e25',
      '--text-secondary': '#6b5b4e',
      '--accent-color': '#8b4513',
      '--border-color': '#d4c5b8',
      '--shadow': '0 2px 8px rgba(139, 69, 19, 0.1)',
      '--glass-bg': 'rgba(248, 245, 240, 0.8)',
      '--glass-border': 'rgba(139, 69, 19, 0.2)',
      '--heading-color': '#3a2e25',
      '--code-bg': '#f0ebe5',
      '--blockquote-bg': '#f0ebe5',
      '--blockquote-border': '#d4c5b8'
    }
  },
  {
    id: 'dark',
    name: 'dark',
    displayName: '暗黑主题',
    description: '深色背景搭配红色强调色，适合夜间阅读和专业场景',
    variables: {
      '--bg-primary': '#1a1a1a',
      '--bg-secondary': '#2a2a2a',
      '--text-primary': '#e0e0e0',
      '--text-secondary': '#b0b0b0',
      '--accent-color': '#ff4500',
      '--border-color': '#444444',
      '--shadow': '0 2px 8px rgba(0, 0, 0, 0.3)',
      '--glass-bg': 'rgba(26, 26, 26, 0.8)',
      '--glass-border': 'rgba(255, 69, 0, 0.2)',
      '--heading-color': '#ffffff',
      '--code-bg': '#2d2d2d',
      '--blockquote-bg': 'rgba(255, 255, 255, 0.1)',
      '--blockquote-border': '#ff4500'
    }
  },
  {
    id: 'tech',
    name: 'tech',
    displayName: '科技主题',
    description: '深蓝色背景搭配亮蓝色强调色，科技感十足，适合技术类内容',
    variables: {
      '--bg-primary': '#0a0e27',
      '--bg-secondary': '#1a1f3a',
      '--text-primary': '#ffffff',
      '--text-secondary': '#b0c4de',
      '--accent-color': '#00d4ff',
      '--border-color': '#2a2f4a',
      '--shadow': '0 2px 8px rgba(0, 212, 255, 0.2)',
      '--glass-bg': 'rgba(10, 14, 39, 0.8)',
      '--glass-border': 'rgba(0, 212, 255, 0.2)',
      '--heading-color': '#ffffff',
      '--code-bg': '#1a1f3a',
      '--blockquote-bg': 'rgba(0, 212, 255, 0.1)',
      '--blockquote-border': '#00d4ff'
    }
  },
  {
    id: 'simple',
    name: 'simple',
    displayName: '简约主题',
    description: '纯白背景，简洁明了，突出内容，适合干货类、技术类内容',
    variables: {
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#f5f5f5',
      '--text-primary': '#333333',
      '--text-secondary': '#666666',
      '--accent-color': '#2196f3',
      '--border-color': '#e0e0e0',
      '--shadow': '0 2px 8px rgba(0, 0, 0, 0.1)',
      '--glass-bg': 'rgba(255, 255, 255, 0.8)',
      '--glass-border': 'rgba(33, 150, 243, 0.2)',
      '--heading-color': '#333333',
      '--code-bg': '#f5f5f5',
      '--blockquote-bg': '#f5f5f5',
      '--blockquote-border': '#2196f3'
    }
  },
  {
    id: 'dreamy',
    name: 'dreamy',
    displayName: '梦幻主题',
    description: '淡蓝紫色调，梦幻柔和，适合情感类、生活类内容',
    variables: {
      '--bg-primary': '#f0f4ff',
      '--bg-secondary': '#e6ebff',
      '--text-primary': '#374151',
      '--text-secondary': '#4b5563',
      '--accent-color': '#8b5cf6',
      '--border-color': '#d6daff',
      '--shadow': '0 2px 8px rgba(139, 92, 246, 0.15)',
      '--glass-bg': 'rgba(240, 244, 255, 0.8)',
      '--glass-border': 'rgba(139, 92, 246, 0.2)',
      '--heading-color': '#374151',
      '--code-bg': '#e6ebff',
      '--blockquote-bg': '#e6ebff',
      '--blockquote-border': '#8b5cf6'
    }
  }
];

/**
 * 默认主题 ID
 */
export const DEFAULT_THEME = 'classical';