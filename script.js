// Inicializa&ccedil;&atilde;o do ScrollSpy do Bootstrap
const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar',
    offset: 80
});

const body = document.body;
const modeToggle = document.getElementById('modeToggle');
const modeIcon = document.getElementById('modeIcon');

function updateModeIcon() {
    if (!modeIcon) return;
    if (body.classList.contains('light-mode')) {
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
    } else {
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    }
}

(function initialiseTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
        body.classList.add('light-mode');
    }
    updateModeIcon();
})();

if (modeToggle) {
    modeToggle.addEventListener('click', function () {
        body.classList.toggle('light-mode');
        localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
        updateModeIcon();
    });
}

// Fechar o menu ao selecionar um item em dispositivos m&oacute;veis
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');
navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navbarCollapse).toggle();
        }
    });
});

// Intersection Observer para anima&ccedil;&otilde;es suaves
const animatedElements = document.querySelectorAll('[data-animate]');
if (animatedElements.length) {
    const observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-animate-delay');
                if (delay) {
                    element.style.setProperty('--delay', delay);
                }
                element.classList.add('is-visible');
                obs.unobserve(element);
            }
        });
    }, {
        threshold: 0.25,
        rootMargin: '0px 0px -80px 0px'
    });

    animatedElements.forEach(function (element) {
        observer.observe(element);
    });
}

// Efeito typewriter no hero
(function typewriter() {
    const target = document.getElementById('typed-text');
    if (!target) return;

    const phrases = [
        'Microservices financeiros orientados a eventos',
        'Integra&ccedil;&otilde;es Pix, boletos e payment requests',
        'Pipelines CI/CD com Azure DevOps, Docker e Helm',
        'Arquiteturas escal&aacute;veis com .NET 6/8/9'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const current = phrases[phraseIndex];
        const displayed = deleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
        target.innerHTML = displayed;

        if (!deleting && charIndex === current.length + 1) {
            deleting = true;
            setTimeout(tick, 2200);
            return;
        }

        if (deleting && charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        const delay = deleting ? 40 : 90;
        setTimeout(tick, delay);
    }

    tick();
})();

// Loader fade-out
window.addEventListener('load', function () {
    setTimeout(function () {
        const loader = document.getElementById('loader');
        if (!loader) return;
        loader.style.opacity = '0';
        setTimeout(function () {
            loader.style.display = 'none';
        }, 300);
    }, 500);
});

// Marquee duplicado para movimento infinito suave
(function duplicateMarquee() {
    const marquee = document.querySelector('.marquee-track');
    if (!marquee) return;
    marquee.innerHTML += marquee.innerHTML;
})();

