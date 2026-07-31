'use client';

import * as React from 'react';
import { Play, Share2,  Terminal,  Check } from 'lucide-react';

export const LiveEditorPreview = React.memo(function LiveEditorPreview() {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'main.tsx' | 'styles.css'>('main.tsx');

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mx-auto max-w-5xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden transition-colors">
      {/* Window Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
        {/* Window Dots & File Tabs */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveTab('main.tsx')}
              className={`rounded-md px-2.5 py-1 font-mono transition-colors ${
                activeTab === 'main.tsx'
                  ? 'bg-background text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              main.tsx
            </button>
            <button
              onClick={() => setActiveTab('styles.css')}
              className={`rounded-md px-2.5 py-1 font-mono transition-colors ${
                activeTab === 'styles.css'
                  ? 'bg-background text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              styles.css
            </button>
          </div>
        </div>

        {/* Live Active Collaborators Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-0.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-foreground">3 Live Users</span>
          </div>

          <div className="flex -space-x-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white ring-2 ring-card">
              NK
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-card">
              SA
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white ring-2 ring-card">
              JD
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex h-7 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-all"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied Link' : 'Invite'}</span>
          </button>
        </div>
      </div>

      {/* Code Canvas Mockup with Simulated Cursors */}
      <div className="relative p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto bg-background/50">
        {/* Collaborative Cursor 1 */}
        <div className="absolute top-10 left-[42%] z-10 flex items-center gap-1 pointer-events-none transition-all animate-pulse">
          <div className="h-4 w-0.5 bg-rose-500" />
          <span className="rounded-md bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
            Sarah (Typing...)
          </span>
        </div>

        {/* Collaborative Cursor 2 */}
        <div className="absolute top-28 left-[65%] z-10 flex items-center gap-1 pointer-events-none">
          <div className="h-4 w-0.5 bg-indigo-500" />
          <span className="rounded-md bg-indigo-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
            Alex
          </span>
        </div>

        {/* Code Content */}
        <pre className="text-foreground">
          <code>
            <span className="text-primary font-bold">import</span> React <span className="text-primary font-bold">from</span> <span className="text-emerald-500">&apos;react&apos;</span>;{'\n'}
            <span className="text-primary font-bold">import</span> &#123; createRoom &#125; <span className="text-primary font-bold">from</span> <span className="text-emerald-500">&apos;@codestudio/collaboration&apos;</span>;{'\n\n'}
            <span className="text-muted-foreground"> Real-time WebSockets synchronization channel</span>{'\n'}
            <span className="text-primary font-bold">export function</span> <span className="text-primary font-semibold">CollaborativeWorkspace</span>() &#123;{'\n'}
            {'  '}<span className="text-primary font-bold">const</span> room = <span className="text-primary font-semibold">useRoom</span>(&apos;project-codestudio-live&apos;);{'\n\n'}
            {'  '}<span className="text-primary font-bold">return</span> ({'\n'}
            {'    '}&lt;<span className="text-primary font-bold">CodeEditor</span>{'\n'}
            {'      '}language=<span className="text-emerald-500">&quot;typescript&quot;</span>{'\n'}
            {'      '}theme=<span className="text-emerald-500">&quot;dynamic-palette&quot;</span>{'\n'}
            {'      '}enableMultiCursor=&#123;<span className="text-amber-500">true</span>&#125;{'\n'}
            {'      '}onCompile=&#123;(output) =&gt; console.log(output)&#125;{'\n'}
            {'    '}/&gt;{'\n'}
            {'  '});{'\n'}
            &#125;
          </code>
        </pre>
      </div>

      {/* Terminal / Execution Console */}
      <div className="border-t border-border bg-card p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 text-primary" />
            <span>Interactive Terminal</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all">
              <Play className="h-3 w-3 fill-current" /> Run Code
            </button>
          </div>
        </div>
        <div className="font-mono text-xs text-muted-foreground bg-background rounded-lg p-2.5 border border-border/60">
          <span className="text-emerald-500">✓ Compiled successfully in 142ms</span>
          <br />
          <span className="text-foreground">[CodeStudio Engine] Listening on ws://localhost:8080 (3 clients connected)</span>
        </div>
      </div>
    </div>
  );
});