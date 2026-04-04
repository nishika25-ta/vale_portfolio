import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
    Home, 
    User, 
    TerminalSquare, 
    FolderOpen, 
    Mail, 
    FileText,
    Brain,
    Database,
    ArrowRight,
    Sparkles,
    GraduationCap,
    ChevronLeft,
    ChevronRight,
    Moon,
    Palmtree,
    Waves,
    Maximize2,
    MessageCircle,
    Github,
    Linkedin,
    Award,
    Calendar,
    Cpu,
    Globe,
    Framer,
    Shield,
    Zap,
    Coffee,
    Map,
    BarChart3,
    Search,
    Layout
} from 'lucide-react';

/**
 * WEB DESIGNER GEMS ARCHITECTURAL UPDATE:
 * 1. Expanded Archive: Added 7 more projects (Total 10) with relevant technical themes.
 * 2. Rectangular Proportions: Adjusted card height/width ratios for a sleeker "letterbox" look.
 * 3. 3-Column Grid: Maintained the professional triple-column layout on desktop.
 * 4. Cinematic Noir: High-contrast split-card style optimized for dark mode.
 */

// ==========================================
// 1. MAC OS DOCK COMPONENT
// ==========================================
const MacOSDock = ({ apps, onAppClick, openApps = [], className = '' }) => {
  const [mouseX, setMouseX] = useState(null);
  const [currentScales, setCurrentScales] = useState(apps.map(() => 1));
  const [currentPositions, setCurrentPositions] = useState([]);
  const dockRef = useRef(null);
  const iconRefs = useRef([]);
  const animationFrameRef = useRef(undefined);
  const lastMouseMoveTime = useRef(0);

  const getResponsiveConfig = useCallback(() => {
    if (typeof window === 'undefined') return { baseIconSize: 40, maxScale: 1.6, effectWidth: 200 };
    const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
    if (smallerDimension < 480) return { baseIconSize: 32, maxScale: 1.4, effectWidth: 150 };
    if (smallerDimension < 768) return { baseIconSize: 36, maxScale: 1.5, effectWidth: 180 };
    return { baseIconSize: 42, maxScale: 1.65, effectWidth: 220 };
  }, []);

  const [config, setConfig] = useState(getResponsiveConfig);
  const { baseIconSize, maxScale, effectWidth } = config;
  const minScale = 1.0;
  const baseSpacing = 10;

  useEffect(() => {
    const handleResize = () => setConfig(getResponsiveConfig());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsiveConfig]);

  const calculateTargetMagnification = useCallback((mousePosition) => {
    if (mousePosition === null) return apps.map(() => minScale);
    return apps.map((_, index) => {
      const normalIconCenter = (index * (baseIconSize + baseSpacing)) + (baseIconSize / 2);
      const minX = mousePosition - (effectWidth / 2);
      const maxX = mousePosition + (effectWidth / 2);
      if (normalIconCenter < minX || normalIconCenter > maxX) return minScale;
      const theta = ((normalIconCenter - minX) / effectWidth) * 2 * Math.PI;
      const cappedTheta = Math.min(Math.max(theta, 0), 2 * Math.PI);
      const scaleFactor = (1 - Math.cos(cappedTheta)) / 2;
      return minScale + (scaleFactor * (maxScale - minScale));
    });
  }, [apps, baseIconSize, baseSpacing, effectWidth, maxScale, minScale]);

  const calculatePositions = useCallback((scales) => {
    let currentX = 0;
    return scales.map((scale) => {
      const scaledWidth = baseIconSize * scale;
      const centerX = currentX + (scaledWidth / 2);
      currentX += scaledWidth + baseSpacing;
      return centerX;
    });
  }, [baseIconSize, baseSpacing]);

  useEffect(() => {
    const initialScales = apps.map(() => minScale);
    setCurrentScales(initialScales);
    setCurrentPositions(calculatePositions(initialScales));
  }, [apps, calculatePositions, minScale, config]);

  const animateToTarget = useCallback(() => {
    const targetScales = calculateTargetMagnification(mouseX);
    const targetPositions = calculatePositions(targetScales);
    const lerpFactor = mouseX !== null ? 0.22 : 0.12;
    setCurrentScales(prev => prev.map((curr, i) => curr + ((targetScales[i] - curr) * lerpFactor)));
    setCurrentPositions(prev => prev.map((curr, i) => curr + ((targetPositions[i] - curr) * lerpFactor)));
    const needsUpdate = currentScales.some((s, i) => Math.abs(s - targetScales[i]) > 0.002) || currentPositions.some((p, i) => Math.abs(p - targetPositions[i]) > 0.1);
    if (needsUpdate || mouseX !== null) animationFrameRef.current = requestAnimationFrame(animateToTarget);
  }, [mouseX, calculateTargetMagnification, calculatePositions, currentScales, currentPositions]);

  useEffect(() => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(animateToTarget);
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, [animateToTarget]);

  const handleMouseMove = useCallback((e) => {
    const now = performance.now();
    if (now - lastMouseMoveTime.current < 16) return;
    lastMouseMoveTime.current = now;
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left - 16);
    }
  }, []);

  const handleAppClick = (appId, index) => {
    if (iconRefs.current[index]) {
      const el = iconRefs.current[index];
      el.style.transition = 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)';
      el.style.transform = `translateY(-12px)`;
      setTimeout(() => {
        el.style.transition = 'transform 0.4s cubic-bezier(0.5, 2, 0.5, 1)';
        el.style.transform = 'translateY(0px)';
      }, 200);
    }
    onAppClick(appId);
  };

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 ${className}`}>
      <div 
        ref={dockRef}
        className="backdrop-blur-2xl transition-all duration-300 ease-out flex items-center justify-center"
        style={{
          width: `${(currentPositions.length > 0 ? Math.max(...currentPositions.map((pos, i) => pos + (baseIconSize * currentScales[i]) / 2)) : (apps.length * (baseIconSize + baseSpacing)) - baseSpacing) + 32}px`,
          background: 'rgba(12, 12, 12, 0.9)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.03)',
          padding: `10px 16px`,
          height: `${baseIconSize + 20}px`
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouseX(null)}
      >
        <div className="relative w-full flex items-end" style={{ height: `${baseIconSize}px` }}>
          {apps.map((app, index) => {
            const scale = currentScales[index];
            const position = currentPositions[index] || 0;
            const scaledSize = baseIconSize * scale;
            return (
              <div
                key={app.id}
                ref={(el) => { iconRefs.current[index] = el; }}
                className="absolute cursor-pointer flex flex-col items-center justify-center group"
                onClick={() => handleAppClick(app.id, index)}
                style={{
                  left: `${position - scaledSize / 2}px`,
                  bottom: '1px',
                  width: `${scaledSize}px`,
                  height: `${scaledSize}px`,
                  transformOrigin: 'bottom center',
                  zIndex: Math.round(scale * 10)
                }}
              >
                <div className="absolute -top-12 bg-white text-black text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.2 rounded-md opacity-0 group-hover:opacity-100 transition-all transform -translate-y-1 group-hover:translate-y-0 shadow-xl pointer-events-none whitespace-nowrap">{app.name}</div>
                <div className={`flex items-center justify-center w-full h-full transition-colors ${app.isDivider ? 'opacity-20' : 'text-white/60 group-hover:text-white'}`}>
                    {React.cloneElement(app.icon, { size: scaledSize * 0.58, strokeWidth: app.isDivider ? 1 : 2 })}
                </div>
                {openApps.includes(app.id) && !app.isDivider && (
                  <div className="absolute bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.7)]" style={{ bottom: `-${Math.max(3, scaledSize * 0.1)}px`, width: '2.5px', height: '2.5px' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SplashScreen = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 2200);
    const t3 = setTimeout(() => setStage(3), 2600);
    const t4 = setTimeout(onComplete, 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 transition-transform duration-[800ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${stage === 3 ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="overflow-hidden mb-8 px-4 text-center">
            <h1 className={`text-xl md:text-3xl lg:text-5xl font-mono font-semibold text-slate-300 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${stage >= 1 && stage < 2 ? 'translate-y-0' : 'translate-y-[120%]'}`}>
                <span className="text-indigo-500">import</span> {'{'} <span className="text-white">Valentine</span> {'}'} <span className="text-indigo-500">from</span> <span className="text-emerald-400">'./future'</span>;
            </h1>
        </div>
        <div className={`w-48 md:w-64 h-1 bg-slate-800 rounded-full overflow-hidden transition-opacity duration-500 ${stage >= 1 && stage < 2 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="h-full bg-indigo-600 transition-all duration-[2000ms] ease-out" style={{ width: stage >= 1 ? '100%' : '0%' }} />
        </div>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showSplash, setShowSplash] = useState(true);
  const [activeShowcase, setActiveShowcase] = useState(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@studio-freight/lenis@1.0.39/dist/lenis.min.js';
    script.async = true;
    document.body.appendChild(script);
    let lenisInstance = null;
    let rafId = null;
    script.onload = () => {
        lenisInstance = new window.Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), direction: 'vertical', smooth: true, infinite: false });
        window.lenis = lenisInstance;
        lenisInstance.stop();

        const parallaxElements = document.querySelectorAll('.parallax-element');
        const parallaxImages = document.querySelectorAll('.parallax-image-inner');

        function raf(time) {
            lenisInstance.raf(time);
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed') || '0');
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });

            parallaxImages.forEach(img => {
                const speed = parseFloat(img.getAttribute('data-speed-inner') || '0.1');
                img.style.transform = `translateY(${scrollY * speed}px) scale(1.1)`;
            });

            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
    };
    return () => {
        if (rafId) cancelAnimationFrame(rafId);
        if (lenisInstance) lenisInstance.destroy();
        if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  useEffect(() => { if (window.lenis && !showSplash) window.lenis.start(); }, [showSplash]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { threshold: 0.4 });
    document.querySelectorAll('section, footer').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (appId) => {
    if (appId === 'resume') { window.open('Valentine_Resume_2026.pdf', '_blank'); return; }
    const element = document.getElementById(appId);
    if (element) {
        if (window.lenis) window.lenis.scrollTo(element, { offset: -60 });
        else window.scrollTo({ top: element.offsetTop - 60, behavior: 'smooth' });
    }
  };

  const dockApps = [
    { id: 'home', name: 'Home', icon: <Home /> },
    { id: 'about', name: 'About Me', icon: <User /> },
    { id: 'education', name: 'Education', icon: <GraduationCap /> },
    { id: 'projects', name: 'Work', icon: <FolderOpen /> },
    { id: 'skills', name: 'Skills', icon: <TerminalSquare /> },
    { id: 'contact', name: 'Contact', icon: <Mail /> },
    { id: 'divider', name: '', icon: <div className="w-px h-full bg-white/20 mx-1.5" />, isDivider: true },
    { id: 'resume', name: 'Resume', icon: <FileText /> },
  ];

  const showcaseData = [
    { id: "sc-1", category: "AI & COMPUTER VISION", title: "Oil Palm Object Detection", desc: "Deep learning system for automated agricultural monitoring achieving 92% accuracy.", tags: ["Python", "YOLOv8", "OpenCV"], videoUrl: "https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-keyboard-5264/1080p.mp4", thumb: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=400&auto=format&fit=crop" },
    { id: "sc-2", category: "MOBILE APP DEVELOPMENT", title: "Ultra Dim App", desc: "Flutter application designed to reduce screen brightness for night driving safety.", tags: ["Flutter", "Dart", "UX Design"], videoUrl: "https://cdn.coverr.co/videos/coverr-using-a-mobile-phone-4143/1080p.mp4", thumb: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop" },
    { id: "sc-3", category: "AR / VR INTERFACE", title: "UNIMAS Navigator", desc: "Mobile AR navigation app integrating Flutter and Unity for campus wayfinding.", tags: ["Unity", "C#", "ARCore"], videoUrl: "https://cdn.coverr.co/videos/coverr-virtual-reality-headset-2-4048/1080p.mp4", thumb: "https://images.unsplash.com/photo-1617802690992-15d93263ca00?q=80&w=400&auto=format&fit=crop" }
  ];

  const archiveData = [
    {
      id: "archive-1",
      tagline: "AUTOMATED OIL PALM DETECTION",
      title: "AI/ML Palm Tree Detection",
      desc: "Deep learning system for automated agricultural monitoring using YOLOv8 models.",
      logo: <Palmtree size={54} className="text-emerald-500" />
    },
    {
      id: "archive-2",
      tagline: "ULTRA DIMMER APP",
      title: "Ultra Dim",
      desc: "Specialized Flutter app for night driving safety and OS limit bypassing.",
      logo: <Moon size={54} className="text-indigo-400 fill-indigo-400" />
    },
    {
      id: "archive-3",
      tagline: "PARADISE BEACH RESORT",
      title: "Trombol Paradise Beach",
      desc: "A boutique resort booking experience designed for modern mobile users.",
      logo: <Waves size={54} className="text-blue-400" />
    },
    {
      id: "archive-4",
      tagline: "ZENARA JAYA ATS",
      title: "Recruitment Automation",
      desc: "Scalable SaaS for recruitment workflow with AI-powered resume parsing.",
      logo: <Search size={54} className="text-purple-400" />
    },
    {
      id: "archive-5",
      tagline: "COGNITIVE RESEARCH TOOL",
      title: "Neuro-Data Dashboard",
      desc: "Visualization dashboard for psychology experiments and data analysis.",
      logo: <Brain size={54} className="text-pink-400" />
    },
    {
      id: "archive-6",
      tagline: "SARAWAK HERITAGE MAP",
      title: "Cultural Wayfinder",
      desc: "Interactive QGIS-based map for preserving local cultural landmarks.",
      logo: <Map size={54} className="text-orange-400" />
    },
    {
      id: "archive-7",
      tagline: "DASH COFFEE BACKEND",
      title: "POS Microservice",
      desc: "FastAPI powered backend for real-time order and inventory management.",
      logo: <Coffee size={54} className="text-amber-600" />
    },
    {
      id: "archive-8",
      tagline: "SECURE IDENTITY",
      title: "Auth Sentinel",
      desc: "Custom Firebase authentication layer with multi-role access control.",
      logo: <Shield size={54} className="text-cyan-400" />
    },
    {
      id: "archive-9",
      tagline: "REAL-TIME LOGISTICS",
      title: "Fleet Tracker",
      desc: "Live GPS tracking and fleet optimization engine built with Dart.",
      logo: <Zap size={54} className="text-yellow-400" />
    },
    {
      id: "archive-10",
      tagline: "ENTERPRISE ERP",
      title: "Business Core 360",
      desc: "Full-stack ERP system for small to medium Sarawak-based businesses.",
      logo: <Layout size={54} className="text-slate-400" />
    }
  ];

  return (
    <div className="bg-[#050505] text-slate-300 min-h-screen selection:bg-indigo-600 selection:text-white overflow-x-hidden" 
         style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      
      <style>{`
        h1, h2, h3, h4 { letter-spacing: -0.022em; color: white; }
        p { letter-spacing: -0.011em; }
        .hero-stars { background-image: radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 40px); background-size: 550px 550px; }
        .grid-overlay { background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 40px 40px; }
        .academic-sigil { mask-image: linear-gradient(to bottom, black, transparent); opacity: 0.05; transition: opacity 0.5s ease; }
        .timeline-card:hover .academic-sigil { opacity: 0.15; }
        .skill-pill { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .skill-pill:hover { transform: translateY(-2px); }
        .tech-mesh { background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 16px 16px; }
      `}</style>

      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <MacOSDock apps={dockApps} onAppClick={handleNavClick} openApps={[activeSection]} />

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden text-center">
          <div className="absolute inset-0 grid-overlay pointer-events-none"></div>
          <div className="absolute inset-0 hero-stars pointer-events-none opacity-40 animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center max-w-4xl px-6 parallax-element" data-speed="0.05">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-12 shadow-2xl backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  Available for work
              </div>
              <p className="text-slate-400 font-mono text-xs md:text-sm uppercase tracking-[0.4em] mb-4 opacity-80">Hello, I'm</p>
              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tighter text-white mb-8 leading-none">
                  Valentine <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">Agam</span>
              </h1>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mb-8"></div>
              <p className="text-slate-300 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-12">
                  Crafting beautiful, functional digital experiences that blend cutting-edge technology with elegant design.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
                  <button onClick={() => handleNavClick('projects')} className="group flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1 transition-all duration-300">
                      View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => handleNavClick('about')} className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300">About Me</button>
              </div>
              <div className="w-full max-w-[550px] mx-auto group">
                  <div className="w-full bg-[#0d1117]/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500">
                      <div className="flex items-center px-4 py-3 bg-[#161b22]/90 border-b border-white/5">
                          <div className="flex gap-2">
                              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                          </div>
                          <div className="mx-auto flex items-center gap-2 text-slate-500 text-xs font-mono font-medium">
                              <TerminalSquare size={14} /> main.py — YOLOv8
                          </div>
                      </div>
                      <div className="p-6 text-left font-mono text-[12px] md:text-sm leading-relaxed overflow-x-auto text-slate-300">
                          <div className="mb-2"><span className="text-pink-500">from</span> ultralytics <span className="text-pink-500">import</span> YOLO</div>
                          <br/><div className="text-slate-500 italic mb-1"># Load custom model</div>
                          <div className="mb-2">model = YOLO(<span className="text-emerald-400">'yolov8n-palm.pt'</span>)</div>
                          <br/><div className="text-blue-400 font-semibold border-t border-white/5 pt-3 mt-1">
                              &gt; Model loaded successfully.<br/>&gt; Palm trees detected: 1,420<br/>&gt; Accuracy threshold: <span className="text-emerald-400">92.4%</span><br/>
                              <span className="animate-pulse inline-block w-2 h-4 bg-indigo-500 align-middle ml-1 mt-1"></span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        
        {/* ABOUT ME SECTION */}
        <section id="about" className="min-h-[80vh] py-32 flex flex-col justify-center border-t border-white/5">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="w-full md:w-5/12 parallax-element" data-speed="0.08">
                    <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-white/5 border-4 border-white/10 shadow-2xl group">
                        <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop" 
                            alt="Valentine Agam" 
                            className="parallax-image-inner w-full h-[120%] object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 ease-out absolute top-[-10%]"
                            data-speed-inner="-0.04"
                        />
                        <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                        <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg font-mono text-sm font-bold text-white border border-white/10 shadow-lg z-20">Miri, Sarawak</div>
                    </div>
                </div>
                <div className="w-full md:w-7/12 parallax-element" data-speed="-0.03">
                    <h3 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3 text-white">
                        <User className="text-indigo-400" size={32} /> About Me
                    </h3>
                    <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                        <p>My journey bridges technical engineering with business strategy. During my time as a <strong className="text-white">Backend Engineer</strong> and <strong className="text-white">Business Development Executive</strong> at Zenara Jaya, I spearheaded digital transformations with scalable SaaS solutions.</p>
                        <p>Whether it's deploying an AI-powered resume parsing microservice on DigitalOcean using FastAPI, or training YOLO models to achieve 92% detection accuracy, I focus on delivering tangible ROI and flawless user experiences.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 pt-8 mt-8 border-t border-white/5">
                        <div>
                            <p className="text-4xl font-extrabold text-white mb-1">92<span className="text-indigo-400">%</span></p>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">YOLO Accuracy</p>
                        </div>
                        <div>
                            <p className="text-4xl font-extrabold text-white mb-1">3.12</p>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">CGPA (UNIMAS)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="min-h-screen py-32 flex flex-col justify-center border-t border-white/5">
            <div className="text-center mb-24 parallax-element" data-speed="0.04">
                <p className="text-indigo-500 font-mono text-xs font-bold uppercase tracking-[0.4em] mb-4">Academic Credentials</p>
                <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Education Path</h3>
                <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
            </div>

            <div className="max-w-5xl mx-auto w-full relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-transparent hidden md:block"></div>
                <div className="space-y-32">
                    <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-0">
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full z-10 border-4 border-[#050505] shadow-[0_0_20px_rgba(99,102,241,1)] hidden md:block animate-pulse"></div>
                        <div className="w-full md:w-[45%] md:pr-12 md:text-right parallax-element" data-speed="0.06">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-sm mb-4"><Calendar size={14} /> Oct 2022 — Nov 2025</div>
                            <h4 className="text-3xl font-bold text-white mb-2 leading-tight">BSc. in Cognitive Science</h4>
                            <p className="text-xl text-slate-400 font-medium">University Malaysia Sarawak</p>
                        </div>
                        <div className="w-full md:w-[45%] md:pl-12 ml-auto parallax-element" data-speed="-0.02">
                            <div className="timeline-card group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:border-indigo-500/30 transition-all duration-500 overflow-hidden">
                                <GraduationCap className="academic-sigil absolute -right-4 -bottom-4 text-indigo-500" size={120} />
                                <div className="flex gap-2 mb-6">
                                    <span className="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-md">Major: AI & ML</span>
                                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-md border border-indigo-500/20 flex items-center gap-1"><Award size={10} /> Dean's List (2025)</span>
                                </div>
                                <p className="text-slate-300 leading-relaxed relative z-10">Specialized in <strong className="text-white font-semibold">Human-Computer Interaction</strong> and <strong className="text-white font-semibold">Artificial Intelligence</strong>. Minor in Computer Science with a core focus on Data Science pipelines.</p>
                                <div className="mt-8 pt-6 border-t border-white/5 flex items-baseline gap-2"><span className="text-slate-500 text-xs font-mono uppercase tracking-widest">Graduation Score:</span><span className="text-2xl font-bold text-indigo-400">CGPA 3.12</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* TECHNICAL ARSENAL */}
        <section id="skills" className="relative py-32 flex flex-col items-center border-t border-white/5 overflow-visible">
            <div className="text-center mb-32 relative z-20 parallax-element" data-speed="0.03">
                <p className="text-indigo-400 font-mono text-xs font-bold uppercase tracking-[0.4em] mb-4">Core Competencies</p>
                <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Technical Arsenal</h3>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">A curated selection of technologies and tools used to build robust AI-driven solutions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto w-full relative z-10 pt-10 parallax-element" data-speed="-0.02">
                <div className="md:col-span-2 md:row-span-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
                    <div className="absolute inset-0 tech-mesh opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"><Cpu className="text-indigo-400" size={28} /></div>
                        <h4 className="text-2xl font-bold text-white mb-6">Programming & Logic</h4>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {['Python', 'FastAPI', 'SQL', 'C++', 'Java', 'R', 'C#', 'Dart'].map(skill => (
                                <div key={skill} className="skill-pill px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 text-xs font-bold tracking-wider uppercase hover:border-indigo-500/50 hover:text-white hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]">{skill}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1 md:row-span-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform"><Brain className="text-emerald-400" size={28} /></div>
                        <h4 className="text-2xl font-bold text-white mb-6">AI Architecture</h4>
                        <div className="flex flex-col gap-3">
                            {['YOLOv8', 'TensorFlow', 'Scikit-learn', 'OpenCV', 'PyTorch'].map(skill => (
                                <div key={skill} className="skill-pill flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 text-[10px] font-bold tracking-widest uppercase hover:border-emerald-500/50 hover:text-white">{skill}<div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40"></div></div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1 md:row-span-1 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 group hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl"><Globe className="text-blue-400" size={20} /></div>
                        <h4 className="text-xl font-bold text-white leading-tight">Full-Stack</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">{['Next.js', 'Flutter', 'Supabase'].map(s => (<span key={s} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-400 text-[9px] font-bold uppercase tracking-widest hover:text-white hover:border-blue-400/40">{s}</span>))}</div>
                </div>

                <div className="md:col-span-1 md:row-span-1 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 group hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl"><Framer className="text-purple-400" size={20} /></div>
                        <h4 className="text-xl font-bold text-white leading-tight">Design & Data</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">{['Figma', 'Power BI', 'QGIS'].map(s => (<span key={s} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-400 text-[9px] font-bold uppercase tracking-widest hover:text-white hover:border-purple-400/40">{s}</span>))}</div>
                </div>
            </div>
        </section>

        {/* SHOWCASE SECTION */}
        <section id="projects" className="min-h-screen py-32 flex flex-col items-center border-t border-white/5">
            <div className="text-center mb-16"><p className="text-indigo-400 font-mono text-sm font-bold uppercase tracking-[0.2em] mb-3">Portfolio Highlights</p><h3 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Live Showcase</h3></div>
            <div className="relative w-full max-w-[1100px] bg-[#0d1117] rounded-[2.5rem] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col p-6 md:p-12">
                <div className="relative w-full bg-black rounded-2xl overflow-hidden border border-white/5 aspect-[16/9] shadow-inner mb-12">
                    <div className="absolute top-4 left-4 flex gap-2 z-20"><div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div><div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div><div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div></div>
                    {showcaseData.map((project, index) => (
                        <div key={project.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeShowcase === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-70"><source src={project.videoUrl} type="video/mp4" /></video>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8 z-10 text-left"><h4 className="text-3xl font-bold text-white mb-2">{project.title}</h4><p className="text-slate-400 text-sm max-w-lg mb-4">{project.desc}</p><div className="flex flex-wrap gap-2">{project.tags.map(tag => (<span key={tag} className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase rounded-md border border-indigo-500/30">{tag}</span>))}</div></div>
                        </div>
                    ))}
                    <button onClick={() => setActiveShowcase((prev) => (prev - 1 + showcaseData.length) % showcaseData.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white z-20 hover:bg-black/60 transition-all"><ChevronLeft size={20} /></button>
                    <button onClick={() => setActiveShowcase((prev) => (prev + 1) % showcaseData.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white z-20 hover:bg-black/60 transition-all"><ChevronRight size={20} /></button>
                </div>
                <div className="w-full flex flex-wrap justify-center gap-4">
                    {showcaseData.map((project, index) => (
                        <div key={project.id} onClick={() => setActiveShowcase(index)} className={`w-24 md:w-32 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${activeShowcase === index ? 'border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)] scale-105' : 'border-white/5 grayscale opacity-50 hover:opacity-100'}`}><img src={project.thumb} alt={project.title} className="w-full h-full object-cover" /></div>
                    ))}
                </div>
            </div>

            {/* PROJECT ARCHIVE GRID - UPDATED: RECTANGULAR & WIDER (Total 10) */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 text-left">
                {archiveData.map((project) => (
                    <div key={project.id} className="group flex flex-col h-full rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl hover:border-indigo-500/30 transition-all duration-500">
                        {/* Top: Header area - more rectangular proportion */}
                        <div className="bg-[#111111] h-52 flex flex-col items-center justify-center p-6 relative border-b border-white/5 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-50"></div>
                            <div className="mb-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.05)] relative z-10">
                                {project.logo}
                            </div>
                            <p className="text-[9px] font-bold tracking-[0.3em] text-slate-500 uppercase text-center leading-tight relative z-10 max-w-[80%]">
                                {project.tagline}
                            </p>
                        </div>
                        
                        {/* Bottom: Info area - pitch black */}
                        <div className="bg-[#050505] p-8 flex-grow flex flex-col justify-between">
                            <div>
                                <h4 className="text-white text-xl font-bold mb-3 group-hover:text-indigo-400 transition-colors tracking-tight">
                                    {project.title}
                                </h4>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                    {project.desc}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-indigo-400 font-bold text-[10px] uppercase tracking-widest group/btn cursor-pointer hover:text-white transition-colors">
                                View Case Study <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer id="contact" className="relative min-h-[90vh] py-32 flex flex-col items-center justify-center text-center overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 grid-overlay pointer-events-none"></div>
            <div className="absolute inset-0 hero-stars pointer-events-none opacity-20"></div>
            <div className="relative z-10 px-6 max-w-4xl flex flex-col items-center">
                <p className="text-indigo-400 font-mono text-xs font-bold uppercase tracking-[0.5em] mb-6">Let's work together</p>
                <h3 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tighter">Have a project in mind? <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Let's create something amazing.</span></h3>
                <div className="flex flex-wrap justify-center items-center gap-6 mb-16">
                    <a href="mailto:valentineagam6@gmail.com" className="group flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1 transition-all duration-300"><Mail size={20} /> Get In Touch</a>
                    <a href="https://wa.me/60146521429" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"><MessageCircle size={20} /> WhatsApp</a>
                </div>
                <div className="inline-flex items-center gap-4 text-slate-500 mb-12"><span className="text-[10px] uppercase tracking-[0.2em] font-bold">or connect via:</span><div className="flex gap-4"><a href="https://github.com/valentineagam" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-all"><Github size={20} /></a><a href="https://linkedin.com/in/valentineagam" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-all"><Linkedin size={20} /></a></div></div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050505] border border-emerald-900/50 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 shadow-2xl mb-12"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]"></div>Available for new opportunities</div>
                <p className="text-slate-600 text-[10px] font-mono mt-24 uppercase tracking-[0.3em]">&copy; 2026 Valentine Agam &bull; Built with React & Tailwind</p>
            </div>
      </footer>
    </div>
  );
}