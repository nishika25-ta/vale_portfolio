/** SVG displacement map for hero liquid glass (hidden, referenced by `filter: url(#hero-role-glass-blur)`). */
export function LiquidGlassFilter() {
  return (
    <svg
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <filter
        id="hero-role-glass-blur"
        x="0"
        y="0"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.003 0.007"
          numOctaves="1"
          result="turbulence"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="turbulence"
          scale="120"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
