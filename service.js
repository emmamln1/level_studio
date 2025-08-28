// Updated JavaScript for Services Section
const marketingServicesData = [
    {
        number: "01",
        title: "Թվային մարքեթինգ",
        description: "Ամբողջական թվային մարքեթինգ ծառայություններ՝ ճանաչելիության բարձրացման և վաճառքի աճի համար",
        features: ["SMM", "Copywriting", "SEO", "Email Marketing"],
        icon: "📱"
    },
    {
        number: "02", 
        title: "Վեբ կայքերի պատրաստում",
        description: "Կայքերի և վեբ հավելվածների մշակում ժամանակակից տեխնոլոգիաներով",
        features: ["React", "JavaScript", "PHP", "Next.js"],
        icon: "💻"
    },
    {
        number: "03",
        title: "Վեբ դիզայն", 
        description: "Գեղեցիկ և ֆունկցիոնալ վեբ դիզայնի ստեղծում՝ օգտատերերի լավագույն փորձառության համար",
        features: ["UI/UX Design", "Responsive Design", "Adobe Creative Suite", "Figma"],
        icon: "🎨"
    },
    {
        number: "04",
        title: "Կայքերի առաջխաղացում",
        description: "Կայքերի SEO օպտիմիզացիա և դիրքավորում Google-ում բարձր արդյունքների համար", 
        features: ["SEO օպտիմիզացիա", "Google Ads", "Analytics", "Բանալի բառեր"],
        icon: "📈"
    },
    {
        number: "05",
        title: "Առցանց գնումների խանութ",
        description: "Լիարժեք E-commerce պլատֆորմների մշակում վաճառքի և գնումների համար",
        features: ["WooCommerce", "Shopify", "Վճարման համակարգեր", "Պահեստի կառավարում"],
        icon: "🛒"
    },
    {
        number: "06",
        title: "Բիզնեսի ավտոմատացում",
        description: "Բիզնես գործընթացների ավտոմատացում և CRM համակարգերի ներդրում",
        features: ["CRM համակարգեր", "Workflow ավտոմատացում", "API ինտեգրացիա", "Դատաբազների կառավարում"],
        icon: "⚙️"
    },
    {
        number: "07",
        title: "Մոբայլ հավելվածներ",
        description: "iOS և Android հավելվածների մշակում բիզնեսի գործընթացների բարելավման համար",
        features: ["React Native", "Flutter", "iOS/Android", "Push Notifications"],
        icon: "📱"
    },
    {
        number: "08", 
        title: "Դոմեյն և հոսթինգ",
        description: "Հուսալի դոմեյն և հոսթինգ ծառայություններ կայքերի անխափան աշխատանքի համար",
        features: ["SSL վկայագրեր", "Օրական backup", "24/7 մոնիտորինգ", "CDN ծառայություններ"],
        icon: "🌐"
    },
    {
        number: "09",
        title: "Տեխնիկական սպասարկում", 
        description: "24/7 տեխնիկական աջակցություն և կայքերի պարբերական թարմացում",
        features: ["24/7 Support", "Անվտանգության թարմացումներ", "Կատարողականության օպտիմիզացիա", "Backup ծառայություններ"],
        icon: "🔧"
    },
    {
        number: "10",
        title: "Գրաֆիկական դիզայն",
        description: "Ստեղծագործական գրաֆիկական լուծումներ ապրանքանիշի ճանաչելիության համար",
        features: ["Լոգո դիզայն", "Այցեքարտեր", "Ֆլայերներ", "Բրենդինգ"],
        icon: "🖌️"
    },
    {
        number: "11",
        title: "Վեբ դասընթացներ",
        description: "Լիցենզավորված մասնագիտական վեբ դասընթացներ տեխնոլոգիական հմտությունների զարգացման համար",
        features: ["Հավաստագրված դասընթացներ", "Փորձարկված մանկավարժներ", "Գործնական նախագծեր", "Կարիերային աջակցություն"],
        icon: "🎓"
    }
];

let currentServiceIndex = 0;
let isServiceChanging = false;
let lastScrollTime = 0;
let servicesIsActive = false;
let animationPaused = false;

// DOM elements
const servicesContainer = document.getElementById('xaiQuantumContainer');
const servicesCarousel = document.getElementById('xaiServiceNexus');
const servicesAnimationField = document.getElementById('xaiNebulaField');

// Initialize services section
function initializeServicesSection() {
    createServiceCards();
    createFloatingElements();
    setupServicesObserver();
    setupScrollHandler();
}

// Create service cards with new structure
function createServiceCards() {
    servicesCarousel.innerHTML = '';
    
    marketingServicesData.forEach((service, index) => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card-item';
        serviceCard.innerHTML = `
            <div class="service-icon-head">
                ${service.icon}
            </div>
            <div class="service-card-body">
                <div class="service-number-label">${service.number}</div>
                <h2 class="service-title-heading">
                    <span class="highlight">${service.title}</span>
                </h2>
                <p class="service-description-text">${service.description}</p>
                <div class="service-features-list">
                    ${service.features.map(feature => `<span class="service-feature-tag">${feature}</span>`).join('')}
                </div>
            </div>
        `;
        servicesCarousel.appendChild(serviceCard);
    });
}


