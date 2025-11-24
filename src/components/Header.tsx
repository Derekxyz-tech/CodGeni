'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Empêcher le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Si on est déjà sur la page d'accueil, faire un smooth scroll vers le haut
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    // Si on est déjà sur la page d'accueil et que c'est un lien d'ancrage, faire un smooth scroll
    if (window.location.pathname === '/' && href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (href === '/#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Accueil', href: '/#', onClick: handleHomeClick },
    { name: 'Services', href: '/#services', onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick('/#services', e) },
    { name: 'Contact', href: '/#contact-form', onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick('/#contact-form', e) },
  ];

  return (
    <>
      <header 
        className="fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-sm py-3"
        style={{
          height: '80px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="w-full pl-0 pr-4 md:pr-6">
          <div className="flex items-center justify-between w-full">
            {/* Logo - Aligné à gauche */}
            <div className="flex-shrink-0 -ml-4 md:-ml-6">
              <Link 
                href="/" 
                className="flex items-center"
                style={{
                  position: 'relative',
                  top: '2px',
                  height: '140px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <img 
                  src="/images/logo.png" 
                  alt="CodGeni Logo" 
                  className="h-32 w-auto"
                  style={{
                    maxHeight: '100%',
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </Link>
            </div>

            {/* Navigation Desktop */}
            <div className="flex-1 flex justify-end">
              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={item.onClick}
                    className="text-sm font-medium text-neutral-800 hover:text-primary transition-colors whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="#contact-form"
                  className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  Parlez à un expert
                </Link>
              </nav>
            </div>

            {/* Bouton Hamburger Mobile */}
            <button
              className="md:hidden relative z-50 p-2 rounded-lg hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                <span
                  className={`absolute w-6 h-0.5 bg-primary rounded-full transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-primary rounded-full transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-primary rounded-full transition-all duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile - Rendu en dehors du header */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full bg-white shadow-2xl z-50 md:hidden flex flex-col"
              style={{ width: '100vw', maxWidth: '100%' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-gradient-to-r from-primary/5 to-transparent">
                <h2 className="text-xl font-bold text-primary">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                  aria-label="Fermer le menu"
                >
                  <svg
                    className="w-6 h-6 text-neutral-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 overflow-y-auto py-6">
                <div className="space-y-2 px-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          if (item.onClick) {
                            item.onClick(e);
                          } else {
                            setIsMenuOpen(false);
                          }
                        }}
                        className="flex items-center gap-4 px-4 py-4 text-lg font-medium text-neutral-700 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
                      >
                        <span className="flex-1">{item.name}</span>
                        <svg
                          className="w-5 h-5 text-neutral-400 group-hover:text-primary transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                    className="pt-4"
                  >
                    <Link
                      href="#contact-form"
                      className="block w-full px-6 py-4 bg-primary text-white rounded-xl text-center font-medium hover:bg-primary/90 transition-colors shadow-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Parlez à un expert
                    </Link>
                  </motion.div>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-neutral-200 bg-neutral-50">
                <div className="text-sm text-neutral-600 space-y-2">
                  <p className="font-semibold text-neutral-800">Contactez-nous</p>
                  <div className="space-y-1">
                    <p className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      contactcodgeniht@gmail.com
                    </p>
                    <p className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      +509 36 40 72 66
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
