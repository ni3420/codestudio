'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Check, Moon, Palette, Sun, Monitor } from 'lucide-react';
import { useThemePalette } from '../hooks/useThemePalette';
import { ColorPalette } from '../types/theme.types';

const emptySubscribe = () => () => {};
function useIsMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function ThemePalettePicker() {
  const { theme, setTheme } = useTheme();
  const { palette, setPalette, availablePalettes } = useThemePalette();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return (
      <div 
        className="w-80 h-[268px] rounded-xl border border-border bg-card p-4 animate-pulse" 
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="w-80 rounded-xl border border-border bg-card p-4 shadow-lg text-card-foreground">
      {/* Mode Selector */}
      <div className="mb-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
          Appearance
        </label>
        <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-muted p-1">
          {[
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'system', label: 'System', icon: Monitor },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = theme === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTheme(item.id)}
                className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label={`Set ${item.label} theme`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Palette Selector */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
          <Palette className="h-3.5 w-3.5" /> Accent Palette
        </label>
        <div className="grid grid-cols-1 gap-1">
          {availablePalettes.map((p) => {
            const isSelected = palette === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPalette(p.id as ColorPalette)}
                className={`flex items-center justify-between rounded-md px-2.5 py-2 text-sm transition-colors ${
                  isSelected
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-4 w-4 rounded-full border border-black/10 dark:border-white/10 shrink-0"
                    style={{ backgroundColor: p.primaryColor }}
                  />
                  <span>{p.label}</span>
                </div>
                {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}