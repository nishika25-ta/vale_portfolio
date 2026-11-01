# Observatory Implementation Plan

> Execute inline with superpowers:executing-plans and an independent final review.

**Goal:** Make the accepted space portfolio visibly more cinematic and polished.
**Architecture:** SpaceField.tsx owns bounded canvas rendering and input/visibility cleanup. OrbitalPortal.tsx owns decorative SVG portal and satellite. AstroStation and AstroPortfolio integrate visuals and selected-world preview. observatory.css owns responsive typography and visual polish without changing navigation semantics.
**Spec:** ../specs/2026-10-25-observatory.md

- [x] Add pointer-responsive layered stars with capped pixels/particles and correct reduced-motion/visibility/cleanup behavior.
- [x] Add luminous portal, orbiting satellite, holographic platform, expressive typography and destination preview.
- [x] Verify mobile full viewport, touch targets, pointer effects, motion pause, fallback, games and navigation.
- [x] Review, typecheck/build/diff check, refresh temporary tunnel and save screenshots.

Keep optional canvas decorative and bounded. Browser geometry and interaction checks verify the design; pure unit tests would mirror decorative implementation.

Verification: TypeScript and production build passed, diff whitespace check passed. Independent review found no concrete regressions. Home viewport and all new/existing button hit targets passed at320x568,360x640,375x667,390x844,430x932,844x390,768x1024,1280x800,1440x900. Reduced-motion default renderer still; explicit motion-on renderer animated and portal/satellite moving; motion-off paused all three. Canvas ignores pointer input as a surface, input listeners remain passive, max1.4million backing pixels/130stars, hidden and cleanup paths reviewed. Keyboard destination preview and Experience navigation verified, renderer pauses on detail pages and game dialogs, resumes after close, focus restores to game trigger. Public preview loaded new title/portal/canvas; user's old open cassette tab updated to v=observatory. Initial remote interaction test ran before hydration; after assets finished loading, same checks passed and no browser errors appeared. Existing CSS scenery is fallback when canvas unavailable (code-reviewed). No hosted publication.
