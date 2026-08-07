'use client';

import * as React from 'react';

const LANGUAGES = [
  { name: 'TypeScript', version: 'v5.4', color: 'bg-blue-500' },
  { name: 'Python', version: 'v3.12', color: 'bg-amber-500' },
  { name: 'Rust', version: 'v1.77', color: 'bg-orange-600' },
  { name: 'Go', version: 'v1.22', color: 'bg-cyan-500' },
  { name: 'C++', version: 'GCC 13', color: 'bg-indigo-600' },
  { name: 'Java', version: 'JDK 21', color: 'bg-red-500' },
  { name: 'PHP', version: 'v8.3', color: 'bg-violet-500' },
  { name: 'Ruby', version: 'v3.3', color: 'bg-rose-600' },
] as const;

export function LanguageSupport() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
            Universal Runtimes
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-foreground">
            Supported Languages & Frameworks
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {LANGUAGES.map((lang) => (
            <div
              key={lang.name}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${lang.color}`} />
                <span className="text-sm font-semibold text-foreground">{lang.name}</span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">{lang.version}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}