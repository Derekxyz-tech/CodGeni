'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export const projects = [
  {
    id: 1,
    title: 'Restaurant Bistro',
    description: 'Site vitrine élégant pour un restaurant avec menu en ligne et réservation de table',
    image: 'https://codegenuises.github.io/restaurantbistro/og-image.jpg',
    link: 'https://codegenuises.github.io/restaurantbistro/',
  },
  {
    id: 2,
    title: 'L\'Artisan Ayisyen',
    description: 'Plateforme mettant en valeur l\'artisanat haïtien et ses créations uniques',
    image: 'https://codegenuises.github.io/Artisan-Ayisyen/og-image.jpg',
    link: 'https://codegenuises.github.io/Artisan-Ayisyen/',
  },
  {
    id: 3,
    title: 'RenovArt',
    description: 'Site dédié aux services de rénovation et de décoration d\'intérieur',
    image: 'https://renovartvercel.vercel.app/og-image.jpg',
    link: 'https://renovartvercel.vercel.app/',
  },
];

const PortfolioShowcase = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Vérifier si c'est un appareil mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Vérifier au chargement
    checkIfMobile();
    
    // Écouter les changements de taille
    window.addEventListener('resize', checkIfMobile);
    
    // Nettoyer l'écouteur d'événement
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Utiliser directement le tableau des projets
  const filteredProjects = projects;

  // Faire défiler vers le projet suivant
  const nextProject = () => {
    if (!sliderRef.current) return;
    
    const scrollContainer = sliderRef.current;
    const scrollAmount = 300; // Largeur d'un projet + marge
    const maxScroll = scrollContainer.scrollWidth / 2; // Car on a doublé les projets
    
    let newScroll = scrollContainer.scrollLeft + scrollAmount;
    
    // Si on dépasse la moitié, on revient au début de manière transparente
    if (newScroll >= maxScroll) {
      newScroll = 0;
      scrollContainer.scrollLeft = newScroll;
      // Petit délai pour permettre le repositionnement
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.scrollLeft = newScroll + scrollAmount;
        }
      }, 10);
    } else {
      scrollContainer.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  // Faire défiler vers le projet précédent
  const prevProject = () => {
    if (!sliderRef.current) return;
    
    const scrollContainer = sliderRef.current;
    const scrollAmount = 300; // Largeur d'un projet + marge
    const maxScroll = scrollContainer.scrollWidth / 2; // Car on a doublé les projets
    
    let newScroll = scrollContainer.scrollLeft - scrollAmount;
    
    // Si on est au début, on va à la fin
    if (newScroll < 0) {
      newScroll = maxScroll - scrollAmount;
      scrollContainer.scrollLeft = maxScroll + scrollAmount;
      // Petit délai pour permettre le repositionnement
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.scrollTo({
            left: newScroll,
            behavior: 'smooth'
          });
        }
      }, 10);
    } else {
      scrollContainer.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="pt-20 pb-0 bg-white" id="portfolio">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos réalisations</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Grille de projets */}
        <div className="relative py-4 md:py-8">
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1"
            style={{ scrollBehavior: 'smooth' }}
          >
            {/* Dupliquer les projets pour créer l'effet de défilement infini */}
            {[...filteredProjects, ...filteredProjects].map((project, index) => (
                <motion.div
key={`${project.id}-${index}`}
                  variants={item}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-72 md:w-80 snap-center mx-2 md:mx-0 border-0 relative z-10 transform translate-y-0.5"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => isMobile && nextProject()}
                  style={{ borderBottom: 'none' }}
                >
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <div className="w-full h-64 bg-neutral-100 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="w-full h-full flex items-center justify-center text-neutral-400">
                        {project.title}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pb-8">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-neutral-600 mb-4">{project.description}</p>
                    <Link
                      href={project.link}
                      className="inline-flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors"
                    >
                      Voir le projet
                      <svg
                        className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
            ))}
          </div>
          
          {/* Contrôles de navigation */}
          <div className="flex justify-center gap-4 mt-10 mb-4">
            <button 
              onClick={prevProject}
              className="p-2 rounded-full bg-white shadow-md hover:bg-neutral-100 transition-colors"
              aria-label="Projet précédent"
            >
              <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextProject}
              className="p-2 rounded-full bg-white shadow-md hover:bg-neutral-100 transition-colors"
              aria-label="Projet suivant"
            >
              <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <style jsx global>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
        `}</style>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
