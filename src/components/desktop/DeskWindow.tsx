'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { animate, motion, useDragControls, useMotionValue } from 'motion/react';
import mac from './workspace.module.css';

let topLayer = 5;
const DRAG_LIMITS = { left: -460, right: 460, top: -70, bottom: 240 };

type DeskWindowProps = {
  title: string;
  icon: ReactNode;
  detail?: string;
  action?: ReactNode;
  className: string;
  label: string;
  motionEnabled: boolean;
  children: ReactNode;
};

/** Draggable desktop window with title-bar grab handle and double-click spring reset. */
export function DeskWindow({ title, icon, detail, action, className, label, motionEnabled, children }: DeskWindowProps) {
  const controls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [layer, setLayer] = useState(1);
  const [canDrag, setCanDrag] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)');
    const update = () => {
      setCanDrag(query.matches);
      if (!query.matches) {
        x.set(0);
        y.set(0);
      }
    };
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [x, y]);

  const bringToFront = () => {
    topLayer += 1;
    setLayer(topLayer);
  };

  const resetPosition = () => {
    if (!motionEnabled) {
      x.jump(0);
      y.jump(0);
      return;
    }
    animate(x, 0, { type: 'spring', stiffness: 280, damping: 28 });
    animate(y, 0, { type: 'spring', stiffness: 280, damping: 28 });
  };

  return (
    <motion.section
      className={className}
      aria-label={label}
      style={{ x, y, zIndex: layer, position: 'relative' }}
      drag={canDrag}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={motionEnabled ? 0.04 : 0}
      dragConstraints={DRAG_LIMITS}
      animate={{ scale: motionEnabled && dragging ? 1.01 : 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      onPointerDownCapture={bringToFront}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
    >
      <header
        className={mac.chrome}
        data-draggable={canDrag ? 'true' : 'false'}
        onPointerDown={(event) => {
          if (canDrag && event.button === 0 && !(event.target as Element).closest('button, a')) {
            controls.start(event);
          }
        }}
        onDoubleClick={canDrag ? resetPosition : undefined}
        title={canDrag ? 'Drag to move — double-click to reset' : undefined}
      >
        <span className={mac.traffic} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={mac.windowTitle}>
          {icon}
          {title}
        </span>
        {action ?? <span className={mac.chromeMeta}>{detail}</span>}
      </header>
      {children}
    </motion.section>
  );
}
