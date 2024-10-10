// Inicialização do Scrollspy
var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar',
    offset: 70
});

// Função para animações ao rolar a página
document.addEventListener('DOMContentLoaded', function() {
    let elements = document.querySelectorAll('.animate-up');
    let options = {
        threshold: 0.1
    };
    let observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if(entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    elements.forEach(function(element) {
        observer.observe(element);
    });

    // Animação das barras de loading
    let loadingBars = document.querySelectorAll('.loading-progress');
    loadingBars.forEach(function(bar) {
        let progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress-value', progress + '%');
        // Definir cor da barra de acordo com o progresso
        if (progress == 100) {
            bar.style.backgroundColor = 'var(--progress-complete)';
        } else {
            bar.style.backgroundColor = 'var(--progress-incomplete)';
        }
        bar.style.animation = 'loadProgress 2s forwards';
    });
});

// Fechar o menu ao clicar em um item (em dispositivos móveis)
var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
var navbarCollapse = document.querySelector('.navbar-collapse');
navLinks.forEach(function(l) {
    l.addEventListener('click', function() {
        if (navbarCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navbarCollapse).toggle();
        }
    });
});
