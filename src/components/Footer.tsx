import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  type LinkItem = {
    name: string;
    href?: string;  // href est maintenant optionnel
  };

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Accueil', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'À propos', href: '/a-propos' },
        { name: 'Contact', href: '/contact' },
      ] as LinkItem[],
    },
    {
      title: 'Services',
      links: [
        { name: 'Applications Web' },
        { name: 'SEO et Référencement' },
        { name: 'Sites Web sur Mesure' },
        { name: 'Maintenance et Support' },
      ] as LinkItem[],
    },
    {
      title: 'Légal',
      links: [
        { name: 'Mentions légales', href: '/mentions-legales' },
        { name: 'Politique de confidentialité', href: '/confidentialite' },
        { name: 'Conditions générales', href: '/cgv' },
        { name: 'Politique de cookies', href: '/cookies' },
      ] as LinkItem[],
    },
  ];


  return (
    <footer className="bg-primary text-white pt-20 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo */}
          <div className="lg:col-span-1 -mt-16 -ml-12">
            <div className="mb-6">
              <div className="w-64">
                <img 
                  src="/images/ChatGPT_Image_Nov_11__2025__02_01_19_PM-removebg-preview.png" 
                  alt="Logo" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Liens de navigation */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="text-neutral-300 hover:text-white transition-colors relative group"
                      >
                        <span className="relative">
                          {link.name}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    ) : (
                      <span className="text-neutral-300">
                        {link.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 flex justify-center items-center">
          <p className="text-sm text-neutral-300 text-center">
            © {currentYear} CodGeni. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
