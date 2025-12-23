// ============================================
// NEVER YOUR - Store Interactions
// Scroll-based product reveals
// ============================================

// Detect if device is touch-enabled
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Product Reveal on Scroll
const productReveals = document.querySelectorAll('.product-reveal');
const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Make first product visible immediately
if (productReveals.length > 0) {
    productReveals[0].classList.add('active');
    // Force visibility
    productReveals[0].style.opacity = '1';
    productReveals[0].style.transform = 'translateY(0)';
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, revealOptions);

// Observe all product reveals (observe all, first one will trigger immediately)
productReveals.forEach((product) => {
    revealObserver.observe(product);
});

// Smooth scroll for product CTAs
document.querySelectorAll('.product-cta').forEach(cta => {
    cta.addEventListener('click', function(e) {
        // Smooth scroll behavior is handled by CSS
        // Add any additional behavior here if needed
    });
});

// Parallax effect for store hero (desktop only)
if (!isTouchDevice) {
    function parallaxStoreHero() {
        const storeHero = document.querySelector('.store-hero');
        if (!storeHero) return;
        
        const scrolled = window.pageYOffset;
        const heroContent = storeHero.querySelector('.store-hero-content');
        
        if (scrolled < window.innerHeight) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
                heroContent.style.opacity = Math.max(0, 1 - (scrolled / window.innerHeight) * 0.5);
            }
        }
    }
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxStoreHero();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Page load animation
window.addEventListener('load', () => {
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.store-title-line').forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
});

