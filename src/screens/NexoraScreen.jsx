import React, { useState, useEffect } from 'react';
import {
  
  NEXORA_PRICING,
  PORTFOLIO_ITEMS,
  FAQ_ITEMS,
} from '../data/screensData.js';

function TransparentLogo({ src, alt, className, invert = false, style, width = 160, height = 40 }) {
  const [processedSrc, setProcessedSrc] = useState(src);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';

    const process = () => {
      try {
        const natW = img.naturalWidth || img.width;
        const natH = img.naturalHeight || img.height;
        if (!natW || !natH) return;

        // Downscale processing canvas for high speed (< 2ms vs 200ms)
        const scale = Math.min(1, 360 / natW);
        const w = Math.round(natW * scale);
        const h = Math.round(natH * scale);

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;

        // Sample corner background colors
        const bgR = (d[0] + d[(w - 1) * 4]) / 2;
        const bgG = (d[1] + d[(w - 1) * 4 + 1]) / 2;
        const bgB = (d[2] + d[(w - 1) * 4 + 2]) / 2;

        let minX = w;
        let minY = h;
        let maxX = 0;
        let maxY = 0;

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            const r = d[idx];
            const g = d[idx + 1];
            const b = d[idx + 2];

            const dist = Math.hypot(r - bgR, g - bgG, b - bgB);
            const isVeryLight = r > 210 && g > 210 && b > 210;
            const isLightNeutral =
              r > 175 && g > 175 && b > 175 && Math.abs(r - g) < 18 && Math.abs(r - b) < 18;

            if (dist < 40 || isVeryLight || isLightNeutral) {
              d[idx + 3] = 0;
            } else {
              if (dist < 60) {
                const alphaFactor = (dist - 40) / 20;
                d[idx + 3] = Math.round(d[idx + 3] * alphaFactor);
              }

              if (invert) {
                if (r < 100 && g < 120 && b < 110) {
                  d[idx] = 245;
                  d[idx + 1] = 247;
                  d[idx + 2] = 245;
                } else {
                  d[idx] = Math.min(255, r + 50);
                  d[idx + 1] = Math.min(255, g + 80);
                  d[idx + 2] = Math.min(255, b + 60);
                }
              }

              if (d[idx + 3] > 25) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);

        if (maxX > minX && maxY > minY) {
          const pad = 6;
          const cropX = Math.max(0, minX - pad);
          const cropY = Math.max(0, minY - pad);
          const cropW = Math.min(w - cropX, maxX - minX + pad * 2);
          const cropH = Math.min(h - cropY, maxY - minY + pad * 2);

          const cropCanvas = document.createElement('canvas');
          cropCanvas.width = cropW;
          cropCanvas.height = cropH;
          const cropCtx = cropCanvas.getContext('2d');
          if (cropCtx) {
            cropCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
            if (isMounted) setProcessedSrc(cropCanvas.toDataURL('image/png'));
            return;
          }
        }

        if (isMounted) setProcessedSrc(canvas.toDataURL('image/png'));
      } catch (err) {
        if (isMounted) setProcessedSrc(src);
      }
    };

    const schedule = () => {
      if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
        window.requestAnimationFrame(() => setTimeout(process, 0));
      } else {
        setTimeout(process, 0);
      }
    };

    img.onload = schedule;
    img.src = src;
    if (img.complete) {
      schedule();
    }

    return () => {
      isMounted = false;
    };
  }, [src, invert]);

  return (
    <img
      src={processedSrc}
      alt={alt}
      width={width}
      height={height}
      loading="eager"
      decoding="async"
      className={className}
      style={style}
    />
  );
}

