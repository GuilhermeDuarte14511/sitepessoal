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
let particlesInitialized = false;

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
            'hero.status': 'Disponível para liderar squads remotos',
            'hero.lead': 'Especialista em plataformas financeiras com .NET 8/9, orquestrando produtos cloud-native, integrações em tempo real e experiências que encantam o usuário final.',
            'hero.chip.aspire': '.NET Aspire',
            'hero.chip.event': 'Arquiteturas event-driven',
            'hero.chip.observability': 'Observabilidade financeira',
            'hero.chip.cloud': 'Azure &amp; AWS',
            'hero.chip.cicd': 'CI/CD &amp; DevSecOps',
            'hero.chip.ai': 'AI copilots',
            'hero.ctaPrimary': 'Vamos conversar',
            'hero.ctaSecondary': 'LinkedIn',
            'hero.ctaTertiary': 'Portfólio no GitHub',
            'hero.metric.years': 'Anos construindo software',
            'hero.metric.transactions': 'Integrações financeiras em produção',
            'hero.metric.deploys': 'Deploys automatizados por trimestre',
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
    'hero.status': 'Dispon\u00edvel para impulsionar squads globais .NET',
    'hero.lead': 'Crio plataformas financeiras cloud-native com .NET 8/9, observabilidade em tempo real e jornadas digitais centradas no cliente.',
    'hero.chip.aspire': '.NET Aspire',
    'hero.chip.event': 'Arquiteturas event-driven',
    'hero.chip.observability': 'Observabilidade financeira',
    'hero.chip.cloud': 'Azure & AWS',
    'hero.chip.cicd': 'CI/CD & DevSecOps',
    'hero.chip.ai': 'AI copilots',
    'hero.ctaTertiary': 'Portf\u00f3lio no GitHub',
    'hero.metric.transactions': 'Integra\u00e7\u00f5es financeiras em produ\u00e7\u00e3o',
    'hero.metric.deploys': 'Deploys automatizados por trimestre',
    'hero.highlight1.body': 'Fluxos Pix, boletos e payment requests com antifraude, concilia\u00e7\u00e3o e SLA agressivo.',
    'hero.highlight2.body': 'Orquestra\u00e7\u00e3o em AWS e Azure com observabilidade, feature flags e pipelines GitOps.',
    'hero.highlight3.title': 'DX & Cultura Dev',
    'hero.highlight3.body': 'Construo plataformas internas, cap\u00edtulos de engenharia e rituais que deixam squads animados.',
    'nav.home': 'In\u00edcio',
    'nav.experience': 'Experi\u00eancia',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    'nav.toggle': 'Alternar navega\u00e7\u00e3o',
    'language.selector': 'Selecione o idioma',
    'theme.toggle': 'Alternar tema',
    'focus.eyebrow': 'Agora',
    'focus.title': 'O que estou construindo em 2025',
    'focus.description': 'Projetos de alta energia com squads enxutos, cloud h\u00edbrida e jornadas digitais que exigem disponibilidade cont\u00ednua.',
    'focus.card1.title': 'Banking-as-a-Service',
    'focus.card1.body': 'Evoluo hubs financeiros com .NET 9, mensageria e compliance em m\u00faltiplas institui\u00e7\u00f5es.',
    'focus.card1.item1': 'Esteiras Pix com lat\u00eancia controlada',
    'focus.card1.item2': 'Observabilidade distribu\u00edda e FinOps',
    'focus.card1.item3': 'APIs seguras com governance-as-code',
    'focus.card2.title': 'Developer Acceleration',
    'focus.card2.body': 'Crio playbooks, pipelines e dashboards que deixam squads prontos para entregar em semanas.',
    'focus.card2.item1': 'GitHub Actions + Azure DevOps side by side',
    'focus.card2.item2': 'Feature flags e trunk based development',
    'focus.card2.item3': 'Onboarding gamificado para devs animados',
    'focus.card3.title': '.NET + AI Platforms',
    'focus.card3.body': 'Integro copilots, chatbots e automa\u00e7\u00f5es com Azure OpenAI, mantendo rastreabilidade.',
    'focus.card3.item1': 'Cognitive search com Azure AI Search',
    'focus.card3.item2': 'Eventos em tempo real com SignalR',
    'focus.card3.item3': 'Playbooks de Responsible AI',
    'focus.footer': 'I love leading energised, autonomous squads. Let\'s bring that idea to production!',
    'focus.cta': 'Agendar um discovery',
    'about.eyebrow': 'Trajet\u00f3ria',
    'about.title': 'Sobre Mim',
    'about.description': 'Carreira dedicada a experi\u00eancias financeiras modernas, entrega cont\u00ednua e squads motivados.',
    'about.profileTitle': 'Perfil',
    'about.profileText': 'Bacharel em Ci\u00eancia da Computa\u00e7\u00e3o, fan de produtos financeiros e lideran\u00e7a t\u00e9cnica colaborativa.',
    'about.paragraph1': 'Atuo com .NET desde a concep\u00e7\u00e3o at\u00e9 a opera\u00e7\u00e3o em produ\u00e7\u00e3o, conectando bancos, gateways e marketplaces com APIs resilientes e alto throughput.',
    'about.paragraph2': 'Trago mentalidade de observabilidade, antifraude e confiabilidade para squads multifuncionais, usando m\u00e9tricas acion\u00e1veis e feedback r\u00e1pido.',
    'about.paragraph3': 'Equilibro arquitetura, cultura dev e experi\u00eancia do usu\u00e1rio final, impulsionando resultados com cloud h\u00edbrida, automa\u00e7\u00e3o e documenta\u00e7\u00e3o viva.',
    'about.tag.integrations': 'Integra\u00e7\u00f5es Pix & Open Finance',
    'about.tag.pix': 'Mensageria e eventos',
    'about.tag.logs': 'Observabilidade estruturada',
    'about.tag.observability': 'Reliability Engineering',
    'about.tag.security': 'DevSecOps & compliance',
    'experience.description': 'Miss\u00f5es com microsservi\u00e7os financeiros, mensageria cr\u00edtica e SLAs agressivos.',
    'experience.vertem.role': 'Vertem - Desenvolvedor Back End .NET Pleno',
    'experience.vertem.period': 'dez/2024 - atual - S\u00e3o Paulo (h\u00edbrido)',
    'experience.vertem.summary': 'Squad respons\u00e1vel pelo hub financeiro SF Financial Services, escalando produtos Banking-as-a-Service e marketplace.',
    'experience.vertem.point1': 'Projetei APIs com .NET 8, PostgreSQL e MongoDB com replica\u00e7\u00e3o e auditoria em tempo real.',
    'experience.vertem.point2': 'Implementei esteiras Pix, boletos e rewards usando RabbitMQ, gRPC e outbox events.',
    'experience.vertem.point3': 'Introduzi observabilidade distribu\u00edda com OpenTelemetry, Grafana e alertas SLO-driven.',
    'experience.vertem.point4': 'Liderei guild de engenharia, padr\u00f5es Clean Architecture, testes automatizados e GitOps.',
    'experience.granito.role': 'Granito Pagamentos - Desenvolvedor .NET Pleno',
    'experience.granito.period': 'ago/2024 - nov/2024 - S\u00e3o Paulo (h\u00edbrido)',
    'experience.granito.summary': 'Transforma\u00e7\u00e3o do portf\u00f3lio de APIs e portais B2B para novos produtos financeiros.',
    'experience.granito.point1': 'Migrei servi\u00e7os .NET Framework para .NET 8 com Azure DevOps e deploy can\u00e1rio.',
    'experience.granito.point2': 'Constru\u00ed interfaces responsivas com Bootstrap 5, micro front-ends e design system interno.',
    'experience.granito.point3': 'Implementei testes end-to-end, logging estruturado e monitoramento de KPIs.',
    'experience.jotatei.role': 'Jotatei - Desenvolvedor .NET Pleno',
    'experience.jotatei.period': 'jun/2024 - ago/2024 - Remoto',
    'experience.jotatei.summary': 'Entrega de ecossistema web & mobile para varejo, com integra\u00e7\u00f5es em cloud e analytics.',
    'experience.jotatei.point1': 'Desenvolvi APIs .NET 6 com armazenamento em Amazon S3, SNS/SQS e autentica\u00e7\u00e3o JWT.',
    'experience.jotatei.point2': 'Escalei aplicativo Xamarin, sincroniza\u00e7\u00e3o offline e telemetry unificada.',
    'experience.jotatei.point3': 'Modelei dados h\u00edbridos (SQL + NoSQL) com documenta\u00e7\u00e3o viva e dashboards.',
    'chat.toggle': 'Converse comigo',
    'chat.title': 'Converse comigo',
    'chat.description': 'Escolha o canal que preferir para iniciar uma conversa.',
    'chat.whatsapp': 'Chamar no WhatsApp',
    'chat.email': 'Enviar e-mail',
    'chat.close': 'Fechar conversa',
    'chat.toggleOpen': 'Abrir conversa',
    'chat.toggleClose': 'Fechar conversa'
});

