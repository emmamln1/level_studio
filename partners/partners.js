const partnersData = [
    {
        name: 'Bella Italia',
        field: 'Հոռեկա',
        logo: 'image/Partner/BellaItalia/logo.webp',
        description: 'Իտալական ռեստորան',
    },
    {
        name: 'Bergamo Hotel',
        field: 'Հոռեկա',
        logo: 'image/Partner/BergamoHotel/logo.webp',
        description: 'Բուտիկ հյուրանոց',
    },
    {
        name: 'Boulevard',
        field: 'Հոռեկա',
        logo: 'image/Partner/Boulevard/logo.webp',
        description: 'Ռեստորանային համալիր',
    },
    {
        name: 'Buniatyan Caviar',
        field: 'Հոռեկա',
        logo: 'image/Partner/BuniatyanCaviar/logo.webp',
        description: 'Պրեմիում իկրա և ծովամթերք',
    },
    {
        name: 'Design Lines',
        field: 'Դիզայն',
        logo: 'image/Partner/DesignLines/Logo.webp',
        description: 'Դիզայն ստուդիո',
    },
    {
        name: 'Flora Am',
        field: 'Ծաղկային',
        logo: 'image/Partner/FloraAm/logo.webp',
        description: 'Ծաղկային խանութ',
    },
    {
        name: 'Global Flowers',
        field: 'Ծաղկային',
        logo: 'image/Partner/GlobalFlowers/logo.webp',
        description: 'Ծաղկային ծառայություններ',
    },
    {
        name: 'Hillzone',
        field: 'Հոռեկա',
        logo: 'image/Partner/Hillzone/logo.webp',
        description: 'Ռեստորան և ժամանցային կենտրոն',
    },
    {
        name: 'Karap Cafe',
        field: 'Հոռեկա',
        logo: 'image/Partner/KarapCafe/logo.webp',
        description: 'Սուրճի խանութ',
    },
    {
        name: 'Lanj',
        field: 'Նորաձևություն',
        logo: 'image/Partner/Lanj/logo.webp',
        description: 'Նորաձևության բրենդ',
    },
    {
        name: 'Life Time Premium Club',
        field: 'Սպորտ',
        logo: 'image/Partner/LifeTimePremiumClub/logo.webp',
        description: 'Պրեմիում ֆիթնես կլուբ',
    },
    {
        name: 'Lorest Clinic',
        field: 'Բժշկական',
        logo: 'image/Partner/LorestClinic/logo.webp',
        description: 'Բժշկական կլինիկա',
    },
    {
        name: 'Marco Furniture',
        field: 'Վերջնական սպառող',
        logo: 'image/Partner/MarcoFurniture/logo.webp',
        description: 'Կահույք և ինտերիեր',
    },
    {
        name: 'Minis Kids Cafe',
        field: 'Երեխաների',
        logo: 'image/Partner/MinisKidsCafe/logo.webp',
        description: 'Երեխաների սուրճի խանութ',
    },
    {
        name: 'My Horeca Consulting',
        field: 'Հոռեկա',
        logo: 'image/Partner/MyHorecaConsulting/logo.webp',
        description: 'Հոռեկա խորհրդատվություն',
    },
    {
        name: 'Nush Plast',
        field: 'Բիզնեսից բիզնես',
        logo: 'image/Partner/NushPlast/logo.webp',
        description: 'Պլաստիկ արտադրություն',
    },
    {
        name: 'Palladium Hall',
        field: 'Հոռեկա',
        logo: 'image/Partner/PalladiumHall/logo.webp',
        description: 'Միջոցառումների դահլիճ',
    },
    {
        name: 'Podoclinic',
        field: 'Բժշկական',
        logo: 'image/Partner/Podoclinic/logo.webp',
        description: 'Ոտքերի բժշկական կլինիկա',
    },
    {
        name: 'Pride Sanitar',
        field: 'Բիզնեսից բիզնես',
        logo: 'image/Partner/PrideSanitar/logo.webp',
        description: 'Սանիտարական ապրանքներ',
    },
    {
        name: 'Royal Yerevan',
        field: 'Հոռեկա',
        logo: 'image/Partner/RoyalYerevan/logo.webp',
        description: 'Պրեմիում հյուրանոց',
    },
    {
        name: 'Rush Pub',
        field: 'Հոռեկա',
        logo: 'image/Partner/RushPub/logo.webp',
        description: 'Պաբ և բար',
    },
    {
        name: 'Tuntunik',
        field: 'Երեխաների',
        logo: 'image/Partner/Tuntunik/logo.webp',
        description: 'Երեխաների ծառայություններ',
    },
    {
        name: 'Yan Net',
        field: 'Վերջնական սպառող',
        logo: 'image/Partner/yannet/logo.webp',
        description: 'Ցանցային ծառայություններ',
    },
    {
        name: 'Z & L Dental Clinic',
        field: 'Բժշկական',
        logo: 'image/Partner/ZandLDentalClinic/logo.webp',
        description: 'Ատամնաբուժական կլինիկա',
    }
];

