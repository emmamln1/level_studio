/* Results Section JavaScript - Scroll-triggered animations and counters */

// Counter animation function
function resultsAnimateCounter(element, finalValue, duration = 2000, suffix = '') {
    const startValue = 0;
    const increment = finalValue / (duration / 16);
    let currentValue = startValue;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }
        
        let displayValue;
        if (finalValue < 10 && finalValue % 1 !== 0) {
            displayValue = currentValue.toFixed(2);
        } else {
            displayValue = Math.floor(currentValue);
        }
        
        element.textContent = displayValue + suffix;
    }, 16);
}

// Intersection Observer for Results Section
function initResultsAnimations() {
    const resultsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const resultsGrid = entry.target;
                const widgets = resultsGrid.querySelectorAll('.results-widget-container');
                
                // Animate widgets with staggered delays
                widgets.forEach((widget, index) => {
                    const delay = parseInt(widget.dataset.delay) || 0;
                    
                    setTimeout(() => {
                        widget.classList.add('results-animate-in');
                        
                        // Start counter animations after widget appears
                        setTimeout(() => {
                            const statNumbers = widget.querySelectorAll('.results-stat-number');
                            statNumbers.forEach((element, statIndex) => {
                                const target = parseFloat(element.dataset.target);
                                const suffix = element.dataset.suffix || '';
                                
                                setTimeout(() => {
                                    resultsAnimateCounter(element, target, 1500, suffix);
                                }, statIndex * 200);
                            });
                        }, 600);
                        
                    }, delay);
                });
                
                // Unobserve after animation starts
                resultsObserver.unobserve(resultsGrid);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    // Start observing the results grid
    const resultsGrid = document.getElementById('resultsShowcaseGrid');
    if (resultsGrid) {
        resultsObserver.observe(resultsGrid);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initResultsAnimations();
});

// Also initialize if script loads after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResultsAnimations);
} else {
    initResultsAnimations();
}
