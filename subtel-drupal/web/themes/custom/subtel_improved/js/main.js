/**
 * MAIN.JS - Main theme JavaScript
 */

(function() {
  'use strict';

  // Hero Carousel
  class HeroCarousel {
    constructor(element) {
      this.wrapper = element;
      this.carousel = element.querySelector('.hero-carousel');
      this.slides = element.querySelectorAll('.hero-slide');
      this.dots = element.querySelectorAll('.nav-dot');
      this.playPauseBtn = element.querySelector('.carousel-play-pause');

      this.currentSlide = 0;
      this.autoPlayInterval = null;
      this.autoPlaySpeed = parseInt(element.dataset.interval) || 5000;
      this.isPlaying = true;

      this.init();
    }

    init() {
      if (this.slides.length === 0) return;

      // Set first slide as active
      this.updateSlide(0);

      // Event listeners
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          this.goToSlide(index);
          this.resetAutoPlay();
        });
      });

      // Play/Pause button
      if (this.playPauseBtn) {
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
      }

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prevSlide();
        if (e.key === 'ArrowRight') this.nextSlide();
      });

      // Auto play
      if (this.wrapper.dataset.autoPlay === 'true') {
        this.startAutoPlay();
      }

      // Pause on hover
      this.carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
      this.carousel.addEventListener('mouseleave', () => {
        if (this.isPlaying) this.startAutoPlay();
      });
    }

    updateSlide(index) {
      // Remove active from all slides and dots
      this.slides.forEach(slide => slide.classList.remove('active'));
      this.dots.forEach(dot => dot.classList.remove('active'));

      // Add active to current
      this.slides[index].classList.add('active');
      this.dots[index].classList.add('active');
      this.currentSlide = index;
    }

    goToSlide(index) {
      if (index < 0 || index >= this.slides.length) return;
      this.updateSlide(index);
    }

    nextSlide() {
      const next = (this.currentSlide + 1) % this.slides.length;
      this.updateSlide(next);
    }

    prevSlide() {
      const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.updateSlide(prev);
    }

    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlaySpeed);
    }

    pauseAutoPlay() {
      clearInterval(this.autoPlayInterval);
    }

    resetAutoPlay() {
      this.pauseAutoPlay();
      if (this.isPlaying) this.startAutoPlay();
    }

    togglePlayPause() {
      this.isPlaying = !this.isPlaying;

      if (this.isPlaying) {
        this.startAutoPlay();
        this.updatePlayButton();
      } else {
        this.pauseAutoPlay();
        this.updatePlayButton();
      }
    }

    updatePlayButton() {
      const playIcon = this.playPauseBtn?.querySelector('.play-icon');
      const pauseIcon = this.playPauseBtn?.querySelector('.pause-icon');

      if (this.isPlaying) {
        playIcon?.style.setProperty('display', 'none');
        pauseIcon?.style.setProperty('display', 'block');
      } else {
        playIcon?.style.setProperty('display', 'block');
        pauseIcon?.style.setProperty('display', 'none');
      }
    }
  }

  // Mega Menu
  class MegaMenu {
    constructor(element) {
      this.menu = element;
      this.menuToggle = element.querySelector('.menu-toggle');
      this.navMenu = element.querySelector('.nav-menu');
      this.groupToggles = element.querySelectorAll('.group-toggle');

      this.init();
    }

    init() {
      if (!this.menuToggle || !this.navMenu) return;

      // Mobile menu toggle
      this.menuToggle.addEventListener('click', () => this.toggleMenu());

      // Close menu on link click (mobile)
      this.navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 1024) {
            this.closeMenu();
          }
        });
      });

      // Group toggles (mobile)
      this.groupToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
          const submenu = toggle.nextElementSibling;
          submenu?.classList.toggle('show');
          toggle.setAttribute('aria-expanded',
            toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
          );
        });
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.navMenu.classList.contains('show')) {
          this.closeMenu();
        }
      });

      // Close menu on outside click
      document.addEventListener('click', (e) => {
        if (!this.menu.contains(e.target)) {
          this.closeMenu();
        }
      });

      // Handle window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
          this.navMenu.classList.remove('show');
        }
      });
    }

    toggleMenu() {
      this.navMenu.classList.toggle('show');
      this.menuToggle.setAttribute('aria-expanded',
        this.navMenu.classList.contains('show') ? 'true' : 'false'
      );
    }

    closeMenu() {
      this.navMenu.classList.remove('show');
      this.menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  // Language Selector
  class LanguageSelector {
    constructor(element) {
      this.selector = element;
      this.toggle = element.querySelector('.lang-toggle');
      this.menu = element.querySelector('.lang-menu');

      this.init();
    }

    init() {
      if (!this.toggle || !this.menu) return;

      this.toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMenu();
      });

      this.menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          // Aquí iría lógica de cambio de idioma
          this.closeMenu();
        });
      });

      document.addEventListener('click', () => this.closeMenu());
    }

    toggleMenu() {
      this.menu.classList.toggle('show');
    }

    closeMenu() {
      this.menu.classList.remove('show');
    }
  }

  // Initialization
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize Hero Carousel
    document.querySelectorAll('.hero-carousel-wrapper').forEach(el => {
      new HeroCarousel(el);
    });

    // Initialize Mega Menu
    document.querySelectorAll('.mega-menu').forEach(el => {
      new MegaMenu(el);
    });

    // Initialize Language Selector
    document.querySelectorAll('.lang-selector').forEach(el => {
      new LanguageSelector(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
          e.preventDefault();
          document.querySelector(href).scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // Mobile menu search toggle
    const searchBtn = document.querySelector('[data-toggle="search"]');
    const searchForm = document.querySelector('.search-form');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        searchForm.classList.toggle('show');
      });
    }
  });

  // Expose to window for external scripts
  window.SubtelTheme = {
    HeroCarousel,
    MegaMenu,
    LanguageSelector
  };

})();
