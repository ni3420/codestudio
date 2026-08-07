'use client';

import * as React from 'react';
import { Users2, Terminal, Cpu, Globe2, ShieldCheck, Palette } from 'lucide-react';

const FEATURES = [
  {
    icon: Users2,
    title: 'Multi-User Pair Programming',
    description: 'Share a live room link and code synchronously with live color-coded cursors, selections, and audio calls.',
  },
  {
    icon: Cpu,
    title: 'Multi-Language Compilation',
    description: 'Compile and execute Python, TypeScript, C++, Rust, Go, Java, and 35+ other runtimes instantly in isolated sandboxes.',
  },
  {
    icon: Terminal,
    title: 'Shared Interactive Terminal',
    description: 'Grant team members access to a shared terminal instance to debug, run test suites, and manage dependencies together.',
  },
  {
    icon: Palette,
    title: 'Dynamic Accent Themes',
    description: 'Tailor your workspace with dark mode support alongside dynamic accent color palettes tailored for high focus.',
  },
  {
    icon: Globe2,
    title: 'Instant Web Embeds',
    description: 'Embed interactive live code snippets into your documentation or blog with one click.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise RBAC & Security',
    description: 'Control read, edit, and execution permissions per user with strict role-based authorization.',
  },
] as const;

export function FeatureGrid() {
  return (
    <section className="py-20 bg-muted/30 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
            Engineered for Speed
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Everything you need for seamless pair programming
          </h3>
          <p className="text-sm text-muted-foreground">
            Eliminate context switching and environment setup friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-base font-semibold text-card-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}