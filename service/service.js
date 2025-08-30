/* Start: Marketing Services Vertical Carousel */


// Функция для получения переводов услуг
function getServiceTranslations() {
    const languageSwitcher = window.languageSwitcher;
    if (languageSwitcher && languageSwitcher.translations && languageSwitcher.currentLanguage) {
        const translations = languageSwitcher.translations[languageSwitcher.currentLanguage];
        const items = translations.services.items || {};
        // Преобразуем объект в массив с номерами
        return Object.keys(items).map(key => ({
            number: key,
            title: items[key].title,
            features: items[key].features
        }));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carouselWrapper = document.getElementById('servicesCarouselWrapper');
    const carousel = document.getElementById('servicesCarousel');
    if (!carouselWrapper || !carousel) return;

    let items = [];
    let totalItems = 0;
    let currentIndex = 0;
    let isThrottled = false;

    // Функция инициализации услуг
    function initializeServices() {
        // Используем существующие элементы из HTML
        items = Array.from(carousel.children);
        totalItems = items.length;
        currentIndex = 0;
        updateCarousel();
    }

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next');

            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === (currentIndex - 1 + totalItems) % totalItems) {
                item.classList.add('prev');
            } else if (index === (currentIndex + 1) % totalItems) {
                item.classList.add('next');
            }
        });
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    // Scroll wheel event
    carouselWrapper.addEventListener('wheel', (event) => {
        event.preventDefault();
        if (isThrottled) return;
        isThrottled = true;

        if (event.deltaY > 0) {
            showNext();
        } else {
            showPrev();
        }

        setTimeout(() => {
            isThrottled = false;
        }, 600); // Throttle to prevent rapid scrolling
    });

    // Touch events for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    carouselWrapper.addEventListener('touchstart', (event) => {
        touchStartY = event.changedTouches[0].screenY;
    });

    carouselWrapper.addEventListener('touchmove', (event) => {
        // Prevent page scroll when touching carousel
        event.preventDefault();
    });

    carouselWrapper.addEventListener('touchend', (event) => {
        if (isThrottled) return;
        
        touchEndY = event.changedTouches[0].screenY;
        const touchDiff = touchStartY - touchEndY;
        
        // Minimum swipe distance to trigger carousel change
        if (Math.abs(touchDiff) > 50) {
            isThrottled = true;
            
            if (touchDiff > 0) {
                // Swipe up - show next
                showNext();
            } else {
                // Swipe down - show previous
                showPrev();
            }

            setTimeout(() => {
                isThrottled = false;
            }, 600);
        }
    });

    // Click event on items
    carousel.addEventListener('click', (event) => {
        const clickedItem = event.target.closest('.service-card-item');
        if (!clickedItem) return;

        if (clickedItem.classList.contains('next')) {
            showNext();
        } else if (clickedItem.classList.contains('prev')) {
            showPrev();
        }
    });

    // Слушатель события смены языка
    document.addEventListener('languageChanged', initializeServices);

    // Инициализация с задержкой для ожидания languageSwitcher
    setTimeout(initializeServices, 100);
});

/* End: Marketing Services Vertical Carousel */