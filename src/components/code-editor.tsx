'use client';

import * as React from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { Loader2 } from 'lucide-react';

import { editor } from 'monaco-editor';

export type SupportedLanguage =
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'rust'
  | 'go'
  | 'cpp'
  | 'java'
  | 'json'
  | 'html'
  | 'css';

export interface CodeEditorProps {
  value?: string;
  defaultValue?: string;
  language?: SupportedLanguage;
  theme?: 'vs-dark' | 'light';
  height?: string | number;
  width?: string | number;
  onChange?: (value: string | undefined) => void;
  onMount?: (editor: editor.IStandaloneCodeEditor) => void;
  options?: editor.IStandaloneEditorConstructionOptions;
  disabled?: boolean;
}

export const CodeEditor = ({
  value,
  defaultValue = '',
  language = 'typescript',
  theme,
  height = '100%',
  width = '100%',
  onChange,
  onMount,
  options = {},
  disabled = false,
}: CodeEditorProps) => {
  const { resolvedTheme } = useTheme();

  const editorTheme = theme || (resolvedTheme === 'dark' ? 'vs-dark' : 'light');

  const handleEditorMount: OnMount = (editor) => {
    if (onMount) {
      onMount(editor);
    }
  };

  const handleEditorChange: OnChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-border bg-card">
      <Editor
        height={height}
        width={width}
        language={language}
        theme={editorTheme}
        value={value}
        defaultValue={defaultValue}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        loading={
          <div className="flex h-full w-full items-center justify-center gap-2 bg-card text-muted-foreground text-xs">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span>Loading CodeStudio Editor...</span>
          </div>
        }
        options={{
          readOnly: disabled,
          fontSize: 13,
          fontFamily: 'var(--font-geist-mono), monospace',
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          lineNumbersMinChars: 3,
          padding: { top: 12, bottom: 12 },
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          formatOnPaste: true,
          formatOnType: true,
          ...options,
        }}
      />
    </div>
  );
};

export default CodeEditor;