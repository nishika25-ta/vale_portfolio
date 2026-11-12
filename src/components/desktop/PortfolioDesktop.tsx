'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ArrowDownToLine, ArrowRight, ArrowUpRight, AudioLines, BriefcaseBusiness, Check, Code2, Cpu, FileText, Folder, Github, Layers3, Linkedin, MapPin, Maximize2, Menu, MessageCircle, Settings2, Sparkles, Terminal, UserRound, X } from 'lucide-react';
import { RESUME_HREF, SOCIALS } from '@/data/profile';
import { certificates, type Certificate } from '@/data/certificates';
import { workExperience } from '@/data/workExperience';
import { aiSkills, designDataSkills, fullStackSkills, programmingSkills, skillLogos } from '@/data/skills';
import { AboutProfile } from './AboutProfile';
import { ProjectsGallery } from './ProjectsGallery';
import { MusicPlayer } from './MusicPlayer';
import aboutStyles from './about.module.css';
import styles from './desktop.module.css';
import mac from './workspace.module.css';
import profile from './profile.module.css';
import { CapabilityCards } from './CapabilityCards';
import { StatusControls } from './StatusControls';
import { StartupScreen } from './StartupScreen';

type App = 'About' | 'Projects' | 'Skills' | 'Experience' | 'Résumé' | 'Contact' | 'Appearance';
const wallpapers = ['Golden hour', 'After hours', 'Northern lights'] as const;

function windowOpenFrames(x: number, y: number): Keyframe[] {
  return Array.from({ length: 45 }, (_, index) => {
    const offset = index / 44;
    const time = offset * .68;
    const progress = index === 44 ? 1 : 1 - Math.exp(-12 * time) * (Math.cos(15 * time) + .8 * Math.sin(15 * time));
    return {
      offset,
      opacity: Math.min(1, offset / .18),
      transform: `translate3d(${x * (1 - progress)}px, ${y * (1 - progress)}px, 0) scale(${.9 + .1 * progress})`,
    };
  });
}


const NAME_FIRST = 'Valentine';
const NAME_LAST = 'Agam';

function TypedName({ motion }: { motion: boolean }) {
  const total = NAME_FIRST.length + NAME_LAST.length;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!motion) {
      setCount(total);
      return;
    }
    setCount(0);
    let index = 0;
    let timer = 0;
    const tick = () => {
      index += 1;
      setCount(index);
      if (index >= total) return;
      timer = window.setTimeout(tick, index === NAME_FIRST.length ? 260 : 68);
    };
    timer = window.setTimeout(tick, 380);
    return () => window.clearTimeout(timer);
  }, [motion, total]);

  const first = NAME_FIRST.slice(0, Math.min(count, NAME_FIRST.length));
  const last = NAME_LAST.slice(0, Math.max(0, count - NAME_FIRST.length));
  const onFirstLine = count <= NAME_FIRST.length;
  const glyph = (char: string, key: string) => <span className={profile.glyph} key={key}>{char}</span>;

  return <h2 className={profile.name} aria-label="Valentine Agam">
    <span className={profile.nameGhost} aria-hidden="true">Valentine<br /><span className={profile.surname}>Agam</span></span>
    <span className={profile.nameLive} aria-hidden="true">
      {Array.from(first, (char, index) => glyph(char, `v${index}`))}
      {onFirstLine ? <span className={profile.cursor} /> : null}
      <br />
      <span className={profile.surname}>
        {Array.from(last, (char, index) => glyph(char, `a${index}`))}
        {onFirstLine ? null : <span className={profile.cursor} />}
      </span>
    </span>
  </h2>;
}

function WorkspaceTitle({ title, icon, detail, action }: { title: string; icon: ReactNode; detail?: string; action?: ReactNode }) {
  return <header className={mac.chrome}><span className={mac.traffic} aria-hidden="true"><i /><i /><i /></span><span className={mac.windowTitle}>{icon}{title}</span>{action ?? <span className={mac.chromeMeta}>{detail}</span>}</header>;
}