let currentIndex = 0;
let isCarouselView = true;
let autoplayInterval;
let isAnimating = false; // prevent double navigation during transition


function createBusinessPartnerCard(partner, index) {
    const card = document.createElement('div');
    card.className = 'business-partner-card';
    card.innerHTML = `
        <div class="business-partner-logo">
         <img src="${partner.logo}" alt="${partner.name}" style="width: 100%; height: 100%;">
        </div>
        <h3 class="business-partner-name">${partner.name}</h3>
        <div class="business-partner-field">${partner.field}</div>
        <p class="business-partner-description">${partner.description}</p>
    `;
    return card;
}

function createBusinessIndicator(index) {
    const indicator = document.createElement('div');
    indicator.className = `business-indicator ${index === 0 ? 'active' : ''}`;
    indicator.addEventListener('click', () => goToBusinessSlide(index));
    return indicator;
}

function initializeBusinessCarousel() {
    const track = document.getElementById('businessCarouselTrack');
    const indicators = document.getElementById('businessIndicators');
    
    track.innerHTML = '';
    indicators.innerHTML = '';

    // Добавляем все карточки
    partnersData.forEach((partner, index) => {
        const card = createBusinessPartnerCard(partner, index);
        track.appendChild(card);
        
        const indicator = createBusinessIndicator(index);
        indicators.appendChild(indicator);
    });

    // Дублируем первые несколько карточек в конце для плавного зацикливания
    const cardsToClone = Math.min(3, partnersData.length);
    for (let i = 0; i < cardsToClone; i++) {
        const card = createBusinessPartnerCard(partnersData[i], i);
        card.classList.add('cloned-card');
        track.appendChild(card);
    }

    // Небольшая задержка для корректного расчета размеров
    setTimeout(() => {
        updateBusinessCarousel();
    }, 100);
}

function initializeBusinessGrid() {
    const grid = document.getElementById('businessGridView');
    grid.innerHTML = '';

    partnersData.forEach((partner, index) => {
        const card = createBusinessPartnerCard(partner, index);
        grid.appendChild(card);
    });
}

// Calculate one-step translate width (card width + track gap)
function getBusinessStepWidth() {
    const track = document.getElementById('businessCarouselTrack');
    const cards = track.querySelectorAll('.business-partner-card:not(.cloned-card)');

    // Use actual rendered width of the first real card
    let cardWidth;
    if (cards.length > 0) {
        cardWidth = cards[0].getBoundingClientRect().width;
    } else {
        // Fallbacks for different breakpoints
        if (window.innerWidth <= 480) {
            cardWidth = window.innerWidth - 70; // matches CSS calc(100vw - 70px)
        } else if (window.innerWidth <= 768) {
            cardWidth = window.innerWidth - 90; // matches CSS calc(100vw - 90px)
        } else {
            cardWidth = 350; // base card width on desktop
        }
    }

    const style = window.getComputedStyle(track);
    const gap = parseInt(style.gap, 10) || 0;
    return cardWidth + gap;
}

