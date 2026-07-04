# What's Included Section

## Overview
Created a beautiful alternating left/right row layout section that showcases the 5 main features of GrammarWorkout with scroll-triggered animations.

## Design Pattern

### Layout Structure
- **Alternating rows**: Icon and text swap sides on each row
  - Row 1 (odd): Icon left, Text right
  - Row 2 (even): Icon right, Text left
  - Row 3 (odd): Icon left, Text right
  - And so on...

### Visual Design
- **Icon containers**: 
  - Size: 96px × 96px (w-24 h-24)
  - Background: Brand purple (#82007C)
  - Shape: Rounded corners (rounded-2xl)
  - Shadow: Large shadow (shadow-lg)
  - Icon size: 48px × 48px (w-12 h-12)
  - Color: White text

- **Text alignment**:
  - Mobile: Centered for all rows
  - Desktop: 
    - Odd rows (icon left): Text aligned left
    - Even rows (icon right): Text aligned right

- **Spacing**:
  - Between rows: 64px on mobile (space-y-16), 96px on desktop (md:space-y-24)
  - Section padding: 64px vertical on mobile (py-16), 96px on desktop (md:py-24)
  - Icon-to-text gap: 32px on mobile (gap-8), 48px on desktop (md:gap-12)

### Typography
- **Section heading**: 
  - Size: text-4xl → md:text-5xl → lg:text-6xl
  - Weight: font-black
  - Color: text-slate-900

- **Feature titles**:
  - Size: text-2xl → md:text-3xl
  - Weight: font-black
  - Color: Brand purple (#82007C)
  - Margin bottom: 12px (mb-3)

- **Feature descriptions**:
  - Size: text-base → md:text-lg
  - Weight: font-medium
  - Color: text-slate-600
  - Line height: leading-relaxed

### Animations

#### Scroll-Triggered Slide-In
Each row animates into view when it enters the viewport:

```javascript
// Odd rows (icon left): Slide in from left
hidden: { opacity: 0, x: -100 }
visible: { opacity: 1, x: 0 }

// Even rows (icon right): Slide in from right
hidden: { opacity: 0, x: 100 }
visible: { opacity: 1, x: 0 }
```

**Animation properties**:
- Duration: 0.6 seconds
- Easing: Custom cubic-bezier [0.16, 1, 0.3, 1] (smooth deceleration)
- Trigger: Once when element is 100px into viewport
- Libraries: motion/react (Framer Motion) with `useInView` hook

### CTA Button
- Text: "See Pricing for Your Program"
- Style: Primary brand button
  - Background: #82007C
  - Hover: #6B0066
  - Padding: px-8 py-4
  - Size: text-lg
  - Weight: font-black
  - Shadow: shadow-lg → hover:shadow-xl
  - Scale: hover:scale-105
- Link: Anchors to #pricing section below

## Content

### Features (in order)

1. **French & Spanish Grammar Tracks**
   - Icon: BookOpen
   - Description: Two complete programs, A1 through B2, so every student has a starting point.

2. **Syllabus Fit Check**
   - Icon: CheckCircle
   - Description: Before rollout, we line up GrammarWorkout's levels against what your program already teaches.

3. **Teacher & Admin Dashboards**
   - Icon: BarChart3
   - Description: Spot class-wide trends and individual gaps without building a report by hand.

4. **Native-Speaker Audio**
   - Icon: Volume2
   - Description: Every exercise is voiced by a native speaker, so pronunciation trains alongside grammar.

5. **Institutional Pricing**
   - Icon: DollarSign
   - Description: Costs scale with class size, not a per-seat rate built for individual learners.

## File Structure

```
src/
├── components/
│   └── WhatsIncluded.tsx    # New component
└── App.tsx                   # Updated to include WhatsIncluded
```

## Integration

### In App.tsx:
```tsx
import WhatsIncluded from './components/WhatsIncluded';

// Placed above pricing section
<WhatsIncluded />
```

### Section Order:
1. Hero
2. Why Schools Choose GrammarWorkout
3. **What's Included** (NEW)
4. **Pricing/Plans** (NEW - moved from section 3)
5. How It Works
6. FAQ
7. Final CTA

## Responsive Behavior

### Mobile (< 768px)
- Single column layout
- Icons centered above text
- Text centered
- Vertical spacing: 64px between rows
- Icons: 96px × 96px

### Desktop (≥ 768px)
- Two-column layout (icon + text)
- Alternating sides per row
- Text aligned left/right based on position
- Vertical spacing: 96px between rows
- Horizontal gap: 48px between icon and text

## Brand Consistency

- Uses exact brand purple: #82007C (primary), #6B0066 (hover)
- Matches button styles from other sections
- Font weights consistent with site (font-black for headings)
- Matches spacing rhythm of the rest of the page

## Accessibility

- Semantic HTML (`<section>`, `<h2>`, `<h3>`, `<p>`)
- Proper heading hierarchy
- High contrast ratios (WCAG AA compliant)
- Focus states on interactive elements
- Animations respect user preferences (via motion/react)

## Performance

- Animations triggered by `useInView` hook (only animate when visible)
- `once: true` - animations run once (no re-animations on scroll)
- Hardware-accelerated transforms (translateX)
- Efficient React component structure

## Customization

### To modify animations:
```tsx
// In FeatureRow component
const slideVariants = {
  hidden: {
    opacity: 0,
    x: isEven ? -100 : 100, // Change distance
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,  // Change duration
      ease: [0.16, 1, 0.3, 1],  // Change easing
    },
  },
};
```

### To add/remove features:
Edit the `features` array in `WhatsIncluded.tsx`:
```tsx
const features: Feature[] = [
  {
    title: "New Feature",
    description: "Feature description here.",
    icon: <IconComponent className="w-12 h-12" />,
  },
  // ... more features
];
```

### To change colors:
Search and replace hex values:
- `#82007C` - primary purple
- `#6B0066` - hover purple
- `text-slate-900` - headings
- `text-slate-600` - body text

## Notes

- Icons are from lucide-react library (already installed)
- Motion animations from motion/react (already installed)
- No additional dependencies required
- Fully responsive and accessible
- Matches GrammarWorkout brand guidelines
