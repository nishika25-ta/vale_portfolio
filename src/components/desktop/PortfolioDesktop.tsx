'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  ArrowDownToLine,
  AudioLines,
  Award,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Cpu,
  FileText,
  Folder,
  Github,
  Home,
  Layers3,
  Linkedin,
  MapPin,
  Maximize2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserRound,
  X,
} from 'lucide-react';
import { RESUME_HREF, SITE_URL, SOCIALS } from '@/data/profile';
import { certificates, type Certificate, type CertificateCategory } from '@/data/certificates';
import { workExperience } from '@/data/workExperience';
import { aiSkills, designDataSkills, fullStackSkills, programmingSkills, skillLogos } from '@/data/skills';
import { musicTracks } from '@/data/music';
import './os-tokens.css';
import { AboutProfile } from './AboutProfile';
import { ProjectsGallery } from './ProjectsGallery';
import { MusicPlayer, type MusicController } from './MusicPlayer';
import { CapabilityCards } from './CapabilityCards';
import { StatusControls } from './StatusControls';
import { StartupScreen } from './StartupScreen';
import { DeskWindow } from './DeskWindow';
import { FeaturedWork } from './FeaturedWork';
import { SpotlightModal, type SpotlightApp } from './SpotlightModal';
import styles from './desktop.module.css';
import mac from './workspace.module.css';
import profile from './profile.module.css';

type App = SpotlightApp;
type CertFilter = 'All' | CertificateCategory;

const WALLPAPERS = ['Indigo glass', 'Midnight dusk', 'Nordic aurora', 'Warm horizon'] as const;
const CERT_FILTERS: readonly CertFilter[] = ['All', 'Cybersecurity', 'Cloud', 'AI & ML', 'Academic'];

function windowOpenFrames(x: number, y: number): Keyframe[] {
  return Array.from({ length: 36 }, (_, index) => {
    const offset = index / 35;
    const time = offset * 0.62;
    const progress =
      index === 35
        ? 1
        : 1 - Math.exp(-12 * time) * (Math.cos(15 * time) + 0.78 * Math.sin(15 * time));
    return {
      offset,
      opacity: Math.min(1, offset / 0.16),
      transform: `translate3d(${x * (1 - progress)}px, ${y * (1 - progress)}px, 0) scale(${0.92 + 0.08 * progress})`,
    };
  });
}

