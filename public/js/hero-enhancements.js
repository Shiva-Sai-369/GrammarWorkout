/**
 * HERO SECTION ENHANCEMENTS
 * - Load sequence trigger
 * - Parallax scrolling effect
 * - Intersection Observer for performance
 * - Respects prefers-reduced-motion
 * 
 * Pure vanilla JS - no framework dependencies
 * WordPress/Elementor compatible
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Selectors (adjust these to match your actual HTML structure)
  const SELECTORS = {
    hero: '.hero-enhanced',
    headline: '.hero-headline-text',
    subheadline: '.hero-subheadline-text',
    ctaButtons: '.hero-cta-buttons',
    illustration: '.hero-illustration-container',
    parallaxContent: '.hero-parallax-layer',
  };

  // Parallax configuration
  const PARALLAX_CONFIG = {
    illustrationFactor: 0.3, // slower movement (0.3 = 30% of scroll speed)
    maxOffset: 30, // maximum pixels to offset
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    if (prefersReducedMotion) {
      // Show everything immediately without animation
      showAllElements();
      return;
    }

    setupLoadSequence();
    setupParallax();
    setupCursorReveal();
  }

  /**
   * Show all elements immediately (reduced motion fallback)
   */
  function showAllElements() {
    const hero = document.querySelector(SELECTORS.hero);
    if (hero) {
      hero.classList.remove('will-animate');
    }
    
    Object.values(SELECTORS).forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el) {
          el.style.opacity = '1';
          el.classList.remove('animate-in', 'float-active');
        }
      });
    });
  }

  /**
   * Setup load sequence animation
   * Uses Intersection Observer to trigger when hero enters viewport
   */
  function setupLoadSequence() {
    const hero = document.querySelector(SELECTORS.hero);
    if (!hero) return;

    // Add will-animate class to hide elements before animation starts
    hero.classList.add('will-animate');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerLoadSequence();
            observer.disconnect(); // Only trigger once
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of hero is visible
        rootMargin: '0px 0px -10% 0px', // Start slightly before entering viewport
      }
    );

    observer.observe(hero);
  }

  /**
   * Trigger the staggered load animation sequence
   */
  function triggerLoadSequence() {
    const headline = document.querySelector(SELECTORS.headline);
    const subheadline = document.querySelector(SELECTORS.subheadline);
    const ctaButtons = document.querySelector(SELECTORS.ctaButtons);
    const illustration = document.querySelector(SELECTORS.illustration);

    if (headline) headline.classList.add('animate-in');
    if (subheadline) subheadline.classList.add('animate-in');
    if (ctaButtons) ctaButtons.classList.add('animate-in');
    
    if (illustration) {
      illustration.classList.add('animate-in');
      
      // Add float animation after load completes (1.5s delay)
      setTimeout(() => {
        illustration.classList.add('float-active');
      }, 1500);
    }
  }

  /**
   * Setup parallax scrolling effect
   */
  function setupParallax() {
    const hero = document.querySelector(SELECTORS.hero);
    const illustration = document.querySelector(SELECTORS.illustration);
    
    if (!hero || !illustration) return;

    let ticking = false;
    let heroTop = 0;
    let heroHeight = 0;

    // Calculate hero bounds
    function updateHeroBounds() {
      const rect = hero.getBoundingClientRect();
      heroTop = rect.top + window.pageYOffset;
      heroHeight = rect.height;
    }

    // Initial calculation
    updateHeroBounds();

    // Recalculate on resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateHeroBounds, 150);
    });

    // Parallax scroll handler
    function updateParallax() {
      const scrollY = window.pageYOffset;
      const heroInView = scrollY < (heroTop + heroHeight);

      if (!heroInView) {
        ticking = false;
        return;
      }

      // Calculate scroll progress within hero section (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, scrollY / heroHeight));

      // Apply parallax offset to illustration
      // Illustration moves slower = appears further back
      const illustrationOffset = -(scrollProgress * PARALLAX_CONFIG.maxOffset * PARALLAX_CONFIG.illustrationFactor);

      if (illustration) {
        illustration.style.transform = `translateY(${illustrationOffset}px)`;
      }

      ticking = false;
    }

    // Throttled scroll listener using requestAnimationFrame
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    // Initial parallax position
    updateParallax();
  }

  /**
   * Cleanup function (if needed for SPA navigation)
   */
  window.heroEnhancementsCleanup = function() {
    console.log('Hero enhancements cleanup called');
  };

  /**
   * Setup cursor reveal effect
   * Makes the overlay transparent where the cursor hovers
   */
  function setupCursorReveal() {
    const illustration = document.querySelector(SELECTORS.illustration);
    
    if (!illustration) return;

    // Check for hover capability (exclude touch devices)
    const hasHoverCapability = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasHoverCapability) return;

    // Current and target mouse positions (as percentages)
    let currentX = 50;
    let currentY = 50;
    let targetX = 50;
    let targetY = 50;
    
    let isHovering = false;
    let animationFrameId = null;

    /**
     * Update mouse position on mousemove
     */
    function handleMouseMove(event) {
      const rect = illustration.getBoundingClientRect();
      
      // Calculate mouse position as percentage relative to illustration
      targetX = ((event.clientX - rect.left) / rect.width) * 100;
      targetY = ((event.clientY - rect.top) / rect.height) * 100;
      
      // Clamp values
      targetX = Math.max(0, Math.min(100, targetX));
      targetY = Math.max(0, Math.min(100, targetY));
      
      if (!isHovering) {
        isHovering = true;
        illustration.classList.add('reveal-active');
        startRevealAnimation();
      }
    }

    /**
     * Handle mouse leave
     */
    function handleMouseLeave() {
      isHovering = false;
      illustration.classList.remove('reveal-active');
      
      // Reset to center
      targetX = 50;
      targetY = 50;
    }

    /**
     * Smooth lerp animation loop
     */
    function startRevealAnimation() {
      function animate() {
        if (!isHovering && Math.abs(currentX - targetX) < 0.1 && Math.abs(currentY - targetY) < 0.1) {
          // Close enough to target, stop animating
          currentX = targetX;
          currentY = targetY;
          updateCursorPosition();
          animationFrameId = null;
          return;
        }

        // Lerp (linear interpolation) for smooth following
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;

        updateCursorPosition();

        if (isHovering || Math.abs(currentX - targetX) >= 0.1 || Math.abs(currentY - targetY) >= 0.1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          animationFrameId = null;
        }
      }

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }

    /**
     * Update CSS custom properties for cursor position
     */
    function updateCursorPosition() {
      illustration.style.setProperty('--mouse-x', `${currentX}%`);
      illustration.style.setProperty('--mouse-y', `${currentY}%`);
    }

    // Attach event listeners
    illustration.addEventListener('mousemove', handleMouseMove, { passive: true });
    illustration.addEventListener('mouseleave', handleMouseLeave);
  }

})();