function updateBusinessCarousel() {
    const track = document.getElementById('businessCarouselTrack');
    const indicators = document.querySelectorAll('.business-indicator');
    
    // Translate by unified step width
    const step = getBusinessStepWidth();
    track.style.transform = `translateX(-${currentIndex * step}px)`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
    
    // Проверяем, нужно ли сбросить позицию для бесконечного цикла
    if (currentIndex >= partnersData.length) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = 0;
            track.style.transform = `translateX(0px)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 50);
        }, 600);
    }
}

function goToBusinessSlide(index) {
    currentIndex = index;
    updateBusinessCarousel();
    resetBusinessAutoplay();
}

function nextBusinessSlide() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = currentIndex + 1;
    updateBusinessCarousel();
    setTimeout(() => { isAnimating = false; }, 650);
}

function prevBusinessSlide() {
    const track = document.getElementById('businessCarouselTrack');
    const total = partnersData.length;
    const step = getBusinessStepWidth();

    if (currentIndex === 0) {
        if (isAnimating) return;
        isAnimating = true;
        // Seamless jump to the cloned area at the end, then animate one step back to the last real slide
        track.style.transition = 'none';
        track.style.transform = `translateX(-${total * step}px)`; // jump after the last real slide
        // Force reflow to apply transform without transition
        void track.offsetHeight;
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        currentIndex = total - 1;
        track.style.transform = `translateX(-${currentIndex * step}px)`;

        // Update indicators manually
        const indicators = document.querySelectorAll('.business-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        setTimeout(() => { isAnimating = false; }, 650);
        return;
    }

    if (isAnimating) return;
    isAnimating = true;
    currentIndex = currentIndex - 1;
    updateBusinessCarousel();
    setTimeout(() => { isAnimating = false; }, 650);
}

function startBusinessAutoplay() {
    autoplayInterval = setInterval(nextBusinessSlide, 4000);
}

function stopBusinessAutoplay() {
    clearInterval(autoplayInterval);
}

function resetBusinessAutoplay() {
    stopBusinessAutoplay();
    startBusinessAutoplay();
}

function switchBusinessView(viewType) {
    const carouselView = document.getElementById('businessCarouselView');
    const gridView = document.getElementById('businessGridView');
    const carouselBtn = document.getElementById('businessCarouselBtn');
    const gridBtn = document.getElementById('businessGridBtn');

    if (viewType === 'carousel') {
        carouselView.style.display = 'block';
        gridView.classList.remove('active');
        carouselBtn.classList.add('active');
        gridBtn.classList.remove('active');
        isCarouselView = true;
        startBusinessAutoplay();
    } else {
        carouselView.style.display = 'none';
        gridView.classList.add('active');
        carouselBtn.classList.remove('active');
        gridBtn.classList.add('active');
        isCarouselView = false;
        stopBusinessAutoplay();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeBusinessCarousel();
    initializeBusinessGrid();
    // Убираем автопрокрутку
    // startBusinessAutoplay();

    // Navigation buttons
    const businessNextBtn = document.getElementById('businessNextBtn');
    const businessPrevBtn = document.getElementById('businessPrevBtn');
    const businessCarouselBtn = document.getElementById('businessCarouselBtn');
    const businessGridBtn = document.getElementById('businessGridBtn');

    if (businessNextBtn) {
        businessNextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            nextBusinessSlide();
        });
        businessNextBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            nextBusinessSlide();
        });
    }

    if (businessPrevBtn) {
        businessPrevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            prevBusinessSlide();
        });
        businessPrevBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            prevBusinessSlide();
        });
    }

    // View toggle buttons
    if (businessCarouselBtn) {
        businessCarouselBtn.addEventListener('click', () => {
            switchBusinessView('carousel');
        });
    }

    if (businessGridBtn) {
        businessGridBtn.addEventListener('click', () => {
            switchBusinessView('grid');
        });
    }

    // Pause autoplay on hover
    const businessCarouselWrapper = document.querySelector('.business-carousel-wrapper');
    businessCarouselWrapper.addEventListener('mouseenter', stopBusinessAutoplay);
    businessCarouselWrapper.addEventListener('mouseleave', startBusinessAutoplay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!isCarouselView) return;
        
        if (e.key === 'ArrowLeft') {
            prevBusinessSlide();
            resetBusinessAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextBusinessSlide();
            resetBusinessAutoplay();
        }
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let hasTouchMoved = false;

    businessCarouselWrapper.addEventListener('touchstart', (e) => {
        // Ignore touches on navigation buttons to prevent duplicate next/prev
        if (e.target.closest('.business-carousel-nav')) return;
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        hasTouchMoved = false;
        stopBusinessAutoplay();
    });

    businessCarouselWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        if (Math.abs(currentX - startX) > 5) {
            hasTouchMoved = true;
        }
    });

    businessCarouselWrapper.addEventListener('touchend', (e) => {
        // Ignore if touch ended on navigation button (tap should be handled by click)
        if (e.target.closest('.business-carousel-nav')) return;
        if (!isDragging) return;
        isDragging = false;
        
        // If there was no actual movement, treat as a tap (do nothing here)
        if (!hasTouchMoved) {
            resetBusinessAutoplay();
            return;
        }

        const diffX = startX - currentX;
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                nextBusinessSlide();
            } else {
                prevBusinessSlide();
            }
        }
        resetBusinessAutoplay();
    });

    // Обновление карусели при изменении размера окна
    window.addEventListener('resize', () => {
        updateBusinessCarousel();
    });
});