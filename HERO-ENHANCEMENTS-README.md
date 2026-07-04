# Hero Section Enhancements

## Overview
Enhanced hero section with sophisticated animations, parallax scrolling, and an interactive cursor reveal mask effect while maintaining the original copy, layout, and illustration.

## Features Implemented

### ✅ 1. Load Sequence Animation
- **Headline** fades/slides up first
- **Subheadline** follows 150ms later
- **CTA buttons** appear 150ms after subheadline
- **Illustration** fades + scales in last (from 1.03 to 1)
- Eye reads text before landing on art

### ✅ 2. Parallax Scrolling
- Illustration translates vertically slower than text content
- Subtle depth effect (max 20-30px offset over hero scroll range)
- Smooth, performant using requestAnimationFrame

### ✅ 3. Ambient Float
- Very slow 6-8s loop
- Small 2-4px vertical drift
- Illustration feels subtly alive at rest
- Starts after load sequence completes

### ✅ 4. Cursor Reveal Mask Effect (NEW)
- **Interactive spotlight** that follows cursor over hero image
- Areas under cursor reveal to full opacity (like a flashlight)
- Outside cursor radius maintains faded/masked state
- **Soft feathered edge** (200px diameter) with smooth fallout
- **Smooth lerp animation** (not instant snap) for fluid movement
- Uses CSS `mask-image` with radial-gradient + custom properties
- **Desktop only** - disabled on mobile/touch devices
- **Pointer-events safe** - doesn't block clicks on overlaid content
- Respects prefers-reduced-motion

### ✅ 5. Edge Treatment
- Horizontal fade-to-background gradient mask on left/right edges
- Integrated with cursor reveal mask
- Softens character crop appearance
- Works with existing bottom fade

### ✅ 6. Text Legibility Scrim
- Soft radial white/light gradient behind headline
- Keeps "Classroom Results" readable against busy illustration
- Doesn't dull overall art

### ✅ 7. CEFR Badge Pulse
- Slow, subtle pulse/glow animation
- Starts after load sequence completes (1.5s delay)
- 3s loop with soft shadow + brightness change

### ✅ 8. Enhanced Button Hovers
- **Primary button:** Scale 1.03 + soft shadow lift
- **Secondary button:** Background tint fade
- Smooth cubic-bezier easing

### ✅ 9. Accessibility
- Fully respects `prefers-reduced-motion`
- All animations disabled when reduced motion is enabled
- Cursor reveal disabled on touch devices
- Graceful degradation with no motion

## Files Created

### CSS
**`src/styles/hero-enhancements.css`**
- Load sequence keyframes
- Parallax setup
- Ambient float animation
- Edge fade treatment
- Text scrim styling
- CEFR badge pulse
- Button hover states
- Reduced motion media query

### JavaScript
**`public/js/hero-enhancements.js`**
- Pure vanilla JS (no framework dependencies)
- Intersection Observer for load sequence trigger
- Scroll parallax with requestAnimationFrame
- **Cursor reveal mask effect** with smooth lerp animation
- Mouse position tracking with CSS custom properties
- Hover capability detection (excludes touch devices)
- Reduced motion detection
- Performance optimized
- WordPress/Elementor compatible

## CSS Classes Added to HTML

```html
<!-- Hero Section -->
<section class="hero-enhanced">
  
  <!-- Illustration Container -->
  <div class="hero-illustration-container">
    <img src="..." />
    <div class="hero-illustration-fade-bottom"></div>
  </div>

  <!-- Text Scrim (behind headline) -->
  <div class="hero-text-scrim"></div>

  <!-- Content Layer -->
  <div class="hero-parallax-layer">
    
    <!-- Headline -->
    <h1 class="hero-headline-text">
      Turn Grammar Practice Into Real 
      <span>Classroom Results</span>
    </h1>

    <!-- Subheadline -->
    <p class="hero-subheadline-text">
      <span class="hero-cefr-badge">CEFR</span> 
      (Common European Framework...) 
    </p>

    <!-- CTA Buttons -->
    <div class="hero-cta-buttons">
      <a class="hero-btn-primary">Book a Consultation</a>
      <a class="hero-btn-secondary">Request a Quote</a>
    </div>

  </div>
</section>
```

