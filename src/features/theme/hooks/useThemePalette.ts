'use client';

import { createContext, useContext } from 'react';
import { ThemePaletteContextType } from '../types/theme.types';

export const ThemePaletteContext = createContext<ThemePaletteContextType | undefined>(undefined);

export function useThemePalette(): ThemePaletteContextType {
  const context = useContext(ThemePaletteContext);
  if (!context) {
    throw new Error('useThemePalette must be used within a ThemeProvider');
  }
  return context;
}