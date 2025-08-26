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
        features: ["React", "JavaScript", "PHP", "Next.js"],
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
