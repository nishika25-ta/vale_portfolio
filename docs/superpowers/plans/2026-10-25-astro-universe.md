# Astro Universe Expansion Plan

> Execute inline with superpowers:executing-plans; final independent review.

**Goal:** Add visual depth and meaningful play to the astronaut portfolio.
**Architecture:** Focused StarGame.tsx for game state/cleanup; AstroStation.tsx for zero gravity and run-code demo; VoyageEffect.tsx for decorative transition; AstroPortfolio.tsx integrates sky palette, game dialog and navigation. astro-universe.css owns lighting, dark destination cards and expanded interactions.
**Spec:** ../specs/2026-10-25-astro-universe.md

- [x] Implement accessible game with five ordered star targets, completion/reset, timer cleanup and no speed requirement.
- [x] Add sky palette, zero-gravity toggle, runnable console demo, warp travel overlay and descriptive controls.
- [x] Apply cohesive dark mission panels to destination pages, project viewer and utilities; refine nebula/planet lighting.
- [x] Verify game completion/reset, palettes, zero gravity, code demo, all navigation, dialog focus, reduced motion, phone size/hit targets and desktop.
- [x] Review, typecheck, build, diff check, refresh tunnel and save screenshots.

No dependency or hosted publishing. Game correctness verified through real keyboard/browser interactions; styling verified using geometry/computed animation and screenshots.

Verification: TypeScript and production build passed; diff whitespace check passed. Three sky palettes cycled, code demo reached success, zero gravity computed animation confirmed, star collection in nonsequential order completed, reset focused first star, keyboard collection and Escape restored modal trigger. Calm completion trace confirmed animation none/dashoffset0. All seven mission destinations opened with dark readable content. Warp destination stayed WORKS after ArrowRight during launch. Phone home and controls checked at320x568,360x640,375x667,390x844,430x932 plus844x390 and1280x800; compact console overlap found and fixed, then320/360/375 retested with24–48px clearance above dock. Public tunnel renders new features at v=universe. No hosted Site publication.
