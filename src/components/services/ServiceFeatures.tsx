'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

interface ServiceFeaturesProps {
  title?: string;
  subtitle?: string;
  features: FeatureItem[];
  className?: string;
}

export default function ServiceFeatures({ 
  title, 
  subtitle, 
  features, 
  className = '' 
}: ServiceFeaturesProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {subtitle && (
              <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
          </div>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: feature.delay || index * 0.1 
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10 text-primary text-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
