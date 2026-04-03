/**
 * The Lost Star Map - Fantasy Gameschooling Curriculum
 * Single-page scrolling site JavaScript
 * Vanilla JS, no frameworks
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. NAVIGATION SCROLL EFFECT
  //    Adds 'nav-scrolled' class when page is scrolled past 100px.
  //    Highlights the nav link corresponding to the current visible section.
  // =========================================================================

  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function updateNav() {
    if (!nav) return;

    // Toggle scrolled class
    if (window.scrollY > 100) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }

    // Determine which section is currently in view
    const scrollPos = window.scrollY + nav.offsetHeight + 50;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        const id = section.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // Run once on load

  // =========================================================================
  // 2. SMOOTH SCROLL
  //    Click handlers on nav links for smooth scrolling to sections,
  //    accounting for fixed nav height offset.
  // =========================================================================

  function getNavHeight() {
    return nav ? nav.offsetHeight : 0;
  }

  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const offset = getNavHeight();
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      smoothScrollTo(targetId);

      // Close mobile menu if open
      closeMobileMenu();
    });
  });

  // =========================================================================
  // 3. MOBILE MENU TOGGLE
  //    Hamburger button opens/closes a mobile nav overlay.
  // =========================================================================

  const hamburger = document.querySelector('.hamburger');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');

  function openMobileMenu() {
    if (mobileOverlay) {
      mobileOverlay.classList.add('open');
      document.body.classList.add('menu-open');
    }
    if (hamburger) {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
  }

  function closeMobileMenu() {
    if (mobileOverlay) {
      mobileOverlay.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileOverlay && mobileOverlay.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close mobile menu when clicking overlay background (not the links container)
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', (e) => {
      if (e.target === mobileOverlay) {
        closeMobileMenu();
      }
    });

    // Close on link click inside overlay
    mobileOverlay.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        closeMobileMenu();
        // Small delay so the overlay closes before scroll begins
        setTimeout(() => smoothScrollTo(targetId), 100);
      });
    });
  }

  // =========================================================================
  // 4. MISSION ACCORDION PANELS
  //    Expand/collapse mission details. Only one mission open at a time.
  //    Panel: .mission-panel, Trigger: .mission-trigger, Content: .mission-content
  //    Active state toggled via 'active' class on .mission-panel.
  // =========================================================================

  const missionPanels = document.querySelectorAll('.mission-panel');

  function closeAllMissions() {
    missionPanels.forEach((panel) => {
      panel.classList.remove('active');
      const content = panel.querySelector('.mission-content');
      if (content) {
        content.style.maxHeight = null;
      }
      const trigger = panel.querySelector('.mission-trigger');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function openMission(panel) {
    panel.classList.add('active');
    const content = panel.querySelector('.mission-content');
    if (content) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
    const trigger = panel.querySelector('.mission-trigger');
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'true');
    }
  }

  function toggleMission(panel) {
    const isActive = panel.classList.contains('active');
    closeAllMissions();
    if (!isActive) {
      openMission(panel);
    }
  }

  missionPanels.forEach((panel) => {
    const trigger = panel.querySelector('.mission-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        toggleMission(panel);
      });
    }
  });

  // =========================================================================
  // 5. CONSTELLATION MAP INTERACTIVITY
  //    Clicking a constellation group in the SVG scrolls to and opens the
  //    corresponding mission panel. Each group has data-mission="1"..."15".
  // =========================================================================

  const constellationGroups = document.querySelectorAll('.constellation-group');

  function getMissionPanel(missionNumber) {
    // Find the mission panel whose data-mission matches, or use index
    const panel = document.querySelector(
      '.mission-panel[data-mission="' + missionNumber + '"]'
    );
    if (panel) return panel;

    // Fallback: use zero-based index
    const index = parseInt(missionNumber, 10) - 1;
    if (index >= 0 && index < missionPanels.length) {
      return missionPanels[index];
    }
    return null;
  }

  constellationGroups.forEach((group) => {
    group.style.cursor = 'pointer';

    group.addEventListener('click', () => {
      const missionNum = group.getAttribute('data-mission');
      if (!missionNum) return;

      const panel = getMissionPanel(missionNum);
      if (!panel) return;

      // Close all, then open the target mission
      closeAllMissions();
      openMission(panel);

      // Scroll to the panel with offset for the nav
      const offset = getNavHeight();
      const panelTop = panel.getBoundingClientRect().top + window.scrollY - offset - 20;
      window.scrollTo({ top: panelTop, behavior: 'smooth' });
    });
  });

  // =========================================================================
  // 6. PROGRESS TRACKER
  //    Right-click (or long-press on mobile) a constellation to toggle
  //    its completion state (lit vs dim). State stored in a JS object.
  //    Updates a progress counter: "X of 15 Constellations Restored".
  // =========================================================================

  // In-memory progress state (not localStorage per spec)
  const constellationState = {};

  // Initialize all constellations as dim
  constellationGroups.forEach((group) => {
    const mission = group.getAttribute('data-mission');
    if (mission) {
      constellationState[mission] = false;
      group.classList.add('constellation-dim');
      group.classList.remove('constellation-lit');
    }
  });

  const progressCounter = document.querySelector('.progress-counter');
  const totalConstellations = constellationGroups.length || 15;

  function updateProgressDisplay() {
    const litCount = Object.values(constellationState).filter(Boolean).length;
    if (progressCounter) {
      progressCounter.textContent = litCount + ' of ' + totalConstellations + ' Constellations Restored';
    }
  }

  function toggleConstellationCompletion(group) {
    const mission = group.getAttribute('data-mission');
    if (!mission) return;

    constellationState[mission] = !constellationState[mission];

    if (constellationState[mission]) {
      group.classList.remove('constellation-dim');
      group.classList.add('constellation-lit');
    } else {
      group.classList.remove('constellation-lit');
      group.classList.add('constellation-dim');
    }

    updateProgressDisplay();
  }

  // Right-click to toggle on desktop
  constellationGroups.forEach((group) => {
    group.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      toggleConstellationCompletion(group);
    });
  });

  // Long-press to toggle on mobile (500ms threshold)
  let longPressTimer = null;
  let longPressTriggered = false;

  constellationGroups.forEach((group) => {
    group.addEventListener('touchstart', (e) => {
      longPressTriggered = false;
      longPressTimer = setTimeout(() => {
        longPressTriggered = true;
        toggleConstellationCompletion(group);
      }, 500);
    }, { passive: true });

    group.addEventListener('touchend', (e) => {
      clearTimeout(longPressTimer);
      // If long press was triggered, prevent the normal click from firing
      if (longPressTriggered) {
        e.preventDefault();
        longPressTriggered = false;
      }
    });

    group.addEventListener('touchmove', () => {
      // Cancel long press if user moves finger
      clearTimeout(longPressTimer);
    }, { passive: true });
  });

  updateProgressDisplay(); // Initialize counter

  // =========================================================================
  // 7. SCROLL-TRIGGERED FADE-IN ANIMATIONS
  //    IntersectionObserver adds 'is-visible' to '.fade-in-section' elements
  //    when they enter the viewport.
  // =========================================================================

  const fadeInElements = document.querySelectorAll('.fade-in-section');

  if ('IntersectionObserver' in window && fadeInElements.length > 0) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Once visible, stop observing (animate only once)
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: '0px 0px -50px 0px',
      }
    );

    fadeInElements.forEach((el) => fadeObserver.observe(el));
  }

  // =========================================================================
  // 8. STAR FIELD PARALLAX
  //    Subtle parallax movement of star layers in the hero section on scroll.
  //    Looks for elements with class 'star-layer' inside '.hero'.
  // =========================================================================

  const hero = document.querySelector('.hero');
  const starLayers = hero ? hero.querySelectorAll('.star-layer') : [];

  function updateParallax() {
    if (!hero || starLayers.length === 0) return;

    const scrollY = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight;

    // Only apply parallax while hero is in view
    if (scrollY > heroBottom) return;

    starLayers.forEach((layer, index) => {
      // Each layer moves at a different speed based on its index
      const speed = 0.1 + index * 0.08;
      const yOffset = -(scrollY * speed);
      layer.style.transform = 'translateY(' + yOffset + 'px)';
    });
  }

  if (starLayers.length > 0) {
    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
  }

  // =========================================================================
  // 9. QUEST ITEM FILTERING
  //    In the Star Navigator's Pack section, filter buttons show only items
  //    from a specific mission. Items: .item-card with data-mission attribute.
  //    Filter buttons: .filter-btn with data-mission attribute.
  // =========================================================================

  const filterButtons = document.querySelectorAll('.filter-btn');
  const itemCards = document.querySelectorAll('.item-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const missionFilter = btn.getAttribute('data-mission');

      // Update active state on filter buttons
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Show all if filter is "all" or empty
      if (!missionFilter || missionFilter === 'all') {
        itemCards.forEach((card) => {
          card.style.display = '';
          card.classList.remove('hidden');
        });
        return;
      }

      // Filter cards by mission number
      itemCards.forEach((card) => {
        const cardMission = card.getAttribute('data-mission');
        if (cardMission === missionFilter) {
          card.style.display = '';
          card.classList.remove('hidden');
        } else {
          card.style.display = 'none';
          card.classList.add('hidden');
        }
      });
    });
  });

  // =========================================================================
  // 10. CURRICULUM TABLE SORTING
  //     Click .sortable-header elements to sort the curriculum reference table.
  //     Headers have a data-sort-key attribute indicating which column to sort.
  // =========================================================================

  const sortableHeaders = document.querySelectorAll('.sortable-header');

  sortableHeaders.forEach((header) => {
    // Track sort direction per header
    header._sortAsc = true;

    header.addEventListener('click', () => {
      const sortKey = header.getAttribute('data-sort-key');
      if (!sortKey) return;

      // Find the parent table
      const table = header.closest('table');
      if (!table) return;

      const tbody = table.querySelector('tbody');
      if (!tbody) return;

      const rows = Array.from(tbody.querySelectorAll('tr'));
      const headerRow = header.closest('tr');
      if (!headerRow) return;

      // Determine column index from the header's position
      const headerCells = Array.from(headerRow.children);
      const colIndex = headerCells.indexOf(header);
      if (colIndex === -1) return;

      // Toggle sort direction
      const ascending = header._sortAsc;
      header._sortAsc = !ascending;

      // Update sort indicator classes on all headers
      sortableHeaders.forEach((h) => {
        h.classList.remove('sort-asc', 'sort-desc');
      });
      header.classList.add(ascending ? 'sort-asc' : 'sort-desc');

      // Sort rows
      rows.sort((a, b) => {
        const cellA = a.children[colIndex];
        const cellB = b.children[colIndex];
        if (!cellA || !cellB) return 0;

        let valA = (cellA.textContent || '').trim();
        let valB = (cellB.textContent || '').trim();

        // Try numeric comparison first
        const numA = parseFloat(valA);
        const numB = parseFloat(valB);
        if (!isNaN(numA) && !isNaN(numB)) {
          return ascending ? numA - numB : numB - numA;
        }

        // Fall back to locale-aware string comparison
        const comparison = valA.localeCompare(valB, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
        return ascending ? comparison : -comparison;
      });

      // Re-append rows in sorted order
      rows.forEach((row) => tbody.appendChild(row));
    });
  });

  // =========================================================================
  // 11. BACK TO TOP BUTTON
  //     Shows after scrolling 500px, smooth scrolls to top on click.
  // =========================================================================

  const backToTopBtn = document.querySelector('.back-to-top');

  function updateBackToTop() {
    if (!backToTopBtn) return;
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  if (backToTopBtn) {
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    updateBackToTop();
  }

  // =========================================================================
  // 12. IMAGE LAZY LOADING
  //     IntersectionObserver swaps data-src to src when image enters viewport.
  // =========================================================================

  const lazyImages = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window && lazyImages.length > 0) {
    const lazyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
              img.setAttribute('src', src);
              img.removeAttribute('data-src');
              // Optional: handle load/error
              img.addEventListener('load', () => {
                img.classList.add('loaded');
              });
              img.addEventListener('error', () => {
                img.classList.add('load-error');
              });
            }
            lazyObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: '200px 0px', // Start loading 200px before visible
      }
    );

    lazyImages.forEach((img) => lazyObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver: load all immediately
    lazyImages.forEach((img) => {
      const src = img.getAttribute('data-src');
      if (src) {
        img.setAttribute('src', src);
        img.removeAttribute('data-src');
      }
    });
  }

  // =========================================================================
  // 13. PRINT MISSION
  //     "Print This Mission" button (class .print-mission-btn) adds a class
  //     to body so print styles can isolate that mission, then calls print().
  // =========================================================================

  const printButtons = document.querySelectorAll('.print-mission-btn');

  printButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Find the closest mission panel ancestor
      const panel = btn.closest('.mission-panel');
      if (!panel) return;

      // Mark the panel and body for print isolation
      panel.classList.add('print-target');
      document.body.classList.add('printing-mission');

      window.print();

      // Clean up classes after printing
      // Use a small delay to ensure print dialog has opened
      const cleanup = () => {
        panel.classList.remove('print-target');
        document.body.classList.remove('printing-mission');
      };

      // 'afterprint' fires when print dialog closes
      if ('onafterprint' in window) {
        window.addEventListener('afterprint', cleanup, { once: true });
      } else {
        // Fallback for browsers without afterprint
        setTimeout(cleanup, 1000);
      }
    });
  });

  // =========================================================================
  // 14. KEYBOARD NAVIGATION
  //     - Escape closes mobile menu and open accordions
  //     - Arrow keys navigate between missions when a trigger is focused
  // =========================================================================

  document.addEventListener('keydown', (e) => {
    // Escape key handling
    if (e.key === 'Escape') {
      // Close mobile menu if open
      if (mobileOverlay && mobileOverlay.classList.contains('open')) {
        closeMobileMenu();
        if (hamburger) hamburger.focus();
        return;
      }

      // Close any open mission accordion
      const activePanel = document.querySelector('.mission-panel.active');
      if (activePanel) {
        closeAllMissions();
        const trigger = activePanel.querySelector('.mission-trigger');
        if (trigger) trigger.focus();
      }
    }

    // Arrow key navigation between mission triggers
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const focused = document.activeElement;
      if (!focused || !focused.classList.contains('mission-trigger')) return;

      const triggers = Array.from(document.querySelectorAll('.mission-trigger'));
      const currentIndex = triggers.indexOf(focused);
      if (currentIndex === -1) return;

      e.preventDefault(); // Prevent page scrolling

      let nextIndex;
      if (e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % triggers.length;
      } else {
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
      }

      triggers[nextIndex].focus();
    }
  });

  // Allow Enter and Space to toggle mission panels on triggers (for keyboard a11y)
  document.querySelectorAll('.mission-trigger').forEach((trigger) => {
    // Make triggers focusable if they aren't already buttons
    if (!trigger.getAttribute('tabindex') && trigger.tagName !== 'BUTTON') {
      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('role', 'button');
    }

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });

  // =========================================================================
  // 15. SEARCH/FILTER FOR CURRICULUM TABLE
  //     Simple text input that filters table rows by matching cell content.
  //     Input: .table-search-input, Table: .curriculum-table
  // =========================================================================

  const tableSearchInput = document.querySelector('.table-search-input');
  const curriculumTable = document.querySelector('.curriculum-table');

  if (tableSearchInput && curriculumTable) {
    const tbody = curriculumTable.querySelector('tbody');

    tableSearchInput.addEventListener('input', () => {
      const query = tableSearchInput.value.toLowerCase().trim();

      if (!tbody) return;

      const rows = tbody.querySelectorAll('tr');

      rows.forEach((row) => {
        if (!query) {
          // Show all rows when search is empty
          row.style.display = '';
          row.classList.remove('filtered-out');
          return;
        }

        const text = (row.textContent || '').toLowerCase();
        if (text.includes(query)) {
          row.style.display = '';
          row.classList.remove('filtered-out');
        } else {
          row.style.display = 'none';
          row.classList.add('filtered-out');
        }
      });

      // Show a "no results" message if all rows are hidden
      let noResultsRow = tbody.querySelector('.no-results-row');
      const visibleRows = tbody.querySelectorAll('tr:not(.filtered-out):not(.no-results-row)');

      if (query && visibleRows.length === 0) {
        if (!noResultsRow) {
          noResultsRow = document.createElement('tr');
          noResultsRow.classList.add('no-results-row');
          const cell = document.createElement('td');
          // Span all columns
          const colCount = curriculumTable.querySelectorAll('thead th').length || 1;
          cell.setAttribute('colspan', colCount);
          cell.textContent = 'No matching entries found.';
          cell.style.textAlign = 'center';
          cell.style.padding = '1rem';
          noResultsRow.appendChild(cell);
          tbody.appendChild(noResultsRow);
        }
        noResultsRow.style.display = '';
      } else if (noResultsRow) {
        noResultsRow.style.display = 'none';
      }
    });
  }

  // ====================================================
  // 16. LIGHTBOX
  // ====================================================
  (function initLightbox() {
    // Create lightbox overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt=""><div class="lightbox-caption"></div>';
    document.body.appendChild(overlay);

    const lbImg = overlay.querySelector('img');
    const lbCaption = overlay.querySelector('.lightbox-caption');
    const lbClose = overlay.querySelector('.lightbox-close');

    function openLightbox(src, alt) {
      lbImg.src = src;
      lbCaption.textContent = alt || '';
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    lbClose.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeLightbox();
      }
    });

    // Make all content images clickable
    document.querySelectorAll('section img, .character-card img, .quest-item-card img').forEach(function(img) {
      // Skip tiny icons (nav logo, etc)
      if (img.width < 40 && img.height < 40) return;
      img.classList.add('clickable-img');
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        openLightbox(this.src, this.alt);
      });
    });
  })();
});
