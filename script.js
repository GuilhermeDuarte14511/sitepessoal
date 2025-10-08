const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar',
    offset: 80
});

const body = document.body;
const modeToggle = document.getElementById('modeToggle');
const modeIcon = document.getElementById('modeIcon');
const languageButtons = document.querySelectorAll('.lang-btn');
const chatWidget = document.getElementById('chatWidget');
const chatToggle = chatWidget ? chatWidget.querySelector('[data-chat-toggle]') : null;
const chatPanel = chatWidget ? chatWidget.querySelector('[data-chat-panel]') : null;
const chatClose = chatWidget ? chatWidget.querySelector('[data-chat-close]') : null;
let currentLanguage = 'pt';
let typewriterTimeout;

const translations = {
    pt: {
        strings: {
            'meta.title': 'Guilherme Duarte - Portfolio .NET',
            'loader.label': 'Carregando...',
            'nav.home': 'Início',
            'nav.experience': 'Experiência',
            'nav.stack': 'Stack',
            'nav.projects': 'Projetos',
            'nav.contact': 'Contato',
            'nav.toggle': 'Alternar navegação',
            'language.selector': 'Selecione o idioma',
            'theme.toggle': 'Alternar tema',
            'hero.eyebrow': 'Desenvolvedor .NET Pleno',
            'hero.title': 'Guilherme Duarte',
            'hero.lead': 'Especialista em arquiteturas modernas com .NET 6/8/9, construindo APIs resilientes, microservices financeiros e experiências full stack escaláveis.',
            'hero.chip.clean': 'Clean Architecture',
            'hero.chip.ddd': 'DDD',
            'hero.chip.rabbit': 'RabbitMQ',
            'hero.chip.cloud': 'AWS &amp; Azure',
            'hero.chip.cicd': 'CI/CD',
            'hero.chip.xamarin': 'Xamarin',
            'hero.ctaPrimary': 'Vamos conversar',
            'hero.ctaSecondary': 'LinkedIn',
            'hero.metric.years': 'Anos construindo software',
            'hero.metric.transactions': 'Fluxos financeiros integrados',
            'hero.metric.deploys': 'Pipelines CI/CD entregues',
            'hero.highlight1.title': 'Microservices Financeiros',
            'hero.highlight1.body': 'Processos de Pix, boletos, payment requests e barramentos de limite com integrações de alto impacto.',
            'hero.highlight2.title': 'Cloud Native',
            'hero.highlight2.body': 'Orquestração em AWS S3/SQS/DynamoDB e Azure Service Bus com pipelines Azure DevOps, Docker, Helm e Kubernetes.',
            'about.eyebrow': 'Trajetória',
            'about.title': 'Sobre Mim',
            'about.description': 'Soluções ponta a ponta com foco em performance, segurança e integrações financeiras.',
            'about.profileTitle': 'Perfil',
            'about.profileText': '24 anos, bacharel em Ciência da Computação (UNINOVE) e desenvolvedor full stack orientado a resultados.',
            'about.paragraph1': 'Ao longo da minha jornada construí APIs RESTful, barramentos financeiros e plataformas completas usando C#, ASP.NET MVC/Web API e Entity Framework, seguindo Clean Architecture e DDD.',
            'about.paragraph2': 'Gosto de desafiar integrações entre sistemas, aplicando observabilidade, logs estruturados e governança para garantir escalabilidade, segurança e rastreabilidade de ponta a ponta.',
            'about.paragraph3': 'Domino ciclo completo: bancos SQL e NoSQL, front-end responsivo com HTML, CSS, JavaScript, além de experiências mobile com Xamarin e estratégias cloud-first.',
            'about.tag.integrations': 'Integrações bancárias',
            'about.tag.pix': 'Webhooks de Pix',
            'about.tag.logs': 'Logs estruturados',
            'about.tag.observability': 'Observabilidade',
            'about.tag.security': 'Segurança e compliance',
            'experience.eyebrow': 'Onde construo impacto',
            'experience.title': 'Experiência',
            'experience.description': 'Projetos de alta disponibilidade, mensageria e integrações financeiras ao longo dos últimos anos.',
            'experience.vertem.role': 'Vertem · Desenvolvedor Back End .NET Pleno',
            'experience.vertem.period': 'dez/2024 – atual · São Paulo (Híbrido)',
            'experience.vertem.summary': 'Atuação no barramento financeiro (SF Financial Services) e marketplace de recompensas, entregando microservices críticos de alta resiliência.',
            'experience.vertem.point1': 'Processamento de Pix, boletos e payment requests com regras complexas de limite e parcelamento.',
            'experience.vertem.point2': 'Integrações com mensagerias financeiras e parceiros utilizando RabbitMQ e eventos.',
            'experience.vertem.point3': 'Persistência híbrida em PostgreSQL e MongoDB com sincronização e audit logging.',
            'experience.vertem.point4': 'Clean Architecture, DDD, testes e pipelines CI/CD com monitoramento e logs estruturados.',
            'experience.granito.role': 'Granito Pagamentos · Desenvolvedor .NET Pleno',
            'experience.granito.period': 'ago/2024 – nov/2024 · São Paulo (Híbrido)',
            'experience.granito.summary': 'Desenvolvimento de APIs e produtos financeiros com .NET Framework e .NET 6+, focando em integrações e experiência do cliente.',
            'experience.granito.point1': 'Serviços escaláveis em C# integrados a SQL Server e MySQL.',
            'experience.granito.point2': 'Front-end responsivo para portais internos com HTML, CSS, JavaScript e Bootstrap.',
            'experience.granito.point3': 'Testes funcionais, governança e planejamento em ambientes de pagamentos.',
            'experience.jotatei.role': 'Jotatei Serviços de Informática · Desenvolvedor .NET Pleno',
            'experience.jotatei.period': 'jun/2024 – ago/2024 · Remoto',
            'experience.jotatei.summary': 'Entrega de aplicações web e mobile com .NET 6+, APIs escaláveis e hospedagem em cloud.',
            'experience.jotatei.point1': 'Arquitetura de APIs com armazenamento em Amazon S3 e integrações externas.',
            'experience.jotatei.point2': 'Desenvolvimento mobile com Xamarin integrando front e back end.',
            'experience.jotatei.point3': 'Modelagem de dados, documentação com Postman e monitoramento de integrações.',
            'stack.eyebrow': 'Tech Radar',
            'stack.title': 'Stack &amp; Especialidades',
            'stack.description': 'Ferramentas e tecnologias que coloco em produção para garantir entrega segura e escalável.',
            'stack.backend.title': 'Back End',
            'stack.backend.item1': '.NET Framework &amp; .NET 6/8/9',
            'stack.backend.item2': 'ASP.NET MVC / Web API',
            'stack.backend.item3': 'Entity Framework Core',
            'stack.backend.item4': 'Clean Architecture &amp; DDD',
            'stack.backend.item5': 'RabbitMQ &amp; mensageria',
            'stack.frontend.title': 'Front End',
            'stack.frontend.item1': 'HTML5, CSS3, JavaScript',
            'stack.frontend.item2': 'Bootstrap, jQuery, Ajax',
            'stack.frontend.item3': 'Design responsivo',
            'stack.frontend.item4': 'UI focada em performance',
            'stack.data.title': 'Dados',
            'stack.data.item1': 'SQL Server &amp; PostgreSQL',
            'stack.data.item2': 'MongoDB, AWS DynamoDB',
            'stack.data.item3': 'Modelagem e consultas otimizadas',
            'stack.devops.title': 'Cloud &amp; DevOps',
            'stack.devops.item1': 'AWS S3, SQS, DynamoDB',
            'stack.devops.item2': 'Azure Service Bus',
            'stack.devops.item3': 'Docker, Helm, Kubernetes',
            'stack.devops.item4': 'CI/CD com Azure DevOps',
            'stack.devops.item5': 'Observabilidade e logs',
            'stack.mobile.title': 'Mobile',
            'stack.mobile.item1': 'Xamarin (iOS &amp; Android)',
            'stack.mobile.item2': 'Autenticação e sincronização',
            'stack.mobile.item3': 'Consumo de APIs REST',
            'stack.finance.title': 'Integrações Financeiras',
            'stack.finance.item1': 'Pix, boletos, payment requests',
            'stack.finance.item2': 'Webhooks bancários',
            'stack.finance.item3': 'Plataformas de recompensas',
            'stack.finance.item4': 'Soluções antifraude',
            'projects.eyebrow': 'Casos Recentes',
            'projects.title': 'Projetos em Destaque',
            'projects.description': 'Produtos que traduzem minha experiência em integrações financeiras, escalabilidade e jornadas completas.',
            'project.vertem.label': 'Vertem',
            'project.vertem.title': 'Barramento Financeiro &amp; Marketplace',
            'project.vertem.body': 'Suite de microservices para processar Pix, boletos e recompensas, conectando plataformas de pagamento e mensagerias em tempo real.',
            'project.granito.label': 'Granito Pagamentos',
            'project.granito.title': 'Plataforma de APIs Financeiras',
            'project.granito.body': 'Evolução de APIs RESTful e portais internos para gestão de operações financeiras, garantindo segurança e performance.',
            'project.jotatei.label': 'Jotatei',
            'project.jotatei.title': 'Aplicativos Web &amp; Mobile',
            'project.jotatei.body': 'Ecossistema de aplicações com .NET 6+, Xamarin e armazenamento em AWS, promovendo integrações seguras e experiência mobile consistente.',
            'contact.eyebrow': 'Vamos construir algo',
            'contact.title': 'Contato',
            'contact.description': 'Aberto a novos desafios em back end, integrações financeiras e soluções full stack.',
            'contact.whatsapp.label': 'WhatsApp',
            'contact.email.label': 'E-mail',
            'contact.linkedin.label': 'LinkedIn',
            'footer.copy': '&copy; 2025 Guilherme Duarte. Construído com mindset .NET.'
        },
        typedPhrases: [
            'Microservices financeiros orientados a eventos',
            'Integrações Pix, boletos e payment requests',
            'Pipelines CI/CD com Azure DevOps, Docker e Helm',
            'Arquiteturas escaláveis com .NET 6/8/9'
        ]
    },
    en: {
        strings: {
            'meta.title': 'Guilherme Duarte - .NET Portfolio',
            'loader.label': 'Loading...',
            'nav.home': 'Home',
            'nav.experience': 'Experience',
            'nav.stack': 'Stack',
            'nav.projects': 'Projects',
            'nav.contact': 'Contact',
            'nav.toggle': 'Toggle navigation',
            'language.selector': 'Select language',
            'theme.toggle': 'Toggle theme',
            'hero.eyebrow': '.NET Full Stack Developer',
            'hero.title': 'Guilherme Duarte',
            'hero.lead': 'Specialist in modern .NET 6/8/9 architectures, building resilient APIs, financial microservices and scalable full stack experiences.',
            'hero.chip.clean': 'Clean Architecture',
            'hero.chip.ddd': 'DDD',
            'hero.chip.rabbit': 'RabbitMQ',
            'hero.chip.cloud': 'AWS &amp; Azure',
            'hero.chip.cicd': 'CI/CD',
            'hero.chip.xamarin': 'Xamarin',
            'hero.ctaPrimary': "Let's talk",
            'hero.ctaSecondary': 'LinkedIn',
            'hero.metric.years': 'Years building software',
            'hero.metric.transactions': 'Integrated payment flows',
            'hero.metric.deploys': 'CI/CD pipelines delivered',
            'hero.highlight1.title': 'Financial Microservices',
            'hero.highlight1.body': 'Pix, boleto and payment request flows with high-impact, event-driven integrations.',
            'hero.highlight2.title': 'Cloud Native',
            'hero.highlight2.body': 'AWS S3/SQS/DynamoDB and Azure Service Bus orchestration with Azure DevOps, Docker, Helm and Kubernetes.',
            'about.eyebrow': 'Journey',
            'about.title': 'About Me',
            'about.description': 'End-to-end solutions focused on performance, security and financial integrations.',
            'about.profileTitle': 'Profile',
            'about.profileText': '24 years old, Computer Science graduate (UNINOVE) and results-driven full stack developer.',
            'about.paragraph1': 'Throughout my journey I have built RESTful APIs, financial backbones and complete platforms using C#, ASP.NET MVC/Web API and Entity Framework, following Clean Architecture and DDD.',
            'about.paragraph2': 'I enjoy tackling system integrations, applying observability, structured logging and governance to guarantee scalability, security and traceability end-to-end.',
            'about.paragraph3': 'I own the full cycle: SQL and NoSQL databases, responsive front-end with HTML, CSS, JavaScript, plus mobile experiences with Xamarin and cloud-first strategies.',
            'about.tag.integrations': 'Banking integrations',
            'about.tag.pix': 'Pix webhooks',
            'about.tag.logs': 'Structured logging',
            'about.tag.observability': 'Observability',
            'about.tag.security': 'Security &amp; compliance',
            'experience.eyebrow': 'Where I drive impact',
            'experience.title': 'Experience',
            'experience.description': 'Recent work on high availability systems, messaging and financial integrations.',
            'experience.vertem.role': 'Vertem · Mid-level .NET Back End Developer',
            'experience.vertem.period': 'Dec/2024 – Present · São Paulo (Hybrid)',
            'experience.vertem.summary': 'Working on the financial backbone (SF Financial Services) and rewards marketplace, delivering resilient, business-critical microservices.',
            'experience.vertem.point1': 'Handling Pix, boleto and payment requests with complex limit and installment rules.',
            'experience.vertem.point2': 'Integrating financial messaging and partners using RabbitMQ and event-driven patterns.',
            'experience.vertem.point3': 'Hybrid persistence with PostgreSQL and MongoDB plus synchronization and audit logging.',
            'experience.vertem.point4': 'Clean Architecture, DDD, testing and CI/CD pipelines with monitoring and structured logs.',
            'experience.granito.role': 'Granito Pagamentos · Mid-level .NET Developer',
            'experience.granito.period': 'Aug/2024 – Nov/2024 · São Paulo (Hybrid)',
            'experience.granito.summary': 'Developed APIs and financial products with .NET Framework and .NET 6+, focusing on integrations and customer experience.',
            'experience.granito.point1': 'Built scalable C# services integrated with SQL Server and MySQL.',
            'experience.granito.point2': 'Delivered responsive internal portals with HTML, CSS, JavaScript and Bootstrap.',
            'experience.granito.point3': 'Implemented functional testing, governance and planning across payment journeys.',
            'experience.jotatei.role': 'Jotatei Serviços de Informática · Mid-level .NET Developer',
            'experience.jotatei.period': 'Jun/2024 – Aug/2024 · Remote',
            'experience.jotatei.summary': 'Delivered web and mobile apps with .NET 6+, scalable APIs and cloud hosting.',
            'experience.jotatei.point1': 'Architected APIs stored on Amazon S3 with integrations to external services.',
            'experience.jotatei.point2': 'Developed mobile experiences with Xamarin connecting front and back end.',
            'experience.jotatei.point3': 'Owned data modeling, Postman documentation and integration monitoring.',
            'stack.eyebrow': 'Tech Radar',
            'stack.title': 'Stack &amp; Expertise',
            'stack.description': 'Tooling I take to production to guarantee secure and scalable deliveries.',
            'stack.backend.title': 'Back End',
            'stack.backend.item1': '.NET Framework &amp; .NET 6/8/9',
            'stack.backend.item2': 'ASP.NET MVC / Web API',
            'stack.backend.item3': 'Entity Framework Core',
            'stack.backend.item4': 'Clean Architecture &amp; DDD',
            'stack.backend.item5': 'RabbitMQ &amp; messaging',
            'stack.frontend.title': 'Front End',
            'stack.frontend.item1': 'HTML5, CSS3, JavaScript',
            'stack.frontend.item2': 'Bootstrap, jQuery, Ajax',
            'stack.frontend.item3': 'Responsive design',
            'stack.frontend.item4': 'Performance-driven UI',
            'stack.data.title': 'Data',
            'stack.data.item1': 'SQL Server &amp; PostgreSQL',
            'stack.data.item2': 'MongoDB, AWS DynamoDB',
            'stack.data.item3': 'Modeling and optimized queries',
            'stack.devops.title': 'Cloud &amp; DevOps',
            'stack.devops.item1': 'AWS S3, SQS, DynamoDB',
            'stack.devops.item2': 'Azure Service Bus',
            'stack.devops.item3': 'Docker, Helm, Kubernetes',
            'stack.devops.item4': 'CI/CD with Azure DevOps',
            'stack.devops.item5': 'Observability and logging',
            'stack.mobile.title': 'Mobile',
            'stack.mobile.item1': 'Xamarin (iOS &amp; Android)',
            'stack.mobile.item2': 'Authentication and sync',
            'stack.mobile.item3': 'REST API consumption',
            'stack.finance.title': 'Financial Integrations',
            'stack.finance.item1': 'Pix, boletos, payment requests',
            'stack.finance.item2': 'Bank webhooks',
            'stack.finance.item3': 'Rewards platforms',
            'stack.finance.item4': 'Anti-fraud solutions',
            'projects.eyebrow': 'Recent Cases',
            'projects.title': 'Featured Projects',
            'projects.description': 'Products that showcase my experience with financial integrations, scalability and end-to-end delivery.',
            'project.vertem.label': 'Vertem',
            'project.vertem.title': 'Financial Hub &amp; Marketplace',
            'project.vertem.body': 'Microservice suite handling Pix, boleto and rewards, connecting payment platforms and messaging in real time.',
            'project.granito.label': 'Granito Pagamentos',
            'project.granito.title': 'Financial API Platform',
            'project.granito.body': 'Evolution of RESTful APIs and internal portals for payment operations with strong security and performance.',
            'project.jotatei.label': 'Jotatei',
            'project.jotatei.title': 'Web &amp; Mobile Apps',
            'project.jotatei.body': 'Ecosystem built with .NET 6+, Xamarin and AWS storage, enabling secure integrations and consistent mobile UX.',
            'contact.eyebrow': "Let's build something",
            'contact.title': 'Contact',
            'contact.description': 'Open to new challenges in back end, financial integrations and full stack solutions.',
            'contact.whatsapp.label': 'WhatsApp',
            'contact.email.label': 'Email',
            'contact.linkedin.label': 'LinkedIn',
            'footer.copy': '&copy; 2025 Guilherme Duarte. Built with a .NET mindset.'
        },
        typedPhrases: [
            'Event-driven financial microservices',
            'Pix, boleto and payment request integrations',
            'CI/CD pipelines with Azure DevOps, Docker and Helm',
            'Scalable architectures with .NET 6/8/9'
        ]
    }
};

