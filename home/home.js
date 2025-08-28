  window.addEventListener('load', function() {
            // Add staggered animation to particles
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = (index * 1.2) + 's';
            });

            // Add scroll-triggered animations for mobile
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.content-left, .image-container').forEach(el => {
                observer.observe(el);
            });
        });

        // Add typing effect to the title
        function typeWriter(element, text, speed = 100) {
            element.innerHTML = '';
            let i = 0;
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect after animations
        setTimeout(() => {
            const titleElement = document.querySelector('.main-title');
            const originalText = titleElement.innerHTML;
            titleElement.style.opacity = '1';
            // typeWriter(titleElement, originalText.replace(/<[^>]*>/g, ''), 150);
        }, 1500);