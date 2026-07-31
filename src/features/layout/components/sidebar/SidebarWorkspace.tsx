'use client';

import * as React from 'react';
import { ChevronsUpDown, Plus, Code2 } from 'lucide-react';
import { Workspace } from './Sidebar.types';

interface SidebarWorkspaceProps {
  readonly currentWorkspace: Workspace;
  readonly isCollapsed: boolean;
}

export const SidebarWorkspace = React.memo(function SidebarWorkspace({
  currentWorkspace,
  isCollapsed,
}: SidebarWorkspaceProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-xl border border-border bg-card p-2 text-left hover:bg-accent transition-colors ${
          isCollapsed ? 'justify-center p-2' : ''
        }`}
        aria-label="Select Workspace"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs shadow-xs">
            {currentWorkspace.avatar}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-foreground truncate">
                {currentWorkspace.name}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                {currentWorkspace.plan}
              </span>
            </div>
          )}
        </div>
        {!isCollapsed && <ChevronsUpDown className="h-4 w-4 text-muted-foreground shrink-0" />}
      </button>

      {/* Workspace Dropdown */}
      {isOpen && !isCollapsed && (
        <div className="absolute top-full left-0 mt-1.5 w-full rounded-xl border border-border bg-card p-1.5 shadow-xl z-50 animate-in fade-in-50 zoom-in-95">
          <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase">
            Workspaces
          </div>
          <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs font-medium text-foreground bg-accent">
            <span className="truncate">{currentWorkspace.name}</span>
            <span className="h-2 w-2 rounded-full bg-primary" />
          </button>
          <div className="my-1 border-t border-border" />
          <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Plus className="h-3.5 w-3.5" />
            <span>Create New Workspace</span>
          </button>
        </div>
      )}
    </div>
  );
});