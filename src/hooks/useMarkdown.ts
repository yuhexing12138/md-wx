import { useState, useEffect } from 'react';
import { markdownParser } from '../utils/markdown';

/**
 * Markdown 处理 Hook
 * 用于解析 Markdown 内容并提供解析结果
 */
export const useMarkdown = (initialContent: string = '') => {
  const [content, setContent] = useState<string>(initialContent);
  const [parsedHtml, setParsedHtml] = useState<string>('');

  // 当外部传入的 initialContent 变化时，更新内部状态
  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  // 当内容变化时，重新解析
  useEffect(() => {
    if (content) {
      const html = markdownParser.parseWithCodeStyle(content);
      setParsedHtml(html);
    } else {
      setParsedHtml('');
    }
  }, [content]);

  /**
   * 更新 Markdown 内容
   * @param newContent 新的 Markdown 内容
   */
  const updateContent = (newContent: string) => {
    setContent(newContent);
  };

  return {
    content,
    parsedHtml,
    updateContent
  };
};