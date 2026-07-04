# How It Works - Training Log Style Redesign

## Overview
Redesigned the "How It Works" section as a training log style step tracker with scroll-driven progress animations and completion indicators.

## Key Features

### 1. **Training Log Style Indicators**
- **Default state**: Outlined circles (white background, slate border)
- **Completed state**: Solid purple filled circles with checkmark icons
- **Transition**: Smooth 500ms animation when step completes

### 2. **Scroll-Driven Progress**
- Progress line fills as user scrolls through the section
- **Desktop**: Horizontal line connecting steps (left to right)
- **Mobile**: Vertical line connecting steps (top to bottom)
- Steps complete at: 25%, 50%, 75%, 100% progress

### 3. **"Done" Label Animation**
- Appears after step completion animation (200ms delay)
- Small caps, uppercase, muted style
- **Desktop**: Positioned to the right of indicator
- **Mobile**: Positioned below indicator
- Fade-in with scale animation

### 4. **Dot Grid Background Pattern**
- Subtle repeating dot grid behind the section only
- Low opacity (5%) brand purple (#82007C)
- 20px × 20px grid spacing
- Creates visual distinction as a "process" section

### 5. **Accessibility & Performance**
- Full `prefers-reduced-motion` support
- Shows final "all done" state statically when motion is reduced
- Passive scroll listeners for performance
- Smooth transitions with GPU acceleration

## Design Specifications

### Status Indicators

#### Default State (Not Completed)
```css
Background: white
Border: 4px solid slate-300
Content: Number (1-4) in slate-400
Size: 64px × 64px (desktop), 48px × 48px (mobile)
```

#### Completed State
```css
Background: #82007C (brand purple)
Border: 4px solid #82007C
Content: Checkmark icon (white)
Animation: Scale pulse (1 → 1.1 → 1) over 400ms
```

### Progress Lines

#### Desktop (Horizontal)
```css
Background line: slate-200, 2px height
Active line: #82007C, 2px height
Position: Connects between step indicators
Width: Animates 0% → 84% based on scroll
```

#### Mobile (Vertical)
```css
Background line: slate-200, 2px width
Active line: #82007C, 2px width
Position: Left side, connects all steps
Height: Animates 0% → 100% based on scroll
```

### "Done" Labels
```css
Font: font-black uppercase
Size: text-xs
Color: text-slate-500
Letter spacing: tracking-wider
Animation: Fade in + scale (0.8 → 1) over 300ms with 200ms delay
```

### Dot Grid Pattern
```css
Pattern: radial-gradient circles
Color: rgba(130, 0, 124, 0.05)
Size: 1px dots
Spacing: 20px × 20px grid
```

## Animation Sequence

### Step Completion Timeline
```
User scrolls through section
    ↓
Progress line fills
    ↓
Step reaches threshold (25%, 50%, 75%, 100%)
    ↓
Indicator fills with purple + border changes (500ms)
    ↓
Checkmark icon appears (simultaneous)
    ↓
Scale pulse animation (400ms)
    ↓
After 200ms delay → "Done" label fades in (300ms)
```

### Scroll Progress Calculation
```javascript
// Trigger when section is 80% into viewport
triggerPoint = windowHeight * 0.8

// Calculate progress (0 to 1)
progress = (triggerPoint - sectionTop) / (sectionHeight * 0.6)

// Mark steps complete
if (progress >= 0.25) complete step 1
if (progress >= 0.5)  complete step 2
if (progress >= 0.75) complete step 3
if (progress >= 1.0)  complete step 4
```

## File Structure

```
src/
├── components/
│   └── HowItWorks.tsx           # New component with scroll logic
├── styles/
│   └── how-it-works.css         # Animations and dot grid pattern
└── main.tsx                     # Updated to import CSS
```

## Implementation Details

### Component State
```tsx
const [completedSteps, setCompletedSteps] = useState<number[]>([]);
const [scrollProgress, setScrollProgress] = useState(0);
```

### Scroll Event Handler
- Passive listener for performance
- Calculates section position relative to viewport
- Updates progress line width/height dynamically
- Marks steps complete at threshold points

### Reduced Motion Support
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  setCompletedSteps([1, 2, 3, 4]); // Show all complete
  setScrollProgress(100); // Full progress
  return; // Skip scroll listener
}
```

## Content (Unchanged)

1. **Consultation**
   - A short call about your language, student levels, and class sizes.

2. **Syllabus Fit Check**
   - We compare GrammarWorkout's content to what you're already teaching, level by level.

3. **Proposal**
   - You get pricing built around your program size, not a flat rate.

4. **Rollout & Support**
   - Staff get a short walkthrough, and your program gets an ongoing contact once it's live.

## Responsive Behavior

### Desktop (≥ 768px)
- Horizontal layout (4 columns)
- Progress line left-to-right
- "Done" labels to right of indicators
- Wider spacing between steps

### Mobile (< 768px)
- Vertical stacked layout
- Progress line top-to-bottom
- "Done" labels below indicators
- Tighter vertical spacing

## CSS Classes Reference

### Main container
```css
.how-it-works-section
  - position: relative
  - overflow: hidden (for dot pattern)
```

### Dot pattern
```css
.dot-grid-pattern
  - radial-gradient background
  - absolute positioned overlay
  - pointer-events: none
```

### Step completion
```css
.step-completed
  - Triggers scale pulse animation
  - 400ms ease-out
```

### Done label
```css
.done-label
  - Fade-in + scale animation
  - 300ms ease-out
  - 200ms delay
```

## Performance Optimizations

1. **will-change** properties on animated elements
2. **Passive scroll listeners** - no scroll blocking
3. **GPU-accelerated transforms** - translate, scale
4. **Single scroll handler** - updates all states at once
5. **Cleanup on unmount** - removes event listeners

## Browser Compatibility

- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile Safari/Chrome - full support
- ✅ IE11 - graceful degradation (no animations)
- ✅ Reduced motion - full static fallback

## Customization

### Adjust completion thresholds
```tsx
// In HowItWorks.tsx
if (progress >= 0.25) newCompletedSteps.push(1); // Change 0.25
if (progress >= 0.5)  newCompletedSteps.push(2); // Change 0.5
if (progress >= 0.75) newCompletedSteps.push(3); // Change 0.75
if (progress >= 1)    newCompletedSteps.push(4); // Change 1
```

### Change animation durations
```css
/* In how-it-works.css */
.step-completed {
  animation: stepComplete 0.4s ease-out; /* Change 0.4s */
}

.done-label {
  animation: doneLabel 0.3s ease-out 0.2s forwards; 
  /* Change 0.3s duration or 0.2s delay */
}
```

### Modify dot grid
```css
.dot-grid-pattern {
  background-image: radial-gradient(
    circle, 
    rgba(130, 0, 124, 0.05) 1px,  /* Change opacity or size */
    transparent 1px
  );
  background-size: 20px 20px; /* Change spacing */
}
```

## Testing Checklist

- ✅ Scroll triggers animations correctly
- ✅ Steps complete at right thresholds
- ✅ "Done" labels appear with delay
- ✅ Progress line fills smoothly
- ✅ Responsive on mobile/tablet/desktop
- ✅ Reduced motion shows static state
- ✅ No scroll jank or performance issues
- ✅ Dot grid pattern visible but subtle

## Notes

- Pure vanilla JS + CSS (no framework dependencies)
- No additional npm packages required
- Uses existing lucide-react for checkmark icon
- Maintains GrammarWorkout brand colors throughout
- Content identical to previous version (visual upgrade only)
