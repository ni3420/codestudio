'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Code2 } from 'lucide-react';

export function CallToAction() {
  return (
    <section className="py-20 border-t border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-primary/30 bg-primary/5 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <Code2 className="h-6 w-6" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Ready to code together in real time?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Start building instantly with CodeStudio. No installation or complex setup required.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-95"
            >
              Launch Playground Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}