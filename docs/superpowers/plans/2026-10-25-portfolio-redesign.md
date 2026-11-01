# Portfolio Redesign Implementation Plan
**Goal:** Replace the dark portfolio and dock with an original editorial digital playground.
**Architecture:** Keep Next.js static export and data; replace the application shell and visual system. Isolate the console and native project dialog.
**Tech stack:** React, TypeScript, CSS, Lucide.
**Spec:** docs/superpowers/specs/2026-10-25-portfolio-redesign-design.md

## Constraints and review focus
Real content only. All 11 projects. No LiveShowcase. No new dependencies. Native scrolling, keyboard controls, responsive layouts and reduced motion. Review mobile overflow, dialog focus/Escape, filtering, console anchors and screenshot availability.

## Tasks
- [x] Replace PortfolioApp and global CSS with hero, gallery, about, experience, skills, education and contact.
- [x] Build PocketStudio: three modes, previous/next and open controls.
- [x] Build ProjectDialog: native focus handling, backdrop/Escape close and image navigation.
- [x] Update theme; run TypeScript and production build; inspect desktop/mobile and interactions.
- [ ] Review, package and publish the existing Site with unchanged audience when source access is available.

Verify presentation in the browser rather than adding tests duplicating markup. Work in the current checkout to preserve the preceding requested LiveShowcase removal.

Verification: TypeScript and production static build passed. Browser checks passed for 11 projects; filter counts 4/5/2; console mode and section navigation; screenshot next; Escape, scroll unlock and focus restoration; 390px and 320px layouts; motion pause. Independent code review completed. Fixed mobile heading wrapping and console shadow intercepting the motion toggle. Publication is pending user authorization after automatic approval review rejected connecting/publishing source.