export type ColorPalette =
  | 'indigo'
  | 'violet'
  | 'emerald'
  | 'cyan'
  | 'rose'
  | 'orange'
  | 'slate';

export type Mode = 'light' | 'dark' | 'system';

export interface PaletteConfig {
  id: ColorPalette;
  label: string;
  primaryColor: string; // CSS color string for preview swatch
}

export interface ThemePaletteContextType {
  palette: ColorPalette;
  setPalette: (palette: ColorPalette) => void;
  availablePalettes: readonly PaletteConfig[];
}