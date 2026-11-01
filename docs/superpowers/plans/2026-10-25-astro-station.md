# Astro Station Implementation Plan

> Execute inline with superpowers:executing-plans.

**Goal:** Replace every user-facing cassette interaction with an original astronaut coding portfolio.
**Architecture:** AstroArt.tsx owns planet and astronaut SVG; AstroStation.tsx owns the code console and astronaut reaction; AstroPortfolio.tsx retains existing content/navigation with new home and terminology; astro-station.css owns responsive composition. No new dependency.
**Spec:** ../specs/2026-10-25-astro-station.md

- [x] Build astronaut and seven visually distinct planet illustrations, accessible astronaut reaction and launch console.
- [x] Replace home composition and active cassette assets/copy, preserving all portfolio entries, hashes, keyboard controls and dialogs.
- [x] Verify phone 320–430px, landscape, desktop, destination navigation, animation pause, astronaut reaction and keyboard behavior.
- [x] Review, run TypeScript/build/diff checks, update temporary tunnel, save preview screenshots.

Use browser interaction checks for decorative/UI changes, no redundant unit tests. No source deletion of prior work and no hosted publication.

Verification: TypeScript and production build passed. Home geometry/hit tests passed at 320x568, 360x640, 375x667, 390x844, 430x932, 844x390 and 1280x800. All seven planets open expected sections. Keyboard Right/Enter navigation, terminal works command, astronaut greeting and enabled typing/wave/cursor/planet animations checked in browser. Reduced-motion default and motion pause retained. Review found automatic-browsing progress mismatch; replaced interval with an entry-dependent timeout and reset progress on pause/modal changes. Existing tunnel verified with seven planets and zero cassette SVG/player elements. Phone screenshot saved. No hosted publishing.
