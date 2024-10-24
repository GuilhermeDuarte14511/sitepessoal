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
        bar.style.backgroundColor = (progress == 100) ? 'var(--progress-complete)' : 'var(--progress-incomplete)';
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

// Dark/Light mode toggle com animação
document.getElementById('modeToggle').addEventListener('click', function () {
    document.body.classList.add('transition'); // Adiciona uma classe para transição suave
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('mode', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    updateModeIcon();
});

// Função para atualizar o ícone do modo
function updateModeIcon() {
    const modeIcon = document.getElementById('modeIcon');
    if (document.body.classList.contains('dark-mode')) {
        modeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        modeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Configuração inicial do modo com base na preferência do usuário
if (localStorage.getItem('mode') === 'dark') {
    document.body.classList.add('dark-mode');
    updateModeIcon();
}

// Loader logic para garantir que o loader funcione corretamente em todas as situações
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loader').style.display = 'none';
        }, 300); // Tempo para a transição
    }, 500); // Tempo mínimo de exibição do loader
});

// Animação e inicialização das habilidades com bolinhas
document.addEventListener('DOMContentLoaded', function() {
    let skills = document.querySelectorAll('.skill-level');
    skills.forEach(function(skill) {
        let dots = skill.querySelectorAll('.dot');
        let filledDots = skill.querySelectorAll('.dot.filled').length;
        for (let i = 0; i < filledDots; i++) {
            dots[i].classList.add('dot-filled-animation');
        }
    });
});

// Animação suave para a transição de tema
document.body.classList.add('transition');
setTimeout(function() {
    document.body.classList.remove('transition');
}, 300); // Remove a classe após a transição inicial

// Modal para exibição de imagens ampliadas
document.querySelectorAll('.image-link').forEach(function(element) {
    element.addEventListener('click', function(event) {
        event.preventDefault();
        const imageSrc = this.getAttribute('data-image');
        const imageTitle = this.getAttribute('data-title');

        document.getElementById('imageModalSrc').setAttribute('src', imageSrc);
        document.getElementById('imageModalLabel').innerText = imageTitle;
        
        const modal = new bootstrap.Modal(document.getElementById('imageModal'));
        modal.show();
    });
});
