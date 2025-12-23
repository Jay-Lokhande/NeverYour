// ============================================
// NEVER YOUR - Store Interactions
// Scroll-based product reveals
// ============================================

// Detect if device is touch-enabled
// Use existing isTouchDevice from script.js if available, otherwise detect
const isStoreTouchDevice = typeof isTouchDevice !== 'undefined' 
    ? isTouchDevice 
    : ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// Product Reveal on Scroll
const productReveals = document.querySelectorAll('.product-reveal');

// Make first product visible immediately
if (productReveals.length > 0) {
    productReveals[0].classList.add('active');
    productReveals[0].style.opacity = '1';
    productReveals[0].style.transform = 'translateY(0)';
}

// Set up Intersection Observer with better settings
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, revealOptions);

// Observe all product reveals
productReveals.forEach((product, index) => {
    // First product is already visible, but observe it anyway
    revealObserver.observe(product);
});

// Fallback: Check visibility on scroll as well
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    productReveals.forEach((product, index) => {
        const rect = product.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If product is in viewport, make it visible
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
            product.classList.add('active');
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
        }
    });
    
    lastScrollTop = scrollTop;
}, { passive: true });

// Smooth scroll for product CTAs
document.querySelectorAll('.product-cta').forEach(cta => {
    cta.addEventListener('click', function(e) {
        // Smooth scroll behavior is handled by CSS
        // Add any additional behavior here if needed
    });
});

// Parallax effect for store hero (desktop only)
if (!isStoreTouchDevice) {
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

// Initial check on page load - reveal products already in view
function checkVisibleProducts() {
    productReveals.forEach((product) => {
        const rect = product.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If product is in viewport, make it visible
        if (rect.top < windowHeight && rect.bottom > -100) {
            product.classList.add('active');
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
        }
    });
}

// Page load animation
window.addEventListener('load', () => {
    // Ensure hero content is visible
    const heroContent = document.querySelector('.store-hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.store-title-line').forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
                line.style.color = index === 0 ? 'var(--color-electric)' : 'var(--color-gold)';
            }, index * 200);
        });
        
        // Ensure manifesto is visible
        const manifesto = document.querySelector('.store-hero-manifesto');
        if (manifesto) {
            setTimeout(() => {
                manifesto.style.opacity = '1';
            }, 1200);
        }
        
        // Check for visible products after a short delay
        setTimeout(checkVisibleProducts, 300);
    }, 100);
});

// Also check on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Ensure hero text is visible immediately on mobile
    const heroContent = document.querySelector('.store-hero-content');
    const titleLines = document.querySelectorAll('.store-title-line');
    const manifesto = document.querySelector('.store-hero-manifesto');
    
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
    
    titleLines.forEach((line, index) => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
        line.style.color = index === 0 ? 'var(--color-electric)' : 'var(--color-gold)';
    });
    
    if (manifesto) {
        manifesto.style.opacity = '1';
    }
    
    setTimeout(checkVisibleProducts, 500);
});