export default function PortfolioDesktop() {
  const [active, setActive] = useState<App | null>(null);
  const [maximized, setMaximized] = useState(false);
  const [skillFocus, setSkillFocus] = useState<'all' | 'web' | 'ai'>('all');
  const [wallpaper, setWallpaper] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [clock, setClock] = useState<Date | null>(null);
  const [menu, setMenu] = useState(false);
  const [locked, setLocked] = useState(true);

  const [selected, setSelected] = useState<string | null>(null);
  const [openCertificate, setOpenCertificate] = useState<Certificate | null>(null);
  const [certificateIndex, setCertificateIndex] = useState(0);
  const [certificateDirection, setCertificateDirection] = useState(1);
  const reducedMotion = useReducedMotion();
  const currentCertificate = certificates[certificateIndex];
  const changeCertificate = (step: number) => { setCertificateDirection(step > 0 ? 1 : -1); setCertificateIndex(index => (index + step + certificates.length) % certificates.length); };
  const [dockMotion, setDockMotion] = useState(true);
  const finishStartup = useCallback(() => setLocked(false), []);
  const dialog = useRef<HTMLDialogElement>(null);
  const appContent = useRef<HTMLDivElement>(null);
  const dock = useRef<HTMLElement>(null);
  const windowAnimation = useRef<Animation | null>(null);
  const launchOrigin = useRef<{ x: number; y: number; width: number; height: number; element: HTMLElement } | null>(null);
  const pointerLauncher = useRef<HTMLElement | null>(null);

  const closeWindow = useCallback(() => {
    const element = dialog.current;
    if (!element?.open || !dockMotion) { setActive(null); return; }
    if (element.dataset.closing === 'true') return;
    const current = getComputedStyle(element);
    const firstFrame = { opacity: current.opacity, transform: current.transform, borderRadius: current.borderRadius };
    windowAnimation.current?.cancel();
    const bounds = element.getBoundingClientRect();
    const source = launchOrigin.current;
    const liveSource = source?.element.isConnected ? source.element.getBoundingClientRect() : null;
    const target = liveSource?.width && liveSource.height ? { x: liveSource.left + liveSource.width / 2, y: liveSource.top + liveSource.height / 2, width: liveSource.width, height: liveSource.height } : source;
    const x = target ? target.x - bounds.left - bounds.width / 2 : 0;
    const y = target ? target.y - bounds.top - bounds.height / 2 : 30;
    const scale = target ? Math.max(.025, Math.min(target.width / bounds.width, target.height / bounds.height, .3)) : .92;
    const transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    element.dataset.closing = 'true';
    const animation = element.animate([
      firstFrame,
      { opacity: .98, offset: .55 },
      { opacity: 0, transform, borderRadius: `${Math.min(bounds.width / 2, 12 / scale)}px` },
    ], { duration: target ? 560 : 320, easing: 'cubic-bezier(.32,.72,0,1)', fill: 'forwards' });
    windowAnimation.current = animation;
    void animation.finished.then(() => {
      if (windowAnimation.current === animation) {
        element.close();
        setActive(null);
        if (target && source?.element.isConnected) source.element.focus({ preventScroll: true });
      }
    }).catch(() => {});
  }, [dockMotion]);

  useEffect(() => {
    const root = dock.current;
    if (!root) return;
    let dispose = () => {};

    function configure() {
      dispose();
      const isTouchOnly = typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      if (!root || !dockMotion || isTouchOnly) return;
      const container = root;

      const glass = container.querySelector<HTMLElement>(`.${styles.dock}`);
      if (!glass) return;

      const dockChildren = Array.from(glass.children) as HTMLElement[];
      const leftShortcuts = container.querySelectorAll<HTMLElement>(`.${styles.dockShortcuts}:first-child > button`);
      const rightShortcuts = container.querySelectorAll<HTMLElement>(`.${styles.dockShortcuts}:last-of-type > button`);

      interface SlotGeometry {
        el: HTMLElement;
        isIcon: boolean;
        isDivider: boolean;
        width: number;
        centerX: number;
        x: number;
        vx: number;
        y: number;
        vy: number;
        scale: number;
        vScale: number;
        targetX: number;
        targetY: number;
        targetScale: number;
        bounceY: number;
        vBounceY: number;
      }

      interface ShortcutGeometry {
        el: HTMLElement;
        group: 'left' | 'right';
        centerX: number;
        centerY: number;
        width: number;
        x: number;
        vx: number;
        y: number;
        vy: number;
        scale: number;
        vScale: number;
        targetX: number;
        targetY: number;
        targetScale: number;
      }

      let dockBounds = glass.getBoundingClientRect();
      let rootBounds = container.getBoundingClientRect();

      let slots: SlotGeometry[] = [];
      let shortcuts: ShortcutGeometry[] = [];

      function measure() {
        if (!glass || !container) return;
        dockBounds = glass.getBoundingClientRect();
        rootBounds = container.getBoundingClientRect();

        slots = dockChildren.map(el => {
          const isIcon = el.classList.contains(styles.appIcon);
          const isDivider = el.classList.contains(styles.dockDivider);
          const width = el.offsetWidth;
          const centerX = el.offsetLeft + width / 2;
          return {
            el,
            isIcon,
            isDivider,
            width,
            centerX,
            x: 0,
            vx: 0,
            y: 0,
            vy: 0,
            scale: 1,
            vScale: 0,
            targetX: 0,
            targetY: 0,
            targetScale: 1,
            bounceY: 0,
            vBounceY: 0,
          };
        });

        shortcuts = [
          ...Array.from(leftShortcuts).map(el => {
            const parent = el.offsetParent as HTMLElement | null;
            const pBounds = parent ? parent.getBoundingClientRect() : rootBounds;
            return {
              el,
              group: 'left' as const,
              centerX: pBounds.left + el.offsetLeft + el.offsetWidth / 2,
              centerY: pBounds.top + el.offsetTop + el.offsetHeight / 2,
              width: el.offsetWidth,
              x: 0,
              vx: 0,
              y: 0,
              vy: 0,
              scale: 1,
              vScale: 0,
              targetX: 0,
              targetY: 0,
              targetScale: 1,
            };
          }),
          ...Array.from(rightShortcuts).map(el => {
            const parent = el.offsetParent as HTMLElement | null;
            const pBounds = parent ? parent.getBoundingClientRect() : rootBounds;
            return {
              el,
              group: 'right' as const,
              centerX: pBounds.left + el.offsetLeft + el.offsetWidth / 2,
              centerY: pBounds.top + el.offsetTop + el.offsetHeight / 2,
              width: el.offsetWidth,
              x: 0,
              vx: 0,
              y: 0,
              vy: 0,
              scale: 1,
              vScale: 0,
              targetX: 0,
              targetY: 0,
              targetScale: 1,
            };
          }),
        ];
      }

      measure();

      let activePointer: { x: number; y: number } | null = null;
      let smoothX = dockBounds.width / 2;
      let smoothStrength = 0;
      let rafId: number | null = null;
      let lastTime = 0;
      let activeTipIndex = -1;
      let writtenPose: string[] = [];
      let writtenShortcut: string[] = [];
      let glassExpand = '';
      let glassGlow = '';
      let glassPresence = '';

      container.dataset.liquid = 'true';

      const maxGrow = 0.62;

      function iconWidth() {
        for (let i = 0; i < slots.length; i++) {
          if (slots[i].isIcon && slots[i].width > 0) return slots[i].width;
        }
        return 46;
      }

      function bell(distance: number, radius: number) {
        if (distance >= radius || radius <= 0) return 0;
        return 0.5 * (1 + Math.cos((distance / radius) * Math.PI));
      }

      function influenceRadius() {
        return iconWidth() * 2.8;
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
        let pointerInDock = false;
        if (activePointer && glass && dockBounds.width > 0) {
          const pointerDockX = activePointer.x - dockBounds.left;
          const pointerDockY = activePointer.y - (dockBounds.top + dockBounds.height / 2);
          const outsideX = Math.max(0, -pointerDockX, pointerDockX - dockBounds.width);
          const halfH = dockBounds.height / 2;
          const yWeight = pointerDockY < -halfH
            ? bell(-pointerDockY - halfH, 68)
            : pointerDockY > halfH
              ? bell(pointerDockY - halfH, 40)
              : 1;
          const xWeight = outsideX === 0 ? 1 : bell(outsideX, 24);
          targetStrength = xWeight * yWeight;
          if (targetStrength > 0.004) {
            if (smoothStrength < 0.06 && Math.abs(pointerDockX - smoothX) > influenceRadius() * 0.9) smoothX = pointerDockX;
            smoothX = approach(smoothX, pointerDockX, 0.02, dt);
            pointerInDock = true;
          }
        }

        const strengthTau = targetStrength > smoothStrength ? 0.028 : 0.078;
        smoothStrength = approach(smoothStrength, targetStrength, strengthTau, dt);
        if (smoothStrength < 0.0008) smoothStrength = 0;

        const field = solveMagnification(smoothX, smoothStrength);

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
        if (hotIndex !== -1 && smoothStrength > 0.34 && hotScale > 1.08) {
          const currentScale = activeTipIndex >= 0 ? field.scales[activeTipIndex] : 0;
          if (activeTipIndex < 0 || hotIndex === activeTipIndex || hotScale > currentScale + 0.045) activeTipIndex = hotIndex;
        } else {
          activeTipIndex = -1;
        }

        for (let i = 0; i < slots.length; i++) {
          const slot = slots[i];
          slot.scale = field.scales[i];
          slot.x = field.shifts[i];
          slot.y = 0;
          if (Math.abs(slot.bounceY) > 0.03 || Math.abs(slot.vBounceY) > 0.35) {
            const bounced = stepBounce(slot.bounceY, slot.vBounceY, dt);
            slot.bounceY = bounced.offset;
            slot.vBounceY = bounced.velocity;
          } else {
            slot.bounceY = 0;
            slot.vBounceY = 0;
          }
          const pose = `${slot.x.toFixed(2)} ${slot.bounceY.toFixed(2)} ${slot.scale.toFixed(4)}`;
          if (writtenPose[i] !== pose) {
            writtenPose[i] = pose;
            slot.el.style.transform = `translate3d(${slot.x.toFixed(2)}px,${slot.bounceY.toFixed(2)}px,0) scale(${slot.scale.toFixed(4)})`;
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

        if (writtenShortcut.length !== shortcuts.length) writtenShortcut = new Array(shortcuts.length).fill('');
        for (let i = 0; i < shortcuts.length; i++) {
          const sc = shortcuts[i];
          const yieldX = (sc.group === 'left' ? -1 : 1) * field.total * 0.5;
          let localX = 0;
          let localY = 0;
          let localScale = 1;
          if (activePointer && !pointerInDock) {
            const dx = activePointer.x - sc.centerX;
            const dy = activePointer.y - sc.centerY;
            const weight = bell(Math.hypot(dx, dy * 0.85), 86);
            localScale = 1 + weight * 0.055;
            localY = -weight * 2.5;
            localX = (dx < 0 ? 1 : -1) * weight * 1.5;
          }
          if (pointerInDock) {
            sc.x = yieldX;
            sc.y = approach(sc.y, 0, 0.05, dt);
            sc.scale = approach(sc.scale, 1, 0.05, dt);
          } else {
            sc.x = approach(sc.x, yieldX + localX, 0.05, dt);
            sc.y = approach(sc.y, localY, 0.05, dt);
            sc.scale = approach(sc.scale, localScale, 0.05, dt);
          }
          const pose = `${sc.x.toFixed(2)} ${sc.y.toFixed(2)} ${sc.scale.toFixed(4)}`;
          if (writtenShortcut[i] !== pose) {
            writtenShortcut[i] = pose;
            sc.el.style.transform = `translate3d(${sc.x.toFixed(2)}px,${sc.y.toFixed(2)}px,0) scale(${sc.scale.toFixed(4)})`;
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
          for (let i = 0; i < shortcuts.length; i++) {
            const sc = shortcuts[i];
            if (Math.abs(sc.scale - 1) > 0.001 || Math.abs(sc.x) > 0.05 || Math.abs(sc.y) > 0.05) {
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
          slots.forEach(slot => {
            slot.el.style.transform = '';
            slot.scale = 1;
            slot.vScale = 0;
            slot.x = 0;
            slot.vx = 0;
            slot.y = 0;
            slot.vy = 0;
            slot.bounceY = 0;
            slot.vBounceY = 0;
            if (slot.isIcon) {
              slot.el.style.removeProperty('--icon-scale');
              slot.el.style.zIndex = '';
              delete slot.el.dataset.tip;
            }
          });
          shortcuts.forEach(sc => {
            sc.el.style.transform = '';
            sc.scale = 1;
            sc.vScale = 0;
            sc.x = 0;
            sc.vx = 0;
            sc.y = 0;
            sc.vy = 0;
          });
          writtenPose = [];
          writtenShortcut = [];
          activeTipIndex = -1;
          container.dataset.tracking = 'false';
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

      function onPointerMove(e: PointerEvent) {
        if (e.pointerType === 'touch') return;
        if (dockBounds.width === 0 || slots.length === 0) measure();
        activePointer = { x: e.clientX, y: e.clientY };
        container.dataset.tracking = 'true';

        const shortcutBtn = (e.target as HTMLElement)?.closest<HTMLElement>(`.${styles.dockShortcuts} > button`);
        if (shortcutBtn) {
          const rect = shortcutBtn.getBoundingClientRect();
          shortcutBtn.style.setProperty('--pill-x', `${(e.clientX - rect.left).toFixed(1)}px`);
          shortcutBtn.style.setProperty('--pill-y', `${(e.clientY - rect.top).toFixed(1)}px`);
        }

        startLoop();
      }

      function onPointerLeave() {
        activePointer = null;
        startLoop();
      }

      function onPress(e: Event) {
        if (e instanceof PointerEvent && (e.pointerType === 'touch' || e.button !== 0)) return;
        if (e instanceof MouseEvent && e.type === 'click' && e.detail !== 0) return;
        const iconBtn = (e.target as HTMLElement)?.closest<HTMLElement>(`.${styles.appIcon}`);
        if (!iconBtn) return;
        const slot = slots.find(s => s.el === iconBtn);
        if (slot) {
          slot.vBounceY = Math.max(-980, slot.vBounceY - 520);
          startLoop();
        }
      }

      function onResize() {
        measure();
        startLoop();
      }

      container.addEventListener('pointermove', onPointerMove);
      container.addEventListener('pointerleave', onPointerLeave);
      container.addEventListener('pointercancel', onPointerLeave);
      container.addEventListener('pointerdown', onPress);
      container.addEventListener('click', onPress);
      window.addEventListener('resize', onResize);

      dispose = () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        container.removeEventListener('pointermove', onPointerMove);
        container.removeEventListener('pointerleave', onPointerLeave);
        container.removeEventListener('pointercancel', onPointerLeave);
        container.removeEventListener('pointerdown', onPress);
        container.removeEventListener('click', onPress);
        window.removeEventListener('resize', onResize);
        delete container.dataset.liquid;
        delete container.dataset.tracking;
        if (glass) {
          glass.style.removeProperty('--dock-expand');
          glass.style.removeProperty('--dock-glow-x');
          glass.style.removeProperty('--dock-presence');
        }
        dockChildren.forEach(el => {
          el.style.transform = '';
          el.style.removeProperty('--icon-scale');
          el.style.zIndex = '';
          delete el.dataset.tip;
        });
        leftShortcuts.forEach(el => { el.style.transform = ''; });
        rightShortcuts.forEach(el => { el.style.transform = ''; });
      };
    }

    configure();
    window.addEventListener('resize', configure);
    return () => { dispose(); window.removeEventListener('resize', configure); };
  }, [dockMotion]);

  useEffect(() => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    try { const saved = localStorage.getItem('vale-theme'); setDarkMode(saved === 'dark' || (saved !== 'light' && systemDark)); } catch { setDarkMode(systemDark); }
    try { setDockMotion(localStorage.getItem('vale-dock-motion') !== 'off'); } catch { /* Use the requested motion when storage is unavailable. */ }
    try { const saved = Number(localStorage.getItem('vale-wallpaper')); if (saved >= 0 && saved < wallpapers.length) setWallpaper(saved); } catch { /* Storage may be unavailable in private browsing. */ }
  }, []);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const updateClock = () => {
      clearTimeout(timer);
      if (document.hidden) return;
      setClock(new Date());
      timer = setTimeout(updateClock, 60_000 - Date.now() % 60_000);
    };
    updateClock();
    document.addEventListener('visibilitychange', updateClock);
    return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', updateClock); };
  }, []);
  useEffect(() => {
    const element = dialog.current;
    windowAnimation.current?.cancel();
    if (element) delete element.dataset.closing;
    if (active) {
      element?.showModal();
      if (dockMotion && element) {
        const bounds = element.getBoundingClientRect();
        const source = launchOrigin.current;
        const x = source ? Math.max(-55, Math.min(55, (source.x - bounds.left - bounds.width / 2) * .12)) : 0;
        const y = source ? Math.max(-45, Math.min(65, (source.y - bounds.top - bounds.height / 2) * .14)) : 28;
        windowAnimation.current = element.animate(windowOpenFrames(x, y), { duration: 680, easing: 'linear' });
      }
    } else element?.close();
    const previousOverflow = document.body.style.overflow;
    if (active || locked) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; windowAnimation.current?.cancel(); };
  }, [active, locked, dockMotion]);
  useEffect(() => { appContent.current?.scrollTo({ top: 0 }); }, [active, selected]);
  useEffect(() => {
    if (!openCertificate) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpenCertificate(null); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [openCertificate]);
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') { event.preventDefault(); launchOrigin.current = null; setLocked(false); setSelected(null); setMenu(false); setActive('Projects'); }

    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [locked]);


  const open = useCallback((app: App, focus: 'all' | 'web' | 'ai' = 'all') => {
    if (app === 'Skills') setSkillFocus(focus);
    setMaximized(false);
    const focused = document.activeElement;
    const trigger = pointerLauncher.current ?? (focused instanceof HTMLElement && focused !== document.body ? focused : null);
    pointerLauncher.current = null;
    const bounds = trigger?.getBoundingClientRect();
    launchOrigin.current = bounds?.width && bounds.height && trigger ? { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2, width: bounds.width, height: bounds.height, element: trigger } : null;
    setActive(app); setMenu(false); setSelected(null);
  }, []);
  const openSkills = useCallback((focus: 'web' | 'ai') => open('Skills', focus), [open]);
  function chooseWallpaper(index: number) { setWallpaper(index); try { localStorage.setItem('vale-wallpaper', String(index)); } catch { /* Keep the session preference when storage is unavailable. */ } }
  function toggleTheme() {
    const next = !darkMode;
    try { localStorage.setItem('vale-theme', next ? 'dark' : 'light'); } catch { /* Keep the session preference when storage is unavailable. */ }
    const page = document as Document & { startViewTransition?: (update: () => void) => unknown };
    if (page.startViewTransition && dockMotion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      page.startViewTransition(() => flushSync(() => setDarkMode(next)));
    } else setDarkMode(next);
  }
  function toggleDockMotion() {
    const enabled = !dockMotion;
    setDockMotion(enabled);
    try { localStorage.setItem('vale-dock-motion', enabled ? 'on' : 'off'); } catch { /* Keep the session preference when storage is unavailable. */ }
  }
  return <div className={`${styles.desktop} ${styles[`wallpaper${wallpaper}`]}`} data-theme={darkMode ? 'dark' : 'light'} onPointerDownCapture={event => { if (event.target instanceof Element) { const trigger = event.target.closest<HTMLElement>('button, a'); if (trigger && !dialog.current?.contains(trigger)) pointerLauncher.current = trigger; } }} onKeyDownCapture={() => { pointerLauncher.current = null; }}>
    <div className={styles.wallpaper} aria-hidden="true" />
    <div inert={locked}>
    <a className={styles.skip} href="#workspace">Skip to portfolio</a>
    <header className={styles.menubar}>
      <button type="button" className={styles.desktopBrand} onClick={() => open('About')} aria-label="About Valentine Agam">Valentine Agam</button>
      <nav className={`${styles.topnav} ${styles.mobileNavigation} ${menu ? styles.navOpen : ''}`} aria-label="Main navigation">{(['About', 'Projects', 'Experience', 'Skills', 'Résumé', 'Contact'] as App[]).map(app => <button key={app} onClick={() => open(app)}>{app}</button>)}</nav>
      <StatusControls clock={clock} onSearch={() => open('Projects')} darkMode={darkMode} onToggleTheme={toggleTheme} />
      <button className={styles.mobileMenu} onClick={() => setMenu(!menu)} aria-label="Toggle navigation" aria-expanded={menu}><Menu size={20} /></button>
    </header>

    <main id="workspace" className={mac.workspace}>
      <div className={mac.heading}><div><h1>My workspace.</h1></div></div>
      <div className={mac.grid}>
        <div className={mac.column}>
          <section className={[mac.window, mac.finder, profile.window].join(' ')} aria-label="Profile overview">
            <WorkspaceTitle title="Valentine Agam" icon={<Folder />} />
            <div className={profile.card}>
              <div className={profile.hero}>
                <div className={profile.copy}>
                  <p className={profile.role}><Terminal size={13} aria-hidden="true" /> Software engineer</p>
                  <TypedName motion={dockMotion && !locked} />
                  <p className={profile.description}>I build hospital systems at Hospital Miri, and client applications as co-founder of Scribear.</p>
                  <ul className={profile.stack} aria-label="Core technologies">{['TypeScript', 'Python', 'PostgreSQL'].map(technology => <li key={technology}><img src={`/tech/${technology.toLowerCase()}.svg`} alt="" width={12} height={12} />{technology}</li>)}</ul>
                  <div className={profile.actions}>
                    <button className={profile.explore} onClick={() => open('Projects')} aria-label="View projects"><span className={profile.prompt} aria-hidden="true">❯</span><span className={profile.projectLabel}>View projects</span><span className={profile.projectCommand} aria-hidden="true">./projects</span><ArrowUpRight size={14} /></button>
                    <button className={profile.about} onClick={() => open('About')} aria-label="Meet Valentine Agam">About me <ArrowRight size={12} /></button>
                  </div>
                </div>
                <figure className={profile.portrait}>
                  <div className={profile.portraitPhoto}><img src="/hi.webp" alt="Valentine Agam" width={497} height={502} draggable={false} /></div>
                  <figcaption><MapPin size={11} aria-hidden="true" /> Miri, Sarawak</figcaption>
                </figure>
              </div>
              <div className={profile.work}>
                <button onClick={() => open('Experience')} aria-label="View experience at Hospital Miri"><span className={`${profile.workLogo} ${profile.hospitalLogo}`}><img src="/company-logos/kkm.webp" alt="" width={66} height={31} /></span><span className={profile.workText}><strong>Hospital Miri</strong><small>Digital systems</small></span><ArrowUpRight size={13} /></button>
                <button onClick={() => open('Experience')} aria-label="View experience at Scribear"><span className={profile.workLogo}><img src="/company-logos/scribear.png" alt="" width={26} height={26} /></span><span className={profile.workText}><strong>Scribear</strong><small>Co-founder &amp; developer</small></span><ArrowUpRight size={13} /></button>
              </div>
            </div>
          </section>
          <section className={[mac.window, mac.toolbox].join(' ')} aria-label="Capabilities">
            <WorkspaceTitle title="Developer tools" icon={<Terminal />} />
            <CapabilityCards onSelect={openSkills} />
          </section>
        </div>
        <div className={mac.column}>
          <section className={[mac.window, mac.assistant].join(' ')} aria-label="Certificate gallery">
            <WorkspaceTitle title="Certificate Gallery" icon={<FileText />} detail={`${certificates.length} credentials`} />
            <div className={mac.certificateGallery}>
              <div className={mac.certificateCarousel} role="region" aria-roledescription="carousel" aria-label="Certificates" onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); changeCertificate(event.key === 'ArrowLeft' ? -1 : 1); } }}>
                <button type="button" className={mac.certificateArrow} onClick={() => changeCertificate(-1)} aria-label="Previous certificate"><ChevronLeft size={20} aria-hidden="true" /></button>
                <button type="button" className={mac.certificateSlide} onClick={() => setOpenCertificate(currentCertificate)} aria-label={`View ${currentCertificate.title} full size`}>
                  <AnimatePresence initial={false} custom={certificateDirection}>
                    <motion.img key={currentCertificate.id} src={currentCertificate.imageSrc} alt={currentCertificate.imageAlt} custom={certificateDirection}
                      variants={{ enter: (direction: number) => ({ x: `${direction * 100}%`, opacity: 0, scale: 0.96 }), center: { x: 0, opacity: 1, scale: 1 }, exit: (direction: number) => ({ x: `${direction * -100}%`, opacity: 0, scale: 0.96 }) }}
                      initial="enter" animate="center" exit="exit" transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 22, mass: 1 }} />
                  </AnimatePresence>
                </button>
                <button type="button" className={mac.certificateArrow} onClick={() => changeCertificate(1)} aria-label="Next certificate"><ChevronRight size={20} aria-hidden="true" /></button>
              </div>
              <div className={mac.certificateCaption} aria-live="polite"><strong>{currentCertificate.title}</strong><span>{currentCertificate.issuer}</span></div>
              <div className={mac.certificateDots} role="group" aria-label="Choose certificate">{certificates.map((cert, index) => <button type="button" key={cert.id} aria-label={`Show ${cert.title}`} aria-pressed={index === certificateIndex} onClick={() => changeCertificate(index - certificateIndex)}><span /></button>)}</div>
            </div>
          </section>
          <section className={[mac.window, mac.music].join(' ')} aria-label="Music player">
            <WorkspaceTitle title="Music" icon={<AudioLines />} />
            <MusicPlayer />
          </section>
        </div>
      </div>
    </main>

    <footer ref={dock} className={styles.dockArea} data-motion={dockMotion ? 'on' : 'off'}><div className={styles.dockShortcuts}><button onClick={() => open('About')} data-active={active === 'About' ? 'true' : 'false'}><UserRound size={15} /> About</button><button onClick={() => open('Projects')} data-active={active === 'Projects' ? 'true' : 'false'}><Folder size={15} /> Projects</button><button onClick={() => open('Skills')} data-active={active === 'Skills' ? 'true' : 'false'}><Code2 size={15} /> Skills</button></div><nav className={styles.dock} aria-label="App dock"><a href={SOCIALS.github.href} target="_blank" rel="noreferrer" className={`${styles.appIcon} ${styles.github}`} aria-label="GitHub"><img src="/dock/github.jpg" alt="" width={512} height={512} draggable={false} /><span>GitHub</span></a><a href={SOCIALS.linkedin.href} target="_blank" rel="noreferrer" className={`${styles.appIcon} ${styles.linkedin}`} aria-label="LinkedIn"><img src="/dock/linkedin.jpg" alt="" width={512} height={512} draggable={false} /><span>LinkedIn</span></a><i className={styles.dockDivider} /><button className={`${styles.appIcon} ${styles.homeIcon}`} onClick={() => { setActive(null); setLocked(false); }} aria-label="Home"><img src="/dock/home.jpg" alt="" width={512} height={512} draggable={false} /><span>Home</span><i className={styles.activeDot} data-open={!active && !locked ? 'true' : 'false'} /></button><button className={`${styles.appIcon} ${styles.folderIcon}`} onClick={() => open('Projects')} aria-label="Open Projects"><img src="/dock/files.jpg" alt="" width={512} height={512} draggable={false} /><span>Projects</span><i className={styles.activeDot} data-open={active === 'Projects' ? 'true' : 'false'} /></button><button className={`${styles.appIcon} ${styles.resumeIcon}`} onClick={() => open('Résumé')} aria-label="Open Résumé"><img src="/dock/pages.jpg" alt="" width={512} height={512} draggable={false} /><span>Résumé</span><i className={styles.activeDot} data-open={active === 'Résumé' ? 'true' : 'false'} /></button><button className={`${styles.appIcon} ${styles.contactIcon}`} onClick={() => open('Contact')} aria-label="Open Contact"><img src="/dock/mail.jpg" alt="" width={512} height={512} draggable={false} /><span>Contact</span><i className={styles.activeDot} data-open={active === 'Contact' ? 'true' : 'false'} /></button><i className={styles.dockDivider} /><button className={`${styles.appIcon} ${styles.appearanceIcon}`} onClick={() => open('Appearance')} aria-label="Change wallpaper"><img src="/dock/photos.jpg" alt="" width={512} height={512} draggable={false} /><span>Appearance</span><i className={styles.activeDot} data-open={active === 'Appearance' ? 'true' : 'false'} /></button></nav><div className={styles.dockShortcuts}><button onClick={() => open('Experience')} data-active={active === 'Experience' ? 'true' : 'false'}><BriefcaseBusiness size={15} /> Experience</button><button onClick={() => open('Résumé')} data-active={active === 'Résumé' ? 'true' : 'false'}><FileText size={15} /> Résumé</button><button onClick={() => open('Contact')} data-active={active === 'Contact' ? 'true' : 'false'}><MessageCircle size={15} /> Let’s talk</button></div></footer>

    <dialog ref={dialog} onCancel={event => { event.preventDefault(); closeWindow(); }} onClose={() => setActive(null)} onClick={e => { if (e.target === e.currentTarget) closeWindow(); }} data-window-motion={dockMotion ? 'on' : 'off'} className={`${styles.dialog} ${aboutStyles.sheet} ${maximized ? mac.maximized : ''}`} aria-labelledby="app-title"><div className={styles.dialogInner}><header className={mac.modalBar}><div className={mac.modalTraffic}><button onClick={closeWindow} aria-label="Close window"><X size={9} /></button><button onClick={closeWindow} aria-label="Minimize window"><span>−</span></button><button onClick={() => setMaximized(value => !value)} aria-label={maximized ? 'Restore window size' : 'Expand window'}><Maximize2 size={8} /></button></div><h2 className={mac.modalTitle} id="app-title">{active}</h2><button className={mac.floatingClose} onClick={closeWindow} aria-label="Return to desktop" title="Close and return to desktop"><X size={15} /></button></header><div ref={appContent} className={`${styles.appContent} ${active === 'About' ? aboutStyles.content : ''}`}>
      {active === 'Projects' && <ProjectsGallery selected={selected} onSelect={setSelected} />}
      {active === 'About' && <AboutProfile />}
      {active === 'Experience' && <><div className={styles.appHeading}><span className={styles.eyebrow}>WORK EXPERIENCE</span><h3>My work<br /><em>experience.</em></h3><p>Roles in healthcare, client development, recruitment software, and GIS.</p></div><div className={styles.timeline}>{workExperience.map((item, index) => <article key={item.id}><span className={styles.timelineNumber}>0{index + 1}</span><div><span className={styles.eyebrow}>{item.dateRange} · {item.location}</span><h4>{item.company}</h4>{item.roles.map(role => <div key={role.title}><h5>{role.title}</h5><ul>{role.highlights.map(line => <li key={line}>{line}</li>)}</ul></div>)}<div className={styles.tags}>{item.stack?.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></>}
      {active === 'Skills' && <><div className={styles.appHeading}><span className={styles.eyebrow}>TECHNICAL SKILLS</span><h3>Languages, tools,<br /><em>and frameworks.</em></h3><p>The technologies I use for web development, machine learning, and data analysis.</p></div><div className={styles.skillFilters} role="group" aria-label="Filter technologies">{([{ value: 'all', label: 'All technologies' }, { value: 'web', label: 'Web & backend' }, { value: 'ai', label: 'AI & data' }] as const).map(filter => <button key={filter.value} aria-pressed={skillFocus === filter.value} onClick={() => setSkillFocus(filter.value)}>{filter.label}</button>)}</div><div className={styles.skillGrid}>{[{ focus: 'web', title: 'Languages & backend', icon: <Terminal />, values: programmingSkills }, { focus: 'web', title: 'Full-stack & infrastructure', icon: <Layers3 />, values: fullStackSkills }, { focus: 'ai', title: 'AI & machine learning', icon: <Cpu />, values: aiSkills }, { focus: 'ai', title: 'Data & geospatial', icon: <Code2 />, values: designDataSkills }].filter(group => skillFocus === 'all' || group.focus === skillFocus).map((group, index) => <section key={group.title}><div className={styles.skillHeader}>{group.icon}<span>0{index + 1}</span></div><h4>{group.title}</h4><div className={styles.skillLogos}>{group.values.filter(value => skillLogos[value]).map(value => <span className={styles.skillLogo} key={value} role="img" aria-label={value} data-label={value} tabIndex={0}><img src={`/tech/${skillLogos[value]}`} alt="" width={36} height={36} loading="lazy" draggable={false} /></span>)}</div></section>)}</div></>}
      {active === 'Résumé' && <><div className={styles.resumeHeader}><div><span className={styles.eyebrow}>RÉSUMÉ</span><h3>Valentine Agam</h3><p>Software Engineer · Full-Stack, Backend & AI/ML</p></div><a className={styles.primaryButton} href={RESUME_HREF} download><ArrowDownToLine size={16} /> Download résumé</a></div><iframe className={styles.pdf} src={RESUME_HREF} title="Valentine Agam résumé PDF" /><p className={styles.pdfFallback}>Prefer a separate tab? <a href={RESUME_HREF} target="_blank" rel="noreferrer">Open the PDF <ArrowUpRight size={12} /></a></p></>}
      {active === 'Contact' && <div className={styles.contactPage}><span className={styles.contactStar}><Sparkles /></span><span className={styles.eyebrow}>CONTACT</span><h3>Get in<br /><em>touch.</em></h3><p>For project enquiries or work opportunities, message me on LinkedIn.</p><div className={styles.contactLinks}><a href={SOCIALS.linkedin.href} target="_blank" rel="noreferrer"><Linkedin /><div><strong>Let’s connect</strong><span>Find me on LinkedIn</span></div><ArrowUpRight /></a><a href={SOCIALS.github.href} target="_blank" rel="noreferrer"><Github /><div><strong>View my code</strong><span>GitHub repositories</span></div><ArrowUpRight /></a></div><span className={styles.location}><MapPin size={13} /> Sarawak, Malaysia</span></div>}
      {active === 'Appearance' && <><div className={styles.appHeading}><span className={styles.eyebrow}>DESKTOP SETTINGS</span><h3>Desktop <em>appearance.</em></h3><p>Choose a wallpaper color treatment. Your selection is saved in this browser.</p></div><div className={styles.wallpaperChoices}>{wallpapers.map((name, index) => <button key={name} className={`${styles.wallpaperChoice} ${styles[`wallpaper${index}`]}`} onClick={() => chooseWallpaper(index)} aria-pressed={wallpaper === index}><span className={styles.wallpaperPreview} /><strong>{name}{wallpaper === index && <Check size={16} />}</strong></button>)}</div><label className={styles.motionSetting}><span><strong>Interface animations</strong><small>Smooth dock magnification and animated window opening and closing.</small></span><input type="checkbox" role="switch" checked={dockMotion} onChange={toggleDockMotion} /></label><div className={styles.appearanceNote}><Settings2 size={18} /><p>Each option applies a different color treatment to the same background image.</p></div></>}
    </div></div></dialog>

    </div>
    {openCertificate && <div className={mac.certificateOverlay} role="dialog" aria-modal="true" aria-label={openCertificate.title}>
      <button className={mac.certificateBackdrop} onClick={() => setOpenCertificate(null)} aria-label="Close certificate" />
      <div className={mac.certificatePreview}>
        <div><span><small>{openCertificate.issuer}</small><strong>{openCertificate.title}</strong></span><button onClick={() => setOpenCertificate(null)} aria-label="Close certificate"><X size={18} /></button></div>
        <img src={openCertificate.imageSrc} alt={openCertificate.imageAlt} />
        <p>{openCertificate.subtitle}</p>
      </div>
    </div>}
    {locked && <StartupScreen onComplete={finishStartup} />}
  </div>;
}
