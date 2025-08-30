/* Start: Marketing Services Vertical Carousel */

document.addEventListener('DOMContentLoaded', () => {
   
const marketingServicesData = [
    { 
        number: '01', 
        title: 'Թվային մարքեթինգ', 
        features: ["SMM", "SMM դասընթացներ", "Տեքստ գրություն", "SEO", "Էլ․ փոստ", "Բրենդինգ"] 
    },
    { 
        number: '02', 
        title: 'Վեբ կայքերի պատրաստում', 
        features: ["React", "JavaScript", "PHP", "Next.js", "HTML/CSS", "WordPress"] 
    },
    { 
        number: '03', 
        title: 'Վեբ դիզայն', 
        features: ["UI/UX դիզայն", "Figma", "Adobe Creative Suite", "Հարմարվող դիզայն"] 
    },
    { 
        number: '04', 
        title: 'Կայքերի առաջխաղացում', 
        features: ["SEO օպտիմիզացիա", "Google Ads", "Վերլուծություն", "Բանալի բառեր"] 
    },
    { 
        number: '05', 
        title: 'Առցանց գնումների խանութ', 
        features: ["WooCommerce", "Shopify", "Վճարման համակարգեր", "Պահեստի կառավարում"] 
    },
    { 
        number: '06', 
        title: 'Բիզնեսի ավտոմատացում', 
        features: ["CRM համակարգեր", "Աշխատանքային գործընթացների ավտոմատացում", "API ինտեգրացիա", "Տվյալների բազաների կառավարում"] 
    },
    { 
        number: '07', 
        title: 'Մոբայլ հավելվածների ստեղծում', 
        features: ["React Native", "Flutter", "iOS/Android", "Ծանուցումներ"] 
    },
    { 
        number: '08', 
        title: 'Դոմեյն և հոսթինգ', 
        features: ["SSL վկայագրեր", "Օրական պահուստավորում", "24/7 մոնիտորինգ", "CDN ծառայություններ"] 
    },
    { 
        number: '09', 
        title: 'Տեխնիկական սպասարկում', 
        features: ["Կայքի սպասարկում", "Սխալների շտկում", "Թարմացումներ", "24/7 տեխնիկական աջակցություն"] 
    },
    { 
        number: '10', 
        title: 'Գրաֆիկական աշխատանքներ', 
        features: ["Այցեքարտերի դիզայն և ձևավորում", "Բուկլետների դիզայն և ձևավորում", "Ֆլայերների դիզայն և ձևավորում", "Լոգո դիզայն"] 
    },
    { 
        number: '11', 
        title: 'Վեբ դասընթացներ լիցենզիայով', 
        features: ["Մասնագիտական դասընթացներ", "Սերտիֆիկատ", "Կենտրոն գործունեության", "Առցանց ուսուցում"] 
    }
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