'use client';

import * as React from 'react';
import { Bell, Command, User, Settings, LogOut } from 'lucide-react';

export const HeaderUserMenu = React.memo(function HeaderUserMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* Search / Command K Shortcut trigger */}
      <button
        type="button"
        className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground hover:border-primary/50 transition-colors"
        aria-label="Search CodeStudio (⌘K)"
      >
        <Command className="h-3.5 w-3.5" />
        <span className="pr-4">Search...</span>
        <kbd className="pointer-events-none rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      {/* Notifications Button */}
      <button
        type="button"
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-card-foreground hover:bg-accent transition-colors"
        aria-label="View Notifications"
      >
        <Bell className="h-4 w-4 text-muted-foreground" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
      </button>

      {/* Profile Avatar Dropdown Placeholder */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary font-bold text-xs hover:ring-2 hover:ring-ring transition-all"
          aria-label="User Account Menu"
        >
          CS
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-xl text-card-foreground z-50 animate-in fade-in-50 zoom-in-95">
            <div className="px-2 py-1.5 border-b border-border mb-1">
              <p className="text-xs font-semibold">Nitin</p>
              <p className="text-[10px] text-muted-foreground truncate">developer@codestudio.io</p>
            </div>
            <button className="w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground">
              <User className="h-3.5 w-3.5" /> Profile
            </button>
            <button className="w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground">
              <Settings className="h-3.5 w-3.5" /> Account Settings
            </button>
            <div className="my-1 border-t border-border" />
            <button className="w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-destructive hover:bg-destructive/10">
              <LogOut className="h-3.5 w-3.5" /> Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
});