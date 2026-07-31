import { Header } from '@/features/layout/components/header/header';
import { Footer } from '@/features/layout/components/footer/footer';
import { HeroSection } from '@/features/layout/components/main/HeroSection';
import { FeatureGrid } from '@/features/layout/components/main/FeatureGrid';
import { LanguageSupport } from '@/features/layout/components/main/LanguageSupport';
import { CallToAction } from '@/features/layout/components/main/CallToAction';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
        {/* Sidebar integrated for workspace navigation */}
        
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