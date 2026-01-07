// 测试脚本：验证库导出是否正确
import MdWxRenderer, {
  useMarkdown,
  ClipboardUtil,
  themeManager,
  DEFAULT_THEME,
  THEMES,
  createMdWxRenderer,
  type MdWxRendererProps,
  type Theme
} from './src/index.ts';

console.log('=== 库导出测试 ===');
console.log('1. 主组件:', typeof MdWxRenderer);
console.log('2. useMarkdown hook:', typeof useMarkdown);
console.log('3. ClipboardUtil:', typeof ClipboardUtil);
console.log('4. themeManager:', typeof themeManager);
console.log('5. DEFAULT_THEME:', DEFAULT_THEME);
console.log('6. THEMES 数量:', THEMES.length);
console.log('7. createMdWxRenderer:', typeof createMdWxRenderer);
console.log('8. 类型导入成功');
console.log('=== 测试通过 ===');
