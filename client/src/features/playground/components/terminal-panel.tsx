'use client';

import * as React from 'react';
import { Terminal, Trash2, AlertCircle, Clock } from 'lucide-react';

interface TerminalPanelProps {
  output: string;
  error?: string | null;
  executionTime?: string | null;
  isExecuting?: boolean;
  onClear?: () => void;
}

export const TerminalPanel = ({
  output,
  error,
  executionTime,
  isExecuting = false,
  onClear,
}: TerminalPanelProps) => {
  return (
    <div className="flex h-full w-full flex-col bg-background text-foreground border-t border-border">
      {/* Terminal Bar Header */}
      <div className="flex h-9 w-full items-center justify-between border-b border-border bg-muted/40 px-4">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span>Output Window</span>
          {executionTime && (
            <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 ml-2">
              <Clock className="h-3 w-3" />
              {executionTime}
            </span>
          )}
        </div>

        {onClear && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <Trash2 className="h-3 w-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Output Console View */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed bg-card">
        {isExecuting && (
          <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>Compiling and executing code...</span>
          </div>
        )}

        {!isExecuting && !output && !error && (
          <p className="text-muted-foreground/60 italic">
            Click &quot;Run Code&quot; to see execution output here...
          </p>
        )}

        {output && (
          <pre className="whitespace-pre-wrap font-mono text-emerald-700 dark:text-emerald-300">
            {output}
          </pre>
        )}

        {error && (
          <div className="mt-2 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <pre className="whitespace-pre-wrap font-mono text-xs">{error}</pre>
          </div>
        )}
      </div>
    </div>
  );
};