'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AtomBackground from '@/components/AtomBackground';

export default function Hero() {
  const handleServicesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-24 overflow-hidden">
        {/* Atom Background Animation */}
      <AtomBackground />
        {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Visual - Animation en premier sur mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[600px] order-1 lg:order-2"
          >
            {/* Outer glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 rounded-2xl md:rounded-[2.5rem] blur-xl opacity-50"></div>
            
            {/* Main container with elegant frame */}
            <div className="relative h-full w-full bg-gradient-to-br from-white via-white to-neutral-50 rounded-2xl md:rounded-[2.5rem] p-3 sm:p-4 md:p-6 shadow-2xl border border-white/50">
              {/* Inner decorative border */}
              <div className="absolute inset-0 rounded-2xl md:rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none"></div>
              
              {/* Corner accents - smaller on mobile */}
              <div className="absolute top-0 left-0 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl md:rounded-tl-[2.5rem]"></div>
              <div className="absolute top-0 right-0 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl md:rounded-tr-[2.5rem]"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 border-b-2 border-l-2 border-secondary/30 rounded-bl-2xl md:rounded-bl-[2.5rem]"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 border-b-2 border-r-2 border-secondary/30 rounded-br-2xl md:rounded-br-[2.5rem]"></div>
              
              {/* Video container with padding and rounded corners */}
              <div className="relative w-full h-full bg-gradient-to-br from-neutral-50 to-white rounded-xl md:rounded-3xl overflow-hidden shadow-inner border border-neutral-200/50">
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,rgb(0,0,0)_1px,transparent_0)] bg-[length:20px_20px] pointer-events-none"></div>
                
                {/* Logo Animation Video */}
                <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain rounded-lg md:rounded-2xl shadow-lg"
                    aria-label="Visualisation interactive"
                  >
                    <source src="/Logo_Animation_With_Pixar_Style.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
            
            {/* Floating decorative elements - hidden on mobile, visible on larger screens */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="hidden md:block absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-2xl shadow-lg -z-10 backdrop-blur-sm border border-secondary/20"
            />
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="hidden md:block absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/30 to-primary/10 rounded-3xl shadow-lg -z-10 backdrop-blur-sm border border-primary/20"
            />
          </motion.div>

          {/* Hero Content - Après l'animation sur mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10 order-2 lg:order-1"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full"
            >
              Développement Web Créatif
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Des sites web qui <span className="text-primary">captivent</span> et <span className="text-primary">convertissent</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl"
            >
              Nous créons des expériences numériques sur mesure qui allient design élégant et performance technique pour propulser votre présence en ligne.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="#contact-form"
                className="px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors text-center"
              >
                Demander un devis
              </Link>
              <Link
                href="#services"
                onClick={handleServicesClick}
                className="px-8 py-4 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition-colors text-center"
              >
                Découvrir nos services
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 flex items-center space-x-6"
            >
              <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                  null, // Icône silhouette pour la deuxième
                  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face'
                ].map((imageUrl, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-neutral-200 overflow-hidden flex items-center justify-center"
                  >
                    {imageUrl ? (
                      <div
                        style={{
                          backgroundImage: `url(${imageUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    ) : (
                      <svg
                        className="w-6 h-6 text-neutral-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-sm text-neutral-600">
                <p className="font-medium">+50 clients satisfaits</p>
                <p className="text-xs">dans toute la région</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
