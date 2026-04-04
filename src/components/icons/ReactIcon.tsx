import type { SVGProps } from 'react';

/** React atom logo for editor tab */
export default function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <circle cx="12" cy="12" r="2" fill="currentColor" className="text-cyan-400" />
      <ellipse
        cx="12"
        cy="12"
        rx="11"
        ry="4.2"
        stroke="currentColor"
        strokeWidth="1.25"
        className="text-cyan-400/90"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="11"
        ry="4.2"
        stroke="currentColor"
        strokeWidth="1.25"
        className="text-cyan-400/90"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="11"
        ry="4.2"
        stroke="currentColor"
        strokeWidth="1.25"
        className="text-cyan-400/90"
        transform="rotate(120 12 12)"
      />
    </svg>
  );
}
