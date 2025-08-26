
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

// About Section Carousel
function initAboutCarousel() {
    const carousel = document.querySelector('.about-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.about-carousel__track');
    const slides = Array.from(carousel.querySelectorAll('.about-carousel__slide'));
    const dotsContainer = carousel.querySelector('.about-carousel__dots');
    const prevBtn = carousel.querySelector('.about-carousel__btn--prev');
    const nextBtn = carousel.querySelector('.about-carousel__btn--next');
    
    let currentIndex = 0;
    let isAnimating = false;
    const ANIMATION_DURATION = 500; // ms

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('about-carousel__dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    // Set initial position
    updateCarousel();

    // Navigation functions
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        if (index === currentIndex || isAnimating) return;

        isAnimating = true;
        currentIndex = index;
        updateCarousel();
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, ANIMATION_DURATION);
    }

    function updateCarousel() {
        // Update track position
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === slides.length - 1;
    }

    // Event listeners
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentIndex + 1);
        }
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                goToSlide(currentIndex + 1); // Swipe left
            } else {
                goToSlide(currentIndex - 1); // Swipe right
            }
        }
    });

    // Auto-advance (optional)
    let autoSlideInterval;
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Start auto-slide on mouse leave, stop on hover
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    startAutoSlide();

    // Make carousel focusable for keyboard navigation
    carousel.setAttribute('tabindex', '0');
}

// Intersection Observer for scroll animation
function setupAboutCarouselObserver() {
    const carousel = document.querySelector('.about-carousel');
    if (!carousel) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Initialize carousel only when visible
                initAboutCarousel();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(carousel);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupAboutCarouselObserver();
    // Other initializations...
    initPortfolioCarousel();
    initializeAllImageCarousels();
    initAboutCounters();
});

// Smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

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
        // Clamp current page
        currentPage = Math.min(currentPage, totalPages - 1);
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

    function setPage(index) {
        const clamped = Math.max(0, Math.min(index, totalPages - 1));
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
            carouselSlide.style.transform = `translateX(-${index * 100}%)`;
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

// Animated Counters (About Section)
function initAboutCounters() {
    const statsSection = document.getElementById('aboutStats');
    if (!statsSection) return;

    const numbers = statsSection.querySelectorAll('.stat-number');
    let started = false;

    function animateValue(el, target, duration = 1500) {
        const suffix = el.getAttribute('data-suffix') || '';
        const start = 0;
        const startTime = performance.now();

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(start + (target - start) * progress);
            el.textContent = value + suffix;
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target + suffix;
            }
        }
        requestAnimationFrame(tick);
    }

    function startAnimation() {
        if (started) return;
        started = true;
        numbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            animateValue(el, target);
        });
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAnimation();
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.35 });
        observer.observe(statsSection);
    } else {
        // Fallback for very old browsers
        setTimeout(startAnimation, 800);
    }
}

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

// contact 

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
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

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