'use client';

import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { MacOSDock } from '@/components/MacOSDock';
import { SplashScreen } from '@/components/SplashScreen';
import { HeroSection } from '@/components/sections/HeroSection';
import { ScrollAnimationProvider } from '@/context/ScrollAnimationContext';
import { dockApps } from '@/data/dockApps';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLenis } from '@/hooks/useLenis';
import { useLenisScrollTrigger } from '@/hooks/useLenisScrollTrigger';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { scrollToSection } from '@/utils/navigation';

const AboutSection = dynamic(
  () => import('@/components/sections/AboutSection').then((m) => ({ default: m.AboutSection })),
  { ssr: true }
);
const CertificatesSection = dynamic(
  () => import('@/components/sections/CertificatesSection').then((m) => ({ default: m.CertificatesSection })),
  { ssr: true }
);
const ExperienceSection = dynamic(
  () => import('@/components/sections/ExperienceSection').then((m) => ({ default: m.ExperienceSection })),
  { ssr: true }
);
const EducationSection = dynamic(
  () => import('@/components/sections/EducationSection').then((m) => ({ default: m.EducationSection })),
  { ssr: true }
);
const SkillsSection = dynamic(
  () => import('@/components/sections/SkillsSection').then((m) => ({ default: m.SkillsSection })),
  { ssr: true }
);
const ProjectsSection = dynamic(
  () => import('@/components/sections/ProjectsSection').then((m) => ({ default: m.ProjectsSection })),
  { ssr: true }
);
const ContactFooter = dynamic(
  () => import('@/components/sections/ContactFooter').then((m) => ({ default: m.ContactFooter })),
  { ssr: true }
);

export default function PortfolioApp() {
  const [showSplash, setShowSplash] = useState(true);
  const activeSection = useActiveSection();

  useLenis(showSplash);
  useLenisScrollTrigger(!showSplash);
  useScrollReveal(!showSplash);

  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  const handleNavClick = useCallback((appId: string) => {
    scrollToSection(appId);
  }, []);

  const scrollReady = !showSplash;

  return (
    <ScrollAnimationProvider ready={scrollReady}>
      <div
        className="min-h-screen overflow-x-hidden bg-[#050505] text-slate-300 selection:bg-indigo-600 selection:text-white"
        style={{
          fontFamily:
            "var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        <MacOSDock apps={dockApps} onAppClick={handleNavClick} openApps={[activeSection]} />

        <HeroSection />

        <main className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-12">
          <AboutSection />
          <CertificatesSection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
        </main>

        <ContactFooter />
      </div>
    </ScrollAnimationProvider>
  );
}
