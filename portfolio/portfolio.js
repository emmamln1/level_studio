const portfolioData = [
    // Գեղեցկություն և անձնական խնամք
    {
        category: 'Անձնական բրենդինգ',
        company: 'ARMINE GRIGORYAN',
        services: ['Անձնական բրենդինգ', 'Սոցիալական մեդիա մարքեթինգ', 'Բովանդակության ստեղծում'],
        type: 'Personal',
        images: [
            'image/Partner/ArmineGrigoryan/1.webp'
        ],
        views: 15000,
        revenue: 2500,
        clients: 85
    },
    {
        category: 'ՀՈՐԵԿԱ',
        company: 'KARAP CAFE',
        services: ['Սրճարանի մարքեթինգ', 'Տեղական համայնքի ներգրավում', 'Օրական ակցիաներ'],
        type: 'cafe',
        images: [
            'image/Partner/KarapCafe/1.webp',
            'image/Partner/KarapCafe/2.webp',
            'image/Partner/KarapCafe/3.webp',
        ],
        views: 16000,
        revenue: 2800,
        clients: 110
    },
    // HORECA - Իտալական ռեստորան
    {
        category: 'ՀՈՐԵԿԱ',
        company: 'BELLA ITALIA',
        services: ['Սոցիալական մեդիա մարքեթինգ', 'Բրենդի դիրքավորում', 'Բովանդակության ռազմավարություն'],
        type: 'restaurant',
        images: [
            'image/Partner/BellaItalia/1.webp',
            'image/Partner/BellaItalia/2.webp',
            'image/Partner/BellaItalia/3.webp',
        ],
        views: 25000,
        revenue: 4500,
        clients: 120
    },
    // Նորաձևություն և հագուստի բրենդ
    {
        category: 'Նորաձևություն և վաճառք',
        company: 'LANJ',
        services: ['Նորաձևության մարքեթինգ', 'Բրենդի դիրքավորում', 'Վիզուալ բովանդակության ռազմավարություն'],
        type: 'fashion_retail',
        images: [
            'image/Partner/Lanj/1.webp',
            'image/Partner/Lanj/2.webp',
            'image/Partner/Lanj/3.webp',
        ],
        views: 22000,
        revenue: 4200,
        clients: 130
    },
    // HORECA - Hotel
   
    // HORECA - Ժամանցային վայր
    {
        category: 'ՀՈՐԵԿԱ',
        company: 'BOULEVARD',
        services: ['Իրադարձությունների մարքեթինգ', 'Սոցիալական մեդիայի կառավարում', 'Ժամանցի գովազդ'],
        type: 'entertainment',
        images: [
            'image/Partner/Boulevard/1.webp',
            'image/Partner/Boulevard/2.webp',
            'image/Partner/Boulevard/3.webp',
        ],
        views: 35000,
        revenue: 6200,
        clients: 200
    },
    {
        category: 'ՀՈՐԵԿԱ',
        company: 'BERGAMO HOTEL',
        services: ['Հյուրանոցային մարքեթինգ', 'Ամրագրման գովազդ', 'Հյուրերի փորձառություն'],
        type: 'hotel',
        images: [
            'image/Partner/BergamoHotel/1.webp',
            'image/Partner/BergamoHotel/2.webp',
            'image/Partner/BergamoHotel/3.webp',
        ],
        views: 22000,
        revenue: 5800,
        clients: 150
    },
    // HORECA - Շքեղ սնունդ
    {
        category: 'ՀՈՐԵԿԱ',
        company: 'BUNIATYAN CAVIAR',
        services: ['Շքեղ բրենդի մարքեթինգ', 'Պրեմիում ապրանքի դիրքավորում', 'Էլիտար հաճախորդների թիրախավորում'],
        type: 'luxury_food',
        images: [
            'image/Partner/BuniatyanCaviar/1.webp',
            'image/Partner/BuniatyanCaviar/2.webp',
            'image/Partner/BuniatyanCaviar/3.webp',
        ],
        views: 12000,
        revenue: 8500,
        clients: 65
    },
    // Ինտերիերի դիզայնի ստուդիա
    {
        category: 'Դիզայն և ճարտարապետություն',
        company: 'DESIGN LINES',
        services: ['Ինտերիերի դիզայնի մարքեթինգ', 'Պորտֆոլիոյի զարգացում', 'Մասնագիտական ծառայությունների գովազդ'],
        type: 'interior_design',
        images: [
            'image/Partner/DesignLines/1.webp',
            'image/Partner/DesignLines/2.webp',
            'image/Partner/DesignLines/3.webp',
        ],
        views: 14000,
        revenue: 3800,
        clients: 75
    },
    // HORECA - Հանգստյան/ժամանցային
    {
        category: 'ՀՈՐԵԿԱ',
        company: 'HILLZONE',
        services: ['Ժամանցի մարքեթինգ', 'Արկածային տուրիզմ', 'Բացօթյա գործունեության գովազդ'],
        type: 'recreation',
        images: [
            'image/Partner/Hillzone/1.webp',
            'image/Partner/Hillzone/2.webp',
            'image/Partner/Hillzone/3.webp',
        ],
        views: 28000,
        revenue: 4700,
        clients: 180
    },
    // HORECA - Cafe
   
    // Ծաղկային ծառայություններ
    {
        category: 'Վաճառք և ծառայություններ',
        company: 'FLORA AM',
        services: ['Ծաղկային բիզնեսի մարքեթինգ', 'Միջոցառումների ծաղիկների գովազդ', 'Սեզոնային արշավներ'],
        type: 'floral',
        images: [
            'image/Partner/FloraAm/1.webp',
            'image/Partner/FloraAm/2.webp',
            'image/Partner/FloraAm/3.webp',
        ],
        views: 13000,
        revenue: 2200,
        clients: 90
    },
    // Ծաղկային ծառայություններ
    {
        category: 'Վաճառք և ծառայություններ',
        company: 'GLOBAL FLOWERS',
        services: ['Միջազգային ծաղկային առաքում', 'Կորպորատիվ ծաղկային ծառայություններ', 'Հարսանիքային մարքեթինգ'],
        type: 'floral',
        images: [
            'image/Partner/GlobalFlowers/1.webp',
            'image/Partner/GlobalFlowers/2.webp',
            'image/Partner/GlobalFlowers/3.webp',
        ],
        views: 19000,
        revenue: 3500,
        clients: 125
    },
    // Ֆիթնես և առողջություն
    {
        category: 'Առողջություն և ֆիթնես',
        company: 'LIFE TIME PREMIUM CLUB',
        services: ['Ֆիթնես մարքեթինգ', 'Անդամակցության աճ', 'Առողջապահական ծրագրեր'],
        type: 'fitness',
        images: [
            'image/Partner/LifeTimePremiumClub/1.webp',
            'image/Partner/LifeTimePremiumClub/2.webp',
            'image/Partner/LifeTimePremiumClub/3.webp',
        ],
        views: 32000,
        revenue: 7200,
        clients: 220
    },
    // Երեխաների ժամանց
    {
        category: 'Ընտանիք և ժամանց',
        company: 'MINIS KIDS CAFE',
        services: ['Ընտանեկան ժամանցի մարքեթինգ', 'Երեխաների ծննդյան փաթեթներ', 'Ծնողական համայնքի կառուցում'],
        type: 'kids_entertainment',
        images: [
            'image/Partner/MinisKidsCafe/1.webp',
            'image/Partner/MinisKidsCafe/2.webp',
        ],
        views: 21000,
        revenue: 3800,
        clients: 145
    },
    // Երեխաների ապրանքներ
    {
        category: 'Ընտանիք և ժամանց',
        company: 'TUNTUNIK',
        services: ['Երեխաների բրենդի մարքեթինգ', 'Կրթական բովանդակություն', 'Ծնողների ներգրավում'],
        type: 'kids_products',
        images: [
            'image/Partner/Tuntunik/1.webp',
            'image/Partner/Tuntunik/2.webp',
        ],
        views: 17000,
        revenue: 2900,
        clients: 105
    },
    // Առողջապահություն - Մասնագետ բժիշկ
    {
        category: 'Առողջապահություն',
        company: 'DR. MIQAYELYAN',
        services: ['Բժշկական պրակտիկայի մարքեթինգ', 'Հիվանդների կրթություն', 'Մասնագիտական հեղինակության կառավարում'],
        type: 'medical_practice',
        images: [
            'image/Partner/DrMiqayelyan/1.webp'
        ],
        views: 8500,
        revenue: 4200,
        clients: 60
    },
    // Առողջապահություն - Կլինիկա
    {
        category: 'Առողջապահություն',
        company: 'LOREST CLINIC',
        services: ['Առողջապահական մարքեթինգ', 'Բժշկական ծառայությունների գովազդ', 'Հիվանդների ներգրավում'],
        type: 'medical_clinic',
        images: [
            'image/Partner/LorestClinic/1.webp'
        ],
        views: 12000,
        revenue: 5500,
        clients: 85
    },
    // Առողջապահություն - Մասնագիտացված կլինիկա
    {
        category: 'Առողջապահություն',
        company: 'PODOCLINIC',
        services: ['Մասնագիտացված բժշկական մարքեթինգ', 'Պոդիատրիկ ծառայությունների գովազդ', 'Առողջապահական կրթություն'],
        type: 'specialized_clinic',
        images: [
            'image/Partner/Podoclinic/1.webp',
            'image/Partner/Podoclinic/2.webp',
            'image/Partner/Podoclinic/3.webp',
        ],
        views: 9500,
        revenue: 4800,
        clients: 70
    },
    // Առողջապահություն - Ատամնաբուժություն
    {
        category: 'Առողջապահություն',
        company: 'Z & L DENTAL CLINIC',
        services: ['Ատամնաբուժական մարքեթինգ', 'Բերանի խոռոչի առողջության կրթություն', 'Հիվանդների խնամքի գովազդ'],
        type: 'dental',
        images: [
            'image/Partner/ZandLDentalClinic/1.webp',
            'image/Partner/ZandLDentalClinic/2.webp',
            'image/Partner/ZandLDentalClinic/3.webp',
        ],
        views: 15000,
        revenue: 6200,
        clients: 140
    },
    // Կահույք և տան դեկոր
    {
        category: 'Վաճառք և տուն',
        company: 'MARCO FURNITURE',
        services: ['Կահույքի մարքեթինգ', 'Տան դեկորի գովազդ', 'Ինտերիերային լուծումներ'],
        type: 'furniture',
        images: [
            'image/Partner/MarcoFurniture/1.webp',
            'image/Partner/MarcoFurniture/2.webp',
            'image/Partner/MarcoFurniture/3.webp',
        ],
        views: 24000,
        revenue: 5200,
        clients: 160
    },
    // HORECA - Խորհրդատվություն
    {
        category: 'Բիզնես ծառայություններ',
        company: 'MY HORECA CONSULTING',
        services: ['Բիզնես խորհրդատվության մարքեթինգ', 'ՀՈՐԵԿԱ ոլորտի փորձագիտություն', 'Մասնագիտական ծառայություններ'],
        type: 'consulting',
        images: [
            'image/Partner/MyHorecaConsulting/1.webp',
            'image/Partner/MyHorecaConsulting/2.webp',
            'image/Partner/MyHorecaConsulting/3.webp',
        ],
        views: 11000,
        revenue: 7800,
        clients: 55
    },
    // Արտադրություն - Պլաստիկ
    {
        category: 'Արտադրություն և արդյունաբերություն',
        company: 'NUSH PLAST',
        services: ['Արդյունաբերական մարքեթինգ', 'Բիզնեսից բիզնես հաճախորդների ներգրավում', 'Արտադրական լուծումներ'],
        type: 'manufacturing',
        images: [
            'image/Partner/NushPlast/1.webp',
            'image/Partner/NushPlast/2.webp',
        ],
        views: 8000,
        revenue: 6500,
        clients: 45
    },
    // HORECA - Միջոցառումների դահլիճ
    {
        category: 'ՀՈՐԵԿԱ',
        company: 'PALLADIUM HALL',
        services: ['Միջոցառումների դահլիճի մարքեթինգ', 'Հարսանիքների գովազդ', 'Կորպորատիվ միջոցառումներ'],
        type: 'event_venue',
        images: [
            'image/Partner/PalladiumHall/1.webp',
            'image/Partner/PalladiumHall/2.webp',
            'image/Partner/PalladiumHall/3.webp',
        ],
        views: 26000,
        revenue: 8200,
        clients: 190
    },
    // Սանիտարական և շինարարություն
    {
        category: 'Շինարարություն և կառուցապատում',
        company: 'PRIDE SANITAR',
        services: ['Շինարարական մարքեթինգ', 'Սանիտարական լուծումներ', 'Բիզնեսից բիզնես ծառայություններ'],
        type: 'construction',
        images: [
            'image/Partner/PrideSanitar/1.webp',
            'image/Partner/PrideSanitar/2.webp',
        ],
        views: 7500,
        revenue: 5800,
        clients: 40
    },
    // HORECA - Շքեղ հյուրանոց
    {
        category: 'ՀՈՐԵԿԱ',
        company: 'ROYAL YEREVAN',
        services: ['Շքեղ հյուրանոցային մարքեթինգ', 'Պրեմիում հյուրերի փորձառություն', 'Բարձրակարգ ծառայություններ'],
        type: 'luxury_hotel',
        images: [
            'image/Partner/RoyalYerevan/1.webp',
            'image/Partner/RoyalYerevan/2.webp',
            'image/Partner/RoyalYerevan/3.webp',
        ],
        views: 30000,
        revenue: 9500,
        clients: 180
    },
    // HORECA - Պաբ/Բար
    {
        category: 'ՀՈՐԵԿԱ',
        company: 'RUSH PUB',
        services: ['Գիշերային կյանքի մարքեթինգ', 'Միջոցառումների գովազդ', 'Սոցիալական ժամանց'],
        type: 'pub',
        images: [
            'image/Partner/RushPub/1.webp',
            'image/Partner/RushPub/2.webp',
        ],
        views: 27000,
        revenue: 4200,
        clients: 175
    },
    // HORECA - Հյուրատուն
    {
        category: 'ՀՈՐԵԿԱ',
        company: 'SOUVENIR GUEST HOUSE',
        services: ['Տուրիստական մարքեթինգ', 'Բնակեցման գովազդ', 'Հյուրերի փորձառություն'],
        type: 'guest_house',
        images: [
            'image/Partner/SouvenirGuestHouse/1.webp',
            'image/Partner/SouvenirGuestHouse/2.webp',
            'image/Partner/SouvenirGuestHouse/3.webp',
        ],
        views: 14000,
        revenue: 3400,
        clients: 95
    },
    // Տեխնոլոգիա և հեռահաղորդակցություն
    {
        category: 'Տեխնոլոգիա և IT',
        company: 'YAN NET',
        services: ['Տեխնոլոգիական ընկերության մարքեթինգ', 'Թվային լուծումներ', 'IT ծառայությունների գովազդ'],
        type: 'technology',
        images: [
            'image/Partner/yannet/1.webp',
            'image/Partner/yannet/2.webp',
        ],
        views: 16000,
        revenue: 5200,
        clients: 85
    }
];

