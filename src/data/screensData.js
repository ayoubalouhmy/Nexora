// Data store for the multiple screens requested by the user



export const NEXORA_PRICING = [
  {
    step: '01 • ESSENTIEL',
    name: 'SITE VITRINE',
    desc: 'Une présence en ligne professionnelle pour présenter votre entreprise, vos services et votre activité.',
    price: '5000 - 25 000',
    currency: 'DH',
    features: [
      'Design personnalisé',
      '100% Responsive (Mobile & Web)',
      'Pages de présentation clés',
      'Formulaire de contact relié',
      'Optimisation SEO de base',
      'Livraison 2 à 3 semaines',
    ],
    featured: false,
    cta: "Découvrir l'offre",
  },
  {
    step: '03 • CROISSANCE',
    name: 'E-COMMERCE',
    desc: "Une boutique en ligne complète pour vendre vos produits au Maroc et à l'international 24h/24.",
    price: '20 000 - 75 000',
    currency: 'DH',
    features: [
      'Design UI/UX personnalisé',
      'Catalogue produits illimité',
      'Gestion stocks & variantes',
      "Tunnel d'achat fluide en 1 clic",
      'Paiement CMI / Stripe / Cash on Delivery',
      'Tableau de bord administrateur sécurisé',
      'Livraison 6 à 10 semaines',
    ],
    featured: true,
    badge: 'Plus Populaire',
    cta: "Découvrir l'offre",
  },
  {
    step: '04 • LOGICIEL SAAS',
    name: 'APPLICATION SUR MESURE',
    desc: 'Une solution métier développée selon vos processus internes (ERP, CRM, Plateforme multi-tenant).',
    price: '30 000 - 150 000',
    currency: 'DH',
    features: [
      'Design UI/UX personnalisé',
      'Authentification & gestion utilisateur',
      'Dashboard personnalisé',
      'Fonctionnalités métier sur mesure',
      '100% Responsive (Mobile & Web)',
      'Recherche & Filtres avancés',
      'Base de données relationnelle / NoSQL',
      'Intégration API & Webhooks tiers',
    ],
    featured: false,
    badge: 'Entreprise',
    cta: 'Parlons du projet',
  },
];

export const PORTFOLIO_ITEMS = [
  {
    id: 'flexstyle',
    title: 'FlexStyle Brand',
    category: 'E-commerce',
    tag: 'E-COMMERCE & FASHION',
    metric: '+1500 Clients',
    desc: 'Plateforme e-commerce streetwear haut de gamme avec navigation fluide, mise en avant de collections exclusives et checkout ultra-rapide.',
    image: "/assets/flexstyle.webp",
    tech: ['Next.js', 'Tailwind CSS', 'Stripe', 'Shopify API'],
    screenTarget: 'flexstyle',
  },
  {
    id: 'shopflow',
    title: 'ShopFlow Concept',
    category: 'E-commerce',
    tag: 'E-COMMERCE MINIMALISTE',
    metric: '15k+ Clients',
    desc: 'Boutique moderne pour une sélection curatée de pièces intemporelles avec badges éco-responsables, multi-devises et tunnel de commande optimisé.',
    image: "/assets/shopflow.webp",
    tech: ['React', 'Tailwind CSS', 'Dark Mode', 'CMI & Stripe'],
    screenTarget: 'shopflow',
  },
  {
    id: 'sakan',
    title: 'Sakan Platform',
    category: 'Application Web',
    tag: 'APPLICATION SAAS GESTION',
    metric: 'MAD & Multi-langues',
    desc: "Plateforme de gestion de charges et dépenses récurrentes avec suivi mensuel, calendrier d'échéances et tableau de bord financier en Dirhams marocains.",
    image: "/assets/sakan.webp",
    tech: ['Vue.js 3', 'NestJS', 'PostgreSQL', 'FR / EN / AR'],
    screenTarget: 'sakan',
  },
];


export const FAQ_ITEMS = [
  {
    q: 'Quels sont les délais de livraison pour un projet ?',
    a: 'Pour un site vitrine ou catalogue, prévoyez 2 à 3 semaines. Pour une plateforme e-commerce ou une application métier sur mesure, le délai varie de 4 à 8 semaines selon les fonctionnalités requises.',
    icon: 'schedule',
  },
  {
    q: 'Quelles sont les modalités de paiement acceptées au Maroc ?',
    a: "Le règlement s'effectue par étapes : 30% à la commande, 40% à la validation des maquettes UI/UX et du prototype, et 30% à la livraison finale. Nous acceptons les virements bancaires nationaux/internationaux et chèques d'entreprise.",
    icon: 'payments',
  },
  {
    q: 'Le code source et les créations nous appartiennent-ils ?',
    a: "Oui, à 100%. L'ensemble du code source (dépôts GitHub/GitLab), des maquettes Figma et des droits de propriété intellectuelle vous sont cédés sous contrat NDA et facture conforme.",
    icon: 'lock',
  },
  {
    q: 'Intégrez-vous les passerelles de paiement marocaines (CMI, Payzone) ?',
    a: "Absolument. Nous sommes experts dans l'intégration des solutions de paiement marocaines (CMI, Payzone, Fatourati) ainsi que des passerelles internationales (Stripe, PayPal).",
    icon: 'credit_card',
  },
  {
    q: 'Assurez-vous la maintenance et le support technique après livraison ?',
    a: "Oui, chaque projet bénéficie d'une garantie et d'un support technique de 3 mois offerts. Nous proposons également des forfaits de maintenance préventive, corrective et d'hébergement infogéré.",
    icon: 'support',
  },
  {
    q: 'Travaillez-vous avec des clients en dehors de Casablanca et Rabat ?',
    a: "Tout à fait. Nous collaborons avec des entreprises partout au Maroc (Tanger, Marrakech, Fès, Agadir) et à l'international via des outils collaboratifs (Slack, Notion, Google Meet) et des démonstrations hebdomadaires.",
    icon: 'public',
  },
];
