'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const services = [
  {
    id: 'sites-web-sur-mesure',
    title: 'Sites Web Sur Mesure',
    description:
      'Des sites web uniques et performants, conçus sur mesure pour répondre à vos besoins spécifiques et à votre identité de marque.',
    icon: (
      <svg
        className="w-10 h-10 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 'applications-web',
    title: 'Applications Web',
    description:
      'Développement d\'applications web réactives et évolutives avec les dernières technologies pour une expérience utilisateur optimale.',
    icon: (
      <svg
        className="w-10 h-10 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 'seo-referencement',
    title: 'SEO & Référencement',
    description:
      'Optimisation pour les moteurs de recherche pour améliorer votre visibilité en ligne et attirer plus de trafic qualifié vers votre site.',
    icon: (
      <svg
        className="w-10 h-10 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    id: 'maintenance-support',
    title: 'Maintenance & Support',
    description:
      'Services de maintenance continue et de support technique pour assurer le bon fonctionnement de votre site web ou application.',
    icon: (
      <svg
        className="w-10 h-10 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 'chatbot-intelligent',
    title: 'Chatbot Intelligent',
    description:
      'Développement de chatbots intelligents et conversationnels pour automatiser le service client et améliorer l\'engagement avec vos visiteurs.',
    icon: (
      <svg
        className="w-10 h-10 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    id: 'gestion-reseaux-sociaux',
    title: 'Gestion des Réseaux Sociaux',
    description:
      'Stratégie de communication et gestion complète de vos réseaux sociaux pour développer votre présence digitale et engager votre audience.',
    icon: (
      <svg
        className="w-10 h-10 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Nos Services
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Nous combinons créativité, expertise technique et stratégie pour vous offrir des solutions numériques innovantes et performantes.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-4"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow transition-all duration-300 border border-neutral-100 hover:border-primary/20 flex flex-col h-full"
              whileHover={{ y: -5 }}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg mb-3">
                {service.icon}
              </div>
              <h3 className="text-base font-semibold mb-2 text-gray-900">{service.title}</h3>
              <div className="mt-4 flex-grow">
                <p className="text-gray-600 text-xs leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
