// Permet d'importer des fichiers CSS en TypeScript
declare module '*.css';
declare module '*.scss';

// Déclaration des modules pour les images
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// Déclaration pour les modules CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Déclaration pour les polices
declare module '*.woff';
declare module '*.woff2';
declare module '*.ttf';
declare module '*.eot';

// Déclaration pour les fichiers de données
declare module '*.json';

// Déclaration pour les fichiers de configuration
declare module '*.yaml';
declare module '*.yml';

// Déclaration pour les fichiers Markdown
declare module '*.md' {
  const content: string;
  export default content;
}

// Déclaration pour les fichiers MDX
declare module '*.mdx' {
  const MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

// Déclaration pour les variables d'environnement
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_SITE_URL: string;
    // Ajoutez d'autres variables d'environnement ici
  }
}

// Déclaration pour les modules CSS de tiers
declare module 'react-slick';
declare module 'framer-motion';
declare module 'react-intersection-observer';

// Déclaration pour les modules de composants
declare module '@/components/*' {
  const Component: React.ComponentType<any>;
  export default Component;
}

// Déclaration pour les modules d'utilitaires
declare module '@/utils/*';

declare module 'next/head' {
  import { FC, ReactNode } from 'react';
  interface HeadProps {
    children?: ReactNode;
  }
  const Head: FC<HeadProps>;
  export default Head;
}
