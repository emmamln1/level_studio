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
        // remove focus to avoid sticky highlight
        btn.blur();
    });
});

// Highlight nav based on section in view
function setupActiveNavOnScroll() {
    // Collect unique section selectors from nav buttons
    const selectors = Array.from(new Set(Array.from(navBtns).map(b => b.getAttribute('data-nav'))));
    const sections = selectors
        .map(function (sel) { return document.querySelector(sel); })
        .filter(function (el) { return !!el; });

    if (!sections.length) return;

    var lastActiveId = null;

    const io = new IntersectionObserver(function (entries) {
        // Find the most visible section among intersecting ones
        var maxRatio = 0;
        var topId = null;
        entries.forEach(function (entry) {
            if (entry.isIntersecting && entry.intersectionRatio >= maxRatio) {
                maxRatio = entry.intersectionRatio;
                topId = entry.target.id;
            }
        });

        if (topId && topId !== lastActiveId) {
            lastActiveId = topId;
            navBtns.forEach(function (b) {
                const target = b.getAttribute('data-nav');
                b.classList.toggle('active-nav', target === '#' + topId);
            });
        }
    }, {
        // Multiple thresholds to get smooth updates on tall sections
        threshold: [0.15, 0.25, 0.35, 0.5],
        // Account for fixed header and give earlier activation
        rootMargin: '-12% 0px -45% 0px'
    });

    sections.forEach(function (sec) { io.observe(sec); });

    // Initial sync on load (pick the section closest to top)
    function initialSync() {
        var vh = window.innerHeight;
        var best = { id: null, visible: 0 };
        sections.forEach(function (sec) {
            var rect = sec.getBoundingClientRect();
            var visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
            if (visible > best.visible) {
                best.id = sec.id;
                best.visible = visible;
            }
        });
        if (best.id) {
            navBtns.forEach(function (b) {
                const target = b.getAttribute('data-nav');
                b.classList.toggle('active-nav', target === '#' + best.id);
            });
        }
    }
    initialSync();

    // Fallback: update by proximity on scroll/resize (helps with very tall sections)
    function updateByProximity() {
        var vh = window.innerHeight;
        var best = { id: null, visible: 0 };
        sections.forEach(function (sec) {
            var rect = sec.getBoundingClientRect();
            var visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
            if (visible > best.visible) {
                best.id = sec.id;
                best.visible = visible;
            }
        });
        if (best.id && best.id !== lastActiveId) {
            lastActiveId = best.id;
            navBtns.forEach(function (b) {
                const target = b.getAttribute('data-nav');
                b.classList.toggle('active-nav', target === '#' + best.id);
            });
        }
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(function () {
                ticking = false;
                updateByProximity();
            });
        }
    });
    window.addEventListener('resize', updateByProximity);
}

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
        title: "Թվային մարքեթինգ",
        description: "Ամբողջական թվային մարքեթինգ ծառայություններ՝ ճանաչելիության բարձրացման և վաճառքի աճի համար",
        features: ["SMM", "Copywriting", "SEO", "Email Marketing"],
        bgImage: ""
    },
    {
        number: "02",
        title: "Վեբ կայքերի պատրաստում",
        description: "Կայքերի և վեբ հավելվածների մշակում ժամանակակից տեխնոլոգիաներով",
        features: ["React", "Node.js", "TypeScript", "Next.js"],
        bgImage: ""
    },
    {
        number: "03",
        title: "Վեբ դիզայն",
        description: "Գեղեցիկ և ֆունկցիոնալ վեբ դիզայնի ստեղծում՝ օգտատերերի լավագույն փորձառության համար",
        features: ["UI/UX Design", "Responsive Design", "Adobe Creative Suite", "Figma"],
        bgImage: ""
    },
    {
        number: "04",
        title: "Կայքերի առաջխաղացում",
        description: "Կայքերի SEO օպտիմիզացիա և դիրքավորում Google-ում բարձր արդյունքների համար",
        features: ["SEO օպտիմիզացիա", "Google Ads", "Analytics", "Բանալի բառեր"],
        bgImage: ""
    },
    {
        number: "05",
        title: "Առցանց գնումների խանութ",
        description: "Լիարժեք E-commerce պլատֆորմների մշակում վաճառքի և գնումների համար",
        features: ["WooCommerce", "Shopify", "Վճարման համակարգեր", "Պահեստի կառավարում"],
        bgImage: ""
    },
    {
        number: "06",
        title: "Բիզնեսի ավտոմատացում",
        description: "Բիզնես գործընթացների ավտոմատացում և CRM համակարգերի ներդրում",
        features: ["CRM համակարգեր", "Workflow ավտոմատացում", "API ինտեգրացիա", "Դատաբազների կառավարում"],
        bgImage: ""
    },
    {
        number: "07",
        title: "Մոբայլ հավելվածներ",
        description: "iOS և Android հավելվածների մշակում բիզնեսի գործընթացների բարելավման համար",
        features: ["React Native", "Flutter", "iOS/Android", "Push Notifications"],
        bgImage: ""
    },
    {
        number: "08",
        title: "Դոմեյն և հոսթինգ",
        description: "Հուսալի դոմեյն և հոսթինգ ծառայություններ կայքերի անխափան աշխատանքի համար",
        features: ["SSL վկայագրեր", "Օրական backup", "24/7 մոնիտորինգ", "CDN ծառայություններ"],
        bgImage: ""
    },
    {
        number: "09",
        title: "Տեխնիկական սպասարկում",
        description: "24/7 տեխնիկական աջակցություն և կայքերի պարբերական թարմացում",
        features: ["24/7 Support", "Անվտանգության թարմացումներ", "Կատարողականության օպտիմիզացիա", "Backup ծառայություններ"],
        bgImage: ""
    },
    {
        number: "10",
        title: "Գրաֆիկական դիզայն",
        description: "Ստեղծագործական գրաֆիկական լուծումներ ապրանքանիշի ճանաչելիության համար",
        features: ["Լոգո դիզայն", "Այցեքարտեր", "Ֆլայերներ", "Բրենդինգ"],
        bgImage: ""
    },
    {
        number: "11",
        title: "Վեբ դասընթացներ",
        description: "Լիցենզավորված մասնագիտական վեբ դասընթացներ տեխնոլոգիական հմտությունների զարգացման համար",
        features: ["Հավաստագրված դասընթացներ", "Փորձարկված մանկավարժներ", "Գործնական նախագծեր", "Կարիերային աջակցություն"],
        bgImage: ""
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
    setupActiveNavOnScroll();
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
        // Pagination state
        this.currentPage = 0;
        this.itemsPerPage = 1;
        this.totalPages = 1;

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
        // Cache elements
        this.grid = document.getElementById('partnersGrid');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('partnersCarouselDots');
        this.progressFill = document.getElementById('scrollProgress');

        // Navigation handlers
        this.prevBtn.addEventListener('click', () => this.goPrev());
        this.nextBtn.addEventListener('click', () => this.goNext());

        // Calculate initial layout and render UI
        this.calculateLayout();
        this.renderDots();
        this.updateUI();

        // Keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.goPrev();
            if (e.key === 'ArrowRight') this.goNext();
        });

        // Recalculate on resize
        window.addEventListener('resize', this.throttle(() => {
            this.calculateLayout();
            this.renderDots();
            this.updateUI();
        }, 100));
    }

    // Layout calculation to ensure only full cards per page
    calculateLayout() {
        const cards = Array.from(this.grid.querySelectorAll('.partner-card'));
        if (!cards.length) {
            this.itemsPerPage = 1;
            this.totalPages = 1;
            return;
        }

        // Measure card width and gap
        const firstCard = cards[0];
        const cardRect = firstCard.getBoundingClientRect();
        const cardW = Math.round(cardRect.width);
        const styles = window.getComputedStyle(this.grid);
        const gapVal = styles.gap.split(' ')[0] || '0px';
        const gap = Math.round(parseFloat(gapVal)) || 0;
        const padL = parseFloat(styles.paddingLeft) || 0;
        const padR = parseFloat(styles.paddingRight) || 0;

        // content box width (exclude padding)
        const available = Math.max(0, this.grid.clientWidth - padL - padR);

        // Find max number of full cards that fit
        let n = 1;
        while (true) {
            const needed = n * cardW + (n - 1) * gap;
            if (needed > available) break;
            n++;
        }
        this.itemsPerPage = Math.max(1, n - 1);

        this.totalPages = Math.max(1, Math.ceil(this.partners.length / this.itemsPerPage));
        // Clamp current page
        this.currentPage = Math.min(this.currentPage, this.totalPages - 1);
    }

    renderDots() {
        if (!this.dotsContainer) return;
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            dot.addEventListener('click', () => this.setPage(i));
            this.dotsContainer.appendChild(dot);
        }
        this.updateActiveDot();
    }

    setPage(index) {
        const clamped = Math.max(0, Math.min(index, this.totalPages - 1));
        if (clamped === this.currentPage) return;
        this.currentPage = clamped;
        this.updateUI();
    }

    updateActiveDot() {
        if (!this.dotsContainer) return;
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentPage);
        });
    }

    updateScrollProgress() {
        if (!this.progressFill) return;
        const pct = (this.currentPage + 1) / this.totalPages * 100;
        this.progressFill.style.width = pct + '%';
    }

    // Apply visibility and controls state for current page
    updateUI() {
        const cards = Array.from(this.grid.querySelectorAll('.partner-card'));
        const start = this.currentPage * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        cards.forEach((card, idx) => {
            const onPage = idx >= start && idx < end;
            card.classList.toggle('hidden', !onPage);
        });

        // Buttons state
        const atStart = this.currentPage === 0;
        const atEnd = this.currentPage >= this.totalPages - 1;
        this.prevBtn.disabled = atStart;
        this.nextBtn.disabled = atEnd;
        this.prevBtn.classList.toggle('disabled', atStart);
        this.nextBtn.classList.toggle('disabled', atEnd);

        // Dots and progress
        this.updateActiveDot();
        this.updateScrollProgress();
    }

    goPrev() {
        this.setPage(this.currentPage - 1);
    }

    goNext() {
        this.setPage(this.currentPage + 1);
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
    if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;

    let cardEls = Array.from(carousel.querySelectorAll('.project-card'));
    let cardWidth = 0;
    let gap = 0;
    let itemsPerPage = 1;
    let totalPages = 1;
    let currentPage = 0;
    let resizing = false;

    function calculateLayout() {
        cardEls = Array.from(carousel.querySelectorAll('.project-card'));
        const firstCard = cardEls[0];
        if (!firstCard) {
            itemsPerPage = 1;
            totalPages = 1;
            currentPage = 0;
            return;
        }
        cardWidth = firstCard.getBoundingClientRect().width;
        const styles = window.getComputedStyle(carousel);
        gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
        const available = carousel.clientWidth;
        itemsPerPage = Math.max(1, Math.floor((available + gap) / (cardWidth + gap)));
        totalPages = Math.max(1, Math.ceil(cardEls.length / itemsPerPage));
    }

    function renderDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot'; // matches .portfolio-carousel-dots .dot styles
            dot.addEventListener('click', () => setPage(i));
            dotsContainer.appendChild(dot);
        }
        updateUI();
    }

    function updateUI() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentPage));
        if (prevBtn) {
            const disabled = currentPage <= 0;
            prevBtn.disabled = disabled;
            prevBtn.classList.toggle('disabled', disabled);
        }
        if (nextBtn) {
            const disabled = currentPage >= totalPages - 1;
            nextBtn.disabled = disabled;
            nextBtn.classList.toggle('disabled', disabled);
        }
    }

    function setPage(page) {
        const clamped = Math.max(0, Math.min(page, totalPages - 1));
        currentPage = clamped;
        const startIndex = clamped * itemsPerPage;
        const targetCard = cardEls[startIndex];
        if (targetCard) {
            const cardRect = targetCard.getBoundingClientRect();
            const containerRect = carousel.getBoundingClientRect();
            const delta = cardRect.left - containerRect.left;
            const targetLeft = carousel.scrollLeft + delta;
            carousel.scrollTo({ left: targetLeft, behavior: 'smooth' });
        }
        updateUI();
    }

    function syncFromScroll() {
        if (!cardWidth) return;
        const pageWidth = itemsPerPage * (cardWidth + gap);
        const page = Math.min(
            totalPages - 1,
            Math.round(carousel.scrollLeft / Math.max(1, pageWidth))
        );
        if (page !== currentPage) {
            currentPage = page;
            updateUI();
        }
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

    // Scroll event to update current page and dots
    carousel.addEventListener('scroll', syncFromScroll);

    // Button events (page-based)
    prevBtn.addEventListener('click', () => setPage(currentPage - 1));
    nextBtn.addEventListener('click', () => setPage(currentPage + 1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') setPage(currentPage - 1);
        if (e.key === 'ArrowRight') setPage(currentPage + 1);
    });

    // Initialize
    calculateLayout();
    renderDots();
    setPage(0);

    // Recalculate on resize
    window.addEventListener('resize', () => {
        if (resizing) return;
        resizing = true;
        setTimeout(() => {
            calculateLayout();
            renderDots();
            setPage(Math.min(currentPage, totalPages - 1));
            resizing = false;
        }, 150);
    });
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

