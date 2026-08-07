'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarNavGroup } from './Sidebar.types';

interface SidebarNavProps {
  readonly groups: readonly SidebarNavGroup[];
  readonly isCollapsed: boolean;
}

export const SidebarNav = React.memo(function SidebarNav({
  groups,
  isCollapsed,
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {groups.map((group, groupIdx) => (
        <div key={groupIdx} className="space-y-1.5">
          {group.title && !isCollapsed && (
            <h3 className="px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {group.title}
            </h3>
          )}
          <nav className="space-y-1">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}

                  {!isCollapsed && item.badge && (
                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary border border-primary/20">
                      {item.badge}
                    </span>
                  )}

                  {!isCollapsed && item.shortcut && (
                    <kbd className="pointer-events-none rounded border border-border bg-muted px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground">
                      {item.shortcut}
                    </kbd>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );
});