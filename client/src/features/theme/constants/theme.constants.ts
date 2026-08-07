import { PaletteConfig, ColorPalette } from '../types/theme.types';

export const DEFAULT_PALETTE: ColorPalette = 'indigo';
export const PALETTE_STORAGE_KEY = 'app-theme-palette';

export const PALETTES: readonly PaletteConfig[] = [
  { id: 'indigo', label: 'Indigo', primaryColor: 'hsl(239 84% 67%)' },
  { id: 'violet', label: 'Violet', primaryColor: 'hsl(263 70% 50%)' },
  { id: 'emerald', label: 'Emerald', primaryColor: 'hsl(160 84% 39%)' },
  { id: 'cyan', label: 'Cyan', primaryColor: 'hsl(189 94% 43%)' },
  { id: 'rose', label: 'Rose', primaryColor: 'hsl(346 87% 53%)' },
  { id: 'orange', label: 'Orange', primaryColor: 'hsl(24 95% 53%)' },
  { id: 'slate', label: 'Slate', primaryColor: 'hsl(215 16% 47%)' },
] as const;