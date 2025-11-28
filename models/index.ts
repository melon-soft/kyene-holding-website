// Fix: Import React to resolve the "Cannot find namespace 'React'" error.
import React from 'react';

export type Language = 'fr' | 'en';

export interface NavLink {
  id: string;
  text: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  ariaLabel: string;
}

export interface Service {
  icon: string; // Changed from ComponentType to string
  title: string;
  description: string;
}

export interface StaffMember {
  name: string;
  role: string;
  images: string[];
  socials: {
    name: 'linkedin' | 'twitter' | 'facebook';
    href: string;
  }[];
}

export interface Project {
  images: string[];
  title: string;
  category: string;
  description: string;
  challenges: string;
  solution: string;
  status?: string;
  tags?: string[];
  videoUrl?: string;
  additionalVideoUrl?: string;
}

export interface Video {
  category: string;
  title: string;
  views: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export type ToastType = 'success' | 'info' | 'error';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

export interface SEOContent {
  home: { title: string; description: string };
  about: { title: string; description: string };
  services: { title: string; description: string };
  projects: { title: string; description: string };
  faq: { title: string; description: string };
  contact: { title: string; description: string };
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}


export interface MultiserviceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  likes: number;
  hearts: number;
  price?: string;
  availability?: string;
  features?: string[];
}

export interface MultiserviceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Content {
  logoUrl: string;
  topBar: {
    phone: string;
    email: string;
  };
  socials: SocialLink[];
  nav: {
    links: NavLink[];
    contact: string;
    language: string;
  };
  hero: {
    subtitle: string;
    title: string;
    description: string;
    cta: string;
  };
  about: {
    subtitle: string;
    title: string;
    p1: string;
    p2: string;
    stats: { value: string; label: string }[];
    image: string;
  };
  staff: {
    subtitle: string;
    title: string;
    list: StaffMember[];
  };
  services: {
    subtitle: string;
    title: string;
    list: Service[];
  };
  projects: {
    subtitle: string;
    title: string;
    cta: string;
    allProjects: string;
    readMore: string;
    readLess: string;
    list: Project[];
    page: {
      challenges: string;
      solution: string;
      relatedProjects: string;
      backToProjects: string;
    };
  };
  videos: {
    subtitle: string;
    title: string;
    watch_video: string;
    views_suffix: string;
    duration_prefix: string;
    list: Video[];
  };
  faq: {
    subtitle: string;
    title: string;
    list: { question: string; answer: string }[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
  contactModal: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    validation: {
        nameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        messageRequired: string;
    };
    successMessage: string;
  };
  contact: {
    location: {
        title: string;
        subtitle: string;
    };
    addressCard: {
      title: string;
      address: string;
      country: string;
      button: {
        text: string;
        url: string;
      };
    };
    hoursCard: {
      title: string;
      hours: {
        day: string;
        time: string;
      }[];
    };
    contactCard: {
      title: string;
      phone: string;
      email: string;
      button: {
        text: string;
        url: string;
      };
    };
    form: {
      title: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitButton: string;
      resetButton: string;
      validation: {
        nameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        messageRequired: string;
      };
      successMessage: string;
    };
  };
  footer: {
    tagline: string;
    servicesTitle: string;
    servicesLinks: { text: string; href: string }[];
    quickLinksTitle: string;
    quickLinks: { text: string; href: string }[];
    contactTitle: string;
    newsletter: {
      title: string;
      subtitle: string;
      placeholder: string;
      button: string;
    };
    copyright: string;
    bottomLinks: {
      conditions: string;
      privacy: string;
    };
  };
  multiservices: {
    title: string;
    subtitle: string;
    description: string;
    presentation: string;
    productsTitle: string;
    products: string[];
    deliveryTitle: string;
    deliveryDescription: string;
    whyChooseUs: {
      title: string;
      reasons: string[];
    };
    categories: MultiserviceCategory[];
    items: MultiserviceItem[];
    filters: {
      all: string;
      byCategory: string;
      searchPlaceholder: string;
      sortBy: string;
      sortOptions: {
        name: string;
        price: string;
        popularity: string;
      };
    };
    productCard: {
      learnMore: string;
      addToCart: string;
      inStock: string;
      outOfStock: string;
      features: string;
    };
    whatsappMessage: string;
  };
  assistant: {
    title: string;
    welcomeMessage: string;
    placeholder: string;
    whatsappPrompt: string;
    whatsappButton: string;
    whatsappUrl: string;
  };
  seo: SEOContent;
}
