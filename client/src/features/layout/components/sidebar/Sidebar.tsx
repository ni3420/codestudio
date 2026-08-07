'use client';

import * as React from 'react';
import {
  Code2,
  FolderKanban,
  Terminal,
  Share2,
  Users,
  Settings,
  BookOpen,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Menu,
} from 'lucide-react';
import { SidebarProps, SidebarNavGroup, Workspace } from './Sidebar.types';
import { SidebarWorkspace } from './SidebarWorkspace';
import { SidebarNav } from './SidebarNav';
import { MobileSidebarDrawer } from './MobileSidebarDrawer';

const DEFAULT_WORKSPACE: Workspace = {
  id: 'ws-1',
  name: 'CodeStudio Team',
  plan: 'Pro Plan',
  avatar: 'CS',
};

const SIDEBAR_GROUPS: readonly SidebarNavGroup[] = [
  {
    title: 'Workspace',
    items: [
      { label: 'Projects', href: '/projects', icon: FolderKanban, shortcut: '⌘P' },
      { label: 'Cloud IDE', href: '/ide', icon: Code2, badge: 'Live' },
      { label: 'Shared Terminal', href: '/terminal', icon: Terminal },
      { label: 'Collaboration Rooms', href: '/rooms', icon: Users, badge: '3' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Code Snippets', href: '/snippets', icon: Share2 },
      { label: 'Documentation', href: '/docs', icon: BookOpen },
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
] as const;

export function Sidebar({ className = '', ...props }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Floating Toggle Button (Appears only on mobile/tablet) */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-4 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg lg:hidden hover:scale-105 active:scale-95 transition-all"
        aria-label="Open Navigation Sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay Drawer */}
      <MobileSidebarDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
        <div className="p-3 border-b border-border">
          <SidebarWorkspace currentWorkspace={DEFAULT_WORKSPACE} isCollapsed={false} />
        </div>
        <div className="p-3">
          <SidebarNav groups={SIDEBAR_GROUPS} isCollapsed={false} />
        </div>
        <div className="m-3 rounded-xl border border-primary/20 bg-primary/5 p-3 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Real-Time Active</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            3 team members currently active in your workspace room.
          </p>
        </div>
      </MobileSidebarDrawer>

      {/* Desktop Sticky/Inline Sidebar (Hidden on small screens, flex on large) */}
      <aside
        className={`hidden lg:flex relative flex-col border-r border-border bg-card text-card-foreground transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${className}`}
        {...props}
      >
        {/* Desktop Brand Header & Collapse Control */}
        <div className="flex h-16 items-center justify-between border-b border-border px-3.5">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
                <Code2 className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground">
                Code<span className="text-primary">Studio</span>
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground transition-colors mx-auto"
            aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        {/* Workspace Switcher */}
        <div className="p-3 border-b border-border">
          <SidebarWorkspace currentWorkspace={DEFAULT_WORKSPACE} isCollapsed={isCollapsed} />
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3">
          <SidebarNav groups={SIDEBAR_GROUPS} isCollapsed={isCollapsed} />
        </div>

        {/* Active Collaboration Banner */}
        {!isCollapsed && (
          <div className="m-3 rounded-xl border border-primary/20 bg-primary/5 p-3 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Real-Time Active</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              3 team members currently active in your workspace room.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}