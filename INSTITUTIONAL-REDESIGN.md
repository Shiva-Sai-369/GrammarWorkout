# GrammarWorkout Institutional Landing Page

## Overview
Complete redesign of GrammarWorkout as an institutional B2B landing page for schools and language programs, following a detailed design brief.

## Brand Direction
**Positioning:** Grammar-first French/Spanish learning platform for schools and language programs  
**Personality:** Supportive coach with university tutor credibility — not gamified, not corporate, not flashy

## Color Palette
- **Deep Indigo** (`#1e1b4b` / `indigo-950`, `#312e81` / `indigo-900`) - Primary/dark
- **Magenta-Purple** (`#d946ef` / `fuchsia-500`, `#a855f7` / `purple-500`) - Accent
- **Soft Lavender/Lilac** (`#f3e8ff` / `purple-50`, `#e9d5ff` / `purple-100`) - Background tints

## Typography
1. **Display/Headline:** Fraunces (serif with personality) - H1/H2 only
2. **Body:** Inter (clean, readable sans) - All body text
3. **Data/Utility:** IBM Plex Mono - CEFR tags (A1-B2), numbers, percentages only

## Signature Element
**Proficiency Dial** - Circular fitness-tracker-style ring showing A1 to B2 progression
- Featured prominently in hero section
- Animated fill-in on scroll
- Miniature versions as CEFR level badges in Section 3 only
- Not repeated as decoration elsewhere

## Page Sections

### Section 1: Hero (Split Screen)
- **Left:** Headline, subhead, intro copy, CTAs
- **Right:** Large animated proficiency dial (A1-B2)
- **Copy:** "Turn Grammar Practice Into Real Classroom Results"
- **CTAs:** Book a Consultation / Request a Quote

### Section 2: Why Schools Choose GrammarWorkout (Two-Lane Comparison)
- Side-by-side comparison layout
- Left lane: Other platforms (implied, unlabeled)
- Right lane: GrammarWorkout (highlighted)
- 4 key differentiators
- Proof placeholder panel
- **CTA:** Talk to Our Team

### Section 3: What's Included (Asymmetric Grid)
- 5 workout-style cards in asymmetric grid
- Each with icon, title, one-line outcome
- Small CEFR tags in corner
- **Items:** French & Spanish Tracks, Syllabus Fit Check, Dashboards, Native Audio, Institutional Pricing
- **CTA:** See Pricing for Your Program

### Section 4: How It Works (Horizontal Timeline)
- Numbered timeline (1-4) - justified use of numbers
- Desktop: Horizontal strip, Mobile: Vertical stack
- **Steps:** Consultation → Syllabus Fit Check → Proposal → Rollout & Support
- **CTA:** Start With a Consultation

### Section 5: FAQ (Single-Column Accordion)
- Clean, quiet design with generous whitespace
- 6 institutional FAQs
- No icons or color blocks
- Collapsed by default

### Section 6: Final CTA (Full-Width Banner)
- Solid indigo-900 background
- Centered headline and both CTAs
- **Copy:** "Ready to See Grammar Practice Actually Pay Off in the Classroom?"
- **CTAs:** Book a Consultation / Request a Quote

## Motion & Interaction
- **One orchestrated moment:** Proficiency dial fills on scroll into hero
- **Subtle hover states:** Buttons and accordion triggers only
- **No scroll-fade-ins** on every element
- **Respects reduced-motion** settings

## Responsiveness
- Fully responsive to mobile
- Hero split stacks vertically
- Two-lane comparison stacks vertically
- Timeline transitions to vertical on mobile
- Visible keyboard focus states throughout

## Files
- `src/App.tsx` - New institutional design
- `src/App-original.tsx` - Backup of original consumer design
- `src/App-institutional.tsx` - Source file for institutional design
- `index.html` - Updated with Fraunces, Inter, IBM Plex Mono fonts

## Design Principles
✅ Each section visually distinct from previous  
✅ Copy used exactly as written in prompt  
✅ Proficiency dial is the boldest visual (hero only)  
✅ Flat, intentional color palette  
✅ No generic purple gradient wash  
✅ Numbered markers only in Section 4 (actual sequence)  
✅ Professional, credible, institutional tone  

## Development Notes
- All content taken directly from design brief
- No rewriting, shortening, or paraphrasing of copy
- Layout, typography, color, and visual design only
- TypeScript strict mode compliant
- Zero compilation errors
