import { Code, CodeBlock, CodeHeader } from '@/components/animate/code';
import ReactIcon from '@/components/icons/ReactIcon';

const DEMO_CODE = `'use client';

import * as React from 'react';

type MyComponentProps = {
  myProps: string;
} & React.ComponentProps<'div'>;

function MyComponent(props: MyComponentProps) {
  return (
    <div {...props}>
      <p>My Component</p>
    </div>
  );
}

export { MyComponent, type MyComponentProps };`;

export type CodeDemoProps = {
  duration: number;
  delay: number;
  writing: boolean;
  cursor: boolean;
};

export function CodeDemo({ duration, delay, writing, cursor }: CodeDemoProps) {
  return (
    <Code
      key={`${duration}-${delay}-${writing}-${cursor}`}
      className="code-ide-shell w-full max-w-[min(100%,440px)] overflow-hidden rounded-xl border border-emerald-500/25 shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_24px_80px_-20px_rgba(0,0,0,0.85),0_0_60px_-15px_rgba(34,197,94,0.15)]"
      code={DEMO_CODE}
    >
      <CodeHeader icon={ReactIcon} copyButton>
        ~/src/components/my-component.tsx
      </CodeHeader>

      <CodeBlock cursor={cursor} writing={writing} duration={duration} delay={delay} />

      <div className="flex items-center justify-between border-t border-emerald-500/10 bg-[#0a0e14]/90 px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-slate-600">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          TSX · Strict
        </span>
        <span className="text-emerald-600/80">UTF-8</span>
      </div>
    </Code>
  );
}
