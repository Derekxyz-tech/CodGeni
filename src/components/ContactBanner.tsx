'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContactBanner() {
  return (
    <div id="contact-banner" className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Prêt à concrétiser votre projet ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Notre équipe d'experts est à votre disposition pour discuter de votre projet et vous proposer une solution sur mesure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#contact-form"
              className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors text-center"
            >
              Nous contacter
            </Link>
            <a
              href="tel:+509XXXXXXXX"
              className="px-8 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition-colors text-center"
            >
              Nous appeler
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
