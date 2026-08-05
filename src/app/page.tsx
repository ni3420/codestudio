"use client"

import { Header } from '@/features/layout/components/header/header';
import { Footer } from '@/features/layout/components/footer/footer';
import { HeroSection } from '@/features/layout/components/main/HeroSection';
import { FeatureGrid } from '@/features/layout/components/main/FeatureGrid';
import { LanguageSupport } from '@/features/layout/components/main/LanguageSupport';
import { CallToAction } from '@/features/layout/components/main/CallToAction';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/loading-spinner';

export default function LandingPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Only redirect to auth if Clerk is done loading and user is signed out
    if (isLoaded && !isSignedIn) {
      router.push("/auth");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <LoadingSpinner size="lg" text="Loading CodeStudio..." fullScreen />;
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeatureGrid />
        <LanguageSupport />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}