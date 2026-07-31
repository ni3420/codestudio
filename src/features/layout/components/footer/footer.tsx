'use client';

import * as React from 'react';
import Link from 'next/link';
import { Code2,Disc as Discord} from 'lucide-react';
import {FaGithub as Github,FaTwitter as Twitter} from "react-icons/fa"
import { FooterProps, FooterLinkGroup, SocialLink } from './footer.types';
import { FooterColumn } from './footer-column';
import { FooterNewsletter } from './footer-newsletter';

const DEFAULT_LINK_GROUPS: readonly FooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Playground', href: '/playground', badge: 'New' },
      { label: 'Cloud IDE', href: '/ide' },
      { label: 'Snippets', href: '/snippets' },
      { label: 'Templates', href: '/templates' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs/api' },
      { label: 'Community Forum', href: '/community' },
      { label: 'GitHub Repository', href: 'https://github.com', external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About CodeStudio', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
] as const;

const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'Discord', href: 'https://discord.com', icon: Discord },
] as const;

export function Footer({
  showNewsletter = true,
  showStatus = true,
  customGroups = DEFAULT_LINK_GROUPS,
  className = '',
  ...props
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`w-full border-t border-border bg-card text-card-foreground transition-colors ${className}`}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          
          {/* Brand Info Section */}
          <div className="space-y-4 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                Code<span className="text-primary">Studio</span>
              </span>
            </Link>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              An all-in-one cloud workspace built for modern developers to build, test, and ship high-performance web applications faster.
            </p>

            {/* Live Operational Status */}
            {showStatus && (
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>All systems operational</span>
              </div>
            )}
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-5">
            {customGroups.map((group) => (
              <FooterColumn key={group.title} group={group} />
            ))}
          </div>

          {/* Newsletter / Action Box */}
          {showNewsletter && (
            <div className="lg:col-span-3">
              <FooterNewsletter />
            </div>
          )}
        </div>

        {/* Bottom Bar Divider */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} CodeStudio Inc. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  aria-label={`Follow CodeStudio on ${social.label}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}