translations.pt.typedPhrases = [
    'Plataformas financeiras cloud-native com .NET 9 e Azure',
    'Observabilidade em tempo real com OpenTelemetry, Grafana e Application Insights',
    'Pipelines GitOps com Azure DevOps, GitHub Actions e Bicep',
    'DX e feature flags com LaunchDarkly, copilots e automa\u00e7\u00e3o'
];

Object.assign(translations.en.strings, {
    'hero.status': 'Ready to empower global .NET squads',
    'hero.lead': 'I build cloud-native financial platforms with .NET 8/9, real-time observability and customer-centric digital journeys.',
    'hero.chip.aspire': '.NET Aspire',
    'hero.chip.event': 'Event-driven architectures',
    'hero.chip.observability': 'Financial observability',
    'hero.chip.cloud': 'Azure & AWS',
    'hero.chip.cicd': 'CI/CD & DevSecOps',
    'hero.chip.ai': 'AI copilots',
    'hero.ctaTertiary': 'GitHub Portfolio',
    'hero.metric.transactions': 'Financial integrations running in production',
    'hero.metric.deploys': 'Automated deployments per quarter',
    'hero.highlight1.body': 'Pix, boleto and payment requests with antifraud, reconciliation and strict SLAs.',
    'hero.highlight2.body': 'AWS and Azure orchestration with observability, feature flags and GitOps pipelines.',
    'hero.highlight3.title': 'DX & Engineering Culture',
    'hero.highlight3.body': 'Builds internal platforms, engineering chapters and rituals that keep squads energised.',
    'focus.eyebrow': 'Now',
    'focus.title': 'What I am building in 2025',
    'focus.description': 'High-energy initiatives with lean squads, hybrid cloud and digital journeys that cannot go down.',
    'focus.card1.title': 'Banking-as-a-Service',
    'focus.card1.body': 'Evolving financial hubs with .NET 9, messaging and compliance across multiple banks.',
    'focus.card1.item1': 'Pix rails with controlled latency',
    'focus.card1.item2': 'Distributed observability and FinOps',
    'focus.card1.item3': 'Secure APIs with governance-as-code',
    'focus.card2.title': 'Developer Acceleration',
    'focus.card2.body': 'Building playbooks, pipelines and dashboards that get squads shipping in weeks.',
    'focus.card2.item1': 'GitHub Actions + Azure DevOps side by side',
    'focus.card2.item2': 'Feature flags and trunk based development',
    'focus.card2.item3': 'Gamified onboarding for excited devs',
    'focus.card3.title': '.NET + AI Platforms',
    'focus.card3.body': 'Integrating copilots, chatbots and automations with Azure OpenAI, keeping governance tight.',
    'focus.card3.item1': 'Cognitive search powered by Azure AI Search',
    'focus.card3.item2': 'Real-time events with SignalR',
    'focus.card3.item3': 'Responsible AI playbooks',
    'focus.footer': 'I love leading energised, autonomous squads. Let\'s bring that idea to production!',
    'focus.cta': 'Book a discovery call',
    'about.eyebrow': 'Trajectory',
    'about.title': 'About me',
    'about.description': 'Career focused on modern financial experiences, continuous delivery and energised squads.',
    'about.profileTitle': 'Profile',
    'about.profileText': 'Computer Science graduate, financial products enthusiast and collaborative tech leader.',
    'about.paragraph1': '.NET engineer end-to-end: from discovery to production, connecting banks, gateways and marketplaces through resilient, high-throughput APIs.',
    'about.paragraph2': 'I embed observability, antifraud and reliability mindset into cross-functional squads, using actionable metrics and fast feedback loops.',
    'about.paragraph3': 'Balance architecture, developer culture and customer experience with hybrid cloud, automation and living documentation.',
    'about.tag.integrations': 'Pix & Open Finance integrations',
    'about.tag.pix': 'Messaging & events',
    'about.tag.logs': 'Structured observability',
    'about.tag.observability': 'Reliability engineering',
    'about.tag.security': 'DevSecOps & compliance',
    'experience.description': 'Missions with financial microservices, critical messaging and demanding SLAs.',
    'experience.vertem.role': 'Vertem - Senior .NET Back End Engineer',
    'experience.vertem.period': 'Dec/2024 - current - S\u00e3o Paulo (hybrid)',
    'experience.vertem.summary': 'Squad behind the SF Financial Services hub, scaling Banking-as-a-Service and rewards products.',
    'experience.vertem.point1': 'Designed .NET 8 APIs with PostgreSQL and MongoDB replication plus real-time auditing.',
    'experience.vertem.point2': 'Implemented Pix, boleto and rewards pipelines using RabbitMQ, gRPC and outbox events.',
    'experience.vertem.point3': 'Introduced distributed observability with OpenTelemetry, Grafana and SLO-based alerting.',
    'experience.vertem.point4': 'Led the engineering guild, shaping Clean Architecture, automated testing and GitOps standards.',
    'experience.granito.role': 'Granito Pagamentos - .NET Engineer',
    'experience.granito.period': 'Aug/2024 - Nov/2024 - S\u00e3o Paulo (hybrid)',
    'experience.granito.summary': 'Modernised the B2B API and portal portfolio to launch new financial services.',
    'experience.granito.point1': 'Migrated .NET Framework services to .NET 8 with Azure DevOps and canary releases.',
    'experience.granito.point2': 'Built responsive UIs with Bootstrap 5, micro front-ends and an internal design system.',
    'experience.granito.point3': 'Implemented end-to-end testing, structured logging and KPI monitoring.',
    'experience.jotatei.role': 'Jotatei - .NET Engineer',
    'experience.jotatei.period': 'Jun/2024 - Aug/2024 - Remote',
    'experience.jotatei.summary': 'Delivered a web & mobile ecosystem for retail with cloud integrations and analytics.',
    'experience.jotatei.point1': 'Developed .NET 6 APIs using Amazon S3, SNS/SQS and JWT authentication.',
    'experience.jotatei.point2': 'Scaled a Xamarin app with offline sync and unified telemetry.',
    'experience.jotatei.point3': 'Modelled hybrid data (SQL + NoSQL) with living documentation and dashboards.',
    'chat.toggle': 'Chat with me',
    'chat.title': 'Chat with me',
    'chat.description': 'Pick the channel you prefer to start a conversation.',
    'chat.whatsapp': 'Message on WhatsApp',
    'chat.email': 'Send email',
    'chat.close': 'Close chat',
    'chat.toggleOpen': 'Open chat',
    'chat.toggleClose': 'Close chat'
});

