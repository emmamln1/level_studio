/* Start: Marketing Services Vertical Carousel */

document.addEventListener('DOMContentLoaded', () => {
    const marketingServicesData = [
        { number: '01', title: 'SEO-ОПТИМИЗАЦИЯ', features: ['Аудит', 'Ключевые слова', 'Линкбилдинг'] },
        { number: '02', title: 'КОНТЕКСТНАЯ РЕКЛАМА', features: ['PPC', 'Ретаргетинг', 'Аналитика'] },
        { number: '03', title: 'SMM-ПРОДВИЖЕНИЕ', features: ['Контент', 'Таргетинг', 'Комьюнити'] },
        { number: '04', title: 'КОНТЕНТ-МАРКЕТИНГ', features: ['Статьи', 'Видео', 'Инфографика'] },
        { number: '05', title: 'EMAIL-МАРКЕТИНГ', features: ['Автоматизация', 'Сегментация', 'A/B тесты'] },
        { number: '06', title: 'ТАРГЕТИРОВАННАЯ РЕКЛАМА', features: ['Facebook Ads', 'Instagram Ads', 'Look-alike'] },
        { number: '07', title: 'ВЕБ-АНАЛИТИКА', features: ['Google Analytics', 'Яндекс.Метрика', 'Отчеты'] },
        { number: '08', title: 'UX/UI ДИЗАЙН', features: ['Прототипы', 'Тестирование', 'Figma'] },
        { number: '09', title: 'БРЕНДИНГ', features: ['Логотип', 'Фирменный стиль', 'Гайдлайн'] }
    ];

    const carouselWrapper = document.getElementById('servicesCarouselWrapper');
    const carousel = document.getElementById('servicesCarousel');
    if (!carouselWrapper || !carousel) return;

    // Create and append cards
    marketingServicesData.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card-item';
        card.innerHTML = `
            <div class="service-icon-head">${service.number}</div>
            <div class="service-card-body">
                <h3 class="service-title-heading">${service.title}</h3>
                <div class="service-features-list">
                    ${service.features.map(feature => `<span class="service-feature-tag">${feature}</span>`).join('')}
                </div>
            </div>
        `;
        carousel.appendChild(card);
    });

    const items = Array.from(carousel.children);
    const totalItems = items.length;
    let currentIndex = 0;
    let isThrottled = false;

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

    // Initialize
    updateCarousel();
});

/* End: Marketing Services Vertical Carousel */