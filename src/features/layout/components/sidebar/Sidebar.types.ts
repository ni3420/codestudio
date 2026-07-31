import * as React from 'react';

export interface SidebarNavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly badge?: string;
  readonly shortcut?: string;
}

export interface SidebarNavGroup {
  readonly title?: string;
  readonly items: readonly SidebarNavItem[];
}

export interface Workspace {
  readonly id: string;
  readonly name: string;
  readonly plan: string;
  readonly avatar: string;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  readonly isOpenMobile?: boolean;
  readonly onCloseMobile?: () => void;
  readonly workspaces?: readonly Workspace[];
}