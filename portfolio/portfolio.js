// Функция для получения переводов портфолио
function getPortfolioTranslations() {
    const languageSwitcher = window.languageSwitcher;
    if (languageSwitcher && languageSwitcher.translations && languageSwitcher.currentLanguage) {
        const translations = languageSwitcher.translations[languageSwitcher.currentLanguage];
        return translations.portfolio?.items || {};
    }
    return {};
}

// Функция для получения переведенных данных портфолио
function getTranslatedPortfolioData(portfolioKey, defaultCategory, defaultServices) {
    if (!portfolioKey) return { category: defaultCategory, services: defaultServices };
    
    const translations = getPortfolioTranslations();
    const translated = translations[portfolioKey];
    
    return {
        category: translated?.category || defaultCategory,
        services: translated?.services || defaultServices
    };
}


let displayedItems = 4;
const itemsPerLoad = 4;
let currentImageIndices = {};

function createWorksShowcaseItem(item, index) {
    currentImageIndices[index] = 0;
    
    // Получаем переведенные данные
    const translatedData = getTranslatedPortfolioData(item.key, item.category, item.services);
    
    const div = document.createElement('div');
    div.className = `works-showcase-item ${item.type}`;
    div.innerHTML = `
        <div class="works-showcase-image-section">
            <div class="works-showcase-gallery" id="gallery-${index}">
                ${item.images.map(img => `<img src="${img}" alt="${item.company} work" loading="lazy">`).join('')}
            </div>
            ${item.images.length > 1 ? `
                <button class="gallery-nav prev" data-item="${index}" data-direction="prev">❮</button>
                <button class="gallery-nav next" data-item="${index}" data-direction="next">❯</button>
                <div class="image-counter">
                    <span id="counter-${index}">1</span>/${item.images.length}
                </div>
            ` : ''}
        </div>
        <div class="works-showcase-content">
            <div class="works-showcase-category">${translatedData.category}</div>
            <div class="works-showcase-company">${item.company}</div>
            <div class="works-showcase-services">
                ${translatedData.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
            </div>
        </div>
    `;

    // div.innerHTML += `
    //     <div class="works-showcase-results">
    //     <div class="result-item">
    //         <div class="result-number">${item.views || '25000'}</div>
    //         <div class="result-label">դիտում</div>
    //     </div>
    //     <div class="result-item">
    //         <div class="result-number">${item.revenue || '19.29$'}</div>
    //         <div class="result-label">գումար</div>
    //     </div>
    //     <div class="result-item">
    //         <div class="result-number">${item.clients || '6'}</div>
    //         <div class="result-label">հաճախորդ</div>
    //     </div>
    // </div>
    // `;
    
    // Add click event for modal
    const images = div.querySelectorAll('.works-showcase-gallery img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            openModal(img.src);
        });
    });
    
    return div;
}

function updateGallery(itemIndex, direction) {
    const gallery = document.getElementById(`gallery-${itemIndex}`);
    const counter = document.getElementById(`counter-${itemIndex}`);
    
    if (!gallery) return;
    
    // Получаем количество изображений в галерее
    const images = gallery.querySelectorAll('img');
    const totalImages = images.length;
    
    if (totalImages <= 1) return; // Нет смысла переключать, если изображение одно
    
    // Инициализируем индекс если он не существует
    if (currentImageIndices[itemIndex] === undefined) {
        currentImageIndices[itemIndex] = 0;
    }
    
    if (direction === 'next') {
        currentImageIndices[itemIndex] = (currentImageIndices[itemIndex] + 1) % totalImages;
    } else {
        currentImageIndices[itemIndex] = currentImageIndices[itemIndex] === 0 
            ? totalImages - 1 
            : currentImageIndices[itemIndex] - 1;
    }
    
    const translateX = -currentImageIndices[itemIndex] * 100;
    gallery.style.transform = `translateX(${translateX}%)`;
    
    if (counter) {
        counter.textContent = currentImageIndices[itemIndex] + 1;
    }
}

function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    return div;
}

