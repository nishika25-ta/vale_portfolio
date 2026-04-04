import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Texture, Triangle } from 'ogl';
import { PRISMATIC_FRAGMENT_SHADER, PRISMATIC_VERTEX_SHADER } from './prismaticBurstShaders';
import './PrismaticBurst.css';

export type PrismaticBurstAnimationType = 'rotate' | 'rotate3d' | 'hover';

export type PrismaticBurstProps = {
  intensity?: number;
  speed?: number;
  animationType?: PrismaticBurstAnimationType;
  colors?: string[];
  distort?: number;
  paused?: boolean;
  offset?: { x?: number | string; y?: number | string };
  hoverDampness?: number;
  rayCount?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'] | 'none';
};

function hexToRgb01(hex: string): [number, number, number] {
  let h = hex.trim();
  if (h.startsWith('#')) h = h.slice(1);
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  const intVal = parseInt(h, 16);
  if (Number.isNaN(intVal) || (h.length !== 6 && h.length !== 8)) return [1, 1, 1];
  const r = ((intVal >> 16) & 255) / 255;
  const g = ((intVal >> 8) & 255) / 255;
  const b = (intVal & 255) / 255;
  return [r, g, b];
}

function toPx(v: number | string | null | undefined): number {
  if (v == null) return 0;
  if (typeof v === 'number') return v;
  const s = String(v).trim();
  const num = parseFloat(s.replace('px', ''));
  return Number.isNaN(num) ? 0 : num;
}

const ANIM_TYPE_MAP: Record<PrismaticBurstAnimationType, number> = {
  rotate: 0,
  rotate3d: 1,
  hover: 2,
};

