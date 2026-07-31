'use client';

import * as React from 'react';
import Link from 'next/link';
import { Code2, Palette, Menu, X } from 'lucide-react';
import { ThemePalettePicker } from '@/features/theme/components/ThemePalettePicker';
import { HeaderProps, NavItem } from './header.types';
import { HeaderNavigation } from './header-navigation';
import { HeaderUserMenu } from './header-user-menu';

const DEFAULT_NAV_ITEMS: readonly NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Playground', href: '/playground', badge: 'New' },
  { label: 'Snippets', href: '/snippets' },
  { label: 'Docs', href: '/docs' },
] as const;

export function Header({
  navItems = DEFAULT_NAV_ITEMS,
  showPalettePicker = true,
  actions,
  className = '',
  ...props
}: HeaderProps) {
  const [showPaletteMenu, setShowPaletteMenu] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const paletteMenuRef = React.useRef<HTMLDivElement>(null);

  // Close palette menu on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (paletteMenuRef.current && !paletteMenuRef.current.contains(event.target as Node)) {
        setShowPaletteMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md transition-colors ${className}`}
      {...props}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="CodeStudio Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="text-base font-bold tracking-tight text-foreground">
              Code<span className="text-primary">Studio</span>
            </span>
          </Link>

          {/* Center Navigation Menu */}
          <HeaderNavigation items={navItems} />
        </div>

        {/* Right: Actions, Theme Picker & Profile */}
        <div className="flex items-center gap-3">
          {actions}

          {/* Theme Palette Dropdown Trigger */}
          {showPalettePicker && (
            <div className="relative" ref={paletteMenuRef}>
              <button
                type="button"
                onClick={() => setShowPaletteMenu((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-card-foreground hover:bg-accent transition-colors"
                aria-label="Toggle Theme & Color Palette Selector"
                aria-expanded={showPaletteMenu}
              >
                <Palette className="h-4 w-4 text-primary" />
              </button>

              {/* Theme Selector Popover */}
              {showPaletteMenu && (
                <div className="absolute right-0 mt-2 z-50 animate-in fade-in-50 zoom-in-95">
                  <ThemePalettePicker />
                </div>
              )}
            </div>
          )}

          <HeaderUserMenu />

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-card-foreground"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Expandable Panel */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-card px-4 pt-2 pb-4 md:hidden space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}