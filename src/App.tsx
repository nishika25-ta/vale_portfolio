import { useCallback, useState } from 'react';
import { MacOSDock } from './components/MacOSDock';
import { SplashScreen } from './components/SplashScreen';
import { AboutSection } from './components/sections/AboutSection';
import { ContactFooter } from './components/sections/ContactFooter';
import { EducationSection } from './components/sections/EducationSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { dockApps } from './data/dockApps';
import { useActiveSection } from './hooks/useActiveSection';
import { useLenis } from './hooks/useLenis';
import { scrollToSection } from './utils/navigation';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const activeSection = useActiveSection();

  useLenis(showSplash);

  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  const handleNavClick = useCallback((appId: string) => {
    scrollToSection(appId);
  }, []);

  return (
    <div
      className="bg-[#050505] text-slate-300 min-h-screen selection:bg-indigo-600 selection:text-white overflow-x-hidden"
      style={{
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <MacOSDock apps={dockApps} onAppClick={handleNavClick} openApps={[activeSection]} />

      <HeroSection onNavigate={handleNavClick} />

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
      </main>

      <ContactFooter />
    </div>
  );
}
