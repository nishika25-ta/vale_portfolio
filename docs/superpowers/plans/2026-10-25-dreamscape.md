# Dreamscape Implementation Plan

> Execute inline using superpowers:executing-plans.

**Goal:** Give the portfolio an original animated cosmic identity while preserving the one-screen phone home.
**Architecture:** A decorative Dreamscape React component and scoped CSS, integrated with the current motion controls. Existing navigation and portfolio data remain intact.
**Tech Stack:** Next.js, React, SVG, CSS.
**Spec:** ../specs/2026-10-25-dreamscape.md

- [x] Add Dreamscape.tsx with aurora, constellations, ringed planet, meteor trails, and luminous terrain; no interactive overlay.
- [x] Replace old scenery, sun, chime, and seaside copy. Restyle hero, deck, header, and home footer in dreamscape.css.
- [x] Verify 320–430px phone layouts, landscape and desktop; test tape navigation, motion on/off, and readable detail panels.
- [x] Run TypeScript, production build and whitespace checks; refresh existing temporary tunnel and save screenshot.

No new tests for decorative styling; browser geometry, computed animations, and tap checks directly verify the user-visible requirements.

Verification: TypeScript and production build passed. Phone checks at 320x568, 360x640, 375x667, 390x844, 430x932 plus landscape 844x390 and desktop 1280x800 have no home overflow and all seven tape hit targets work. Motion enabled and paused computed styles confirmed. Reviewer found collapsing content margin; fixed with flow-root and verified header top22/content top72 on phone. Existing tunnel displays new design; no hosted Site deployment.
