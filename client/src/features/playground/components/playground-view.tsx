'use client';

import * as React from 'react';
import { PlaygroundHeader } from './playground-header';
import { CodeEditor } from './code-editor';
import { TerminalPanel } from './terminal-panel';
import api from '@/lib/axios';

interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const STARTER_CODE: Record<string, string> = {
  typescript: `// TypeScript Playground\nfunction greet(name: string) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("Developer"));`,
  python: `# Python 3 Playground\ndef greet(name: str) -> str:\n    return f"Hello, {name}!"\n\nprint(greet("Developer"))`,
  cpp: `// C++ Playground\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, Developer!" << std::endl;\n    return 0;\n}`,
};

export const PlaygroundView = () => {
  const [title] = React.useState('My Code Studio');
  const [language, setLanguage] = React.useState('javascript');
  const [code, setCode] = React.useState(STARTER_CODE.javascript);
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isExecuting, setIsExecuting] = React.useState(false);
  const [executionTime, setExecutionTime] = React.useState<string | null>(null);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(STARTER_CODE[newLang] || `// Write your ${newLang} code here`);
    setOutput('');
    setError(null);
  };

  const handleRunCode = async () => {
    try {
      setIsExecuting(true);
      setError(null);
      setOutput('');
      setExecutionTime(null);

      const startTime = Date.now();

      const { data } = await api.post('/', {
        code,
        language,
      });

      const endTime = Date.now();

      setOutput(data.output || 'No output received');
      setExecutionTime(`${endTime - startTime}ms`);
    } catch (err: unknown) {
      const errorObj = err as AxiosErrorResponse;
      setError(
        errorObj.response?.data?.message ||
          errorObj.message ||
          'Something went wrong while executing code'
      );
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background overflow-hidden">
      <PlaygroundHeader
        title={title}
        language={language}
        onLanguageChange={handleLanguageChange}
        onRun={handleRunCode}
        isRunning={isExecuting}
        onReset={() => setCode(STARTER_CODE[language] || '')}
      />

      {/* Editor & Terminal Vertical Split Layout */}
      <div className="flex flex-1 flex-col md:flex-row h-full overflow-hidden">
        {/* Left Side: Code Editor (65% width on desktop) */}
        <div className="flex-1 md:w-[65%] h-1/2 md:h-full border-r border-border">
          <CodeEditor
            language={language}
            code={code}
            onChange={(val) => setCode(val || '')}
          />
        </div>

        {/* Right/Bottom Side: Terminal Panel (35% width on desktop) */}
        <div className="h-1/2 md:h-full md:w-[35%]">
          <TerminalPanel
            output={output}
            error={error}
            executionTime={executionTime}
            isExecuting={isExecuting}
            onClear={() => {
              setOutput('');
              setError(null);
              setExecutionTime(null);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaygroundView;