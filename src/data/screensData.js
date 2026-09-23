// Data store for the multiple screens requested by the user


export const DYNAMIC_IMAGES = {
  // Real images from user prompt & portfolio assets
  hotelLobby: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBULPDLRlAJIITjv5dEBN5fdWiN_HA8LdI32xbeBKDjZkADvORotg83f9rT-ezcuUxJRaSCe-_sSRGvtu-2z1jQ1JQRmBrYMcGDYc-QbOIjuKGLRevMbtk9wd9d6wFS3yuo0A3j9w_btLZ8VDzbr1V87X-IR5Z29EGprKd73f9pwTX1tm5tnqXf5U2F9MV2uKUHdpQsgPlGs2S4ti-276BIVsHBeVFgd7uoruWcx9ZRn3YOjTQtHcs9LiOCqkJAJHFFTw0',
  flexstyleModel: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2TaFIMUP-H202QD6LirsRMvi_gcTJmy05tLJRs9r213cAWlooJUn4Eiaz8wgO86Jn54ExKuw93_65M5C-jRESaF4xrzbh6J0i95YGGGUqqvfHyG9Pi44YsCTXXDRrSYLsLUs3Zvg_jj29BadxbmqCTjaTvUlBscm9jeSkegjwXgITEL3pyeEInTfOpi7yVz9Hi3v2K6CsXtAvE9WM1JeEYfKLLU1ugjMifTAwyvh9ooarZ0TPMoPHmQ',
  sakanPreview: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlNKTL2kE9bF54Ykq5CBD7jOo8ePAliqRbcpPkJyfjGWB0IZbzyUoSGQX_cyNjpQL9B0Xsh9oSQ3KHhCV0Rahr9eNw_slb6gin5XCJP4S1lFG_eopZl06jVGRJdWmou3dDTMpjazTzi5g3p0pEiuo9kMEr7A-qsWb10VixPh-vzLHsYVn6CWKbUqB3gO53FuEZz-Jv6O4mPSHFMNHg0cTCcJ9USoH5p20Mn4q_SD2OSt7WfIQGBR4ybw',
  shopflowStore: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJPzU6a3WdMK7tL5klzA6SDSEeC63Yy6oiL5qYA63vgA-uNy7nHHR5ETXuRV3AYFDaoet7O6pDqG-smITFOg3Ge-V8SaOmIXwYHO_xrbceNhU5jnLOZUh4aiHdtaU1L-Q4cPp2Ax4vB7iabKURvkSrRSjDWKhHVEvJI3TUrZWDrNgJo8bBCXPcrLlLSmoTSdqY-420liRD4Dtwjm2ptJlh8EhrGGcKyH130olpVR_3IT8TCxshlzjI6Q',
  atlasFinance: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRnjWkRV9MvPNfkLiV7SEJeOJMRsN7VVixWJBmN_OncTFScwl2BHR4d9_Reg2wxjPkGtIuDcD178uHaYPH7_Q83rBEK0A-rdc71PLWs5Ft1UHTOaoqAANHqi-RwgoomOiKlMcEuTihtIZDwfG12jGDIsrSTTOBCaSYTik4rVnqdzBvqFAwZm9Xt0_5Eel4LKLjuKJ4SWFajvzeDRHB-lQWlYpTfMRy1dAJXsT1x97YTxmgMMD2qNlrNg',
  analyticsHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwYVvPHHnUci-bKn-qABnSNIm48EwpJAB-gmAACHhuYg8EajrDXdtHMhHba4ADOiOZbkYSci9bEc8Epz6C04zhp58vdJYvQfskUVHVpZ7KD6uA5nnnJ92UFBufIc2uEII-cv8qlyFsS0MngKtJG3pzDqyWilWVLm_OLh0khgqoIjrzPnU5GPLmETASs22AwOVZfhhdBZtbUuO5ChyQh3dwcl1uOVFrma2e9nrghoI7rn9ktJIYD4Y6Gg',
  
  // Hotel rooms & luxury suites
  presidentialSuite: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  executiveOcean: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
  deluxeGarden: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
  
  // Fashion items
  hoodieBlack: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
  teeStreet: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
  jacketOversized: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80',
};

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
    image: DYNAMIC_IMAGES.flexstyleModel,
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
    image: DYNAMIC_IMAGES.shopflowStore,
    tech: ['React', 'Tailwind CSS', 'Dark Mode', 'CMI & Stripe'],
    screenTarget: 'shopflow',
  },
  {
    id: 'atlas-finance',
    title: 'Atlas Finance Partner',
    category: 'Site Vitrine',
    tag: 'SITE INSTITUTIONNEL B2B',
    metric: '+65 leads qualifiés/mois',
    desc: "Refonte d'image de marque et vitrine institutionnelle pour un cabinet de conseil en fusion-acquisition à Casablanca Marina, avec optimisation SEO locale.",
    image: DYNAMIC_IMAGES.atlasFinance,
    tech: ['Vue.js 3', 'Vite', 'Prismic CMS', 'SEO Schema'],
    screenTarget: 'nexora',
  },
  {
    id: 'sakan',
    title: 'Sakan Platform',
    category: 'Application Web',
    tag: 'APPLICATION SAAS GESTION',
    metric: 'MAD & Multi-langues',
    desc: "Plateforme de gestion de charges et dépenses récurrentes avec suivi mensuel, calendrier d'échéances et tableau de bord financier en Dirhams marocains.",
    image: DYNAMIC_IMAGES.sakanPreview,
    tech: ['Vue.js 3', 'NestJS', 'PostgreSQL', 'FR / EN / AR'],
    screenTarget: 'sakan',
  },
  {
    id: 'excellence',
    title: "L'Éxcellence Hôtel & Resort",
    category: 'Site Vitrine',
    tag: 'HÔTELLERIE DE LUXE',
    metric: '+40% Réservations Directes',
    desc: 'Plateforme vitrine et système de réservation haut de gamme pour palace et hôtellerie de prestige : expérience visuelle immersive, moteur de réservation et multilingue.',
    image: DYNAMIC_IMAGES.hotelLobby,
    tech: ['Next.js', 'Tailwind CSS', 'Booking Engine', 'FR / EN'],
    screenTarget: 'excellence',
  },
  {
    id: 'analytics',
    title: 'Analytics SaaS Cloud',
    category: 'Dashboard',
    tag: 'TABLEAU DE BORD SAAS',
    metric: 'Vitesse 99 Lighthouse',
    desc: 'Suite analytique interactive pour entreprises technologiques avec graphiques de transactions en temps réel, cohortes et métriques de rétention.',
    image: DYNAMIC_IMAGES.analyticsHero,
    tech: ['React', 'D3.js', 'PostgreSQL', 'Cloud Run'],
    screenTarget: 'analytics',
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
