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
import {api} from "@/lib/convex"
import { useMutation } from 'convex/react';
export default function LandingPage() {
  const { isLoaded, isSignedIn,user } = useUser();
  const router = useRouter();
  const syncUser=useMutation(api.user.CreateUser)

  
useEffect(() => {
    // 1. Redirect if auth state is resolved and user is signed out
    if (isLoaded && !isSignedIn) {
      router.push("/auth");
      return;
    }

    if (user) {
      const init = async () => {
        try {
         await syncUser({
            Id:user.id,
            email: user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress || "",
            name: user.fullName || user.username || "",
          });
          
        } catch (error) {
          console.error("Failed to sync user to Convex:", error);
        }
      };

      init();
    }
  }, [isLoaded, isSignedIn, user, router, syncUser]);

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