let displayedItems = 4;
const itemsPerLoad = 4;
let currentImageIndices = {};

function createWorksShowcaseItem(item, index) {
    currentImageIndices[index] = 0;
    
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
            <div class="works-showcase-category">${item.category}</div>
            <div class="works-showcase-company">${item.company}</div>
            <div class="works-showcase-services">
                ${item.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
            </div>
        </div>
        <div class="works-showcase-results">
            <div class="result-item">
                <div class="result-number">${item.views || '25000'}</div>
                <div class="result-label">դիտում</div>
            </div>
            <div class="result-item">
                <div class="result-number">${item.revenue || '19.29$'}</div>
                <div class="result-label">գումար</div>
            </div>
            <div class="result-item">
                <div class="result-number">${item.clients || '6'}</div>
                <div class="result-label">հաճախորդ</div>
            </div>
        </div>
    `;
    
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
    const item = portfolioData[itemIndex];
    const gallery = document.getElementById(`gallery-${itemIndex}`);
    const counter = document.getElementById(`counter-${itemIndex}`);
    
    if (direction === 'next') {
        currentImageIndices[itemIndex] = (currentImageIndices[itemIndex] + 1) % item.images.length;
    } else {
        currentImageIndices[itemIndex] = currentImageIndices[itemIndex] === 0 
            ? item.images.length - 1 
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
}

function renderWorksShowcase(items = portfolioData.slice(0, displayedItems)) {
    const grid = document.getElementById('worksShowcaseGrid');
    grid.innerHTML = '';
    items.forEach((item, index) => {
        const element = createWorksShowcaseItem(item, index);
        element.style.animationDelay = `${index * 0.1}s`;
        grid.appendChild(element);
    });
    
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



// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderWorksShowcase();

    // Load more functionality
    const loadMoreBtn = document.getElementById('worksLoadMoreBtn');
    const collapseBtn = document.getElementById('worksCollapseBtn');
    
    loadMoreBtn.addEventListener('click', () => {
        displayedItems += itemsPerLoad;
        if (displayedItems >= portfolioData.length) {
            displayedItems = portfolioData.length;
            loadMoreBtn.style.display = 'none';
        }
        renderWorksShowcase();
        
        // Show collapse button when more than initial items are displayed
        if (displayedItems > 4) {
            collapseBtn.classList.remove('hidden');
        }
    });

    collapseBtn.addEventListener('click', () => {
        displayedItems = 4;
        renderWorksShowcase();
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
    if (portfolioData.length <= displayedItems) {
        loadMoreBtn.style.display = 'none';
    }
});