'use client';

import * as React from 'react';
import Link from 'next/link';
import { Code2, Sparkles, Terminal, Users2, ShieldCheck } from 'lucide-react';
import { SignInCard } from '@/features/auth/components/signInCard';
import { SignUpCard } from '@/features/auth/components/signUpCard';
import { useUser } from '@clerk/nextjs';
import {useRouter} from "next/navigation"
export default function AuthPage() {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const { isLoaded, isSignedIn } = useUser();
    const router = useRouter();
  React.useEffect(() => {
      if (isLoaded && isSignedIn) {
        router.push("/");
      }
    }, [isLoaded, isSignedIn, router]);
  

  return (
    <div className="relative flex min-h-screen w-full bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="grid w-full grid-cols-1 lg:grid-cols-12 min-h-screen">
        <div className="relative hidden lg:col-span-6 lg:flex flex-col justify-between border-r border-border/60 bg-muted/20 p-12 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />

          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Code<span className="text-primary">Studio</span>
              </span>
            </Link>
          </div>

          <div className="relative z-10 max-w-lg space-y-8 my-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Real-time Pair Programming Workspace</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-[1.15]">
                Code together, anywhere in <span className="text-primary">real time</span>.
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empower your software engineering team with instant multi-language code compilation, shared terminal instances, and live multi-cursor pair programming.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-3.5 backdrop-blur-xs">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Users2 className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-foreground">Multi-Cursor Sync</h2>
                  <p className="text-[11px] text-muted-foreground">Sub-50ms live pair editing</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-3.5 backdrop-blur-xs">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Terminal className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-foreground">Shared Terminal</h2>
                  <p className="text-[11px] text-muted-foreground">Collaborative execution</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Encrypted WebSockets & Enterprise RBAC Security</span>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-6 flex flex-col justify-between p-6 sm:p-12">
          <div className="flex items-center justify-between lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Code<span className="text-primary">Studio</span>
              </span>
            </Link>
          </div>

          <div className="my-auto flex w-full items-center justify-center">
            <div className="w-full max-w-sm transition-all duration-300">
              {!isSignUp ? (
                <SignInCard onSignUpClick={() => setIsSignUp(true)} />
              ) : (
                <SignUpCard onSignInClick={() => setIsSignUp(false)} />
              )}
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>
              By signing in, you agree to CodeStudio&apos;s{' '}
              <a href="#" className="underline hover:text-foreground">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="underline hover:text-foreground">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}