// Функция для обновления контента портфолио
function updatePortfolioContent() {
    const container = document.getElementById('worksShowcase');
    if (!container) return;
    
    // Очищаем контейнер
    container.innerHTML = '';
    
    // Пересоздаем элементы с новыми переводами
    for (let i = 0; i < Math.min(displayedItems, portfolioData.length); i++) {
        const item = createWorksShowcaseItem(portfolioData[i], i);
        container.appendChild(item);
    }
    
    // Обновляем обработчики событий
    attachGalleryEventListeners();
}

function attachGalleryEventListeners() {
    // Add event listeners for gallery navigation
    document.querySelectorAll('.gallery-nav').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemIndex = parseInt(btn.dataset.item);
            const direction = btn.dataset.direction;
            updateGallery(itemIndex, direction);
        });
    });
}

function renderWorksShowcase(items = portfolioData.slice(0, displayedItems)) {
    const container = document.getElementById('worksShowcase');
    if (!container) return;
    
    container.innerHTML = '';
    items.forEach((item, index) => {
        const element = createWorksShowcaseItem(item, index);
        element.style.animationDelay = `${index * 0.1}s`;
        container.appendChild(element);
    });
    
    attachGalleryEventListeners();
}



// Инициализация существующих галерей из HTML
function initExistingGalleries() {
    // Инициализируем индексы для существующих галерей
    const existingGalleries = document.querySelectorAll('.works-showcase-gallery');
    existingGalleries.forEach((gallery, index) => {
        currentImageIndices[index] = 0;
    });
    
    // Добавляем обработчики для существующих кнопок навигации
    attachGalleryEventListeners();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем существующие галереи
    initExistingGalleries();
    
    // Показываем первые 4 элемента
    const portfolioItems = document.querySelectorAll('.works-showcase-item');
    portfolioItems.forEach((item, index) => {
        if (index < 4) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
            item.classList.add('portfolio-hidden');
        }
    });

    // Load more functionality
    const loadMoreBtn = document.getElementById('worksLoadMoreBtn');
    const collapseBtn = document.getElementById('worksCollapseBtn');
    
    loadMoreBtn.addEventListener('click', () => {
        const portfolioItems = document.querySelectorAll('.works-showcase-item');
        const hiddenItems = document.querySelectorAll('.works-showcase-item.portfolio-hidden');
        
        // Показываем следующие 4 элемента
        for (let i = 0; i < Math.min(4, hiddenItems.length); i++) {
            hiddenItems[i].style.display = 'block';
            hiddenItems[i].classList.remove('portfolio-hidden');
        }
        
        displayedItems += 4;
        
        // Скрываем кнопку Load More если все элементы показаны
        if (document.querySelectorAll('.works-showcase-item.portfolio-hidden').length === 0) {
            loadMoreBtn.style.display = 'none';
        }
        
        // Показываем кнопку Collapse
        if (displayedItems > 4) {
            collapseBtn.classList.remove('hidden');
        }
    });

    collapseBtn.addEventListener('click', () => {
        const portfolioItems = document.querySelectorAll('.works-showcase-item');
        
        // Скрываем все элементы после первых 4
        portfolioItems.forEach((item, index) => {
            if (index >= 4) {
                item.style.display = 'none';
                item.classList.add('portfolio-hidden');
            }
        });
        
        displayedItems = 4;
        loadMoreBtn.style.display = 'block';
        collapseBtn.classList.add('hidden');
        
        // Scroll to portfolio section
        document.getElementById('worksShowcaseSection').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Animated counter for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                    stat.removeAttribute('data-target'); // Prevent re-animation
                });
            }
        });
    }, { threshold: 0.5 });

    // Observe stats section
    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
        statsObserver.observe(resultsSection);
    }

    // Modal functionality
    const modalClose = document.getElementById('modalClose');
    const modal = document.getElementById('imageModal');
    
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Hide load more button if all items are displayed initially
    const totalItems = document.querySelectorAll('.works-showcase-item').length;
    if (totalItems <= displayedItems) {
        loadMoreBtn.style.display = 'none';
    }
    
    // Обработчик события смены языка
    document.addEventListener('languageChanged', () => {
        updatePortfolioContent();
    });
});