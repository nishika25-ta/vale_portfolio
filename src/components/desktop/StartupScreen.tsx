'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './startup.module.css';

const TYPE_STEP_MS = 34;
const TRACE_STEP_MS = 18;
const HOLD_MS = 680;
const SHELL_TOKEN = /(^#!.*$|"[^"]*"|'[^']*'|\b(?:set|readonly|export|umask|trap|exec|cd|printf|exit|sha256sum|log|fail)\b|--[\w-]+)/;
const BOOT_LINES = [
  '#!/usr/bin/env bash',
  'set -Eeuo pipefail',
  'readonly root="${VALE_HOME:-/opt/valeos}" run="/run/valeos"',
  'readonly manifest="$root/etc/boot.sha256" config="$root/etc/workspace.conf"',
  'readonly tty="${VALE_TTY:-tty1}" boot_id="${VALE_BOOT_ID:-0x7F3A}"',
  'export TERM="${TERM:-xterm-256color}" LC_ALL=C',
  'umask 027',
  "log() { printf '[%s] %-8s %s\\n' \"$boot_id\" \"$1\" \"$2\" >&2; }",
  "fail() { log 'ERROR' \"$1\"; exit 1; }",
  "trap 'log ERR \"boot stopped at line $LINENO\"' ERR",
  "[[ -d \"$root\" && -d \"$run\" ]] || fail 'runtime directories unavailable'",
  "[[ -r \"$manifest\" && -r \"$config\" ]] || fail 'boot configuration unreadable'",
  'cd -- "$root"',
  "log 'VERIFY' \"checking ${manifest##*/}\"",
  "sha256sum --check --status -- \"$manifest\" || fail 'manifest check failed'",
  'readonly workspace="$root/bin/workspace"',
  "[[ -x \"$workspace\" ]] || fail 'workspace executable unavailable'",
  'args=(--config "$config" --tty "$tty" --boot-id "$boot_id")',
  "log 'READY' \"handoff to $tty via $workspace\"",
  'exec "$workspace" "${args[@]}"',
].map((source) => {
  let offset = 0;
  const parts = source.split(SHELL_TOKEN).map((text, index) => {
    const start = offset;
    offset += text.length;
    const className = !text || index % 2 === 0 ? undefined
      : text.startsWith('#!') ? styles.comment
      : /^['"]/.test(text) ? styles.string
      : styles.keyword;
    return { text, start, className };
  }).filter((part) => part.text);
  return { source, parts };
});
const LAST_LINE = BOOT_LINES.length - 1;

export function StartupScreen({ onComplete }: { onComplete: () => void }) {
  const [{ line, characters }, setPosition] = useState({ line: 0, characters: 0 });
  const [leaving, setLeaving] = useState(false);
  const overlayRef = useRef<HTMLElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const finish = useCallback(() => setLeaving(true), []);

  useEffect(() => {
    if (leaving) return;

    const wallpaper = new Image();
    wallpaper.src = '/bg.webp';

    let nextLine = 0;
    let visible = 0;

    function typeNext() {
      const { source } = BOOT_LINES[nextLine];
      const slow = nextLine === 0 || nextLine === LAST_LINE;
      visible = Math.min(source.length, visible + (slow ? 1 : 6));
      setPosition({ line: nextLine, characters: visible });

      if (visible < source.length) {
        timer = window.setTimeout(typeNext, slow ? TYPE_STEP_MS : TRACE_STEP_MS);
        return;
      }

      if (nextLine === LAST_LINE) {
        timer = window.setTimeout(finish, HOLD_MS);
        return;
      }

      nextLine += 1;
      visible = 0;
      const delay = nextLine === 1 || nextLine === LAST_LINE ? 320 : TRACE_STEP_MS;
      timer = window.setTimeout(typeNext, delay);
    }

    let timer = window.setTimeout(typeNext, TYPE_STEP_MS);
    return () => window.clearTimeout(timer);
  }, [finish, leaving]);

  useLayoutEffect(() => {
    const screen = screenRef.current;
    const terminal = screen?.firstElementChild;
    if (!screen || !terminal) return;

    const observer = new ResizeObserver(() => {
      screen.scrollTop = screen.scrollHeight;
    });
    observer.observe(terminal);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!leaving) return;

    const animations = overlayRef.current?.getAnimations?.() ?? [];
    let mounted = true;
    void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      if (mounted) onComplete();
    });
    return () => { mounted = false; };
  }, [leaving, onComplete]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Escape' || event.key === ' ') {
        event.preventDefault();
        finish();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [finish]);

  const paused = (line === 0 || line === LAST_LINE) && characters === BOOT_LINES[line].source.length;

  return (
    <section
      ref={overlayRef}
      className={styles.startup}
      data-startup={leaving ? 'leaving' : 'typing'}
      role="dialog"
      aria-modal="true"
      aria-label="ValeOS startup"
      onClick={finish}
    >
      <div className={styles.screen} ref={screenRef} aria-hidden="true">
        <pre className={styles.terminal} data-paused={paused ? '' : undefined}>
          {BOOT_LINES.slice(0, line + 1).map(({ source, parts }, index) => {
            const current = index === line;
            const visible = current ? characters : source.length;

            return (
              <code key={source} className={styles.line} data-current={current ? '' : undefined}>
                {parts.map(({ text, start, className }) => (
                  <span key={start} className={className}>{text.slice(0, Math.max(0, visible - start))}</span>
                ))}
              </code>
            );
          })}
        </pre>
      </div>
    </section>
  );
}
