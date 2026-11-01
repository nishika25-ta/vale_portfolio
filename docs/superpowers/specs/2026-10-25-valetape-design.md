# Valetape — cassette portfolio revision

The user requested a much closer recreation of miyukivigil.tech and rejected the previous editorial direction. Replace the current rendered presentation with an illustrated light cassette-player environment. Preserve Valentine’s identity and real portfolio data. Keep all work local for review; do not push, connect source, or publish.

Visual contract: seven colored cassette tapes orbit an illustrated portable deck. Use a pale scallop-wave background, navy outlines, rounded heavy type, teal ocean layers, taped profile card, a wind chime and small Japanese label accents. Each tape opens a sidebar track collection with a story and scrapbook images. Retain all 11 projects, four work records, skills, education, credentials, résumé and professional links.

Interactions: tape selection with mouse/keyboard; insert/eject; previous/next tracks; optional sound; calm mode; automatic track browsing and speed; stamps for explored sections; shortcut dialog; a small terminal that navigates real sections. Native screenshot and utility dialogs preserve focus and lock scrolling. Automatic track browsing pauses behind dialogs. No fabricated games, anime, music preferences, contact details or project URLs.

Implementation: Next.js and existing data; CSS/SVG illustrations, Nunito and existing mono type. No new runtime dependencies. Components: CassettePortfolio (content/routing/state), CassetteArt (illustration), TapeDeck (controls), ProjectDialog (screenshots).

Verification: production build and TypeScript; all tape track counts; screenshot initial-slide selection, Escape/focus restoration; skip link preserving route; arrow selection and Enter agreement; terminal navigation; stamps; optional audio; autoplay pause/resume around dialogs; 390px/320px/desktop layout and touch targets; no fresh console errors. The previous editorial specification is superseded for the rendered site.