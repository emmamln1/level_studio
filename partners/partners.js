// Функция для получения переводов партнеров
function getPartnerTranslations() {
    const languageSwitcher = window.languageSwitcher;
    if (languageSwitcher && languageSwitcher.translations && languageSwitcher.currentLanguage) {
        const translations = languageSwitcher.translations[languageSwitcher.currentLanguage];
        if (!translations || !translations.partners) {
            return {};
        }
        return translations.partners.items || {};
    }
    return {};
}

// Функция для получения переведенных данных партнера
function getTranslatedPartnerData(partnerKey, defaultField, defaultDescription) {
    if (!partnerKey) return { field: defaultField, description: defaultDescription };
    
    const translations = getPartnerTranslations();
    const translated = translations[partnerKey];
    
    return {
        field: translated?.field || defaultField,
        description: translated?.description || defaultDescription
    };
}

// partnersData теперь в HTML, массив больше не нужен

let currentIndex = 0;
let isCarouselView = true;
let autoplayInterval;
let isAnimating = false; // prevent double navigation during transition


function createBusinessPartnerCard(partner, index) {
    const translatedData = getTranslatedPartnerData(partner.key || '', partner.field, partner.description);
    const card = document.createElement('div');
    card.className = 'business-partner-card';
    card.innerHTML = `
        <div class="business-partner-logo">
         <img src="${partner.logo}" alt="${partner.name}" style="width: 100%; height: 100%;">
        </div>
        <h3 class="business-partner-name">${partner.name}</h3>
        <div class="business-partner-field">${translatedData.field}</div>
        <p class="business-partner-description">${translatedData.description}</p>
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
    if (!track) return;

    // Создаем индикаторы для карточек
    createBusinessIndicators();
    
    // Карточки уже в HTML, просто обновляем карусель
    updateBusinessCarousel();
    startBusinessAutoplay();
}

function createBusinessIndicators() {
    const track = document.getElementById('businessCarouselTrack');
    const indicators = document.getElementById('businessIndicators');
    if (!track || !indicators) return;
    
    const cards = track.querySelectorAll('.business-partner-card');
    indicators.innerHTML = ''; // Очищаем существующие индикаторы
    
    cards.forEach((_, index) => {
        const indicator = createBusinessIndicator(index);
        indicators.appendChild(indicator);
    });
}

function initializeBusinessGrid() {
    const grid = document.getElementById('businessGridView');
    if (!grid) return;
    
    // Grid view не используется в текущем дизайне
    // Карточки уже в HTML для carousel
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
    const cards = track.querySelectorAll('.business-partner-card');
    const totalCards = cards.length;
    
    if (totalCards === 0) return;
    
    const stepWidth = getBusinessStepWidth();
    const translateX = -currentIndex * stepWidth;
    
    track.style.transform = `translateX(${translateX}px)`;
    
    updateBusinessIndicators();
    updateBusinessNavigationButtons();
}

function updateBusinessNavigationButtons() {
    const prevBtn = document.getElementById('businessPrevBtn');
    const nextBtn = document.getElementById('businessNextBtn');
    const track = document.getElementById('businessCarouselTrack');
    
    if (!prevBtn || !nextBtn || !track) return;
    
    const cards = track.querySelectorAll('.business-partner-card');
    const totalCards = cards.length;
    
    // Для бесконечной карусели кнопки всегда активны
    // Убираем disabled состояние
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    prevBtn.classList.remove('disabled');
    nextBtn.classList.remove('disabled');
}

function updateBusinessIndicators() {
    const indicators = document.querySelectorAll('.business-indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function goToBusinessSlide(index) {
    currentIndex = index;
    updateBusinessCarousel();
    resetBusinessAutoplay();
}

function nextBusinessSlide() {
    if (isAnimating) return;
    isAnimating = true;
    
    const track = document.getElementById('businessCarouselTrack');
    const cards = track.querySelectorAll('.business-partner-card');
    const totalCards = cards.length;
    
    currentIndex = (currentIndex + 1) % totalCards;
    updateBusinessCarousel();
    
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

function prevBusinessSlide() {
    if (isAnimating) return;
    isAnimating = true;
    
    const track = document.getElementById('businessCarouselTrack');
    const cards = track.querySelectorAll('.business-partner-card');
    const totalCards = cards.length;

    if (currentIndex === 0) {
        currentIndex = totalCards - 1;
    } else {
        currentIndex--;
    }
    
    updateBusinessCarousel();
    
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

function startBusinessAutoplay() {
    autoplayInterval = setInterval(nextBusinessSlide, 8000);
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

// Функции для обновления контента партнеров при смене языка
function updatePartnersContent() {
    if (isCarouselView) {
        // Пересоздаем индикаторы при смене языка
        createBusinessIndicators();
        updateBusinessCarousel();
    } else {
        initializeBusinessGrid();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация с задержкой для ожидания languageSwitcher
    setTimeout(() => {
        initializeBusinessCarousel();
        initializeBusinessGrid();
    }, 100);
    
    // Слушатель события смены языка
    document.addEventListener('languageChanged', updatePartnersContent);

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