Object.assign(translations.pt.strings, {
    'chat.toggle': 'Converse comigo',
    'chat.title': 'Converse comigo',
    'chat.description': 'Escolha o canal que preferir para iniciar uma conversa.',
    'chat.whatsapp': 'Chamar no WhatsApp',
    'chat.email': 'Enviar e-mail',
    'chat.close': 'Fechar conversa',
    'chat.toggleOpen': 'Abrir conversa',
    'chat.toggleClose': 'Fechar conversa'
});

Object.assign(translations.en.strings, {
    'chat.toggle': 'Chat with me',
    'chat.title': 'Chat with me',
    'chat.description': 'Pick the channel you prefer to start a conversation.',
    'chat.whatsapp': 'Message on WhatsApp',
    'chat.email': 'Send email',
    'chat.close': 'Close chat',
    'chat.toggleOpen': 'Open chat',
    'chat.toggleClose': 'Close chat'
});

function updateModeIcon() {
    if (!modeIcon) {
        return;
    }
    if (body.classList.contains('light-mode')) {
        modeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        modeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

function applyTranslations(lang) {
    const dictionary = translations[lang]?.strings;
    if (!dictionary) {
        return;
    }

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = dictionary[key];
        if (!value) {
            return;
        }

        const attrTarget = element.getAttribute('data-i18n-attr');
        if (attrTarget) {
            element.setAttribute(attrTarget, value);
        } else {
            element.innerHTML = value;
        }
    });

    if (dictionary['meta.title']) {
        document.title = dictionary['meta.title'];
    }
}