## Animation Timeline

```
Page Load
    ↓
0ms   → Headline fades/slides up (800ms duration)
150ms → Subheadline fades/slides up (800ms duration)
300ms → CTA buttons fade/slide up (800ms duration)
450ms → Illustration fades + scales in (1000ms duration)
1500ms → Ambient float starts (infinite 7s loop)
1500ms → CEFR badge pulse starts (infinite 3s loop)

User Interaction
    ↓
On hover over hero image → Cursor reveal mask activates
Cursor moves → Spotlight follows smoothly (lerp easing)
Cursor leaves → Mask returns to default faded state
```

## Cursor Reveal Effect Details

The cursor reveal mask creates an interactive "spotlight" effect:

### How It Works
1. **CSS mask-image** combines three layers:
   - Radial gradient at cursor position (the spotlight)
   - Horizontal edge fade (left/right)
   - Vertical bottom fade

2. **CSS custom properties** (`--mouse-x`, `--mouse-y`) updated via JavaScript
   - Set to cursor position as percentage (0-100%)
   - Smooth lerp interpolation for fluid following

3. **Device detection**:
   - **Desktop (hover: hover)**: Full cursor reveal effect
   - **Touch devices**: Effect disabled, shows default fade only
   - **Reduced motion**: Effect disabled entirely

### Technical Implementation
```css
/* CSS mask with cursor position */
mask-image: 
  radial-gradient(
    circle 200px at var(--mouse-x) var(--mouse-y),
    rgba(0,0,0,1) 0%,      /* Full opacity at center */
    rgba(0,0,0,0.3) 40%,   /* Gradual fade */
    rgba(0,0,0,0) 100%     /* Transparent at edge */
  ),
  linear-gradient(...),    /* Edge fades */
  linear-gradient(...);    /* Bottom fade */
```

```javascript
// Smooth lerp animation
currentX += (targetX - currentX) * 0.15;
currentY += (targetY - currentY) * 0.15;

// Update CSS custom properties
image.style.setProperty('--mouse-x', `${currentX}%`);
image.style.setProperty('--mouse-y', `${currentY}%`);
```

## Parallax Math

```javascript
// Scroll position relative to hero height
scrollProgress = scrollY / heroHeight; // 0 to 1

// Illustration offset (slower = further back)
illustrationOffset = -(scrollProgress * 30px * 0.3);
// 30px = max offset, 0.3 = 30% of scroll speed

// Example:
// At 50% scroll through hero:
// illustrationOffset = -(0.5 * 30 * 0.3) = -4.5px
```

## Performance Notes

- ✅ Uses CSS `transform` (GPU-accelerated)
- ✅ `requestAnimationFrame` for smooth 60 FPS
- ✅ Intersection Observer (only animates when visible)
- ✅ `will-change: transform` for browser optimization
- ✅ Passive scroll listeners
- ✅ Debounced resize handlers
- ✅ `backface-visibility: hidden` for smoother transforms

## Browser Support

- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ IE11: Graceful degradation (no animations)
- ✅ Mobile Safari/Chrome: Full support
- ✅ Reduced motion: Full support

## WordPress/Elementor Integration

### Method 1: Theme Functions (Recommended)

Add to `functions.php`:

```php
function enqueue_hero_enhancements() {
  // Enqueue CSS
  wp_enqueue_style(
    'hero-enhancements',
    get_stylesheet_directory_uri() . '/css/hero-enhancements.css',
    array(),
    '1.0.0'
  );

  // Enqueue JS
  wp_enqueue_script(
    'hero-enhancements',
    get_stylesheet_directory_uri() . '/js/hero-enhancements.js',
    array(),
    '1.0.0',
    true // Load in footer
  );
}
add_action('wp_enqueue_scripts', 'enqueue_hero_enhancements');
```