export function PrismaticBurst({
  intensity = 2,
  speed = 0.5,
  animationType = 'rotate3d',
  colors,
  distort = 0,
  paused = false,
  offset = { x: 0, y: 0 },
  hoverDampness = 0,
  rayCount,
  mixBlendMode = 'lighten',
}: PrismaticBurstProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<Program | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseTargetRef = useRef<[number, number]>([0.5, 0.5]);
  const mouseSmoothRef = useRef<[number, number]>([0.5, 0.5]);
  const pausedRef = useRef(paused);
  const gradTexRef = useRef<Texture | null>(null);
  const hoverDampRef = useRef(hoverDampness);
  const isVisibleRef = useRef(true);
  const meshRef = useRef<Mesh | null>(null);
  const triRef = useRef<Triangle | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    hoverDampRef.current = hoverDampness;
  }, [hoverDampness]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new Renderer({
      dpr,
      alpha: false,
      antialias: false,
    });
    rendererRef.current = renderer;

    const gl = renderer.gl;
    gl.canvas.style.position = 'absolute';
    gl.canvas.style.inset = '0';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? String(mixBlendMode) : '';
    root.appendChild(gl.canvas);

    const white = new Uint8Array([255, 255, 255, 255]);
    const gradientTex = new Texture(gl, {
      image: white,
      width: 1,
      height: 1,
      generateMipmaps: false,
      flipY: false,
    });

    gradientTex.minFilter = gl.LINEAR;
    gradientTex.magFilter = gl.LINEAR;
    gradientTex.wrapS = gl.CLAMP_TO_EDGE;
    gradientTex.wrapT = gl.CLAMP_TO_EDGE;
    gradTexRef.current = gradientTex;

    const program = new Program(gl, {
      vertex: PRISMATIC_VERTEX_SHADER,
      fragment: PRISMATIC_FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
      cullFace: false,
      uniforms: {
        uResolution: { value: [1, 1] },
        uTime: { value: 0 },
        uIntensity: { value: 1 },
        uSpeed: { value: 1 },
        uAnimType: { value: 0 },
        uMouse: { value: [0.5, 0.5] },
        uColorCount: { value: 0 },
        uDistort: { value: 0 },
        uOffset: { value: [0, 0] },
        uGradient: { value: gradientTex },
        uNoiseAmount: { value: 0.8 },
        uRayCount: { value: 0 },
      },
    });

    programRef.current = program;

    const triangle = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry: triangle, program });
    triRef.current = triangle;
    meshRef.current = mesh;

    const resize = () => {
      const w = root.clientWidth || 1;
      const h = root.clientHeight || 1;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    };

    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(resize);
      ro.observe(root);
    } else {
      globalThis.addEventListener('resize', resize);
    }
    resize();

    const onPointer = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (e.clientX - rect.left) / Math.max(rect.width, 1);
      const y = (e.clientY - rect.top) / Math.max(rect.height, 1);
      mouseTargetRef.current = [Math.min(Math.max(x, 0), 1), Math.min(Math.max(y, 0), 1)];
    };
    root.addEventListener('pointermove', onPointer, { passive: true });

    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0]) {
            isVisibleRef.current = entries[0].isIntersecting;
          }
        },
        { root: null, threshold: 0.01 }
      );
      io.observe(root);
    }

    let raf = 0;
    let last = performance.now();
    let accumTime = 0;

    const update = (now: number) => {
      const dt = Math.max(0, now - last) * 0.001;
      last = now;
      const visible = isVisibleRef.current && !document.hidden;
      if (!pausedRef.current) accumTime += dt;

      if (!visible) {
        raf = requestAnimationFrame(update);
        return;
      }

      const tau = 0.02 + Math.max(0, Math.min(1, hoverDampRef.current)) * 0.5;
      const alpha = 1 - Math.exp(-dt / tau);
      const tgt = mouseTargetRef.current;
      const sm = mouseSmoothRef.current;
      sm[0] += (tgt[0] - sm[0]) * alpha;
      sm[1] += (tgt[1] - sm[1]) * alpha;

      program.uniforms.uMouse.value = sm;
      program.uniforms.uTime.value = accumTime;

      renderer.render({ scene: meshRef.current! });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener('pointermove', onPointer);
      ro?.disconnect();
      if (!ro) globalThis.removeEventListener('resize', resize);
      io?.disconnect();
      try {
        root.removeChild(gl.canvas);
      } catch {
        /* already removed */
      }
      try {
        triRef.current?.remove();
      } catch {
        /* ignore */
      }
      try {
        programRef.current?.remove();
      } catch {
        /* ignore */
      }
      try {
        const glCtx = rendererRef.current?.gl;
        if (glCtx && gradTexRef.current?.texture) {
          glCtx.deleteTexture(gradTexRef.current.texture);
        }
      } catch {
        /* ignore */
      }
      programRef.current = null;
      rendererRef.current = null;
      gradTexRef.current = null;
      meshRef.current = null;
      triRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once; props synced in separate effect
  }, []);

  useEffect(() => {
    const canvas = rendererRef.current?.gl?.canvas;
    if (canvas) {
      canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? String(mixBlendMode) : '';
    }
  }, [mixBlendMode]);

  useEffect(() => {
    const program = programRef.current;
    const renderer = rendererRef.current;
    const gradTex = gradTexRef.current;
    if (!program || !renderer || !gradTex) return;

    program.uniforms.uIntensity.value = intensity ?? 1;
    program.uniforms.uSpeed.value = speed ?? 1;
    program.uniforms.uAnimType.value = ANIM_TYPE_MAP[animationType] ?? 1;
    program.uniforms.uDistort.value = typeof distort === 'number' ? distort : 0;

    const ox = toPx(offset?.x);
    const oy = toPx(offset?.y);
    program.uniforms.uOffset.value = [ox, oy];
    program.uniforms.uRayCount.value = Math.max(0, Math.floor(rayCount ?? 0));

    const gl = renderer.gl;
    if (Array.isArray(colors) && colors.length > 0) {
      const capped = colors.slice(0, 64);
      const count = capped.length;
      const data = new Uint8Array(count * 4);
      for (let i = 0; i < count; i++) {
        const [r, g, b] = hexToRgb01(capped[i]!);
        data[i * 4 + 0] = Math.round(r * 255);
        data[i * 4 + 1] = Math.round(g * 255);
        data[i * 4 + 2] = Math.round(b * 255);
        data[i * 4 + 3] = 255;
      }
      gradTex.image = data;
      gradTex.width = count;
      gradTex.height = 1;
      gradTex.minFilter = gl.LINEAR;
      gradTex.magFilter = gl.LINEAR;
      gradTex.wrapS = gl.CLAMP_TO_EDGE;
      gradTex.wrapT = gl.CLAMP_TO_EDGE;
      gradTex.flipY = false;
      gradTex.generateMipmaps = false;
      gradTex.format = gl.RGBA;
      gradTex.type = gl.UNSIGNED_BYTE;
      gradTex.needsUpdate = true;
      program.uniforms.uColorCount.value = count;
    } else {
      program.uniforms.uColorCount.value = 0;
    }
  }, [intensity, speed, animationType, colors, distort, offset, rayCount]);

  return <div className="prismatic-burst-container" ref={containerRef} />;
}
