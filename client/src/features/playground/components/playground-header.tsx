'use client';

import * as React from 'react';
import { Play, Save, RotateCcw, Share2, Sparkles } from 'lucide-react';

interface PlaygroundHeaderProps {
  title: string;
  language: string;
  onLanguageChange: (lang: string) => void;
  onRun: () => void;
  onSave?: () => void;
  onReset?: () => void;
  isRunning?: boolean;
}

const SUPPORTED_LANGUAGES = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'python', label: 'Python 3' },
  { id: 'cpp', label: 'C++' },
  { id: 'c', label: 'C' },
  { id: 'java', label: 'Java' },
  { id: 'go', label: 'Go' },
];

export const PlaygroundHeader = ({
  title,
  language,
  onLanguageChange,
  onRun,
  onSave,
  onReset,
  isRunning = false,
}: PlaygroundHeaderProps) => {
  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-border bg-card px-4 shadow-xs">
      {/* Title & Language Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-semibold text-foreground tracking-tight">{title}</h1>
        </div>
        <div className="h-4 w-[1px] bg-border" />
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="h-8 rounded-lg border border-input bg-background px-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {onReset && (
          <button
            onClick={onReset}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}

        {onSave && (
          <button
            onClick={onSave}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground hover:bg-accent transition-colors"
          >
            <Save className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Save</span>
          </button>
        )}

        <button
          onClick={onRun}
          disabled={isRunning}
          className="flex h-8 items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
        >
          <Play className={`h-3.5 w-3.5 ${isRunning ? 'animate-spin' : 'fill-current'}`} />
          <span>{isRunning ? 'Running...' : 'Run Code'}</span>
        </button>
      </div>
    </header>
  );
};