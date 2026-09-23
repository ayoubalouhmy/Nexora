# 🚀 Nexora Studio - Agence de Développement Web & Logiciel

Nexora est une application web moderne pour une agence d'ingénierie et de développement digital basée à **Casablanca, Maroc**. Elle présente les expertises, offres tarifaires, études de cas et processus de l'agence à travers une interface soignée, responsive et performante.

---

## 🌟 Points Clés & Fonctionnalités

- **Navigation Dynamique & Scroll Spy** : Header fixé en haut de page (`sticky top-0 z-50`) avec détection en temps réel de la section active et défilement fluide (*smooth scroll*).
- **Hero & Vitrine Interactive** : Fenêtre de démonstration interactive SaaS, métriques de performance et bandeau de technologies en défilement infini (*marquee*).
- **Grille de Services & Tarifs Transparents** : Cartes tarifaires équilibrées (Site Vitrine, E-Commerce marocain avec CMI, et Application Métier sur mesure).
- **Portfolio avec Filtres Interactifs** : Sélection de réalisations filtrables par catégorie (Site Vitrine, E-commerce, Application Web, Dashboard).
- **Méthodologie Agile en 4 Étapes** : Visualisation claire des 4 phases de projet reliées par des traits de liaison continus (Écoute & Cadrage ➔ Conception UI/UX ➔ Développement ➔ Livraison & Suivi).
- **Formulaire de Devis & Contact Direct** : Estimation de projet sous 24h avec validation, intégration WhatsApp Business et coordonnées directes.
- **Design Réactif & Fluide** : Optimisé pour tous les écrans (mobile, tablette et desktop) avec menu mobile dédié.

---

## 🛠️ Stack Technologique

| Domaine | Technologie |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Bundler & Outillage** | [Vite 8](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/) avec `@tailwindcss/vite` |
| **Typographie** | Literata (Titres) & Nunito Sans (Corps de texte) |
| **Iconographie** | [Google Material Symbols Outlined](https://fonts.google.com/icons) |

---

## 📁 Structure du Projet

```text
nexora/
├── index.html                   # Point d'entrée HTML et préchargement des polices Google
├── package.json                 # Dépendances et scripts du projet
├── vite.config.ts               # Configuration Vite & plugin Tailwind v4
└── src/
    ├── main.jsx                 # Point d'entrée React DOM
    ├── App.jsx                  # Composant racine
    ├── styles.css               # Configuration du thème Tailwind CSS v4 & animations
    ├── data/
    │   └── screensData.js       # Données du portfolio, tarifs et FAQ
    └── screens/
        └── NexoraScreen.jsx     # Écran principal et sections de Nexora Studio
```

---

## 🚀 Installation et Lancement

### Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- npm ou yarn

### 1. Cloner ou ouvrir le projet

```bash
cd nexora
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible localement à l'adresse suivante : **http://localhost:3000** (ou sur le port indiqué par Vite).

---

## 📦 Scripts Disponibles

- `npm run dev` : Lance le serveur de développement avec rechargement à chaud (HMR).
- `npm run build` : Compile le projet pour la production dans le dossier `dist/`.
- `npm run preview` : Prévisualise localement le bundle de production généré.

---

## 📄 Licence & Propriété

© 2026 **Nexora Studio**. Tous droits réservés. Casablanca, Maroc.