translations.en.typedPhrases = [
    'Cloud-native financial platforms with .NET 9 and Azure',
    'Real-time observability with OpenTelemetry, Grafana and Application Insights',
    'GitOps pipelines powered by Azure DevOps, GitHub Actions and Bicep',
    'Developer experience and feature flags with LaunchDarkly and AI copilots'
];

function initialiseTiltElements() {
    if (typeof VanillaTilt === 'undefined') {
        return;
    }
    const tiltTargets = document.querySelectorAll('[data-tilt]');
    if (!tiltTargets.length) {
        return;
    }
    VanillaTilt.init(tiltTargets, {
        max: 8,
        speed: 500,
        glare: false,
        perspective: 1200,
        reset: true,
        easing: 'cubic-bezier(.03,.98,.52,.99)'
    });
}

function initialiseParticlesBackground() {
    if (particlesInitialized || typeof particlesJS === 'undefined') {
        return;
    }
    const container = document.getElementById('particles-js');
    if (!container) {
        return;
    }
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 900
                }
            },
            color: {
                value: ['#3b82f6', '#00d1ff', '#38bdf8']
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.45,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#3b82f6',
                opacity: 0.25,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.2,
                direction: 'none',
                out_mode: 'out'
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: false
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.35
                    }
                }
            }
        },
        retina_detect: true
    });
    particlesInitialized = true;
}

function highlightCodeBlocks() {
    if (typeof Prism === 'undefined') {
        return;
    }
    requestAnimationFrame(() => Prism.highlightAllUnder(document.body));
}

function initialiseEnhancements() {
    initialiseTiltElements();
    initialiseParticlesBackground();
    highlightCodeBlocks();
}

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
    highlightCodeBlocks();
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

initialiseEnhancements();
setLanguage(localStorage.getItem('language') || 'pt');

body.classList.add('transition');
setTimeout(() => {
    body.classList.remove('transition');
}, 300);
