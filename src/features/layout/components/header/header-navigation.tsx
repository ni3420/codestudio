'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from './header.types';

interface HeaderNavigationProps {
  readonly items: readonly NavItem[];
}

export const HeaderNavigation = React.memo(function HeaderNavigation({
  items,
}: HeaderNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className={`group relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? 'bg-accent text-foreground font-semibold'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            }`}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />}
            <span>{item.label}</span>

            {item.badge && (
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary border border-primary/20">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
});