// Create floating particles
function createFloatingElements() {
    servicesAnimationField.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        servicesAnimationField.appendChild(particle);
    }
}


// Navigate to specific service
function navigateToService(index) {
    if (isServiceChanging || index === currentServiceIndex) return;
    
    isServiceChanging = true;
    currentServiceIndex = index;
    
    // Pause animation briefly and sync
    pauseAnimation();
    setTimeout(() => {
        resumeAnimation();
        isServiceChanging = false;
    }, 800);
}

// Smooth navigate without interrupting animation flow
function smoothNavigateToService(index) {
    if (isServiceChanging || index === currentServiceIndex) return;
    
    isServiceChanging = true;
    currentServiceIndex = index;
    
    // Sync animation timing to create seamless transition
    const serviceCards = servicesCarousel.querySelectorAll('.service-card-item');
    serviceCards.forEach((card, cardIndex) => {
        const newDelay = (cardIndex - index) * -3; // 3s per service
        card.style.animationDelay = `${newDelay}s`;
    });
    
    setTimeout(() => {
        isServiceChanging = false;
    }, 300);
}

// Pause carousel animation
function pauseAnimation() {
    const serviceCards = servicesCarousel.querySelectorAll('.service-card-item');
    serviceCards.forEach(card => {
        card.style.animationPlayState = 'paused';
    });
    animationPaused = true;
}

// Resume carousel animation
function resumeAnimation() {
    const serviceCards = servicesCarousel.querySelectorAll('.service-card-item');
    serviceCards.forEach(card => {
        card.style.animationPlayState = 'running';
    });
    animationPaused = false;
}

// Setup intersection observer
function setupServicesObserver() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                servicesIsActive = entry.isIntersecting;
                if (servicesIsActive) {
                    resumeAnimation();
                } else {
                    pauseAnimation();
                }
            });
        },
        { threshold: 0.5 }
    );
    observer.observe(servicesContainer);
}

// Setup scroll handler for manual navigation
function setupScrollHandler() {
    let scrollTimeout;
    let isScrolling = false;
    let isOverServiceCard = false;
    
    // Track when mouse is over service card area
    servicesCarousel.addEventListener('mouseenter', () => {
        isOverServiceCard = true;
    });
    
    servicesCarousel.addEventListener('mouseleave', () => {
        isOverServiceCard = false;
    });
    
    const handleScroll = (e) => {
        // If over service card area, handle service navigation
        if (isOverServiceCard && servicesIsActive && !isScrolling) {
            e.preventDefault();
            e.stopPropagation();
            
            const now = Date.now();
            if (now - lastScrollTime < 400) return;
            
            const delta = e.deltaY;
            
            if (Math.abs(delta) < 5) return;
            
            isScrolling = true;
            
            if (delta > 0) {
                // Scroll down - next service
                const nextIndex = (currentServiceIndex + 1) % marketingServicesData.length;
                smoothNavigateToService(nextIndex);
            } else {
                // Scroll up - previous service
                const prevIndex = (currentServiceIndex - 1 + marketingServicesData.length) % marketingServicesData.length;
                smoothNavigateToService(prevIndex);
            }
            
            lastScrollTime = now;
            
            setTimeout(() => {
                isScrolling = false;
            }, 300);
        }
        // If not over service card, allow normal page scrolling
    };
    
    // Add wheel event listener to the entire services container
    servicesContainer.addEventListener('wheel', handleScroll, { passive: false });
}

// Handle touch events for mobile
let touchStartY = 0;
let touchEndY = 0;

function handleTouchStart(e) {
    touchStartY = e.touches[0].clientY;
}

function handleTouchEnd(e) {
    if (!servicesIsActive || animationPaused) return;
    
    touchEndY = e.changedTouches[0].clientY;
    const touchDifference = touchStartY - touchEndY;
    
    if (Math.abs(touchDifference) > 50) {
        if (touchDifference > 0) {
            // Swipe up
            const nextIndex = (currentServiceIndex + 1) % marketingServicesData.length;
            navigateToService(nextIndex);
        } else {
            // Swipe down
            const prevIndex = (currentServiceIndex - 1 + marketingServicesData.length) % marketingServicesData.length;
            navigateToService(prevIndex);
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!servicesIsActive) return;
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const nextIndex = (currentServiceIndex + 1) % marketingServicesData.length;
        navigateToService(nextIndex);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prevIndex = (currentServiceIndex - 1 + marketingServicesData.length) % marketingServicesData.length;
        navigateToService(prevIndex);
    }
});

// Add touch event listeners
servicesContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
servicesContainer.addEventListener('touchend', handleTouchEnd, { passive: true });

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate layout if needed
    updateProgressBar();
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeServicesSection();
});

// Optional: Auto-advance carousel (can be enabled/disabled)
let autoAdvanceInterval;

function startAutoAdvance() {
    autoAdvanceInterval = setInterval(() => {
        if (servicesIsActive && !animationPaused && !isServiceChanging) {
            const nextIndex = (currentServiceIndex + 1) % marketingServicesData.length;
            currentServiceIndex = nextIndex;
            updateNavigationDots();
            updateProgressBar();
        }
    }, 3000); // 3 seconds per service
}

function stopAutoAdvance() {
    clearInterval(autoAdvanceInterval);
}

// Enable auto-advance (comment out if not needed)
// startAutoAdvance();