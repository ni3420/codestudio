import * as React from 'react';

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon?: React.ComponentType<{ className?: string }>;
  readonly badge?: string;
  readonly external?: boolean;
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  readonly navItems?: readonly NavItem[];
  readonly showSearch?: boolean;
  readonly showNotifications?: boolean;
  readonly showPalettePicker?: boolean;
  readonly actions?: React.ReactNode;
}