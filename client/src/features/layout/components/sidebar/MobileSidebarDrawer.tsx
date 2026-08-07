'use client';

import * as React from 'react';
import { X, Code2 } from 'lucide-react';

interface MobileSidebarDrawerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
}

export const MobileSidebarDrawer = React.memo(function MobileSidebarDrawer({
  isOpen,
  onClose,
  children,
}: MobileSidebarDrawerProps) {
  // Prevent background scrolling when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" aria-modal="true" role="dialog">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in-0 duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-card text-card-foreground shadow-2xl transition-transform animate-in slide-in-from-left duration-300 flex flex-col">
        {/* Mobile Header with Close Trigger */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-xs">
              <Code2 className="h-4 w-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-foreground">
              Code<span className="text-primary">Studio</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="Close navigation sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
});