 // SEO Optimized JavaScript
let currentSelectedLanguage = "ARM";
const stickyWebsiteHeader = document.getElementById("marketing-agency-header");
const mobileMenuButton = document.getElementById("menu-btn");
const multilingualLanguageButtons = document.querySelectorAll("[data-lang]");
const primaryNavigationButtons = document.querySelectorAll("[data-nav]");
const mobileMenu = document.getElementById("siteNav");
const overlay = document.getElementById("menu-overlay");

// Load saved language preference
const savedLanguagePreference = localStorage.getItem('selectedLang') || 'ARM';
currentSelectedLanguage = savedLanguagePreference;
updateActiveLanguageState(savedLanguagePreference);

// Language switcher functionality
multilingualLanguageButtons.forEach(languageButton => {
    languageButton.addEventListener('click', () => {
        const selectedLanguage = languageButton.getAttribute('data-lang');
        if (selectedLanguage !== currentSelectedLanguage) {
            currentSelectedLanguage = selectedLanguage;
            localStorage.setItem('selectedLang', selectedLanguage);
            updateActiveLanguageState(selectedLanguage);
        }
    });
});

function updateActiveLanguageState(activeLanguage) {
    multilingualLanguageButtons.forEach(languageButton => {
        if (languageButton.getAttribute('data-lang') === activeLanguage) {
            languageButton.classList.add('active-language');
        } else {
            languageButton.classList.remove('active-language');
        }
    });
}

// Mobile menu controls (accessibility + animations)
function setMenuState(open) {
    if (!mobileMenuButton || !mobileMenu || !overlay) return;
    mobileMenuButton.classList.toggle("open", open);
    mobileMenu.classList.toggle("open", open);
    overlay.classList.toggle("show", open);
    mobileMenuButton.setAttribute("aria-expanded", String(open));
    mobileMenu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
}

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        const next = !mobileMenuButton.classList.contains('open');
        setMenuState(next);
    });
}

if (overlay) {
    overlay.addEventListener('click', () => setMenuState(false));
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuState(false);
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) setMenuState(false);
});

// Sticky header on scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        stickyWebsiteHeader.classList.add("scrolled");
    } else {
        stickyWebsiteHeader.classList.remove("scrolled");
    }
});

// Navigation functionality
primaryNavigationButtons.forEach(navigationButton => {
    navigationButton.addEventListener("click", () => {
        primaryNavigationButtons.forEach(btn => btn.classList.remove("active-navigation-item"));
        navigationButton.classList.add("active-navigation-item");

        const targetSectionId = navigationButton.getAttribute("data-nav");
        const targetSection = document.querySelector(targetSectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }

        // Close mobile menu after selection
        setMenuState(false);
        navigationButton.blur();
    });
});

function setupActiveNavigationOnScroll() {
    const navigationTargetSelectors = Array.from(new Set(Array.from(primaryNavigationButtons).map(btn => btn.getAttribute('data-nav'))));
    const websiteSections = navigationTargetSelectors
        .map(function (selector) { return document.querySelector(selector); })
        .filter(function (element) { return !!element; });

    if (!websiteSections.length) return;

    var lastActiveNavigationId = null;

    const intersectionObserver = new IntersectionObserver(function (entries) {
        var maximumIntersectionRatio = 0;
        var topVisibleSectionId = null;

        entries.forEach(function (entry) {
            if (entry.isIntersecting && entry.intersectionRatio >= maximumIntersectionRatio) {
                maximumIntersectionRatio = entry.intersectionRatio;
                topVisibleSectionId = entry.target.id;
            }
        });

        if (topVisibleSectionId && topVisibleSectionId !== lastActiveNavigationId) {
            lastActiveNavigationId = topVisibleSectionId;
            primaryNavigationButtons.forEach(function (navigationButton) {
                const navigationTarget = navigationButton.getAttribute('data-nav');
                navigationButton.classList.toggle('active-navigation-item', navigationTarget === '#' + topVisibleSectionId);
            });
        }
    }, {
        threshold: [0.15, 0.25, 0.35, 0.5],
        rootMargin: '-12% 0px -45% 0px'
    });

    websiteSections.forEach(function (section) { 
        intersectionObserver.observe(section); 
    });

    function performInitialNavigationSync() {
        var viewportHeight = window.innerHeight;
        var bestVisibleSection = { id: null, visibleArea: 0 };

        websiteSections.forEach(function (section) {
            var sectionBounds = section.getBoundingClientRect();
            var visibleSectionArea = Math.max(0, Math.min(sectionBounds.bottom, viewportHeight) - Math.max(sectionBounds.top, 0));
            if (visibleSectionArea > bestVisibleSection.visibleArea) {
                bestVisibleSection.id = section.id;
                bestVisibleSection.visibleArea = visibleSectionArea;
            }
        });

        if (bestVisibleSection.id) {
            primaryNavigationButtons.forEach(function (navigationButton) {
                const navigationTarget = navigationButton.getAttribute('data-nav');
                navigationButton.classList.toggle('active-navigation-item', navigationTarget === '#' + bestVisibleSection.id);
            });
        }
    }
    performInitialNavigationSync();

    function updateNavigationByProximity() {
        var viewportHeight = window.innerHeight;
        var bestVisibleSection = { id: null, visibleArea: 0 };

        websiteSections.forEach(function (section) {
            var sectionBounds = section.getBoundingClientRect();
            var visibleSectionArea = Math.max(0, Math.min(sectionBounds.bottom, viewportHeight) - Math.max(sectionBounds.top, 0));
            if (visibleSectionArea > bestVisibleSection.visibleArea) {
                bestVisibleSection.id = section.id;
                bestVisibleSection.visibleArea = visibleSectionArea;
            }
        });

        if (bestVisibleSection.id && bestVisibleSection.id !== lastActiveNavigationId) {
            lastActiveNavigationId = bestVisibleSection.id;
            primaryNavigationButtons.forEach(function (navigationButton) {
                const navigationTarget = navigationButton.getAttribute('data-nav');
                navigationButton.classList.toggle('active-navigation-item', navigationTarget === '#' + bestVisibleSection.id);
            });
        }
    }

    var isScrollUpdatePending = false;
    window.addEventListener('scroll', function () {
        if (!isScrollUpdatePending) {
            isScrollUpdatePending = true;
            requestAnimationFrame(function () {
                isScrollUpdatePending = false;
                updateNavigationByProximity();
            });
        }
    });
    window.addEventListener('resize', updateNavigationByProximity);
}

// Initialize navigation scroll tracking
setupActiveNavigationOnScroll();