const partnersData = [
    {
        name: 'TechCorp Armenia',
        field: 'Technology',
        logo: 'TC',
        description: 'Առաջատար տեխնոլոգիական ընկերություն, որը մասնագիտանում է արհեստական բանականության և մեքենայական ուսուցման լուծումների մեջ'
    },
    {
        name: 'Creative Studio',
        field: 'Design',
        logo: 'CS',
        description: 'Ստեղծագործական ստուդիա, որը համակցում է ժամանակակից դիզայնը նորարարական մոտեցումների հետ'
    },
    {
        name: 'Digital Marketing Pro',
        field: 'Marketing',
        logo: 'DM',
        description: 'Դիջիթալ մարքեթինգի գործակալություն՝ մասնագիտացված բրենդավորման և օնլայն առևտրի բարձրացման ոլորտում'
    },
    {
        name: 'Business Solutions',
        field: 'Consulting',
        logo: 'BS',
        description: 'Ազուցիական խորհրդատվական ընկերություն, որը օգնում է բիզնեսներին բարերարել իրենց գործառնությունները'
    },
    {
        name: 'Innovation Hub',
        field: 'Startup',
        logo: 'IH',
        description: 'Նորարարական կենտրոն, որը աջակցում է սթարտափներին և ընկերությունների զարգացմանը'
    },
    {
        name: 'Media Network',
        field: 'Media',
        logo: 'MN',
        description: 'Լրատվական ցանց, որը ծծանում է բազմաշերտ բովանդակություն և մեդիա ծառայություններ'
    },
    {
        name: 'Finance Group',
        field: 'Finance',
        logo: 'FG',
        description: 'Ֆինանսական խումբ, որը տրամադրում է հսկագետ ֆինանսական լուծումներ և ծառայություններ'
    },
    {
        name: 'Education Plus',
        field: 'Education',
        logo: 'EP',
        description: 'Կրթական հաստատություն, որը մասնագիտանում է անձնակազմի վերապատրաստման և մասնագիտական զարգացման ոլորտում'
    }
];

let currentIndex = 0;
let isCarouselView = true;
let autoplayInterval;


function createBusinessPartnerCard(partner, index) {
    const card = document.createElement('div');
    card.className = 'business-partner-card';
    card.innerHTML = `
        <div class="business-partner-logo">
            ${partner.logo}
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

    updateBusinessCarousel();
}

function initializeBusinessGrid() {
    const grid = document.getElementById('businessGridView');
    grid.innerHTML = '';

    partnersData.forEach((partner, index) => {
        const card = createBusinessPartnerCard(partner, index);
        grid.appendChild(card);
    });
}

function updateBusinessCarousel() {
    const track = document.getElementById('businessCarouselTrack');
    const indicators = document.querySelectorAll('.business-indicator');
    const cardWidth = 380; // 350px card + 30px gap
    
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
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
    currentIndex = currentIndex + 1;
    updateBusinessCarousel();
}

function prevBusinessSlide() {
    currentIndex = currentIndex === 0 ? partnersData.length - 1 : currentIndex - 1;
    updateBusinessCarousel();
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
        businessNextBtn.addEventListener('click', () => {
            nextBusinessSlide();
        });
    }

    if (businessPrevBtn) {
        businessPrevBtn.addEventListener('click', () => {
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

    businessCarouselWrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopBusinessAutoplay();
    });

    businessCarouselWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    businessCarouselWrapper.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
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
});