function updateLanguageButtons(lang) {
    languageButtons.forEach(button => {
        const isActive = button.dataset.lang === lang;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}

function updateChatToggleLabel() {
    if (!chatToggle || !chatWidget) {
        return;
    }

    const dictionary = translations[currentLanguage]?.strings || {};
    const isOpen = chatWidget.classList.contains('chat-widget--open');
    const openLabel = dictionary['chat.toggleOpen'] || chatToggle.dataset.openLabel || 'Abrir conversa';
    const closeLabel = dictionary['chat.toggleClose'] || chatToggle.dataset.closeLabel || 'Fechar conversa';

    chatToggle.dataset.openLabel = openLabel;
    chatToggle.dataset.closeLabel = closeLabel;
    chatToggle.setAttribute('aria-label', isOpen ? closeLabel : openLabel);
}

function startTypewriter() {
    const target = document.getElementById('typed-text');
    if (!target) {
        return;
    }

    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
        typewriterTimeout = null;
    }

    const phrases = translations[currentLanguage]?.typedPhrases || [];
    if (!phrases.length) {
        target.textContent = '';
        return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
        const phrase = phrases[phraseIndex];

        if (!deleting) {
            target.textContent = phrase.substring(0, charIndex);
            charIndex += 1;
            if (charIndex > phrase.length) {
                deleting = true;
                typewriterTimeout = setTimeout(tick, 2200);
                return;
            }
        } else {
            target.textContent = phrase.substring(0, Math.max(charIndex, 0));
            charIndex -= 1;
            if (charIndex < 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                charIndex = 0;
            }
        }

        const delay = deleting ? 40 : 90;
        typewriterTimeout = setTimeout(tick, delay);
    };

    tick();
}

function setLanguage(lang) {
    if (!translations[lang]) {
        lang = 'pt';
    }

    currentLanguage = lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    body.setAttribute('data-language', lang);
    localStorage.setItem('language', lang);

    applyTranslations(lang);
    updateLanguageButtons(lang);
    startTypewriter();
    updateChatToggleLabel();
}

(function initialiseTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
        body.classList.add('light-mode');
    }
    updateModeIcon();
})();

