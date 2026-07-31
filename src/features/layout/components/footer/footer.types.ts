import * as React from 'react';

export interface FooterLink {
  readonly label: string;
  readonly href: string;
  readonly badge?: string;
  readonly external?: boolean;
}

export interface FooterLinkGroup {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: React.ComponentType<{ className?: string }>;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  readonly showNewsletter?: boolean;
  readonly showStatus?: boolean;
  readonly customGroups?: readonly FooterLinkGroup[];
}