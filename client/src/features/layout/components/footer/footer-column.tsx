'use client';

import * as React from 'react';
import Link from 'next/link';
import { FooterLinkGroup } from './footer.types';

interface FooterColumnProps {
  readonly group: FooterLinkGroup;
}

export const FooterColumn = React.memo(function FooterColumn({ group }: FooterColumnProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
        {group.title}
      </h3>
      <ul className="space-y-2 text-xs">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary border border-primary/20">
                  {link.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});