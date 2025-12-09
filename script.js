/**
 * KAKAO CAFÉ - Main JavaScript
 * Vanilla JavaScript for interactions and animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNavigation();
  initMenuTabs();
  initScrollReveal();
  initSmoothScroll();
});

/**
 * Navigation Module
 * - Scroll effect for nav background
 * - Mobile menu toggle
 */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Scroll effect
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when page is scrolled
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

/**
 * Menu Tabs Module
 * - Filter menu items by category
 * - Animate items on category change
 */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const items = document.querySelectorAll('.menu-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Filter items with animation
      items.forEach((item, index) => {
        if (item.dataset.category === category) {
          item.style.display = 'flex';
          // Staggered animation
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 50);
        } else {
          item.classList.remove('visible');
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });

      // Show toast message
      showToast(`${getCategoryName(category)} 메뉴를 보여드릴게요 ☕`);
    });
  });

  // Initialize visible state for default category
  const activeCategory = document.querySelector('.menu-tab.active')?.dataset.category;
  items.forEach((item, index) => {
    if (item.dataset.category === activeCategory) {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 100);
    }
  });
}

/**
 * Get Korean category name
 */
function getCategoryName(category) {
  const names = {
    coffee: '커피',
    beverage: '음료',
    dessert: '디저트'
  };
  return names[category] || category;
}

/**
 * Scroll Reveal Module
 * - Reveal elements on scroll
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.section-header, .about-text, .about-features, .contact-item, .contact-map');
  
  revealElements.forEach(el => {
    el.classList.add('reveal');
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optional: stop observing after revealed
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Smooth Scroll Module
 * - Smooth scroll to anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Toast Notification
 * - Shows toast message at the bottom
 * - Slides up when shown, slides down when hidden
 */
function showToast(message, duration = 2500) {
  const container = document.getElementById('toast-container');
  
  if (!container) return;
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  // Add to container
  container.appendChild(toast);
  
  // Remove toast after duration
  setTimeout(() => {
    toast.classList.add('hiding');
    
    // Remove element after animation
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, duration);
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

