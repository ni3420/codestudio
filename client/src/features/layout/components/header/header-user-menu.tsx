'use client';

import * as React from 'react';
import { Bell, Command } from 'lucide-react';
import { UserButton,useUser } from '@clerk/nextjs';

export const HeaderUserMenu = React.memo(function HeaderUserMenu() {
const {isSignedIn}=useUser()
  return (
    <div className="flex items-center gap-2">
      {/* Search / Command K Shortcut trigger
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

      
      <button
        type="button"
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-card-foreground hover:bg-accent transition-colors"
        aria-label="View Notifications"
      >
        <Bell className="h-4 w-4 text-muted-foreground" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
      </button> */}

      {/* Profile Avatar Dropdown Placeholder */}
      <div className="relative">
        {!isSignedIn?<>
        <button>
          Login
        </button>
        </>:<>
        <UserButton/>
        </>}
      </div>
    </div>
  );
});