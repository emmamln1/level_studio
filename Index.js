let currentLang = "ARM";
const header = document.getElementById("site-header");
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");
const langBtns = document.querySelectorAll("[data-lang]");
const navBtns = document.querySelectorAll("[data-nav]");

// scroll style
window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// menu toggle
menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    overlay.classList.toggle("show");
});
overlay.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    mobileMenu.classList.remove("open");
    overlay.classList.remove("show");
});

// smooth scroll
navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active-nav from all buttons
        navBtns.forEach(b => b.classList.remove("active-nav"));
        // Add active-nav to the clicked button
        btn.classList.add("active-nav");

        const id = btn.getAttribute("data-nav");
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        // close mobile
        menuBtn.classList.remove("open");
        mobileMenu.classList.remove("open");
        overlay.classList.remove("show");
    });
});

// language
langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        currentLang = btn.getAttribute("data-lang");
        langBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        // update nav texts
        navBtns.forEach(nb => {
            const arm = nb.getAttribute("data-arm");
            const rus = nb.getAttribute("data-rus");
            const eng = nb.getAttribute("data-eng");
            nb.textContent = currentLang === "RUS" ? rus : (currentLang === "ENG" ? eng : arm);
        });
        // Update Google Translate language
        if (typeof google !== 'undefined' && google.translate && google.translate.TranslateElement) {
            const langCode = currentLang.toLowerCase();
            const selectElement = document.querySelector('.goog-te-combo');
            if (selectElement) {
                selectElement.value = langCode;
                selectElement.dispatchEvent(new Event('change'));
            }
        }
    });
});

const xaiServiceRegistry = [
    {
        number: "01",
        title: "Web Development",
        description: "Կայքերի և վեբ հավելվածների մշակում ժամանակակից տեխնոլոգիաներով",
        features: ["React", "Node.js", "TypeScript", "Next.js"],
        bgImage: "" // Replace with your image path
    },
    {
        number: "02",
        title: "Mobile Apps",
        description: "iOS և Android հավելվածների ստեղծում նատիվ և cross-platform",
        features: ["React Native", "Flutter", "Swift", "Kotlin"],
        bgImage: "" // Replace with your image path
    },
    {
        number: "03",
        title: "UI/UX Design",
        description: "Օգտահարմար և գեղեցիկ դիզայնի ստեղծում բրենդի համար",
        features: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        bgImage: "" // Replace with your image path
    },
    {
        number: "04",
        title: "Branding",
        description: "Բրենդի ինքնություն և կորպորատիվ դիզայնի մշակում",
        features: ["Logo Design", "Brand Identity", "Style Guide", "Marketing"],
        bgImage: "" // Replace with your image path
    },
    {
        number: "05",
        title: "Consulting",
        description: "Տեխնոլոգիական խորհրդատվություն և ռազմավարություն",
        features: ["Strategy", "Architecture", "Code Review", "Mentoring"],
        bgImage: "" // Replace with your image path
    },
    {
        number: "06",
        title: "Maintenance",
        description: "Տեխնիկական սպասարկում և պրոյեկտների աջակցություն",
        features: ["Updates", "Security", "Performance", "Monitoring"],
        bgImage: "" // Replace with your image path
    }
];

let xaiCurrentServiceIndex = 0;
let xaiIsProcessing = false;
let xaiLastInteractionTime = 0;
let xaiSectionIsActive = false;

// DOM elements
const xaiQuantumContainer = document.getElementById('xaiQuantumContainer');
const xaiServiceNexus = document.getElementById('xaiServiceNexus');
const xaiNavigationHub = document.getElementById('xaiNavigationHub');
const xaiProgressGauge = document.getElementById('xaiProgressGauge');
const xaiNebulaField = document.getElementById('xaiNebulaField');

// Initialize
function xaiInitializeSystem() {
    xaiCreateModules();
    xaiCreateNavigationBeacons();
    xaiGenerateCosmicFragments();
    xaiUpdateNexus();
    setupIntersectionObserver();
}

