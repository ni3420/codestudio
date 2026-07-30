'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ColorPalette, ThemePaletteContextType } from '@/features/theme/types/theme.types';
import { DEFAULT_PALETTE, PALETTE_STORAGE_KEY, PALETTES } from '@/features/theme/constants/theme.constants';
import { ThemePaletteContext } from '@/features/theme/hooks/useThemePalette';

interface ThemeProviderProps {
  children: React.ReactNode;
}

// 1. External store subscription listeners
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): ColorPalette {
  if (typeof window === 'undefined') return DEFAULT_PALETTE;
  const stored = localStorage.getItem(PALETTE_STORAGE_KEY) as ColorPalette | null;
  if (stored && PALETTES.some((p) => p.id === stored)) {
    return stored;
  }
  return DEFAULT_PALETTE;
}

function getServerSnapshot(): ColorPalette {
  return DEFAULT_PALETTE;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // 2. React 19 idiomatic way to subscribe to localStorage without cascading renders
  const palette = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  
  // 3. Track mount state safely without extra state setters in effects
  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // 4. Pure DOM synchronization effect (No setState calls here at all)
  React.useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette);
  }, [palette]);

  // 5. Update handler that triggers external store updates
  const setPalette = React.useCallback((newPalette: ColorPalette) => {
    localStorage.setItem(PALETTE_STORAGE_KEY, newPalette);
    listeners.forEach((listener) => listener());
  }, []);

  const value = React.useMemo<ThemePaletteContextType>(
    () => ({
      palette: isMounted ? palette : DEFAULT_PALETTE,
      setPalette,
      availablePalettes: PALETTES,
    }),
    [palette, setPalette, isMounted]
  );

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ThemePaletteContext.Provider value={value}>
        {children}
      </ThemePaletteContext.Provider>
    </NextThemesProvider>
  );
}