export default function PortfolioDesktop() {
  const [active, setActive] = useState<App | null>(null);
  const [maximized, setMaximized] = useState(false);
  const [skillFocus, setSkillFocus] = useState<'all' | 'web' | 'ai'>('all');
  const [certFilter, setCertFilter] = useState<CertFilter>('All');
  const [wallpaper, setWallpaper] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [clock, setClock] = useState<Date | null>(null);
  const [locked, setLocked] = useState(true);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [openCertificate, setOpenCertificate] = useState<Certificate | null>(null);
  const [dockMotion, setDockMotion] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const motionEnabled = dockMotion && !reducedMotion;
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [mobilePage, setMobilePage] = useState<0 | 1>(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Persistent OS Audio State
  const audioRef = useRef<HTMLAudioElement>(null);
  const trackIndexRef = useRef(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState<number>(musicTracks[0].duration);
  const [audioError, setAudioError] = useState('');

  const dialog = useRef<HTMLDialogElement>(null);
  const certificateDialog = useRef<HTMLDialogElement>(null);
  const workspace = useRef<HTMLElement>(null);
  const workspaceGrid = useRef<HTMLDivElement>(null);
  const previousMobilePage = useRef(mobilePage);
  const appContent = useRef<HTMLDivElement>(null);
  const dock = useRef<HTMLElement>(null);
  const certShelfRef = useRef<HTMLUListElement>(null);
  const windowAnimation = useRef<Animation | null>(null);
  const launchOrigin = useRef<{ x: number; y: number; width: number; height: number; element: HTMLElement } | null>(null);
  const pointerLauncher = useRef<HTMLElement | null>(null);

  const finishStartup = useCallback(() => setLocked(false), []);

  // Initialize persistent audio element once
  useEffect(() => {
    const player = audioRef.current;
    if (!player) return;
    player.src = musicTracks[0].src;
    player.volume = 0.45;
    return () => {
      player.pause();
      player.removeAttribute('src');
      player.load();
    };
  }, []);

  const playAudio = useCallback(() => {
    const player = audioRef.current;
    if (!player) return;
    setAudioError('');
    void player.play().catch(() => {
      if (player.error) setAudioError('This track could not be loaded. Try another song.');
      else if (player.paused) setAudioError('Press Play to start playback.');
    });
  }, []);

  const togglePlay = useCallback(() => {
    const player = audioRef.current;
    if (!player) return;
    if (player.paused) playAudio();
    else player.pause();
  }, [playAudio]);

  const selectTrack = useCallback(
    (index: number, startPlaying = false) => {
      const player = audioRef.current;
      if (!player) return;
      const next = (index + musicTracks.length) % musicTracks.length;
      const shouldResume = startPlaying || !player.paused;
      player.pause();
      trackIndexRef.current = next;
      setTrackIndex(next);
      setElapsed(0);
      setDuration(musicTracks[next].duration);
      setAudioError('');
      player.src = musicTracks[next].src;
      if (shouldResume) playAudio();
    },
    [playAudio],
  );

  const seekAudio = useCallback((seconds: number) => {
    const player = audioRef.current;
    if (player && player.readyState > 0) {
      player.currentTime = seconds;
      setElapsed(seconds);
    }
  }, []);

  const musicController = useMemo<MusicController>(
    () => ({
      track: trackIndex,
      playing,
      elapsed,
      duration,
      error: audioError,
      togglePlay,
      selectTrack,
      seek: seekAudio,
    }),
    [audioError, duration, elapsed, playing, seekAudio, selectTrack, togglePlay, trackIndex],
  );

  const closeWindow = useCallback(() => {
    const element = dialog.current;
    const isDesktopViewport = typeof window !== 'undefined' && window.innerWidth >= 900;
    if (!element?.open || !motionEnabled) {
      element?.close();
      setActive(null);
      return;
    }
    if (element.dataset.closing === 'true') return;
    const current = getComputedStyle(element);
    const firstFrame = {
      opacity: current.opacity,
      transform: current.transform,
      borderRadius: current.borderRadius,
    };
    windowAnimation.current?.cancel();
    const bounds = element.getBoundingClientRect();
    const source = isDesktopViewport ? launchOrigin.current : null;
    const liveSource = source?.element.isConnected ? source.element.getBoundingClientRect() : null;
    const target =
      liveSource?.width && liveSource.height
        ? {
            x: liveSource.left + liveSource.width / 2,
            y: liveSource.top + liveSource.height / 2,
            width: liveSource.width,
            height: liveSource.height,
          }
        : source;
    const x = target ? target.x - bounds.left - bounds.width / 2 : 0;
    const y = target ? target.y - bounds.top - bounds.height / 2 : isDesktopViewport ? 30 : Math.min(bounds.height / 3, 150);
    const scale = target
      ? Math.max(0.04, Math.min(target.width / bounds.width, target.height / bounds.height, 0.3))
      : isDesktopViewport ? 0.94 : 1;
    const transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    element.dataset.closing = 'true';
    const animation = element.animate(
      [
        firstFrame,
        { opacity: 0, transform, borderRadius: target ? `${Math.min(bounds.width / 2, 14 / scale)}px` : firstFrame.borderRadius },
      ],
      { duration: target ? 360 : 240, easing: 'cubic-bezier(.32,.72,0,1)', fill: 'forwards' },
    );
    windowAnimation.current = animation;
    void animation.finished
      .then(() => {
        if (windowAnimation.current === animation) {
          element.close();
          setActive(null);
          if (target && source?.element.isConnected) source.element.focus({ preventScroll: true });
        }
      })
      .catch(() => {});
  }, [motionEnabled]);

  // Desktop liquid-glass dock spring magnification
  useEffect(() => {
    const root = dock.current;
    if (!root) return;
    let dispose = () => {};

    function configure() {
      dispose();
      const isTouchOnly =
        typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      const isNarrow = typeof window !== 'undefined' && window.innerWidth < 900;
      if (!root || !dockMotion || isTouchOnly || isNarrow) return;
      const container = root;

      const glass = container.querySelector<HTMLElement>(`.${styles.dock}`);
      if (!glass) return;

      const dockChildren = Array.from(glass.children) as HTMLElement[];

      interface SlotGeometry {
        el: HTMLElement;
        isIcon: boolean;
        width: number;
        centerX: number;
        x: number;
        scale: number;
        bounceY: number;
        vBounceY: number;
      }

      let dockBounds = glass.getBoundingClientRect();
      let slots: SlotGeometry[] = [];

      function measure() {
        if (!glass) return;
        dockBounds = glass.getBoundingClientRect();
        slots = dockChildren.map((el) => {
          const isIcon = el.classList.contains(styles.appIcon);
          const width = el.offsetWidth;
          return {
            el,
            isIcon,
            width,
            centerX: el.offsetLeft + width / 2,
            x: 0,
            scale: 1,
            bounceY: 0,
            vBounceY: 0,
          };
        });
      }

      measure();

      let activePointer: { x: number; y: number } | null = null;
      let smoothX = dockBounds.width / 2;
      let smoothStrength = 0;
      let rafId: number | null = null;
      let lastTime = 0;
      let activeTipIndex = -1;
      let writtenPose: string[] = [];
      let glassExpand = '';
      let glassGlow = '';
      let glassPresence = '';

      container.dataset.liquid = 'true';
      const maxGrow = 0.64;
      let currentExpand = 0;

      function iconWidth() {
        for (let i = 0; i < slots.length; i++) {
          if (slots[i].isIcon && slots[i].width > 0) return slots[i].width;
        }
        return 48;
      }

      function bell(distance: number, radius: number) {
        if (distance >= radius || radius <= 0) return 0;
        return 0.5 * (1 + Math.cos((distance / radius) * Math.PI));
      }

      function influenceRadius() {
        return iconWidth() * 2.55;
      }

      function magnificationField(sampleX: number, strength: number, radius: number) {
        const count = slots.length;
        const extras = new Array<number>(count);
        const scales = new Array<number>(count);
        let total = 0;
        for (let i = 0; i < count; i++) {
          const slot = slots[i];
          if (!slot.isIcon) {
            extras[i] = 0;
            scales[i] = 1;
            continue;
          }
          const added = bell(Math.abs(sampleX - slot.centerX), radius) * maxGrow * strength;
          scales[i] = 1 + added;
          extras[i] = slot.width * added;
          total += extras[i];
        }
        const shifts = new Array<number>(count);
        let covered = 0;
        for (let i = 0; i < count; i++) {
          shifts[i] = covered + extras[i] * 0.5 - total * 0.5;
          covered += extras[i];
        }
        return { scales, shifts, total };
      }

      function shiftAtRest(restX: number, shifts: number[]) {
        const last = slots.length - 1;
        if (last < 0) return 0;
        if (restX <= slots[0].centerX) return shifts[0];
        if (restX >= slots[last].centerX) return shifts[last];
        for (let i = 1; i < slots.length; i++) {
          const left = slots[i - 1].centerX;
          const right = slots[i].centerX;
          if (restX <= right) {
            const span = right - left;
            const t = span > 0 ? (restX - left) / span : 0;
            return shifts[i - 1] + (shifts[i] - shifts[i - 1]) * t;
          }
        }
        return shifts[last];
      }

      function solveMagnification(pointerX: number, strength: number) {
        const radius = influenceRadius();
        if (strength < 0.001 || slots.length === 0) return magnificationField(pointerX, 0, radius);
        let sample = pointerX;
        for (let pass = 0; pass < 4; pass++) {
          const probe = magnificationField(sample, strength, radius);
          const next = pointerX - shiftAtRest(sample, probe.shifts);
          if (!Number.isFinite(next)) break;
          sample = next;
        }
        return magnificationField(sample, strength, radius);
      }

      function approach(current: number, target: number, tau: number, dt: number) {
        return current + (target - current) * (1 - Math.exp(-dt / tau));
      }

      function stepBounce(offset: number, velocity: number, dt: number) {
        const omega = 19;
        const zeta = 0.63;
        const decay = zeta * omega;
        const freq = omega * Math.sqrt(1 - zeta * zeta);
        const exp = Math.exp(-decay * dt);
        const cos = Math.cos(freq * dt);
        const sin = Math.sin(freq * dt);
        const envelope = (velocity + decay * offset) / freq;
        const nextOffset = exp * (offset * cos + envelope * sin);
        const nextVelocity = -decay * nextOffset + exp * freq * (-offset * sin + envelope * cos);
        return { offset: nextOffset, velocity: nextVelocity };
      }

      function loop(now: number) {
        const dt = lastTime === 0 ? 0.016 : Math.min((now - lastTime) / 1000, 0.048);
        lastTime = now;

        let targetStrength = 0;
        if (activePointer && glass && dockBounds.width > 0) {
          const halfExpand = currentExpand * 0.5;
          const pointerDockX = activePointer.x - dockBounds.left;
          const pointerDockY = activePointer.y - (dockBounds.top + dockBounds.height / 2);
          const minX = -halfExpand;
          const maxX = dockBounds.width + halfExpand;
          const outsideX = Math.max(0, minX - pointerDockX, pointerDockX - maxX);
          const halfH = dockBounds.height / 2;
          const topReach = halfH + iconWidth() * maxGrow + 12;
          const yWeight =
            pointerDockY < -topReach
              ? 0
              : pointerDockY < -halfH
                ? 1 - ((-pointerDockY - halfH) / (topReach - halfH)) * 0.25
                : pointerDockY > halfH + 14
                  ? 0
                  : 1;
          const xWeight = outsideX === 0 ? 1 : bell(outsideX, 20);
          targetStrength = xWeight * yWeight;
          if (targetStrength > 0.004) {
            const clampedX = Math.max(0, Math.min(dockBounds.width, pointerDockX));
            if (smoothStrength < 0.06 && Math.abs(clampedX - smoothX) > influenceRadius() * 0.9) {
              smoothX = clampedX;
            }
            smoothX = approach(smoothX, clampedX, 0.022, dt);
          }
        }

        const strengthTau = targetStrength > smoothStrength ? 0.024 : 0.068;
        smoothStrength = approach(smoothStrength, targetStrength, strengthTau, dt);
        if (smoothStrength < 0.0008) smoothStrength = 0;

        const field = solveMagnification(smoothX, smoothStrength);
        currentExpand = field.total;

        if (writtenPose.length !== slots.length) writtenPose = new Array(slots.length).fill('');
        let hotIndex = -1;
        let hotScale = 1;
        for (let i = 0; i < slots.length; i++) {
          if (!slots[i].isIcon) continue;
          if (field.scales[i] > hotScale) {
            hotScale = field.scales[i];
            hotIndex = i;
          }
        }
        if (activeTipIndex >= slots.length) activeTipIndex = -1;
        if (hotIndex !== -1 && smoothStrength > 0.28 && hotScale > 1.06) {
          const currentScale = activeTipIndex >= 0 ? field.scales[activeTipIndex] : 0;
          if (activeTipIndex < 0 || hotIndex === activeTipIndex || hotScale > currentScale + 0.03) {
            activeTipIndex = hotIndex;
          }
        } else {
          activeTipIndex = -1;
        }

        for (let i = 0; i < slots.length; i++) {
          const slot = slots[i];
          slot.scale = field.scales[i];
          slot.x = field.shifts[i];
          if (Math.abs(slot.bounceY) > 0.03 || Math.abs(slot.vBounceY) > 0.35) {
            const bounced = stepBounce(slot.bounceY, slot.vBounceY, dt);
            slot.bounceY = bounced.offset;
            slot.vBounceY = bounced.velocity;
          } else {
            slot.bounceY = 0;
            slot.vBounceY = 0;
          }
          const liftY = slot.isIcon ? -(slot.scale - 1) * 5 : 0;
          const totalY = liftY + slot.bounceY;
          const pose = `${slot.x.toFixed(2)} ${totalY.toFixed(2)} ${slot.scale.toFixed(4)}`;
          if (writtenPose[i] !== pose) {
            writtenPose[i] = pose;
            slot.el.style.transform = `translate3d(${slot.x.toFixed(2)}px,${totalY.toFixed(2)}px,0) scale(${slot.scale.toFixed(4)})`;
          }
          if (slot.isIcon) {
            slot.el.style.setProperty('--icon-scale', slot.scale.toFixed(4));
            if (i === activeTipIndex) {
              if (slot.el.dataset.tip !== 'true') slot.el.dataset.tip = 'true';
            } else if (slot.el.dataset.tip) {
              delete slot.el.dataset.tip;
            }
            const z = slot.scale > 1.015 ? String(Math.round(slot.scale * 100)) : '';
            if (slot.el.style.zIndex !== z) slot.el.style.zIndex = z;
          }
        }

        if (glass) {
          const expand = field.total.toFixed(2);
          const glow = Math.max(0, Math.min(dockBounds.width, smoothX)).toFixed(2);
          const presence = Math.max(0, Math.min(1, smoothStrength)).toFixed(3);
          if (glassExpand !== expand) {
            glassExpand = expand;
            glass.style.setProperty('--dock-expand', expand);
          }
          if (glassGlow !== glow) {
            glassGlow = glow;
            glass.style.setProperty('--dock-glow-x', glow);
          }
          if (glassPresence !== presence) {
            glassPresence = presence;
            glass.style.setProperty('--dock-presence', presence);
          }
        }

        let isSettled = activePointer === null && smoothStrength === 0 && field.total < 0.05;
        if (isSettled) {
          for (let i = 0; i < slots.length; i++) {
            const slot = slots[i];
            if (Math.abs(slot.scale - 1) > 0.001 || Math.abs(slot.x) > 0.05 || Math.abs(slot.bounceY) > 0.04) {
              isSettled = false;
              break;
            }
          }
        }

        if (isSettled) {
          if (glass) {
            glass.style.setProperty('--dock-expand', '0');
            glass.style.setProperty('--dock-presence', '0');
            glassExpand = '0';
            glassPresence = '0';
          }
          slots.forEach((slot) => {
            slot.el.style.transform = '';
            slot.scale = 1;
            slot.x = 0;
            slot.bounceY = 0;
            slot.vBounceY = 0;
            if (slot.isIcon) {
              slot.el.style.removeProperty('--icon-scale');
              slot.el.style.zIndex = '';
              delete slot.el.dataset.tip;
            }
          });
          writtenPose = [];
          activeTipIndex = -1;
          rafId = null;
          lastTime = 0;
          return;
        }

        rafId = requestAnimationFrame(loop);
      }

      function startLoop() {
        if (rafId === null) {
          lastTime = 0;
          rafId = requestAnimationFrame(loop);
        }
      }

      function onWindowPointerMove(e: PointerEvent) {
        if (e.pointerType === 'touch') return;
        if (dockBounds.width === 0 || slots.length === 0) measure();
        const halfExpand = currentExpand * 0.5 + 24;
        const inZone =
          e.clientY >= dockBounds.top - iconWidth() * maxGrow - 16 &&
          e.clientY <= dockBounds.bottom + 16 &&
          e.clientX >= dockBounds.left - halfExpand &&
          e.clientX <= dockBounds.right + halfExpand;
        if (inZone) {
          activePointer = { x: e.clientX, y: e.clientY };
          startLoop();
        } else if (activePointer !== null) {
          activePointer = null;
          startLoop();
        }
      }

      function onPointerLeave() {
        if (activePointer !== null) {
          activePointer = null;
          startLoop();
        }
      }

      function onPress(e: Event) {
        if (e instanceof PointerEvent && (e.pointerType === 'touch' || e.button !== 0)) return;
        const iconBtn = (e.target as HTMLElement)?.closest<HTMLElement>(`.${styles.appIcon}`);
        if (!iconBtn) return;
        const slot = slots.find((s) => s.el === iconBtn);
        if (slot) {
          slot.vBounceY = Math.max(-960, slot.vBounceY - 560);
          startLoop();
        }
      }

      function onResize() {
        measure();
        startLoop();
      }

      window.addEventListener('pointermove', onWindowPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
      window.addEventListener('blur', onPointerLeave);
      glass.addEventListener('pointerdown', onPress);
      window.addEventListener('resize', onResize);

      dispose = () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        window.removeEventListener('pointermove', onWindowPointerMove);
        document.documentElement.removeEventListener('pointerleave', onPointerLeave);
        window.removeEventListener('blur', onPointerLeave);
        glass.removeEventListener('pointerdown', onPress);
        window.removeEventListener('resize', onResize);
        delete container.dataset.liquid;
        if (glass) {
          glass.style.removeProperty('--dock-expand');
          glass.style.removeProperty('--dock-glow-x');
          glass.style.removeProperty('--dock-presence');
        }
        dockChildren.forEach((el) => {
          el.style.transform = '';
          el.style.removeProperty('--icon-scale');
          el.style.zIndex = '';
          delete el.dataset.tip;
        });
      };
    }

    configure();
    window.addEventListener('resize', configure);
    return () => {
      dispose();
      window.removeEventListener('resize', configure);
    };
  }, [dockMotion]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  // Restore saved preferences
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('vale-theme');
      if (savedTheme === 'light') setDarkMode(false);
      else if (savedTheme === 'dark') setDarkMode(true);
      else setDarkMode(true);
    } catch {
      setDarkMode(true);
    }
    try {
      setDockMotion(localStorage.getItem('vale-dock-motion') !== 'off');
    } catch {
      /* Default to motion enabled. */
    }
    try {
      const savedWp = Number(localStorage.getItem('vale-wallpaper'));
      if (savedWp >= 0 && savedWp < WALLPAPERS.length) setWallpaper(savedWp);
    } catch {
      /* Ignore storage failure. */
    }
  }, []);

  // Live Malaysia Clock
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const updateClock = () => {
      clearTimeout(timer);
      if (document.hidden) return;
      setClock(new Date());
      timer = setTimeout(updateClock, 60_000 - (Date.now() % 60_000));
    };
    updateClock();
    document.addEventListener('visibilitychange', updateClock);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', updateClock);
    };
  }, []);

  useEffect(() => {
    const element = dialog.current;
    windowAnimation.current?.cancel();
    if (!element) return;
    if (element.dataset.closing === 'true') {
      delete element.dataset.closing;
      element.close();
      setActive(null);
      return;
    }
    if (active && !element.open) {
      element.showModal();
      if (motionEnabled && window.innerWidth >= 900) {
        const bounds = element.getBoundingClientRect();
        const source = launchOrigin.current;
        const x = source ? Math.max(-110, Math.min(110, (source.x - bounds.left - bounds.width / 2) * 0.24)) : 0;
        const y = source ? Math.max(-85, Math.min(120, (source.y - bounds.top - bounds.height / 2) * 0.32)) : 24;
        windowAnimation.current = element.animate(windowOpenFrames(x, y), { duration: 480 });
      } else if (motionEnabled) {
        windowAnimation.current = element.animate(
          [{ opacity: 0, transform: 'translateY(100px)' }, { opacity: 1, transform: 'none' }],
          { duration: 350, easing: 'cubic-bezier(.16,1,.3,1)' },
        );
      }
    } else if (!active && element.open) {
      element.close();
    }
  }, [active, motionEnabled]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (active || locked || spotlightOpen || openCertificate) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active, locked, spotlightOpen, openCertificate]);

  useEffect(() => {
    appContent.current?.scrollTo({ top: 0 });
  }, [active, selectedProject]);

  useEffect(() => {
    workspace.current?.scrollTo({ top: 0 });
    const direction = mobilePage - previousMobilePage.current;
    previousMobilePage.current = mobilePage;
    if (!direction || !motionEnabled || window.innerWidth >= 900) return;
    const animation = workspaceGrid.current?.animate(
      [{ opacity: 0.55, transform: `translateX(${direction * 24}px)` }, { opacity: 1, transform: 'none' }],
      { duration: 320, easing: 'cubic-bezier(.16,1,.3,1)' },
    );
    return () => animation?.cancel();
  }, [mobilePage, motionEnabled]);

  useEffect(() => {
    const preview = certificateDialog.current;
    if (openCertificate && preview && !preview.open) preview.showModal();
  }, [openCertificate]);

  const closeCertificate = () => {
    certificateDialog.current?.close();
    setOpenCertificate(null);
  };

  // Global Cmd/Ctrl+K Spotlight shortcut
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setLocked(false);
        setSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const openApp = useCallback((app: App, focus: 'all' | 'web' | 'ai' = 'all') => {
    if (app === 'Skills') setSkillFocus(focus);
    setMaximized(false);
    const focused = document.activeElement;
    const trigger =
      pointerLauncher.current ?? (focused instanceof HTMLElement && focused !== document.body ? focused : null);
    pointerLauncher.current = null;
    const bounds = trigger?.getBoundingClientRect();
    launchOrigin.current =
      bounds?.width && bounds.height && trigger
        ? {
            x: bounds.left + bounds.width / 2,
            y: bounds.top + bounds.height / 2,
            width: bounds.width,
            height: bounds.height,
            element: trigger,
          }
        : null;
    setActive(app);
    setSelectedProject(null);
  }, []);

  const openProjectById = useCallback(
    (id: string) => {
      openApp('Projects');
      setSelectedProject(id);
    },
    [openApp],
  );

  const openSkills = useCallback((focus: 'web' | 'ai') => openApp('Skills', focus), [openApp]);

  const chooseWallpaper = useCallback((index: number) => {
    setWallpaper(index);
    try {
      localStorage.setItem('vale-wallpaper', String(index));
    } catch {
      /* Ignore storage failure. */
    }
  }, []);

  const cycleWallpaper = useCallback(() => {
    chooseWallpaper((wallpaper + 1) % WALLPAPERS.length);
  }, [chooseWallpaper, wallpaper]);

  const toggleTheme = useCallback(() => {
    const next = !darkMode;
    try {
      localStorage.setItem('vale-theme', next ? 'dark' : 'light');
    } catch {
      /* Ignore storage failure. */
    }
    if (document.startViewTransition && motionEnabled) {
      const transition = document.startViewTransition(() => flushSync(() => setDarkMode(next)));
      // A viewport resize can skip the animation after the theme has been applied.
      void transition.ready.catch(() => {});
    } else {
      setDarkMode(next);
    }
  }, [darkMode, motionEnabled]);

  const toggleDockMotion = useCallback(() => {
    const enabled = !dockMotion;
    setDockMotion(enabled);
    try {
      localStorage.setItem('vale-dock-motion', enabled ? 'on' : 'off');
    } catch {
      /* Ignore storage failure. */
    }
  }, [dockMotion]);

  const scrollCertShelf = (direction: -1 | 1) => {
    const shelf = certShelfRef.current;
    if (!shelf) return;
    shelf.scrollBy({ left: direction * 260, behavior: motionEnabled ? 'smooth' : 'instant' });
  };

  const handleCopyPortfolioUrl = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopiedUrl(true);
      window.setTimeout(() => setCopiedUrl(false), 2200);
    } catch {
      /* Clipboard unavailable. */
    }
  };

  const filteredCertificates = useMemo(
    () => (certFilter === 'All' ? certificates : certificates.filter((item) => item.category === certFilter)),
    [certFilter],
  );

  return (
    <div
      className={`${styles.desktop} ${styles[`wallpaper${wallpaper}`]}`}
      data-theme={darkMode ? 'dark' : 'light'}
      data-motion={motionEnabled ? 'on' : 'off'}
      onPointerDownCapture={(event) => {
        if (event.target instanceof Element) {
          const trigger = event.target.closest<HTMLElement>('button, a');
          if (trigger && !dialog.current?.contains(trigger)) pointerLauncher.current = trigger;
        }
      }}
      onKeyDownCapture={() => {
        pointerLauncher.current = null;
      }}
    >
      {/* Persistent background OS audio element */}
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setElapsed(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => {
          if (Number.isFinite(event.currentTarget.duration)) setDuration(event.currentTarget.duration);
        }}
        onEnded={() => selectTrack(trackIndexRef.current + 1, true)}
        onError={() => {
          setPlaying(false);
          setAudioError('This track could not be loaded. Try another song.');
        }}
      />

      <div className={styles.wallpaper} aria-hidden="true" />

      <div inert={locked} className={styles.osLayer}>
        <a className={styles.skip} href="#workspace">
          Skip to workspace
        </a>

        <header className={styles.menubar}>
          <button
            type="button"
            className={styles.desktopBrand}
            onClick={() => openApp('About')}
            aria-label="ValeOS — About Valentine Agam"
            title="About Valentine Agam"
          >
            <img className={styles.brandIcon} src="/vale-cat.png" alt="" width={30} height={30} draggable={false} />
            <span>ValeOS</span>
          </button>

          <StatusControls
            clock={clock}
            onSearch={() => setSpotlightOpen(true)}
            darkMode={darkMode}
            onToggleTheme={toggleTheme}
            dockMotion={dockMotion}
            onToggleMotion={toggleDockMotion}
            wallpaperName={WALLPAPERS[wallpaper]}
            onCycleWallpaper={cycleWallpaper}
            music={musicController}
          />
        </header>

        {/* Main Bento OS Workspace */}
        <main
          id="workspace"
          ref={workspace}
          className={mac.workspace}
          tabIndex={-1}
          onTouchStart={(event) => {
            const point = event.touches[0];
            touchStart.current = point && !(event.target as Element).closest(`.${mac.certificateStrip}`)
              ? { x: point.clientX, y: point.clientY }
              : null;
          }}
          onTouchEnd={(event) => {
            const origin = touchStart.current;
            const point = event.changedTouches[0];
            touchStart.current = null;
            if (!origin || !point) return;
            const dx = point.clientX - origin.x;
            const dy = point.clientY - origin.y;
            if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.25) setMobilePage(dx < 0 ? 1 : 0);
          }}
          onTouchCancel={() => { touchStart.current = null; }}
        >
          <div className={mac.mobilePageBar}>
            <div className={mac.mobileSegments} role="group" aria-label="Home screen pages">
              <button type="button" aria-pressed={mobilePage === 0} onClick={() => setMobilePage(0)}>
                Overview
              </button>
              <button type="button" aria-pressed={mobilePage === 1} onClick={() => setMobilePage(1)}>
                Vault &amp; Tools
              </button>
            </div>
          </div>

          <div ref={workspaceGrid} className={mac.grid} data-mobile-page={String(mobilePage)}>
            {/* Left Column: Identity + Capabilities */}
            <div className={mac.column}>
              <DeskWindow
                motionEnabled={motionEnabled}
                className={`${mac.window} ${mac.finder} ${profile.window}`}
                label="Profile overview"
                title="Profile"
                icon={<UserRound />}
                detail="Miri, Sarawak"
              >
                <div className={profile.card}>
                  <div className={profile.hero}>
                    <div className={profile.copy}>
                      <p className={profile.role}>Software engineer</p>
                      <h1>Valentine <span>Agam</span></h1>
                      <p className={profile.description}>
                        I build digital systems at Hospital Miri and develop web products as co-founder of Scribear.
                      </p>
                      <div className={profile.actions}>
                        <button
                          type="button"
                          className={profile.explore}
                          onClick={() => openApp('Projects')}
                        >
                          View projects
                        </button>
                        <button
                          type="button"
                          className={profile.about}
                          onClick={() => openApp('About')}
                        >
                          About me
                        </button>
                        <button
                          type="button"
                          className={profile.resumeLink}
                          onClick={() => openApp('Résumé')}
                        >
                          Résumé
                        </button>
                      </div>
                    </div>

                    <figure className={profile.portrait}>
                      <div className={profile.portraitPhoto}>
                        <img src="/hi.webp" alt="Valentine Agam" width={497} height={502} draggable={false} />
                      </div>
                    </figure>
                  </div>

                  <div className={profile.work}>
                    <button
                      type="button"
                      onClick={() => openApp('Experience')}
                      aria-label="View experience at Hospital Miri"
                    >
                      <span className={`${profile.workLogo} ${profile.hospitalLogo}`}>
                        <img src="/company-logos/kkm.webp" alt="" width={66} height={31} />
                      </span>
                      <span className={profile.workText}>
                        <strong>Hospital Miri</strong>
                        <small>Digital systems</small>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openApp('Experience')}
                      aria-label="View experience at Scribear"
                    >
                      <span className={profile.workLogo}>
                        <img src="/company-logos/scribear.png" alt="" width={34} height={34} />
                      </span>
                      <span className={profile.workText}>
                        <strong>Scribear</strong>
                        <small>Co-founder &amp; developer</small>
                      </span>
                    </button>
                  </div>
                </div>
              </DeskWindow>

              <DeskWindow
                motionEnabled={motionEnabled}
                className={`${mac.window} ${mac.toolbox}`}
                label="Capabilities"
                title="Developer tools"
                icon={<Code2 />}
                action={
                  <button type="button" className={mac.chromeButton} onClick={() => openApp('Skills')}>
                    All skills
                  </button>
                }
              >
                <CapabilityCards onSelect={openSkills} />
              </DeskWindow>
            </div>

            {/* Right Column: Featured Work + 7-Certificate Vault + Mobile Music */}
            <div className={mac.column}>
              <DeskWindow
                motionEnabled={motionEnabled}
                className={`${mac.window} ${mac.featured}`}
                label="Featured work"
                title="Featured work"
                icon={<Folder />}
                action={
                  <button type="button" className={mac.chromeButton} onClick={() => openApp('Projects')}>
                    All projects
                  </button>
                }
              >
                <FeaturedWork onOpen={openProjectById} />
              </DeskWindow>

              <DeskWindow
                motionEnabled={motionEnabled}
                className={`${mac.window} ${mac.credentials}`}
                label="Credentials vault"
                title="Certificates"
                icon={<Award />}
                action={
                  <button type="button" className={mac.chromeButton} onClick={() => openApp('Certificates')}>
                    View all {certificates.length}
                  </button>
                }
              >
                <div className={mac.certVaultBody}>
                  <div className={mac.certShelfWrap}>
                    <ul ref={certShelfRef} className={mac.certificateStrip} aria-label="Verified certificates">
                      {certificates.map((cert) => (
                        <li key={cert.id}>
                          <button
                            type="button"
                            className={mac.certificateThumb}
                            onClick={() => setOpenCertificate(cert)}
                            aria-label={`Inspect ${cert.title}`}
                          >
                            <span className={mac.certificateImage}>
                              {cert.imageSrc ? (
                                <img src={cert.imageSrc} alt="" loading="lazy" draggable={false} />
                              ) : (
                                <FileText aria-hidden="true" />
                              )}
                            </span>
                            <strong>{cert.title}</strong>
                            <small>{cert.issuer}</small>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={mac.certShelfFooter}>
                    <span>{certificates.length} credentials</span>
                    <div className={mac.certShelfArrows}>
                      <button
                        type="button"
                        aria-label="Scroll certificates left"
                        onClick={() => scrollCertShelf(-1)}
                      >
                        <ChevronLeft size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label="Scroll certificates right"
                        onClick={() => scrollCertShelf(1)}
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </DeskWindow>

              {/* Desktop & Mobile Soundtrack Widget */}
              <DeskWindow
                motionEnabled={motionEnabled}
                className={`${mac.window} ${mac.musicWidget}`}
                label="Music player"
                title="Soundtrack"
                icon={<AudioLines />}
                action={
                  <button type="button" className={mac.chromeButton} onClick={() => openApp('Music')}>
                    Queue
                  </button>
                }
              >
                <MusicPlayer controller={musicController} compact usePopover />
              </DeskWindow>
            </div>
          </div>
        </main>

        {/* Desktop Liquid Glass Dock */}
        <footer ref={dock} className={styles.dockArea} data-motion={dockMotion ? 'on' : 'off'}>
          <nav className={styles.dock} aria-label="App dock">
            <button
              type="button"
              className={styles.appIcon}
              onClick={() => {
                setActive(null);
                setLocked(false);
              }}
              aria-label="Home desktop"
            >
              <img src="/dock/home.jpg" alt="" width={512} height={512} draggable={false} />
              <span>Home</span>
              <i className={styles.activeDot} data-open={!active && !locked ? 'true' : 'false'} />
            </button>

            <button
              type="button"
              className={styles.appIcon}
              onClick={() => openApp('Projects')}
              aria-label="Open Projects"
            >
              <img src="/dock/files.jpg" alt="" width={512} height={512} draggable={false} />
              <span>Projects</span>
              <i className={styles.activeDot} data-open={active === 'Projects' ? 'true' : 'false'} />
            </button>

            <button
              type="button"
              className={`${styles.appIcon} ${styles.certIconTile}`}
              onClick={() => openApp('Certificates')}
              aria-label="Open Certificates"
            >
              <Award size={23} strokeWidth={2.2} aria-hidden="true" />
              <span>Certificates</span>
              <i className={styles.activeDot} data-open={active === 'Certificates' ? 'true' : 'false'} />
            </button>

            <button
              type="button"
              className={`${styles.appIcon} ${styles.expIconTile}`}
              onClick={() => openApp('Experience')}
              aria-label="Open Experience"
            >
              <BriefcaseBusiness size={22} strokeWidth={2.2} aria-hidden="true" />
              <span>Experience</span>
              <i className={styles.activeDot} data-open={active === 'Experience' ? 'true' : 'false'} />
            </button>

            <button
              type="button"
              className={`${styles.appIcon} ${styles.skillsIconTile}`}
              onClick={() => openApp('Skills')}
              aria-label="Open Skills"
            >
              <Code2 size={23} strokeWidth={2.3} aria-hidden="true" />
              <span>Skills</span>
              <i className={styles.activeDot} data-open={active === 'Skills' ? 'true' : 'false'} />
            </button>

            <button
              type="button"
              className={styles.appIcon}
              onClick={() => openApp('Résumé')}
              aria-label="Open Résumé"
            >
              <img src="/dock/pages.jpg" alt="" width={512} height={512} draggable={false} />
              <span>Résumé</span>
              <i className={styles.activeDot} data-open={active === 'Résumé' ? 'true' : 'false'} />
            </button>

            <button
              type="button"
              className={styles.appIcon}
              onClick={() => openApp('Contact')}
              aria-label="Open Contact"
            >
              <img src="/dock/mail.jpg" alt="" width={512} height={512} draggable={false} />
              <span>Contact</span>
              <i className={styles.activeDot} data-open={active === 'Contact' ? 'true' : 'false'} />
            </button>

            <button
              type="button"
              className={`${styles.appIcon} ${styles.musicIconTile}`}
              data-playing={playing ? 'true' : 'false'}
              onClick={() => openApp('Music')}
              aria-label="Open Soundtrack"
            >
              <AudioLines size={23} strokeWidth={2.2} aria-hidden="true" />
              <span>{playing ? 'Now Playing' : 'Music'}</span>
              <i className={styles.activeDot} data-open={active === 'Music' || playing ? 'true' : 'false'} />
            </button>

            <button
              type="button"
              className={styles.appIcon}
              onClick={() => openApp('Appearance')}
              aria-label="Open Settings"
            >
              <img src="/dock/photos.jpg" alt="" width={512} height={512} draggable={false} />
              <span>Settings</span>
              <i className={styles.activeDot} data-open={active === 'Appearance' ? 'true' : 'false'} />
            </button>

            <i className={styles.dockDivider} aria-hidden="true" />

            <a
              href={SOCIALS.github.href}
              target="_blank"
              rel="noreferrer"
              className={styles.appIcon}
              aria-label="GitHub profile"
            >
              <img src="/dock/github.jpg" alt="" width={512} height={512} draggable={false} />
              <span>GitHub</span>
            </a>

            <a
              href={SOCIALS.linkedin.href}
              target="_blank"
              rel="noreferrer"
              className={styles.appIcon}
              aria-label="LinkedIn profile"
            >
              <img src="/dock/linkedin.jpg" alt="" width={512} height={512} draggable={false} />
              <span>LinkedIn</span>
            </a>
          </nav>
        </footer>

        {/* Mobile iOS Floating Glass Dock */}
        <nav className={styles.mobileDock} aria-label="Mobile navigation">
          <button
            type="button"
            className={styles.mobileDockBtn}
            data-active={!active ? 'true' : 'false'}
            onClick={() => {
              setMobilePage(0);
              workspace.current?.scrollTo({ top: 0 });
            }}
          >
            <Home size={20} />
            <span>Home</span>
          </button>
          <button
            type="button"
            className={styles.mobileDockBtn}
            data-active={active === 'Projects' ? 'true' : 'false'}
            onClick={() => openApp('Projects')}
          >
            <Folder size={20} />
            <span>Work</span>
          </button>
          <button
            type="button"
            className={styles.mobileDockBtn}
            data-active={active === 'Certificates' ? 'true' : 'false'}
            onClick={() => openApp('Certificates')}
          >
            <Award size={20} />
            <span>Certs</span>
          </button>
          <button
            type="button"
            className={styles.mobileDockBtn}
            data-active={active === 'About' || active === 'Experience' ? 'true' : 'false'}
            onClick={() => openApp('About')}
          >
            <UserRound size={20} />
            <span>About</span>
          </button>
          <button
            type="button"
            className={styles.mobileDockBtn}
            data-active={active === 'Contact' || active === 'Résumé' ? 'true' : 'false'}
            onClick={() => openApp('Contact')}
          >
            <MessageCircle size={20} />
            <span>Contact</span>
          </button>
        </nav>

        {/* Interactive OS App Window / Mobile Native Sheet */}
        <dialog
          ref={dialog}
          onCancel={(event) => {
            event.preventDefault();
            closeWindow();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeWindow();
          }}
          data-window-motion={motionEnabled ? 'on' : 'off'}
          className={`${styles.dialog} ${maximized ? mac.maximized : ''}`}
          aria-labelledby="app-title"
        >
          <div className={styles.dialogInner}>
            <span className={styles.sheetGrabber} aria-hidden="true" />
            <header className={mac.modalBar}>
              <div className={mac.modalTraffic}>
                <button type="button" onClick={closeWindow} aria-label="Close window">
                  <X size={9} />
                </button>
                <button type="button" onClick={closeWindow} aria-label="Minimize window">
                  <span>−</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMaximized((value) => !value)}
                  aria-label={maximized ? 'Restore window size' : 'Expand window'}
                >
                  <Maximize2 size={8} />
                </button>
              </div>
              <h2 className={mac.modalTitle} id="app-title">
                {active}
              </h2>
              <button
                type="button"
                className={mac.floatingClose}
                onClick={closeWindow}
                aria-label="Close window"
              >
                Done
              </button>
            </header>

            <div ref={appContent} className={styles.appContent}>
              {active === 'Projects' && (
                <ProjectsGallery selected={selectedProject} onSelect={setSelectedProject} />
              )}

              {active === 'About' && (
                <AboutProfile onSelectCertificate={(cert) => setOpenCertificate(cert)} />
              )}

              {active === 'Experience' && (
                <>
                  <div className={styles.appHeading}>
                    <h3>Work experience</h3>
                    <p>Software engineering across healthcare, client products, recruitment AI, and GIS.</p>
                  </div>
                  <div className={styles.timeline}>
                    {workExperience.map((item) => (
                      <article key={item.id}>
                        <div className={styles.timelineLogo}>
                          {item.logoSrc ? (
                            <img src={item.logoSrc} alt="" width={36} height={36} loading="lazy" />
                          ) : (
                            <BriefcaseBusiness size={20} />
                          )}
                        </div>
                        <div>
                          <div className={styles.timelineMeta}>
                            <span className={styles.timelineDate}>{item.dateRange}</span>
                            <span>{item.location}</span>
                          </div>
                          <h4>{item.company}</h4>
                          {item.roles.map((role) => (
                            <div key={role.title}>
                              <h5>{role.title}</h5>
                              <ul>
                                {role.highlights.map((line) => (
                                  <li key={line}>{line}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          {item.stack && (
                            <div className={styles.tags}>
                              {item.stack.map((tag) => (
                                <span key={tag}>{tag}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}

              {active === 'Skills' && (
                <>
                  <div className={styles.appHeading}>
                    <h3>Languages, tools, and frameworks</h3>
                    <p>Production technologies I use across full-stack engineering, cloud, AI, and geospatial work.</p>
                  </div>

                  <div className={styles.filterPills} role="group" aria-label="Filter technologies">
                    {(
                      [
                        { value: 'all', label: 'All technologies' },
                        { value: 'web', label: 'Web & backend' },
                        { value: 'ai', label: 'AI & data' },
                      ] as const
                    ).map((filter) => (
                      <button
                        type="button"
                        key={filter.value}
                        aria-pressed={skillFocus === filter.value}
                        onClick={() => setSkillFocus(filter.value)}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  <div className={styles.skillGrid}>
                    {[
                      { focus: 'web', title: 'Languages & backend', icon: <Terminal size={18} />, values: programmingSkills },
                      { focus: 'web', title: 'Full-stack & cloud infra', icon: <Layers3 size={18} />, values: fullStackSkills },
                      { focus: 'ai', title: 'AI & machine learning', icon: <Cpu size={18} />, values: aiSkills },
                      { focus: 'ai', title: 'Data & geospatial', icon: <Code2 size={18} />, values: designDataSkills },
                    ]
                      .filter((group) => skillFocus === 'all' || group.focus === skillFocus)
                      .map((group) => {
                        const withLogos = group.values.filter((value) => skillLogos[value]);
                        return (
                          <section key={group.title}>
                            <div className={styles.skillHeader}>
                              <span className={styles.skillHeaderTitle}>
                                {group.icon}
                                <h4>{group.title}</h4>
                              </span>
                              <span className={styles.skillCount}>{withLogos.length}</span>
                            </div>
                            <div className={styles.skillLogos}>
                              {withLogos.map((value) => (
                                <div className={styles.skillTile} key={value}>
                                  <span className={styles.skillTileIcon}>
                                    <img
                                      src={`/tech/${skillLogos[value]}`}
                                      alt=""
                                      width={18}
                                      height={18}
                                      loading="lazy"
                                      draggable={false}
                                    />
                                  </span>
                                  <span>{value}</span>
                                </div>
                              ))}
                            </div>
                          </section>
                        );
                      })}
                  </div>
                </>
              )}

              {active === 'Certificates' && (
                <>
                  <div className={styles.appHeading}>
                    <h3>Verified certificates &amp; awards</h3>
                    <p>
                      Cloud, cybersecurity, ethical hacking, machine learning, and academic credentials. Select any
                      certificate to inspect full size or verify online.
                    </p>
                  </div>

                  <div className={styles.filterPills} role="group" aria-label="Filter certificates by category">
                    {CERT_FILTERS.map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        aria-pressed={certFilter === cat}
                        onClick={() => setCertFilter(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className={styles.certAppGrid}>
                    {filteredCertificates.map((cert) => (
                      <button
                        type="button"
                        key={cert.id}
                        className={styles.certAppCard}
                        onClick={() => setOpenCertificate(cert)}
                      >
                        <div className={styles.certAppMedia}>
                          {cert.badge && <span className={styles.certNewTag}>{cert.badge}</span>}
                          {cert.imageSrc && (
                            <img src={cert.imageSrc} alt={cert.imageAlt} loading="lazy" draggable={false} />
                          )}
                        </div>
                        <div className={styles.certAppBody}>
                          <div className={styles.certAppMeta}>
                            <span>{cert.issuer}</span>
                            <span>{cert.date}</span>
                          </div>
                          <h4>{cert.title}</h4>
                          <p>{cert.subtitle}</p>
                          <div className={styles.certAppFooter}>
                            <span>{cert.verifyUrl ? 'Verifiable credential' : cert.category}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {active === 'Music' && (
                <>
                  <div className={styles.appHeading}>
                    <h3>Workspace soundtrack</h3>
                    <p>Curated playlist that stays playing seamlessly as you browse ValeOS.</p>
                  </div>
                  <div className={mac.musicInSettings}>
                    <MusicPlayer controller={musicController} defaultExpanded />
                  </div>
                </>
              )}

              {active === 'Résumé' && (
                <>
                  <div className={styles.resumeHeader}>
                    <div>
                      <h3>Valentine Agam</h3>
                      <p>Software Engineer — Full-Stack, Backend, Cloud &amp; AI/ML</p>
                    </div>
                    <div className={styles.resumeActions}>
                      <a className={styles.primaryButton} href={RESUME_HREF} download>
                        <ArrowDownToLine size={16} /> Download PDF
                      </a>
                      <a className={styles.secondaryButton} href={RESUME_HREF} target="_blank" rel="noreferrer">
                        Open in tab
                      </a>
                    </div>
                  </div>
                  <iframe className={styles.pdf} src={RESUME_HREF} title="Valentine Agam résumé PDF" />
                  <div className={styles.mobileResumeCard}>
                    <h4>2026 Engineering Résumé (PDF)</h4>
                    <p>
                      Includes roles at Hospital Miri, Scribear, Zenara Jaya, and Sarawak Oil Palms Berhad, plus UNIMAS
                      education and security/cloud credentials.
                    </p>
                    <a className={styles.primaryButton} href={RESUME_HREF} target="_blank" rel="noreferrer">
                      Open full PDF résumé
                    </a>
                  </div>
                </>
              )}

              {active === 'Contact' && (
                <div className={styles.contactPage}>
                  <div className={styles.contactBadge} aria-hidden="true">
                    <Sparkles size={26} />
                  </div>
                  <h3>Get in touch</h3>
                  <p>
                    For software engineering roles, hospital or enterprise systems, or client collaborations via
                    Scribear, connect with me on LinkedIn or GitHub.
                  </p>
                  <div className={styles.contactLinks}>
                    <a href={SOCIALS.linkedin.href} target="_blank" rel="noreferrer">
                      <span className={styles.contactLinkIcon}>
                        <Linkedin size={20} />
                      </span>
                      <div>
                        <strong>Connect on LinkedIn</strong>
                        <span>Direct messages and professional updates</span>
                      </div>
                    </a>

                    <a href={SOCIALS.github.href} target="_blank" rel="noreferrer">
                      <span className={styles.contactLinkIcon}>
                        <Github size={20} />
                      </span>
                      <div>
                        <strong>Explore GitHub</strong>
                        <span>Open-source repositories, releases, and code</span>
                      </div>
                    </a>

                    <button type="button" onClick={handleCopyPortfolioUrl}>
                      <span className={styles.contactLinkIcon}>
                        {copiedUrl ? <Check size={20} /> : <Copy size={20} />}
                      </span>
                      <div>
                        <strong>{copiedUrl ? 'Portfolio link copied' : 'Copy portfolio URL'}</strong>
                        <span>{SITE_URL}</span>
                      </div>
                    </button>
                  </div>
                  <span className={styles.locationLine}>
                    <MapPin size={14} aria-hidden="true" /> Miri, Sarawak, Malaysia
                  </span>
                </div>
              )}

              {active === 'Appearance' && (
                <>
                  <div className={styles.appHeading}>
                    <h3>Appearance &amp; audio</h3>
                    <p>Personalize your ValeOS wallpaper, color mode, motion, and workspace soundtrack.</p>
                  </div>

                  <div className={styles.wallpaperChoices}>
                    {WALLPAPERS.map((name, index) => (
                      <button
                        type="button"
                        key={name}
                        className={`${styles.wallpaperChoice} ${styles[`wallpaper${index}`]}`}
                        onClick={() => chooseWallpaper(index)}
                        aria-pressed={wallpaper === index}
                      >
                        <span className={styles.wallpaperPreview} />
                        <strong>
                          {name}
                          {wallpaper === index && <Check size={15} />}
                        </strong>
                      </button>
                    ))}
                  </div>

                  <div className={styles.settingGroup}>
                    <label className={styles.motionSetting}>
                      <span>
                        <strong>Dark liquid glass</strong>
                        <small>Switch between obsidian dark glass and pearl light glass.</small>
                      </span>
                      <input type="checkbox" role="switch" checked={darkMode} onChange={toggleTheme} />
                    </label>

                    <label className={styles.motionSetting}>
                      <span>
                        <strong>OS motion physics</strong>
                        <small>Spring dock magnification and smooth window transitions.</small>
                      </span>
                      <input type="checkbox" role="switch" checked={dockMotion} onChange={toggleDockMotion} />
                    </label>
                  </div>

                  <div className={mac.musicInSettings}>
                    <MusicPlayer controller={musicController} defaultExpanded />
                  </div>
                </>
              )}
            </div>
          </div>
        </dialog>
      </div>

      {/* Spotlight Command Palette */}
      <SpotlightModal
        open={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onOpenApp={openApp}
        onOpenProject={openProjectById}
        onOpenCertificate={(cert) => setOpenCertificate(cert)}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onCycleWallpaper={cycleWallpaper}
      />

      {/* High-Res Certificate Inspector Lightbox */}
      {openCertificate && (
        <dialog
          ref={certificateDialog}
          className={styles.certOverlay}
          aria-label={openCertificate.title}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              closeCertificate();
            }
          }}
          onCancel={(event) => {
            event.preventDefault();
            closeCertificate();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeCertificate();
          }}
        >
          <div className={styles.certPreview}>
            <div className={styles.certPreviewHeader}>
              <div>
                <small>
                  {openCertificate.issuer} ({openCertificate.date})
                </small>
                <strong>{openCertificate.title}</strong>
              </div>
              <button
                type="button"
                className={styles.certPreviewClose}
                onClick={closeCertificate}
                aria-label="Close certificate preview"
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.certPreviewScroll}>
              <div className={styles.certPreviewStage}>
                {openCertificate.imageSrc && (
                  <img src={openCertificate.imageSrc} alt={openCertificate.imageAlt} />
                )}
              </div>

              <div className={styles.certPreviewDetails}>
                <p>{openCertificate.subtitle}</p>

                {openCertificate.courses && openCertificate.courses.length > 0 && (
                  <div className={styles.certCourseList} aria-label="Completed courses">
                    {openCertificate.courses.map((course) => (
                      <span key={course}>{course}</span>
                    ))}
                  </div>
                )}

                <div className={styles.certPreviewActions}>
                  {openCertificate.verifyUrl && (
                    <a
                      href={openCertificate.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.primaryButton}
                    >
                      <ShieldCheck size={16} /> Verify on Coursera
                    </a>
                  )}
                  {openCertificate.imageSrc && (
                    <a
                      href={openCertificate.imageSrc}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.secondaryButton}
                    >
                      Open full image
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}

      {locked && <StartupScreen onComplete={finishStartup} />}
    </div>
  );
}