// Create service elements
function xaiCreateModules() {
    xaiServiceRegistry.forEach((service, index) => {
        const moduleEl = document.createElement('div');
        moduleEl.className = 'xaiModuleInstance';
        moduleEl.innerHTML = `
            <h2 class="xaiPrimaryDescriptor">${service.title}</h2>
            <p class="xaiDetailNarrative">${service.description}</p>
            <div class="xaiAttributeCluster">
                ${service.features.map(feature => `<span class="xaiTraitNode">${feature}</span>`).join('')}
            </div>
        `;
        xaiServiceNexus.appendChild(moduleEl);
    });

    xaiServiceRegistry.forEach((service, index) => {
        const previewEl = document.createElement('div');
        previewEl.className = 'xaiPreviewHologram';
        previewEl.innerHTML = `<div class="xaiHologramLabel">${service.title}</div>`;
        xaiServiceNexus.appendChild(previewEl);
    });
}

// Create navigation dots
function xaiCreateNavigationBeacons() {
    xaiServiceRegistry.forEach((_, index) => {
        const beacon = document.createElement('div');
        beacon.className = 'xaiNavBeacon';
        if (index === 0) beacon.classList.add('xaiActiveState');
        beacon.addEventListener('click', () => xaiNavigateToModule(index));
        xaiNavigationHub.appendChild(beacon);
    });
}

// Create floating particles
function xaiGenerateCosmicFragments() {
    for (let i = 0; i < 50; i++) {
        const fragment = document.createElement('div');
        fragment.className = 'xaiCosmicFragment';
        fragment.style.left = Math.random() * 100 + '%';
        fragment.style.animationDelay = Math.random() * 20 + 's';
        fragment.style.animationDuration = (15 + Math.random() * 10) + 's';
        xaiNebulaField.appendChild(fragment);
    }
}

// Update display
function xaiUpdateNexus() {
    const moduleInstances = xaiServiceNexus.querySelectorAll('.xaiModuleInstance');
    const previewHolograms = xaiServiceNexus.querySelectorAll('.xaiPreviewHologram');
    const navBeacons = xaiNavigationHub.querySelectorAll('.xaiNavBeacon');
    
    moduleInstances.forEach((item, index) => {
        item.className = 'xaiModuleInstance';
        if (index === xaiCurrentServiceIndex) {
            item.classList.add('xaiActiveState');
        } else {
            item.classList.add('xaiObscuredState');
        }
    });

    previewHolograms.forEach((preview, index) => {
        preview.className = 'xaiPreviewHologram';
        
        const prevIndex = (xaiCurrentServiceIndex - 1 + xaiServiceRegistry.length) % xaiServiceRegistry.length;
        const nextIndex = (xaiCurrentServiceIndex + 1) % xaiServiceRegistry.length;
        
        if (index === prevIndex) {
            preview.classList.add('xaiPreviousCycle');
            preview.innerHTML = `<div class="xaiHologramLabel">${xaiServiceRegistry[index].title}</div>`;
        } else if (index === nextIndex) {
            preview.classList.add('xaiNextCycle');
            preview.innerHTML = `<div class="xaiHologramLabel">${xaiServiceRegistry[index].title}</div>`;
        } else {
            preview.style.opacity = '0';
        }
    });

    navBeacons.forEach((beacon, index) => {
        beacon.classList.toggle('xaiActiveState', index === xaiCurrentServiceIndex);
    });

    // Apply background image instead of gradient
    xaiQuantumContainer.style.backgroundImage = `url('${xaiServiceRegistry[xaiCurrentServiceIndex].bgImage}')`;
    xaiQuantumContainer.style.backgroundSize = 'cover';
    xaiQuantumContainer.style.backgroundPosition = 'center';
    xaiQuantumContainer.style.backgroundRepeat = 'no-repeat';

    const progress = ((xaiCurrentServiceIndex + 1) / xaiServiceRegistry.length) * 100;
    xaiProgressGauge.style.width = progress + '%';
}

// Go to specific service
function xaiNavigateToModule(index) {
    if (xaiIsProcessing || index === xaiCurrentServiceIndex) return;
    
    xaiIsProcessing = true;
    xaiCurrentServiceIndex = index;
    xaiUpdateNexus();
    
    setTimeout(() => {
        xaiIsProcessing = false;
    }, 800);
}

