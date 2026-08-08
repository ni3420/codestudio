'use client';

import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  language: string;
  code: string;
  onChange: (value: string | undefined) => void;
}

export const CodeEditor = ({ language, code, onChange }: CodeEditorProps) => {
  return (
    <div className="h-full w-full rounded-xl border border-border overflow-hidden bg-card">
      <Editor
        height="100%"
        theme="vs-dark"
        language={language === 'cpp' ? 'cpp' : language}
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          smoothScrolling: true,
          padding: { top: 12, bottom: 12 },
        }}
      />
    </div>
  );
};