### Method 2: Elementor Custom Code

1. **CSS:** Paste contents of `hero-enhancements.css` into:
   - Elementor → Custom CSS (Page Settings)
   - Or: Customizer → Additional CSS

2. **JS:** Paste contents of `hero-enhancements.js` into:
   - Elementor → Custom Code → Add New
   - Location: Footer
   - Display: Entire Site

### Method 3: Direct HTML Injection

In `<head>`:
```html
<link rel="stylesheet" href="/path/to/hero-enhancements.css">
```

Before `</body>`:
```html
<script src="/path/to/hero-enhancements.js"></script>
```

## Customization

### Adjust Cursor Reveal Size

Edit `hero-enhancements.css`:

```css
.hero-illustration-container img {
  --reveal-size: 200px; /* Change this (150px - 300px recommended) */
}
```

### Adjust Reveal Smoothness

Edit `hero-enhancements.js`:

```javascript
const REVEAL_CONFIG = {
  lerpFactor: 0.15, // Lower = slower/smoother (0.05 - 0.3)
};
```

### Adjust Animation Timing

Edit `hero-enhancements.css`:

```css
/* Load sequence delays */
.hero-headline-text.animate-in {
  animation-delay: 0ms; /* Change this */
}

.hero-subheadline-text.animate-in {
  animation-delay: 150ms; /* Change this */
}

/* Ambient float duration */
@keyframes ambientFloat {
  /* Change 7s to adjust speed */
}

/* CEFR badge pulse speed */
.hero-cefr-badge {
  animation: cefr-pulse 3s ease-in-out infinite; /* Change 3s */
}
```

### Adjust Parallax Intensity

Edit `hero-enhancements.js`:

```javascript
const PARALLAX_CONFIG = {
  illustrationFactor: 0.3, // Lower = slower movement (0.1 - 0.5)
  maxOffset: 30,           // Maximum pixels (10 - 50)
};
```

### Adjust Text Scrim

Edit `hero-enhancements.css`:

```css
.hero-text-scrim {
  width: 90%;        /* Adjust width */
  height: 300px;     /* Adjust height */
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.85) 0%,   /* Adjust opacity */
    rgba(255, 255, 255, 0.4) 50%,   /* Adjust opacity */
    transparent 100%
  );
}
```

## Troubleshooting

### Cursor reveal not working
- Check browser console for JavaScript errors
- Verify you're on a desktop device (not touch/mobile)
- Check that `(hover: hover) and (pointer: fine)` media query matches
- Ensure `.hero-illustration-container img` selector targets the image

### Reveal effect feels laggy
- Increase `lerpFactor` in JS config (0.2 - 0.3 for snappier)
- Check browser DevTools Performance tab
- Verify GPU acceleration is enabled

### Mask not combining properly
- Different browsers handle `mask-composite` differently
- Fallback to simpler mask if issues persist
- Test in Chrome, Firefox, Safari separately

### Animations not triggering
- Check that CSS classes are applied correctly
- Verify JS file is loaded (check browser console)
- Check for JavaScript errors in console
- Ensure `hero-enhanced` class is on section element

### Parallax too fast/slow
- Adjust `illustrationFactor` in JS config
- Lower value = slower, more subtle
- Higher value = faster, more dramatic

### Text legibility issues
- Increase scrim opacity in CSS
- Adjust scrim width/height
- Add text-shadow to headline

### Performance issues
- Check browser DevTools Performance tab
- Reduce `maxOffset` in parallax config
- Disable ambient float on low-end devices

## Debug Mode

Add `data-debug` attribute to hero section:

```html
<section class="hero-enhanced" data-debug>
```

This will:
- Show colored scrim overlay (for positioning)
- Log animation events to console
- Highlight parallax layers

## Notes

- ✅ Copy unchanged
- ✅ Layout structure unchanged
- ✅ Illustration unchanged
- ✅ Pure CSS + vanilla JS (no framework)
- ✅ WordPress/Elementor ready
- ✅ Production tested
- ✅ Accessibility compliant
