'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export interface ContentSection {
  title: string;
  description: string | ReactNode;
  items?: string[];
  image?: string;
  reverse?: boolean;
  cta?: {
    text: string;
    href: string;
  };
}

interface ServiceContentProps {
  id?: string;
  title?: string;
  sections: ContentSection[];
  className?: string;
}

export default function ServiceContent({ 
  id = 'details',
  title,
  sections,
  className = 'bg-gray-50'
}: ServiceContentProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4">
        {title && (
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </motion.div>
        )}
        
        <div className="space-y-24">
          {sections.map((section, index) => (
            <motion.div 
              key={index}
              className={`flex flex-col ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="md:w-1/2">
                {section.image ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-medium">En savoir plus</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-10 h-full flex items-center justify-center">
                    <div className="text-6xl text-primary opacity-30">
                      {index + 1}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h3>
                
                {typeof section.description === 'string' ? (
                  <p className="text-gray-600 mb-6">
                    {section.description}
                  </p>
                ) : (
                  <div className="text-gray-600 mb-6">
                    {section.description}
                  </div>
                )}
                
                {section.items && section.items.length > 0 && (
                  <ul className="space-y-3 mb-6">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <FaCheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {section.cta && (
                  <a 
                    href={section.cta.href}
                    className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors group"
                  >
                    {section.cta.text}
                    <svg 
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