// Intersection Observer to detect when section is in view
function setupIntersectionObserver() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                xaiSectionIsActive = entry.isIntersecting;
                if (xaiSectionIsActive) {
                    xaiQuantumContainer.scrollIntoView({ behavior: 'smooth' });
                }
            });
        },
        { threshold: 0.5 }
    );
    observer.observe(xaiQuantumContainer);
}

// Handle scroll
function xaiHandleScrollInteraction(e) {
    if (!xaiSectionIsActive) return;

    e.preventDefault();

    const now = Date.now();
    if (xaiIsProcessing || now - xaiLastInteractionTime < 1000) return;

    const delta = e.deltaY;

    if (delta > 0) {
        if (xaiCurrentServiceIndex < xaiServiceRegistry.length - 1) {
            xaiLastInteractionTime = now;
            xaiNavigateToModule(xaiCurrentServiceIndex + 1);
        } else {
            xaiSectionIsActive = false;
            const nextSection = xaiQuantumContainer.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    } else if (delta < 0) {
        if (xaiCurrentServiceIndex > 0) {
            xaiLastInteractionTime = now;
            xaiNavigateToModule(xaiCurrentServiceIndex - 1);
        } else {
            xaiSectionIsActive = false;
            const prevSection = xaiQuantumContainer.previousElementSibling;
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

// Handle touch events
let xaiTouchOriginY = 0;
function xaiHandleTouchInitiation(e) {
    xaiTouchOriginY = e.touches[0].clientY;
}

function xaiHandleTouchCompletion(e) {
    if (!xaiSectionIsActive || xaiIsProcessing) return;

    const touchEndY = e.changedTouches[0].clientY;
    const touchDelta = xaiTouchOriginY - touchEndY;

    if (Math.abs(touchDelta) > 50) {
        if (touchDelta > 0) {
            if (xaiCurrentServiceIndex < xaiServiceRegistry.length - 1) {
                xaiNavigateToModule(xaiCurrentServiceIndex + 1);
            } else {
                xaiSectionIsActive = false;
                const nextSection = xaiQuantumContainer.nextElementSibling;
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else {
            if (xaiCurrentServiceIndex > 0) {
                xaiNavigateToModule(xaiCurrentServiceIndex - 1);
            } else {
                xaiSectionIsActive = false;
                const prevSection = xaiQuantumContainer.previousElementSibling;
                if (prevSection) {
                    prevSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!xaiSectionIsActive) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (xaiCurrentServiceIndex < xaiServiceRegistry.length - 1) {
            xaiNavigateToModule(xaiCurrentServiceIndex + 1);
        } else {
            xaiSectionIsActive = false;
            const nextSection = xaiQuantumContainer.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (xaiCurrentServiceIndex > 0) {
            xaiNavigateToModule(xaiCurrentServiceIndex - 1);
        } else {
            xaiSectionIsActive = false;
            const prevSection = xaiQuantumContainer.previousElementSibling;
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Event listeners
window.addEventListener('wheel', xaiHandleScrollInteraction, { passive: false });
document.addEventListener('touchstart', xaiHandleTouchInitiation, { passive: true });
document.addEventListener('touchend', xaiHandleTouchCompletion, { passive: true });

// Initialize everything when page loads
window.addEventListener('load', () => {
    xaiInitializeSystem();
});

// Handle window resize
window.addEventListener('resize', () => {
    xaiUpdateNexus();
});

window.addEventListener('scroll', function() {
    const section = document.getElementById('aboutSection');
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
        section.classList.add('scroll-animate');
    } else {
        section.classList.remove('scroll-animate');
    }
});

// Button click handler
document.querySelector('.contact-btn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Կապ մեզ հետ!');
});



// Create dots periodically

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

// Observe all project cards
document.quer


// partners
class LandingPartners {
    constructor() {
        this.partners = [
            { icon: 'TM', name: 'TechMaster', status: 'Ակտիվ', desc: 'Ներդրումային տեխնոլոգիական լուծումներ և ծրագրային ապահovում' },
            { icon: 'DV', name: 'DevVision', status: 'Գործընկեր', desc: 'Վեբ և մոբայլ հավելվածների մշակում' },
            { icon: 'AI', name: 'AI Innovation', status: 'Ակտիվ', desc: 'Արհեստական բանականություն և մեքենայական ուսուցում' },
            { icon: 'CS', name: 'CloudSphere', status: 'Գործընկեր', desc: 'Ամպային ծառայություններ և DevOps լուծումներ' },
            { icon: 'DL', name: 'DataLink Pro', status: 'Ակտիվ', desc: 'Մեծ տվյալների վերլուծություն և վիզուալիզացիա' },
            { icon: 'IoT', name: 'SmartTech', status: 'Գործընկեր', desc: 'IoT և խելացի տան տեխնոլոգիաներ' },
            { icon: 'DM', name: 'DigiMarketing', status: 'Ակտիվ', desc: 'Դիջիտալ մարկետինգ և բրենդինգ' },
            { icon: 'BC', name: 'BlockChain Hub', status: 'Գործընկեր', desc: 'Բլոկչեյն տեխնոլոգիաներ և Web3' },
            { icon: 'FT', name: 'FinTech Solutions', status: 'Ակտիվ', desc: 'Ֆինանսական տեխնոլոգիաներ և ֆինտեխ' },
            { icon: 'VR', name: 'VirtReality', status: 'Գործընկեր', desc: 'VR/AR տեխնոլոգիաներ և մետավերս' },
            { icon: 'ED', name: 'EduTech Global', status: 'Ակտիվ', desc: 'Կրթական պլատֆորմներ և e-learning' },
            { icon: 'MT', name: 'MedTech Innovations', status: 'Գործընկեր', desc: 'Բժշկական տեխնոլոգիաներ և տելեմեդիցինա' }
        ];
        
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        this.renderPartners();
        this.setupScrollAnimations();
        this.setupCarousel();
        this.addParallaxEffects();
        
        // Performance optimization
        this.throttledScrollHandler = this.throttle(this.handleScroll.bind(this), 16);
        window.addEventListener('scroll', this.throttledScrollHandler);
    }

    renderPartners() {
        const grid = document.getElementById('partnersGrid');
        grid.innerHTML = '';
        
        this.partners.forEach((partner, index) => {
            const card = this.createPartnerCard(partner, index);
            grid.appendChild(card);
        });
    }

    createPartnerCard(partner, index) {
        const card = document.createElement('div');
        card.className = 'partner-card';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="card-header">
                <div class="partner-icon">${partner.icon}</div>
                <div class="partner-info">
                    <h3>${partner.name}</h3>
                  
                </div>
            </div>
            <div class="partner-description">${partner.desc}</div>
        `;
        
        // Add click interaction
        card.addEventListener('click', (e) => this.handleCardClick(e, partner));
        
        return card;
    }

    handleCardClick(e, partner) {
        e.currentTarget.style.transform = 'scale(0.98) translateY(-8px)';
        setTimeout(() => {
            e.currentTarget.style.transform = '';
        }, 150);
        
        console.log('Partner selected:', partner.name);
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        this.cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-animate');
                }
            });
        }, this.observerOptions);

        // Header animation observer
        this.headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.3 });

        // Observe elements
        const header = document.getElementById('sectionHeader');
        this.headerObserver.observe(header);

        // Observe cards (after they're rendered)
        setTimeout(() => {
            document.querySelectorAll('.partner-card').forEach(card => {
                this.cardObserver.observe(card);
            });
        }, 100);
    }

    setupCarousel() {
        const grid = document.getElementById('partnersGrid');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Setup navigation
        prevBtn.addEventListener('click', () => this.scrollCarousel('prev'));
        nextBtn.addEventListener('click', () => this.scrollCarousel('next'));
        
        // Setup dots
        this.renderDots();
        this.updateActiveDot();
        
        // Scroll event for progress and dots
        grid.addEventListener('scroll', this.throttle(() => {
            this.updateScrollProgress();
            this.updateActiveDot();
        }, 16));

        // Touch/mouse drag
        let isDown = false;
        let startX;
        let scrollLeft;

        grid.addEventListener('mousedown', (e) => {
            isDown = true;
            grid.classList.add('grabbing');
            startX = e.pageX - grid.offsetLeft;
            scrollLeft = grid.scrollLeft;
        });

        grid.addEventListener('mouseleave', () => {
            isDown = false;
            grid.classList.remove('grabbing');
        });

        grid.addEventListener('mouseup', () => {
            isDown = false;
            grid.classList.remove('grabbing');
        });

        grid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - grid.offsetLeft;
            const walk = (x - startX) * 2;
            grid.scrollLeft = scrollLeft - walk;
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.scrollCarousel('prev');
            if (e.key === 'ArrowRight') this.scrollCarousel('next');
        });
    }

    scrollCarousel(direction) {
        const grid = document.getElementById('partnersGrid');
        const cardWidth = 300 + 32; // card width + gap
        const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
        
        grid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    renderDots() {
        const dotsContainer = document.getElementById('partnersCarouselDots');
        const visibleCards = Math.floor(window.innerWidth / 332); // card + gap
        const totalDots = Math.max(1, this.partners.length - visibleCards + 1);
        
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    goToSlide(index) {
        const grid = document.getElementById('partnersGrid');
        const cardWidth = 332; // card width + gap
        const scrollPosition = index * cardWidth;
        
        grid.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }

    updateActiveDot() {
        const grid = document.getElementById('partnersGrid');
        const dots = document.querySelectorAll('.carousel-dot');
        const cardWidth = 332;
        const currentIndex = Math.round(grid.scrollLeft / cardWidth);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    updateScrollProgress() {
        const grid = document.getElementById('partnersGrid');
        const progressFill = document.getElementById('scrollProgress');
        
        if (grid.scrollWidth <= grid.clientWidth) {
            progressFill.style.width = '100%';
            return;
        }
        
        const progress = (grid.scrollLeft / (grid.scrollWidth - grid.clientWidth)) * 100;
        progressFill.style.width = Math.min(Math.max(progress, 0), 100) + '%';
    }

    addParallaxEffects() {
        const orbs = document.querySelectorAll('.floating-orb');
        const gridBg = document.querySelector('.grid-background');
        
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            const section = document.getElementById('partnersSection');
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Only apply parallax when section is in view
            if (scrolled >= sectionTop - window.innerHeight && 
                scrolled <= sectionTop + sectionHeight) {
                
                const parallaxFactor = (scrolled - sectionTop) * 0.5;
                
                // Parallax orbs
                orbs.forEach((orb, index) => {
                    const speed = (index + 1) * 0.3;
                    orb.style.transform = `translateY(${parallaxFactor * speed}px)`;
                });
                
                // Parallax grid
                if (gridBg) {
                    gridBg.style.transform = `translate(-10%, calc(-10% + ${parallaxFactor * 0.2}px))`;
                }
            }
        };

        window.addEventListener('scroll', this.throttle(handleParallax, 16));
    }

    handleScroll() {
        // Additional scroll-based animations can be added here
        const scrolled = window.pageYOffset;
        const section = document.getElementById('partnersSection');
        
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Add dynamic classes based on scroll position
            if (scrolled >= sectionTop - window.innerHeight * 0.5 && 
                scrolled <= sectionTop + sectionHeight * 0.5) {
                section.classList.add('in-view');
            } else {
                section.classList.remove('in-view');
            }
        }
    }

    // Performance optimization utilities
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    // Cleanup method for performance
    destroy() {
        window.removeEventListener('scroll', this.throttledScrollHandler);
        if (this.cardObserver) this.cardObserver.disconnect();
        if (this.headerObserver) this.headerObserver.disconnect();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const landingPartners = new LandingPartners();
    
    // Performance monitoring
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`⚡ Landing section loaded in ${Math.round(loadTime)}ms`);
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (landingPartners) {
            landingPartners.destroy();
        }
    });
});

// Smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';


// contact 

// Portfolio Carousel
function initPortfolioCarousel() {
    const carousel = document.getElementById('projectsGrid');
    const prevBtn = document.getElementById('portfolioPrevBtn');
    const nextBtn = document.getElementById('portfolioNextBtn');
    const dotsContainer = document.getElementById('portfolioDots');
    const cardWidth = 320; // Card width (300px) + padding/gap (10px + 10px)

    // Render dots
    function renderDots() {
        const cards = carousel.querySelectorAll('.project-card').length;
        const visibleCards = 2; // Ֆիքսված 2 card տեսանելի
        const totalDots = Math.max(1, cards - visibleCards + 1);
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        updateActiveDot();
    }

    // Update active dot
    function updateActiveDot() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        const currentIndex = Math.round(carousel.scrollLeft / cardWidth);
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    // Go to specific slide
    function goToSlide(index) {
        carousel.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
    }

    // Scroll carousel
    function scrollCarousel(direction) {
        const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    // Mouse drag
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    let touchStartX;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        const touchX = e.touches[0].clientX;
        const walk = (touchX - touchStartX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('touchend', () => {
        touchStartX = null;
    });

    // Scroll event to update dots
    carousel.addEventListener('scroll', () => {
        updateActiveDot();
    });

    // Button events
    prevBtn.addEventListener('click', () => scrollCarousel('prev'));
    nextBtn.addEventListener('click', () => scrollCarousel('next'));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') scrollCarousel('prev');
        if (e.key === 'ArrowRight') scrollCarousel('next');
    });

    // Initialize
    renderDots();
    window.addEventListener('resize', renderDots); // Update dots on resize
}

// Initialize a single image carousel
function initImageCarousel(carouselContainer) {
    const carouselSlide = carouselContainer.querySelector('.carousel-slide');
    const carouselImages = carouselContainer.querySelectorAll('.carousel-slide img');
    const prevBtn = carouselContainer.querySelector('.prev-btn');
    const nextBtn = carouselContainer.querySelector('.next-btn');
    const dotsContainer = carouselContainer.querySelector('.carousel-dots');

    let currentIndex = 0;
    const totalImages = carouselImages.length;

    // Create dots dynamically if not already in HTML
    if (dotsContainer && dotsContainer.children.length === 0) {
        for (let i = 0; i < totalImages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    const dots = dotsContainer.querySelectorAll('.carousel-dots .dot');

    function showSlide(index) {
        if (carouselSlide) {
            carouselSlide.style.transform = `translateX(${-index * 100}%)`;
            // Update active dot
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showSlide(currentIndex);
    }

    function goToSlide(index) {
        currentIndex = index;
        showSlide(currentIndex);
    }

    // Event listeners for buttons
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Initialize carousel
    showSlide(currentIndex);
}

// Initialize all image carousels on page load
function initializeAllImageCarousels() {
    const allCarouselContainers = document.querySelectorAll('.project-card .carousel-container');
    allCarouselContainers.forEach(container => {
        initImageCarousel(container);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initPortfolioCarousel();
    initializeAllImageCarousels(); // Call the new function here

    // Initialize Email.js (replace with your actual service ID, template ID, and Public Key)
    (function() {
        emailjs.init("b7GDWdZ4Eu-Xc5PFL"); 
    })();

    // Get the form and success message elements
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Add event listener for form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const serviceID = 'service_o1s9342'; // Replace with your Service ID
        const templateID = 'template_xxt8o1u'; // Replace with your Template ID

        // Collect form data
        const formData = {
            contact: this.contact.value,
            message: this.message.value,
            email: 'emma.yan03@gmail.com' // Updated to 'email' to match Email.js template
        };

        // Store data in local storage
        localStorage.setItem('contactFormData', JSON.stringify(formData));

        // Send the email
        emailjs.send(serviceID, templateID, formData)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                successMessage.style.display = 'block'; // Show success message
                contactForm.reset(); // Clear the form
                localStorage.removeItem('contactFormData'); // Clear local storage after successful send
                setTimeout(() => {
                    successMessage.style.display = 'none'; // Hide success message after a few seconds
                }, 5000);
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send message. Please try again later.'); // Show error message
            });
    });

    // Check for previously stored data in local storage and pre-fill the form
    const storedFormData = localStorage.getItem('contactFormData');
    if (storedFormData) {
        const formData = JSON.parse(storedFormData);
        document.getElementById('contact').value = formData.contact || '';
        document.getElementById('message').value = formData.message || '';
    }
});

