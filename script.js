const body = document.body;
const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.querySelector('[data-back-to-top]');
const typedText = document.getElementById('typedText');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenisInstance;

const specialties = [
    'serviços financeiros resilientes',
    'APIs RESTful com .NET 6+',
    'Pix, webhooks e validações',
    'RabbitMQ, SQS e cloud',
    'front-end responsivo e Xamarin'
];

function setTheme(mode) {
    const isLight = mode === 'light';
    body.classList.toggle('light-mode', isLight);
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');

    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        themeToggle.setAttribute('aria-label', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
        if (icon) {
            icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    }
}

function initialiseTheme() {
    const storedTheme = localStorage.getItem('portfolio-theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(storedTheme || (prefersLight ? 'light' : 'dark'));
}

function toggleMenu() {
    if (!nav || !menuToggle) {
        return;
    }

    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
}

function closeMenu() {
    if (!nav || !menuToggle) {
        return;
    }

    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
}

function initialiseNavigation() {
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (nav) {
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}

function initialiseReveal() {
    const revealItems = document.querySelectorAll('[data-reveal]');

    revealItems.forEach(item => {
        const delay = item.getAttribute('data-reveal-delay');
        if (delay) {
            item.style.setProperty('--reveal-delay', `${delay}ms`);
        }
    });

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach(item => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: '0px 0px -70px 0px'
    });

    revealItems.forEach(item => observer.observe(item));
}

function initialiseTypewriter() {
    if (!typedText) {
        return;
    }

    if (window.Typed && !prefersReducedMotion) {
        new Typed('#typedText', {
            strings: specialties,
            typeSpeed: 36,
            backSpeed: 20,
            backDelay: 1450,
            loop: true,
            smartBackspace: true,
            showCursor: true,
            cursorChar: '|'
        });
        return;
    }

    typedText.textContent = specialties[0];
}

function initialiseSmoothScroll() {
    if (!window.Lenis || prefersReducedMotion) {
        return;
    }

    lenisInstance = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.95
    });
    window.portfolioLenis = lenisInstance;

    lenisInstance.on('scroll', handleScrollState);

    const raf = (time) => {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
}

function initialiseCaseSlider() {
    const caseSwiper = document.querySelector('[data-case-swiper]');

    if (!caseSwiper || !window.Swiper) {
        return;
    }

    new Swiper(caseSwiper, {
        slidesPerView: 1,
        spaceBetween: 18,
        speed: 650,
        grabCursor: true,
        keyboard: {
            enabled: true
        },
        pagination: {
            el: '.case-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.case-next',
            prevEl: '.case-prev'
        },
        breakpoints: {
            900: {
                spaceBetween: 24
            }
        }
    });
}

function initialiseActiveSections() {
    const links = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];
    const sections = links
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (!links.length || !sections.length || !('IntersectionObserver' in window)) {
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            links.forEach(link => {
                link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0.01
    });

    sections.forEach(section => observer.observe(section));
}

function handleScrollState() {
    const scrolled = window.scrollY > 18;

    if (header) {
        header.classList.toggle('is-scrolled', scrolled);
    }

    if (backToTop) {
        backToTop.classList.toggle('is-visible', window.scrollY > 650);
    }

    updateTimelineProgress();
}

function updateTimelineProgress() {
    const timeline = document.querySelector('.timeline');

    if (!timeline) {
        return;
    }

    const rect = timeline.getBoundingClientRect();
    const total = Math.max(rect.height - window.innerHeight * 0.35, 1);
    const current = -rect.top + window.innerHeight * 0.42;
    const progress = Math.min(Math.max(current / total, 0), 1);

    timeline.style.setProperty('--timeline-progress', progress.toFixed(3));
}

function initialiseScrollActions() {
    window.addEventListener('scroll', handleScrollState, { passive: true });
    handleScrollState();

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            if (lenisInstance) {
                lenisInstance.scrollTo(0);
                return;
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initialiseMotionEnhancements() {
    if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (lenisInstance) {
        lenisInstance.on('scroll', ScrollTrigger.update);
    }

    gsap.fromTo('.hero-copy > *', {
        y: 24
    }, {
        y: 0,
        duration: 0.72,
        stagger: 0.08,
        ease: 'power3.out'
    });

    gsap.fromTo('.hero-visual', {
        y: 30,
        scale: 0.97
    }, {
        y: 0,
        scale: 1,
        duration: 0.82,
        delay: 0.12,
        ease: 'power3.out'
    });

    gsap.to('.mesh-one', {
        yPercent: 18,
        xPercent: 8,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    gsap.to('.mesh-two', {
        yPercent: -14,
        xPercent: -10,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    gsap.to('.portrait-shell', {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    gsap.utils.toArray('.stack-lane, .expertise-card, .project-panel, .help-card, .case-card').forEach((card) => {
        gsap.fromTo(card, {
            y: 24
        }, {
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                end: 'top 62%',
                scrub: 0.4
            }
        });
    });
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        setTheme(body.classList.contains('light-mode') ? 'dark' : 'light');
    });
}

initialiseTheme();
initialiseSmoothScroll();
initialiseNavigation();
initialiseReveal();
initialiseTypewriter();
initialiseCaseSlider();
initialiseActiveSections();
initialiseScrollActions();
initialiseMotionEnhancements();
