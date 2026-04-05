document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        dotX += (mouseX - dotX) * 0.8;
        dotY += (mouseY - dotY) * 0.8;

        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .btn, .feature-card, .step-card, .tech-badge, .nav-link').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const logoText = document.querySelector('.logo-text');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.scrollY;
        const heroSection = document.querySelector('#hero');
        const heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight - 100 : 0;
        
        navLinks.forEach(link => link.classList.remove('active'));
        
        if (scrollY < heroBottom) {
            logoText.classList.add('active');
        } else {
            logoText.classList.remove('active');
        }
        
        sections.forEach(section => {
            if (section.id === 'hero') return;
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

function copyCommand(btn, command) {
    navigator.clipboard.writeText(command).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
        </svg>`;
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>`;
        }, 2000);
    });
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.feature-card, .step-card, .tech-badge, .section-header, .install-steps .step-card, .tech-visual, .cta-content, .footer-brand, .footer-links').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
    revealObserver.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
    <style>
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

const heroLeft = document.querySelector('.hero-left');
const heroRight = document.querySelector('.hero-right');
if (heroLeft) {
    heroLeft.style.opacity = '0';
    heroLeft.style.transform = 'translateX(-30px)';
    heroLeft.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
        heroLeft.classList.add('revealed');
    }, 200);
}
if (heroRight) {
    heroRight.style.opacity = '0';
    heroRight.style.transform = 'translateX(30px)';
    heroRight.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
        heroRight.classList.add('revealed');
    }, 400);
}

// Parallax effect for background orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Smooth reveal for more elements
document.querySelectorAll('.hero-title, .hero-description, .hero-buttons, .badge, .tech-tags, .requirements, .cta-content h2, .cta-content p, .btn-cta').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

const techContent = document.querySelector('.tech-content');
if (techContent) {
    const techText = document.querySelector('.tech-text');
    const techVisual = document.querySelector('.tech-visual');
    if (techText) {
        techText.style.opacity = '0';
        techText.style.transform = 'translateX(-30px)';
        techText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(techText);
    }
    if (techVisual) {
        techVisual.style.opacity = '0';
        techVisual.style.transform = 'translateX(30px)';
        techVisual.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(techVisual);
    }
}

const ctaContent = document.querySelector('.cta-content');
if (ctaContent) {
    ctaContent.style.opacity = '0';
    ctaContent.style.transform = 'translateY(30px)';
    ctaContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(ctaContent);
}
