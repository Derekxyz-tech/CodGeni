'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import AtomBackground from '@/components/AtomBackground';

interface ServiceHeroProps {
  title: string;
  description: string;
  icon: string;
  ctaText?: string;
}

export default function ServiceHero({ title, description, icon, ctaText = 'Discutons de votre projet' }: ServiceHeroProps) {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary/5 via-white to-secondary/5 overflow-hidden">
      {/* Atom Background Animation */}
      <AtomBackground />
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 right-20 w-96 h-96 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative container mx-auto px-4" style={{ zIndex: 1 }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary text-3xl mb-6"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl shadow-primary/20 hover:shadow-primary/30"
            >
              {ctaText}
              <FaArrowRight className="ml-3" />
            </Link>
            <Link 
              href="#details" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-800 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-all transform hover:-translate-y-1"
            >
              En savoir plus
              <svg className="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