export default function NexoraScreen({ onSelectScreen }) {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [isScrolled, setIsScrolled] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    solutionType: 'Boutique E-Commerce Complète CMI (dès 20 000 DH)',
    details: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const categories = ['Tous', 'Site Vitrine', 'E-commerce', 'Application Web', 'Dashboard'];

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'realisations', label: 'Réalisations' },
    { id: 'processus', label: 'Processus' },
    { id: 'a-propos', label: 'À propos' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const processSteps = [
    {
      num: '01',
      phase: 'Phase 1',
      title: 'Écoute & Cadrage',
      desc: 'Nous comprenons en détail votre activité, vos contraintes métiers, votre cible et définissons le cahier des charges fonctionnel.',
      deliverable: 'Cahier des charges & Devis',
      icon: 'assignment',
      highlight: false,
    },
    {
      num: '02',
      phase: 'Phase 2',
      title: 'Conception UI/UX',
      desc: "Nous concevons l'architecture d'information, les wireframes et les prototypes interactifs Figma haute fidélité pour validation.",
      deliverable: 'Maquettes Figma & Prototype',
      icon: 'brush',
      highlight: false,
    },
    {
      num: '03',
      phase: 'Phase 3',
      title: 'Développement',
      desc: 'Nous transformons la conception en code propre, sécurisé et scalable via des sprints hebdomadaires avec démos intermédiaires.',
      deliverable: 'Code source propre & Démos',
      icon: 'code',
      highlight: false,
    },
    {
      num: '04',
      phase: 'Phase Finale',
      title: 'Livraison & Suivi',
      desc: 'Déploiement sur serveur cloud sécurisé, formation de vos équipes à l’administration et garantie de maintenance continue.',
      deliverable: 'Mise en ligne & Support 3 mois',
      icon: 'verified',
      highlight: true,
    },
  ];

  // Scroll spy to track active section dynamically
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect bottom of page - activate the last item ('contact')
      if (window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      const scrollPosition = window.scrollY + 140; // sticky header offset
      const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const filteredProjects =
    activeCategory === 'Tous'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const techStack = [
    { name: 'HTML5', icon: 'html' },
    { name: 'CSS3', icon: 'css' },
    { name: 'Bootstrap', icon: 'view_quilt' },
    { name: 'Tailwind CSS', icon: 'palette' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'React', icon: 'code_blocks' },
    { name: 'PHP', icon: 'php' },
    { name: 'Laravel', icon: 'layers' },
    { name: 'Python', icon: 'terminal' },
    { name: 'Git & GitHub', icon: 'commit' },
    { name: 'Docker', icon: 'deployed_code' },
    { name: 'Node.js', icon: 'settings_ethernet' },
    { name: 'Express.js', icon: 'hub' },
    { name: 'MongoDB', icon: 'database' },
    { name: 'MySQL', icon: 'storage' },
  ];

  return (
    <div className="w-full bg-[#faf6f0] text-[#2e3230] min-h-screen" id="nexora-view">
      {/* 1. Header Navigation - FIXED AT THE VERY TOP (sticky top-0) WITH ACTIVE STATE */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200  ${isScrolled
            ? 'bg-[#faf6f0]/95 backdrop-blur-md shadow-sm border-b border-[#c4c8bc]/60'
            : 'bg-[#faf6f0]/90 backdrop-blur-md border-b border-[#c4c8bc]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#accueil"
            onClick={(e) => handleNavClick(e, 'accueil')}
            className="flex items-center group py-1"
          >
            <TransparentLogo
              src="/assets/nexora.webp"
              alt="Nexora - Agence de Développement"
              width={180}
              height={40}
              className="h-9 sm:h-10 w-auto object-contain group-hover:scale-102 transition-transform mix-blend-multiply"
            />
          </a>

          {/* Desktop Nav Links with Active Color */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'text-[#4a4e4a] hover:text-primary'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <span>Démarrer un projet</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-[#2e3230] hover:bg-black/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu mobile"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown with Active Color */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#c4c8bc]/60 bg-[#faf6f0] px-4 pt-3 pb-6 space-y-2 shadow-lg">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`block px-3 py-2 rounded-lg font-semibold transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-[#4a4e4a] hover:text-primary'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-semibold text-sm shadow-sm"
              >
                <span>Démarrer un projet</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="relative bg-grid-subtle pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#c4c8bc]/30" id="accueil">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#c4c8bc]/60 text-[#6b6358] mb-6 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse"></span>
                <span>Agence de développement informatique • Casablanca</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2e3230] leading-[1.18] tracking-tight">
                Nous transformons vos idées en{' '}
                <span className="text-primary italic font-serif">solutions digitales performantes.</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[#4a4e4a] leading-relaxed max-w-2xl">
                Nous concevons des sites web et applications sur mesure pour accompagner les entreprises dans leur croissance digitale, alliant excellence technique et rigueur d'ingénierie.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <span>Démarrer un projet</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                </a>
                <a
                  href="#realisations"
                  onClick={(e) => handleNavClick(e, 'realisations')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#f0ece4] text-[#2e3230] border border-[#c4c8bc] font-semibold text-sm shadow-xs transition-all hover:-translate-y-0.5"
                >
                  <span>Voir nos réalisations</span>
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-[#c4c8bc]/40 flex flex-wrap gap-6 text-xs sm:text-sm font-semibold text-[#4a4e4a]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  <span>Design UI/UX</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  <span>Développement Full-Stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  <span>Accompagnement Continu</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Mockup Window */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl border border-[#c4c8bc]/80 bg-white shadow-xl overflow-hidden relative">
                <div className="bg-[#222624] px-4 py-2.5 flex items-center justify-between gap-3 text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                  </div>
                  <div className="bg-neutral-800/90 rounded px-3 py-1 flex items-center gap-1.5 text-[11px] font-mono text-neutral-300">
                    <span className="material-symbols-outlined text-[13px] text-neutral-400">lock</span>
                    <span>app.atlaslogix.ma/dashboard</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-neutral-400">
                    notifications
                  </span>
                </div>
                <div className="p-0 overflow-hidden bg-neutral-100 aspect-video">
                  <img
                    src="/assets/nexora.webp"
                    alt="Solutions Digitales & Dashboard SaaS"
                    width="640"
                    height="360"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      if (PORTFOLIO_ITEMS[0]?.image) {
                        e.currentTarget.src = PORTFOLIO_ITEMS[0].image;
                      }
                    }}
                  />
                </div>
              </div>

              {/* Satellite Badges */}
              <div className="hidden sm:flex absolute -top-4 -left-6 bg-white/95 backdrop-blur-sm border border-[#c4c8bc]/80 rounded-xl p-3 shadow-lg items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-base">
                  99
                </div>
                <div>
                  <div className="font-bold text-xs text-[#2e3230]">Performance</div>
                  <div className="text-[11px] text-[#6b6358]">Architecture performante</div>
                </div>
              </div>

              <div className="hidden sm:flex absolute -bottom-4 -right-6 bg-white/95 backdrop-blur-sm border border-[#c4c8bc]/80 rounded-xl p-3 shadow-lg items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f0e8db] text-[#705c30] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <div>
                  <div className="font-bold text-xs text-[#2e3230]">+45% de conversion</div>
                  <div className="text-[11px] text-[#6b6358]">UX orientée résultats</div>
                </div>
              </div>
            </div>
          </div>

          {/* Infinite Tech Marquee */}
          <div className="mt-16 pt-8 border-t border-[#c4c8bc]/30 overflow-hidden">
            <div className="flex justify-between items-center mb-3 text-xs font-bold text-[#6b6358]">
              <span>• TECHNOLOGIES & ÉCOSYSTÈME MAÎTRISÉS</span>
              <span>Stack Moderne & Évolutive</span>
            </div>
            <div className="relative w-full overflow-hidden py-2">
              <div className="animate-marquee gap-3">
                {techStack.concat(techStack).map((tech, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#c4c8bc]/60 shadow-xs text-xs font-semibold text-[#2e3230] whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">{tech.icon}</span>
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services & Tarifs Section */}
      <section className="py-20 bg-[#f5f1ea] border-b border-[#c4c8bc]/30" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f0e8db] text-[#705c30] mb-3">
              <span className="material-symbols-outlined text-[16px]">sell</span>
              <span>Tarifs Transparents & Forfaits</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2e3230]">
              Des solutions digitales adaptées à vos besoins
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4a4e4a]">
              Du site vitrine à l'application métier sur mesure, nous développons des solutions calibrées pour maximiser votre retour sur investissement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {NEXORA_PRICING.map((plan, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-7 sm:p-8 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between relative h-full ${
                  plan.featured
                    ? 'border-primary ring-2 ring-primary shadow-lg lg:-translate-y-2'
                    : 'border-[#c4c8bc]/70 shadow-xs'
                } ${idx === 2 ? 'md:max-lg:col-span-2 md:max-lg:max-w-md md:max-lg:mx-auto md:max-lg:w-full' : ''}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider shadow-sm whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                <div className="flex-1 flex flex-col">
                  <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
                    {plan.step}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#2e3230] mb-2">{plan.name}</h3>
                  <p className="text-xs text-[#6b6358] leading-relaxed mb-6">{plan.desc}</p>

                  <div className="bg-[#faf6f0] rounded-xl p-4 mb-6 border border-[#c4c8bc]/40">
                    <span className="text-[11px] text-[#6b6358] block mb-1 font-medium">À partir de</span>
                    <div className="flex items-baseline gap-1 text-[#2e3230]">
                      <span className="font-serif text-3xl font-extrabold text-primary">{plan.price}</span>
                      <span className="text-xs font-bold text-[#6b6358]">{plan.currency}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 text-xs text-[#4a4e4a] flex-1">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#c4c8bc]/30 mt-auto">
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, 'contact')}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-xs transition-all ${
                      plan.featured
                        ? 'bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                        : 'bg-[#faf6f0] hover:bg-primary hover:text-white text-[#2e3230] border border-[#c4c8bc] hover:border-primary'
                    }`}
                  >
                    <span>{plan.cta}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Réalisations / Case Studies Grid */}
      <section className="py-20 border-b border-[#c4c8bc]/30" id="realisations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f0e8db] text-[#705c30] mb-3">
                <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
                <span>Études de Cas & Déploiements</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2e3230]">
                Nos réalisations
              </h2>
              <p className="mt-2 text-sm text-[#4a4e4a] max-w-xl">
                Chaque projet est conçu pour créer un avantage compétitif mesurable pour nos clients au Maroc et à l'export.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white border border-[#c4c8bc] text-[#6b6358] hover:border-primary'
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#c4c8bc]/70 shadow-xs hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col group"
              >
                <div className="relative h-52 overflow-hidden bg-neutral-100">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    width="400"
                    height="208"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-[11px] font-bold text-[#2e3230] shadow-xs">
                    {proj.tag}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-serif text-lg font-bold text-[#2e3230] group-hover:text-primary transition-colors">
                        {proj.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                        {proj.metric}
                      </span>
                    </div>
                    <p className="text-xs text-[#4a4e4a] leading-relaxed mb-4">{proj.desc}</p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tech.map((t, tidx) => (
                        <span key={tidx} className="px-2.5 py-0.5 rounded-md bg-[#faf6f0] text-[11px] font-semibold text-[#6b6358]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      onClick={(e) => handleNavClick(e, 'contact')}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#faf6f0] hover:bg-primary hover:text-white border border-[#c4c8bc]/80 text-xs font-semibold text-[#2e3230] transition-colors"
                    >
                      <span>Consulter ce projet</span>
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Processus Section */}
      <section className="py-20 bg-[#f5f1ea] border-b border-[#c4c8bc]/30" id="processus">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f0e8db] text-[#705c30] mb-3">
              <span className="material-symbols-outlined text-[16px]">route</span>
              <span>Méthodologie Agile</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2e3230]">
              Un processus simple et transparent
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4a4e4a]">
              De la première prise de contact à la mise en production, nous avançons par étapes claires sans surprise de calendrier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col">
                <div
                  className={`bg-white rounded-2xl p-6 sm:p-7 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full relative z-10 ${
                    step.highlight
                      ? 'border-primary/60 ring-1 ring-primary/20'
                      : 'border-[#c4c8bc]/70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`font-serif text-3xl font-black ${step.highlight ? 'text-[#705c30]' : 'text-primary'}`}>
                        {step.num}
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        step.highlight
                          ? 'bg-[#f0e8db] text-[#705c30]'
                          : 'bg-[#f0ece4] text-[#6b6358]'
                      }`}>
                        {step.phase}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#2e3230] mb-2">{step.title}</h3>
                    <p className="text-xs text-[#4a4e4a] leading-relaxed mb-5">{step.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-[#c4c8bc]/30 flex items-center gap-2 text-xs font-semibold text-primary mt-auto">
                    <span className="material-symbols-outlined text-[16px]">{step.icon}</span>
                    <span>{step.deliverable}</span>
                  </div>
                </div>

                {/* Trait de liaison horizontal sur grand écran */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-10 -right-6 w-6 h-[2px] bg-primary/60 z-20 pointer-events-none"></div>
                )}

                {/* Trait de liaison vertical sur mobile */}
                {idx < 3 && (
                  <div className="sm:hidden flex justify-center py-2">
                    <div className="w-[2px] h-6 bg-primary/60"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. À Propos & Métriques Section */}
      <section className="py-20 border-b border-[#c4c8bc]/30" id="a-propos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f0e8db] text-[#705c30] mb-3">
                <span className="material-symbols-outlined text-[16px]">groups</span>
                <span>Notre Philosophie d'Atelier</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2e3230] leading-tight mb-4">
                Une équipe d'ingénieurs passionnés orientée résultats concrets
              </h2>
              <p className="text-base text-[#4a4e4a] mb-4">
                Basé entre <strong>Casablanca</strong>, Nexora réunit des développeurs seniors et designers produit engagés pour l'excellence digitale au Maroc.
              </p>
              <p className="text-sm text-[#4a4e4a] leading-relaxed mb-6">
                Nous refusons les usines à sites sans âme et les templates préfabriqués qui alourdissent le web. Nous bâtissons chaque interface comme une pièce d'ingénierie durable : un code audité, une expérience utilisateur intuitive et un hébergement ultra-sécurisé.
              </p>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#f0ece4] text-[#2e3230] border border-[#c4c8bc] font-semibold text-sm shadow-xs transition-all"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">forum</span>
                <span>Discuter de votre projet avec un ingénieur</span>
              </a>
            </div>

            {/* Right Metrics */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-[#c4c8bc]/70 shadow-xs">
                <div className="font-serif text-3xl sm:text-4xl font-black text-primary mb-1">+20</div>
                <div className="font-bold text-sm text-[#2e3230] mb-1">Projets réalisés</div>
                <p className="text-xs text-[#6b6358] leading-relaxed">
                  Livrés avec succès pour des PME, startups ambitieuses et grands comptes marocains.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#c4c8bc]/70 shadow-xs">
                <div className="font-serif text-3xl sm:text-4xl font-black text-[#705c30] mb-1">100%</div>
                <div className="font-bold text-sm text-[#2e3230] mb-1">Sur mesure</div>
                <p className="text-xs text-[#6b6358] leading-relaxed">
                  Architecture logicielle propre, aucun CMS bloquant ni template générique ralenti.
                </p>
              </div>

              <div className="sm:col-span-2 bg-white rounded-2xl p-6 border border-[#c4c8bc]/70 shadow-xs flex items-center justify-between gap-4">
                <div>
                  <div className="font-serif text-lg font-bold text-[#2e3230]">
                    Accompagnement de A à Z
                  </div>
                  <p className="text-xs text-[#6b6358] mt-1 max-w-md">
                    Du cadrage initial au support après-vente, formation aux back-offices et évolutions continues sous garantie.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px]">handshake</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-20 border-b border-[#c4c8bc]/30" id="faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f0e8db] text-[#705c30] mb-3">
              <span className="material-symbols-outlined text-[16px]">quiz</span>
              <span>Questions Fréquentes</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2e3230]">
              Foire Aux Questions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4a4e4a]">
              Tout ce que vous devez savoir sur nos services, délais, tarifs et processus de développement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#c4c8bc]/70 shadow-xs hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2 font-bold text-sm sm:text-base text-[#2e3230]">
                  <span>{item.q}</span>
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                    {item.icon}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4a4e4a] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact & Estimation de budget */}
      <section className="py-20 bg-[#f5f1ea] border-b border-[#c4c8bc]/30" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Info */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f0e8db] text-[#705c30] mb-3">
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Démarrage Immédiat</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2e3230] mb-3">
                  Parlons de votre projet
                </h2>
                <p className="text-sm text-[#4a4e4a] leading-relaxed mb-8">
                  Vous avez une idée, un besoin ou un projet à digitaliser ? Échangeons ensemble pour obtenir une estimation précise et sans engagement sous 24h.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#c4c8bc]/70 flex items-center justify-center text-primary shadow-xs">
                      <span className="material-symbols-outlined text-[20px]">location_on</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2e3230]">Localisation</div>
                      <div className="text-xs text-[#6b6358]">Casablanca, TitMellil</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#c4c8bc]/70 flex items-center justify-center text-primary shadow-xs">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2e3230]">Email professionnel</div>
                      <a href="mailto:nexora@gmail.com" className="text-xs text-primary font-mono font-medium">
                        nexora@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#c4c8bc]/70 flex items-center justify-center text-primary shadow-xs">
                      <span className="material-symbols-outlined text-[20px]">call</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2e3230]">Téléphone direct</div>
                      <div className="text-xs text-[#6b6358] font-mono">+212 7 80 65 15 08</div>
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                        <span>WhatsApp Business disponible</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-white border border-[#c4c8bc]/70 shadow-xs flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">verified_user</span>
                <span className="text-xs text-[#4a4e4a] font-medium">
                  Contrat d'engagement légal marocain, confidentialité stricte (NDA) & code source garanti.
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#c4c8bc]/80 shadow-md">
                {formSubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-[32px]">check_circle</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#2e3230] mb-2">
                      Demande transmise avec succès !
                    </h3>
                    <p className="text-sm text-[#4a4e4a] max-w-md mx-auto mb-6">
                      Merci pour votre message. Un ingénieur de l'équipe Nexora prendra contact avec vous sous 24h avec un devis technique chiffré.
                    </p>
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded-xl bg-[#faf6f0] border border-[#c4c8bc] text-xs font-semibold text-[#2e3230] hover:bg-[#f0ece4]"
                      onClick={() => setFormSubmitted(false)}
                    >
                      Envoyer une autre demande
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="form-name" className="block text-xs font-bold text-[#2e3230] mb-1.5">Nom complet *</label>
                      <input
                        id="form-name"
                        type="text"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#c4c8bc]/80 bg-[#faf6f0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        placeholder="Ex: Mehdi Benjelloun"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="form-email" className="block text-xs font-bold text-[#2e3230] mb-1.5">Email professionnel *</label>
                        <input
                          id="form-email"
                          type="email"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#c4c8bc]/80 bg-[#faf6f0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          placeholder="mehdi@entreprise.ma"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="form-phone" className="block text-xs font-bold text-[#2e3230] mb-1.5">Téléphone marocain (+212) *</label>
                        <input
                          id="form-phone"
                          type="tel"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#c4c8bc]/80 bg-[#faf6f0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          placeholder="+212 6 XX XX XX XX"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="form-solution" className="block text-xs font-bold text-[#2e3230] mb-1.5">Type de solution souhaitée</label>
                      <select
                        id="form-solution"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#c4c8bc]/80 bg-[#faf6f0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        value={formData.solutionType}
                        onChange={(e) => setFormData({ ...formData, solutionType: e.target.value })}
                      >
                        <option>Site Vitrine Professionnel (dès 5 000 DH)</option>
                        <option>Site Catalogue Produits (dès 6 000 DH)</option>
                        <option>Boutique E-Commerce Complète CMI (dès 20 000 DH)</option>
                        <option>Application Web Sur Mesure / SaaS (dès 30 000 DH)</option>
                        <option>Refonte & Audit de Solution Existante</option>
                        <option>Autre besoin spécifique</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="form-details" className="block text-xs font-bold text-[#2e3230] mb-1.5">Détails de votre projet / Objectifs</label>
                      <textarea
                        id="form-details"
                        rows="4"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#c4c8bc]/80 bg-[#faf6f0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        placeholder="Décrivez votre vision, fonctionnalités clés, délais souhaités..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Envoyer ma demande</span>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </button>

                    <p className="text-center text-[11px] text-[#4a4e4a] pt-2">
                      Réponse sous 24h ouvrées • Devis chiffré et détaillé sans engagement.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-[#1e2220] text-neutral-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
            <div className="md:col-span-6">
              <div className="mb-4">
                <TransparentLogo
                  src="/assets/nexora.webp"
                  alt="Nexora - Agence de Développement"
                  invert={true}
                  width={180}
                  height={40}
                  className="h-9 sm:h-10 w-auto object-contain opacity-95"
                />
              </div>
              <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
                Agence de développement web et logiciel à Casablanca . Nous accompagnons la transformation digitale des entreprises marocaines par des architectures modernes et performantes.
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                <span>Disponibles pour nouveaux projets </span>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Solutions Digitales
              </div>
              <div className="space-y-2.5 text-xs text-neutral-400">
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="block hover:text-white transition-colors">Site Vitrine</a>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="block hover:text-white transition-colors">Site Catalogue</a>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="block text-emerald-400 font-semibold hover:underline">E-Commerce Marocain & CMI</a>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="block hover:text-white transition-colors">Application Métier sur Mesure</a>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="block hover:text-white transition-colors">Portails SaaS & Dashboards</a>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Navigation Rapide
              </div>
              <div className="space-y-2.5 text-xs text-neutral-400">
                <a href="#accueil" onClick={(e) => handleNavClick(e, 'accueil')} className="block hover:text-white transition-colors">Accueil</a>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="block hover:text-white transition-colors">Nos Services & Tarifs</a>
                <a href="#realisations" onClick={(e) => handleNavClick(e, 'realisations')} className="block hover:text-white transition-colors">Portfolio & Projets</a>
                <a href="#processus" onClick={(e) => handleNavClick(e, 'processus')} className="block hover:text-white transition-colors">Processus de Réalisation</a>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="block hover:text-white transition-colors">Demande de Devis</a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div>© 2026 Nexora Studio. Tous droits réservés. Casablanca , Maroc.</div>
            <div className="flex items-center gap-6">
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-neutral-300">Mentions Légales</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-neutral-300">Confidentialité</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-neutral-300">Conditions de Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 10. Floating WhatsApp Action */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <div className="hidden sm:block bg-white text-[#2e3230] text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-[#c4c8bc]/60">
          Besoin d'aide ? Écrivez-nous
        </div>
        <a
          href="https://wa.me/212780651508"
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          title="Discuter sur WhatsApp (+212 7 80 65 15 08)"
        >
          <span className="material-symbols-outlined text-[26px]">chat</span>
        </a>
      </div>
    </div>
  );
}
