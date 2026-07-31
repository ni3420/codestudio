'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight,Sparkles } from 'lucide-react';
import { LiveEditorPreview } from './LiveEditorPreview';

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background Glow Overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>CodeStudio v2.0 Released with Real-Time WebSockets</span>
        </div>

        {/* Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Build, compile, and pair program in <span className="text-primary">real time</span>.
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The multi-language cloud IDE engineered for instant user collaboration, shared terminals, and zero-latency pair programming.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/playground"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 active:scale-95"
          >
            Start Coding Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/docs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-card-foreground hover:bg-accent transition-all"
          >
            View Documentation
          </Link>
        </div>

        {/* Metrics Row */}
        <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center border-t border-border/60">
          <div>
            <p className="text-2xl font-bold text-foreground">40+</p>
            <p className="text-xs text-muted-foreground">Languages Supported</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">&lt; 50ms</p>
            <p className="text-xs text-muted-foreground">Sync Latency</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">100%</p>
            <p className="text-xs text-muted-foreground">Browser-Based</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">Unlimited</p>
            <p className="text-xs text-muted-foreground">Live Collaborators</p>
          </div>
        </div>

        {/* Live Preview Component */}
        <div className="pt-6">
          <LiveEditorPreview />
        </div>
      </div>
    </section>
  );
}