if (modeToggle) {
    modeToggle.addEventListener('click', () => {
        body.classList.add('transition');
        body.classList.toggle('light-mode');
        localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
        updateModeIcon();
        setTimeout(() => body.classList.remove('transition'), 300);
    });
}

languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        if (lang && lang !== currentLanguage) {
            setLanguage(lang);
        }
    });
});

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navbarCollapse).toggle();
        }
    });
});

if (chatWidget && chatToggle && chatPanel) {
    const setChatOpen = (open, { manageFocus = true } = {}) => {
        chatWidget.classList.toggle('chat-widget--open', open);
        chatPanel.hidden = !open;
        chatPanel.setAttribute('aria-hidden', open ? 'false' : 'true');
        chatToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        updateChatToggleLabel();
        if (open) {
            if (manageFocus && chatClose) {
                chatClose.focus();
            }
        } else {
            if (manageFocus) {
                chatToggle.focus();
            }
        }
    };

    chatToggle.addEventListener('click', () => {
        const isOpen = chatWidget.classList.contains('chat-widget--open');
        setChatOpen(!isOpen);
    });

    if (chatClose) {
        chatClose.addEventListener('click', () => setChatOpen(false));
    }

    chatPanel.querySelectorAll('.chat-action').forEach(action => {
        action.addEventListener('click', () => setChatOpen(false, { manageFocus: false }));
    });

    document.addEventListener('click', (event) => {
        if (!chatWidget.contains(event.target) && chatWidget.classList.contains('chat-widget--open')) {
            setChatOpen(false, { manageFocus: false });
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && chatWidget.classList.contains('chat-widget--open')) {
            setChatOpen(false);
        }
    });
}

const animatedElements = document.querySelectorAll('[data-animate]');
if (animatedElements.length) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
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

    animatedElements.forEach(element => observer.observe(element));
}

window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (!loader) {
            return;
        }
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }, 500);
});

(function duplicateMarquee() {
    const marquee = document.querySelector('.marquee-track');
    if (!marquee) {
        return;
    }
    marquee.innerHTML += marquee.innerHTML;
})();

setLanguage(localStorage.getItem('language') || 'pt');

body.classList.add('transition');
setTimeout(() => {
    body.classList.remove('transition');
}, 300);
