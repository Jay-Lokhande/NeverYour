// ============================================
// NEVER YOUR - Premium Interactions
// Smooth scrolling, parallax, cursor effects
// ============================================

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth cursor follower animation
function animateCursor() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .nav-link, .cta-button');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursorFollower.style.width = '12px';
        cursorFollower.style.height = '12px';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursorFollower.style.width = '8px';
        cursorFollower.style.height = '8px';
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Observe section titles
document.querySelectorAll('.section-title').forEach(el => {
    observer.observe(el);
});

// Observe meaning paradox
const meaningParadox = document.querySelector('.meaning-paradox');
if (meaningParadox) {
    observer.observe(meaningParadox);
}

// Observe symbol container
const symbolContainer = document.querySelector('.symbol-container');
if (symbolContainer) {
    observer.observe(symbolContainer);
}

// Observe CTA content
const ctaContent = document.querySelector('.cta-content');
if (ctaContent) {
    observer.observe(ctaContent);
}

// Manifesto Scroll-Based Storytelling
const manifestoSlides = document.querySelectorAll('.manifesto-slide');
let currentSlide = 0;
let isScrolling = false;

function updateManifestoSlide() {
    const manifestoSection = document.querySelector('.manifesto');
    if (!manifestoSection) return;
    
    const rect = manifestoSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if manifesto section is in view
    if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollProgress = Math.max(0, Math.min(1, 
            (windowHeight - rect.top) / (windowHeight + rect.height)
        ));
        
        const slideIndex = Math.floor(scrollProgress * manifestoSlides.length);
        const newSlide = Math.min(slideIndex, manifestoSlides.length - 1);
        
        if (newSlide !== currentSlide && !isScrolling) {
            isScrolling = true;
            manifestoSlides[currentSlide].classList.remove('active');
            currentSlide = newSlide;
            manifestoSlides[currentSlide].classList.add('active');
            
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    }
}

// Parallax Effect for Hero
function parallaxHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const scrolled = window.pageYOffset;
    const heroContent = hero.querySelector('.hero-content');
    const heroBackground = hero.querySelector('.hero-background');
    
    if (scrolled < window.innerHeight) {
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
}

// Navbar Background on Scroll
function updateNavbar() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.3)';
    }
}

// Scroll Event Handler
let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            parallaxHero();
            updateManifestoSlide();
            updateNavbar();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// Initialize Manifesto
if (manifestoSlides.length > 0) {
    manifestoSlides[0].classList.add('active');
}

// CTA Button Interaction
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Add your action here - could be a form, modal, or redirect
        console.log('Enter the Movement');
        // Example: window.location.href = '#contact';
    });
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.title-line').forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
});

// Smooth reveal for philosophy lines
const philosophyLines = document.querySelectorAll('.philosophy-line');
philosophyLines.forEach((line, index) => {
    line.style.transition = `opacity ${1 + index * 0.2}s ease-out, transform ${1 + index * 0.2}s ease-out`;
});

// Initialize symbol animation
const symbolSvg = document.querySelector('.symbol-svg');
if (symbolSvg) {
    observer.observe(symbolContainer);
    symbolContainer.addEventListener('mouseenter', () => {
        symbolSvg.style.animationDuration = '10s';
    });
    symbolContainer.addEventListener('mouseleave', () => {
        symbolSvg.style.animationDuration = '20s';
    });
}

// Add subtle parallax to meaning items
const meaningItems = document.querySelectorAll('.meaning-item');
window.addEventListener('scroll', () => {
    meaningItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const offset = (windowHeight - rect.top) * 0.1;
            item.style.transform = `translateX(${-30 + offset * 0.1}px)`;
        }
    });
}, { passive: true });

// Keyboard Navigation for Manifesto (optional enhancement)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const manifestoSection = document.querySelector('.manifesto');
        if (manifestoSection) {
            const rect = manifestoSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                e.preventDefault();
                if (e.key === 'ArrowDown' && currentSlide < manifestoSlides.length - 1) {
                    currentSlide++;
                } else if (e.key === 'ArrowUp' && currentSlide > 0) {
                    currentSlide--;
                }
                
                manifestoSlides.forEach(slide => slide.classList.remove('active'));
                manifestoSlides[currentSlide].classList.add('active');
            }
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to heavy scroll operations
const debouncedScroll = debounce(() => {
    updateManifestoSlide();
}, 10);

window.addEventListener('scroll', debouncedScroll, { passive: true });

