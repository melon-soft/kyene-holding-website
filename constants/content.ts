import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import type { Content, StaffMember, Video } from '../types';

const socialLinks = [
  { name: 'Twitter', href: 'https://x.com/kyeneholding', icon: Twitter },
  { name: 'Facebook', href: 'https://facebook.com/kyeneholding', icon: Facebook },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/kyeneholding', icon: Linkedin },
  { name: 'Instagram', href: 'https://instagram.com/kyeneholding', icon: Instagram },
];

const img = (name: string) => new URL(`./images/${name}`, import.meta.url).href;
const video = (name: string) => new URL(`./videos/${name}`, import.meta.url).href;
const logoSvg = new URL('./images/logo/logo.svg', import.meta.url).href;

// Données des catégories de multiservices
const frMultiserviceCategories = [
  { id: 'climatisation', name: 'Climatisation', description: 'Splits et climatiseurs modernes', icon: '❄️' },
  { id: 'electromenager', name: 'Électroménager', description: 'Réfrigérateurs, congélateurs, machines à laver', icon: '🔌' },
  { id: 'electronique', name: 'Électronique', description: 'Téléviseurs et appareils électroniques', icon: '📺' },
  { id: 'mobilier', name: 'Mobilier', description: 'Lits et mobilier d\'aménagement', icon: '🛏️' },
  { id: 'chauffage', name: 'Chauffage', description: 'Chauffe-eaux et solutions thermiques', icon: '🔥' },
  { id: 'professionnel', name: 'Équipements Pro', description: 'Frigos vitrés et équipements professionnels', icon: '🏪' }
];

const enMultiserviceCategories = [
  { id: 'climatisation', name: 'Air Conditioning', description: 'Modern splits and air conditioners', icon: '❄️' },
  { id: 'electromenager', name: 'Appliances', description: 'Refrigerators, freezers, washing machines', icon: '🔌' },
  { id: 'electronique', name: 'Electronics', description: 'Televisions and electronic devices', icon: '📺' },
  { id: 'mobilier', name: 'Furniture', description: 'Beds and layout furniture', icon: '🛏️' },
  { id: 'chauffage', name: 'Heating', description: 'Water heaters and thermal solutions', icon: '🔥' },
  { id: 'professionnel', name: 'Professional Equipment', description: 'Display fridges and professional equipment', icon: '🏪' }
];

// Données des articles multiservices
const frMultiservices = [
  {
    id: 'split-lg-12000',
    title: 'Climatiseur Split LG 12000 BTU',
    category: 'climatisation',
    description: 'Climatiseur split mural LG avec technologie Inverter, faible consommation énergétique et télécommande intelligente. Idéal pour pièces jusqu\'à 25m².',
    image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=400',
    likes: 45,
    hearts: 23,
    price: '450$',
    availability: 'En stock',
    features: ['Technologie Inverter', 'Fonction Cool/Heat', 'Télécommande WiFi', 'Garantie 2 ans']
  },
  {
    id: 'frigo-samsung-2portes',
    title: 'Réfrigérateur Samsung 2 Portes',
    category: 'electromenager',
    description: 'Réfrigérateur Samsung 2 portes avec distributeur d\'eau, 450L capacité, classe énergétique A++ et design moderne inox.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    likes: 67,
    hearts: 34,
    price: '850$',
    availability: 'En stock',
    features: ['Capacité 450L', 'Distributeur d\'eau', 'No Frost', 'LED Interior']
  },
  {
    id: 'tv-samsung-55-4k',
    title: 'Téléviseur Samsung 55" 4K Smart',
    category: 'electronique',
    description: 'TV Samsung 55 pouces 4K UHD, Smart TV, HDR10+, connectivité WiFi/Bluetooth et design ultra-fin.',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400',
    likes: 89,
    hearts: 56,
    price: '650$',
    availability: 'Livraison 48h',
    features: ['4K UHD', 'Smart TV', 'HDR10+', 'Bluetooth 5.0']
  },
  {
    id: 'lit-king-size',
    title: 'Lit King Size avec Tête de Lit',
    category: 'mobilier',
    description: 'Lit king size moderne avec tête de lit rembourrée, sommier inclus et matelas haute densité. Design élégant pour chambre moderne.',
    image: 'https://images.unsplash.com/photo-1615529328251-fb4c69a860e5?w=400',
    likes: 34,
    hearts: 28,
    price: '380$',
    availability: 'En stock',
    features: ['King Size', 'Tête rembourrée', 'Matelas inclus', 'Garantie 5 ans']
  },
  {
    id: 'chauffe-eau-50l',
    title: 'Chauffe-eau Électrique 50L',
    category: 'chauffage',
    description: 'Chauffe-eau électrique 50L avec isolation thermique renforcée, thermostat réglable et protection anticorrosion.',
    image: 'https://images.unsplash.com/photo-1580212311474-3a9c68c5e925?w=400',
    likes: 22,
    hearts: 15,
    price: '180$',
    availability: 'En stock',
    features: ['50L capacité', 'Isolation renforcée', 'Thermostat réglable', 'Protection cathodique']
  },
  {
    id: 'frigo-vitre-boulangerie',
    title: 'Frigo Vitré pour Boulangerie',
    category: 'professionnel',
    description: 'Frigo vitré professionnel pour boulangerie, 250L capacité, température réglable 2-8°C, éclairage LED et portes vitrées.',
    image: 'https://images.unsplash.com/photo-1559847844-5c5675d9eaa4?w=400',
    likes: 18,
    hearts: 12,
    price: '750$',
    availability: 'Sur commande',
    features: ['250L capacité', 'Température réglable', 'Éclairage LED', 'Portes vitrées']
  },
  {
    id: 'machine-laver-lg-10kg',
    title: 'Machine à Laver LG 10kg',
    category: 'electromenager',
    description: 'Machine à laver LG 10kg avec moteur Direct Drive, vapeur, 14 programmes et connectivité SmartThinQ.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    likes: 41,
    hearts: 29,
    price: '520$',
    availability: 'En stock',
    features: ['10kg capacité', 'Moteur Direct Drive', 'Fonction vapeur', 'SmartThinQ']
  },
  {
    id: 'micro-ondes-samsung',
    title: 'Four Micro-ondes Samsung Grill',
    category: 'electromenager',
    description: 'Micro-ondes Samsung 28L avec fonction grill, convection 3 en 1 et plat rotatif automatique.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    likes: 29,
    hearts: 18,
    price: '150$',
    availability: 'En stock',
    features: ['28L capacité', 'Fonction grill', 'Convection 3-en-1', 'Plat rotatif']
  }
];

const enMultiservices = frMultiservices.map(item => ({
  ...item,
  title: {
    'Climatiseur Split LG 12000 BTU': 'LG Split Air Conditioner 12000 BTU',
    'Réfrigérateur Samsung 2 Portes': 'Samsung 2-Door Refrigerator',
    'Téléviseur Samsung 55" 4K Smart': 'Samsung 55" 4K Smart TV',
    'Lit King Size avec Tête de Lit': 'King Size Bed with Headboard',
    'Chauffe-eau Électrique 50L': 'Electric Water Heater 50L',
    'Frigo Vitré pour Boulangerie': 'Display Fridge for Bakery',
    'Machine à Laver LG 10kg': 'LG Washing Machine 10kg',
    'Four Micro-ondes Samsung Grill': 'Samsung Grill Microwave Oven'
  }[item.title] || item.title,
  description: {
    'Climatiseur split mural LG avec technologie Inverter, faible consommation énergétique et télécommande intelligente. Idéal pour pièces jusqu\'à 25m².': 'LG wall-mounted split air conditioner with Inverter technology, low energy consumption and smart remote. Ideal for rooms up to 25m².',
    'Réfrigérateur Samsung 2 portes avec distributeur d\'eau, 450L capacité, classe énergétique A++ et design moderne inox.': 'Samsung 2-door refrigerator with water dispenser, 450L capacity, A++ energy class and modern stainless steel design.',
    'TV Samsung 55 pouces 4K UHD, Smart TV, HDR10+, connectivité WiFi/Bluetooth et design ultra-fin.': 'Samsung 55-inch 4K UHD TV, Smart TV, HDR10+, WiFi/Bluetooth connectivity and ultra-slim design.',
    'Lit king size moderne avec tête de lit rembourrée, sommier inclus et matelas haute densité. Design élégant pour chambre moderne.': 'Modern king size bed with upholstered headboard, box spring included and high-density mattress. Elegant design for modern bedroom.',
    'Chauffe-eau électrique 50L avec isolation thermique renforcée, thermostat réglable et protection anticorrosion.': 'Electric water heater 50L with reinforced thermal insulation, adjustable thermostat and anti-corrosion protection.',
    'Frigo vitré professionnel pour boulangerie, 250L capacité, température réglable 2-8°C, éclairage LED et portes vitrées.': 'Professional display fridge for bakery, 250L capacity, adjustable temperature 2-8°C, LED lighting and glass doors.',
    'Machine à laver LG 10kg avec moteur Direct Drive, vapeur, 14 programmes et connectivité SmartThinQ.': 'LG washing machine 10kg with Direct Drive motor, steam, 14 programs and SmartThinQ connectivity.',
    'Micro-ondes Samsung 28L avec fonction grill, convection 3 en 1 et plat rotatif automatique.': 'Samsung microwave 28L with grill function, 3-in-1 convection and automatic turntable.'
  }[item.description] || item.description,
  features: item.features?.map(feature => {
    const featureMap: { [key: string]: string } = {
      'Technologie Inverter': 'Inverter Technology',
      'Fonction Cool/Heat': 'Cool/Heat Function',
      'Télécommande WiFi': 'WiFi Remote',
      'Garantie 2 ans': '2 Years Warranty',
      'Capacité 450L': '450L Capacity',
      'Distributeur d\'eau': 'Water Dispenser',
      'No Frost': 'No Frost',
      'LED Interior': 'LED Interior',
      '4K UHD': '4K UHD',
      'Smart TV': 'Smart TV',
      'HDR10+': 'HDR10+',
      'Bluetooth 5.0': 'Bluetooth 5.0',
      'King Size': 'King Size',
      'Tête rembourrée': 'Upholstered Headboard',
      'Matelas inclus': 'Mattress Included',
      'Garantie 5 ans': '5 Years Warranty',
      '50L capacité': '50L Capacity',
      'Isolation renforcée': 'Reinforced Insulation',
      'Thermostat réglable': 'Adjustable Thermostat',
      'Protection cathodique': 'Cathodic Protection',
      '250L capacité': '250L Capacity',
      'Température réglable': 'Adjustable Temperature',
      'Éclairage LED': 'LED Lighting',
      'Portes vitrées': 'Glass Doors',
      '10kg capacité': '10kg Capacity',
      'Moteur Direct Drive': 'Direct Drive Motor',
      'Fonction vapeur': 'Steam Function',
      'SmartThinQ': 'SmartThinQ',
      '28L capacité': '28L Capacity',
      'Fonction grill': 'Grill Function',
      'Convection 3-en-1': '3-in-1 Convection',
      'Plat rotatif': 'Turntable'
    };
    return featureMap[feature] || feature;
  }),
  availability: {
    'En stock': 'In Stock',
    'Livraison 48h': '48h Delivery',
    'Sur commande': 'On Order'
  }[item.availability] || item.availability
}));

const frStaff: StaffMember[] = [
    {
      name: 'Jean-Luc M.',
      role: 'Président Directeur Général',
      images: [img('prince.jpg')],
      socials: [
        { name: 'linkedin', href: '#' },
        { name: 'twitter', href: '#' },
      ],
    },
    {
      name: 'Amina K.',
      role: 'Directrice des Opérations',
      images: [img('prince.jpg')],
      socials: [
        { name: 'linkedin', href: '#' },
        { name: 'twitter', href: '#' },
      ],
    },
    {
      name: 'David B.',
      role: 'Directeur Financier',
      images: [img('prince.jpg')],
      socials: [{ name: 'linkedin', href: '#' }],
    },
    {
      name: 'Chantal L.',
      role: 'Responsable Projets Immobiliers',
      images: [img('prince.jpg')],
      socials: [{ name: 'linkedin', href: '#' }],
    },
    {
      name: 'Didier K.',
      role: 'Chef de Pôle Minier',
      images: [img('prince.jpg')],
      socials: [{ name: 'linkedin', href: '#' }],
    },
    {
      name: 'Prince Tshungu',
      role: 'Web Master & Développeur',
      images: [img('prince.jpg')],
      socials: [
        { name: 'linkedin', href: '#' },
        { name: 'twitter', href: '#' },
      ],
    },
  ];

const enStaff: StaffMember[] = [
    {
      name: 'Jean-Luc M.',
      role: 'Chief Executive Officer',
      images: [img('prince.jpg')],
      socials: [
        { name: 'linkedin', href: '#' },
        { name: 'twitter', href: '#' },
      ],
    },
    {
      name: 'Amina K.',
      role: 'Chief Operating Officer',
      images: [img('prince.jpg')],
      socials: [
        { name: 'linkedin', href: '#' },
        { name: 'twitter', href: '#' },
      ],
    },
    {
      name: 'David B.',
      role: 'Chief Financial Officer',
      images: [img('prince.jpg')],
      socials: [{ name: 'linkedin', href: '#' }],
    },
    {
      name: 'Chantal L.',
      role: 'Head of Real Estate Projects',
      images: [img('prince.jpg')],
      socials: [{ name: 'linkedin', href: '#' }],
    },
    {
      name: 'Didier K.',
      role: 'Head of Mining Division',
      images: [img('prince.jpg')],
      socials: [{ name: 'linkedin', href: '#' }],
    },
    {
      name: 'Prince Tshungu',
      role: 'Web Master & Developer',
      images: [img('prince.jpg')],
      socials: [
        { name: 'linkedin', href: '#' },
        { name: 'twitter', href: '#' },
      ],
    },
  ];

const frProjects = [
  {
    images: [img('bureau.jpg')],
    title: 'YENE RÉSIDENCES',
    category: 'K-YENE Immobilier',
    description: 'YENE RÉSIDENCES est notre projet immobilier emblématique à Kinshasa, situé sur l\'avenue des Nations Unies, dans la commune de la Gombe. Il offre un cadre de vie prestigieux, combinant élégance architecturale, sécurité, confort et accessibilité.',
    challenges: 'Créer un complexe résidentiel qui redéfinit le luxe et le confort à Kinshasa, en respectant les normes internationales de construction et de sécurité.',
    solution: 'Conception d\'appartements haut de gamme avec des matériaux de qualité supérieure, des services exclusifs (piscine, salle de sport) et une sécurité renforcée 24/7.',
    status: 'En cours',
    tags: ['Immobilier', 'Luxe', 'Résidentiel', 'Gombe'],
  },
  {
    images: [img('agro.jpg')],
    title: 'Ferme Agro-Durable du Congo',
    category: 'K-YENE Agro',
    description: 'Développement d\'une exploitation agricole de 500 hectares utilisant des techniques d\'agriculture durable et d\'irrigation intelligentes.',
    challenges: 'Assurer un rendement élevé tout en préservant la biodiversité locale et en optimisant l\'utilisation de l\'eau.',
    solution: 'Mise en place de systèmes d\'irrigation goutte-à-goutte alimentés par l\'énergie solaire et de pratiques d\'agriculture biologique.',
    status: 'Terminé',
    tags: ['Agriculture', 'Durable', 'Solaire'],
  },
  {
    images: [
        img('immobilier.jpg'),
        img('immobilier0.jpg'),
        img('immobilier1.jpg'),
        img('immobilier3.png')
    ],
    title: 'Projets Immobiliers K-YENE',
    category: 'K-YENE Immobilier',
    description: 'Découvrez nos projets immobiliers de prestige qui allient design moderne, confort et durabilité pour créer des espaces de vie exceptionnels.',
    challenges: 'Le défi était de créer des projets immobiliers qui répondent aux normes internationales tout en s\'adaptant aux besoins locaux et en garantissant un retour sur investissement optimal.',
    solution: 'Nous avons développé des solutions innovantes en matière de conception architecturale, de matériaux durables et de gestion de projet pour livrer des biens immobiliers de haute qualité.',
    status: 'En cours',
    tags: ['Immobilier', 'Luxe', 'Innovation'],
  },
  {
    images: [img('aviation.jpg')],
    title: 'Charter Aérien Exécutif',
    category: 'K-YENE Aviation',
    description: 'Mise en place d\'un service de jets privés pour les voyages d\'affaires et de loisirs, offrant flexibilité, confort et confidentialité.',
    challenges: 'Obtenir les certifications internationales de sécurité aérienne et former des équipages locaux aux standards les plus élevés.',
    solution: 'Acquisition d\'une flotte moderne et partenariat avec une école de formation aéronautique de renommée pour le personnel.',
    status: 'Terminé',
    tags: ['Aviation', 'Luxe', 'Transport'],
  },
  {
    images: [img('mining.jpg')],
    title: 'Mine de Cobalt de Kolwezi',
    category: 'K-YENE Mining',
    description: 'Exploitation d\'un gisement de cobalt stratégique en utilisant des technologies d\'extraction respectueuses de l\'environnement.',
    challenges: 'Garantir la sécurité des travailleurs dans des conditions exigeantes et assurer la traçabilité éthique du minerai.',
    solution: 'Mise en place de protocoles de sécurité de classe mondiale et d\'un système de blockchain pour le suivi de la chaîne d\'approvisionnement.',
    status: 'En cours',
    tags: ['Mining', 'Cobalt', 'Ressources'],
  },
  {
    images: [
      img('immobilier3.png'),
      img('immobilier.jpg'),
      img('bureau.jpg'),
      img('immobilier0.jpg')
    ],
    title: 'Projet Tshatshi',
    category: 'K-YENE Multiservices',
    description: 'Parce que vous méritez ce qu\'il y a de mieux, le Projet Tshatshi propose une construction moderne et luxueuse, offrant un environnement professionnel haut de gamme pour les bureaux de votre entreprise.',
    challenges: 'Concevoir un espace de travail moderne, esthétique et fonctionnel, capable de refléter l\'image d\'excellence recherchée par les entreprises.',
    solution: 'Réalisation de bureaux contemporains avec des matériaux de qualité, une architecture soignée et des options de personnalisation selon vos besoins.',
    status: 'En cours',
    tags: ['Construction moderne', 'Architecture premium', 'Bureaux professionnels', 'Design intérieur', 'Aménagement d\'espaces'],
  },
  {
    images: [img('bureau.jpg')],
    title: 'À la recherche d\'un bureau ?',
    category: 'K-YENE Multiservices',
    description: 'Appartements modernes et confortables, bureaux professionnels bien situés, et biens sélectionnés avec soin pour leur qualité et leur potentiel.',
    challenges: 'Répondre à la demande croissante de bureaux modernes, bien situés et adaptés aux besoins des entreprises, tout en garantissant confort, accessibilité et qualité.',
    solution: 'Proposer une sélection de bureaux et d\'espaces professionnels aménagés avec soin, incluant des designs contemporains, des équipements essentiels et des options d\'aménagement sur mesure.',
    status: 'À venir',
    tags: ['Immobilier professionnel', 'Bureaux modernes', 'Aménagement intérieur', 'Espaces de travail', 'Design contemporain'],
  }
];

const enProjects = [
    {
      images: ['https://images.unsplash.com/photo-1560518883-ce09059ee445?q=80&w=2534&auto=format&fit=crop'],
      title: 'YENE RESIDENCES',
      category: 'K-YENE Real Estate',
      description: 'YENE RESIDENCES is our flagship real estate project in Kinshasa, located on Avenue des Nations Unies, in the commune of Gombe. It offers a prestigious living environment, combining architectural elegance, security, comfort, and accessibility.',
      challenges: 'To create a residential complex that redefines luxury and comfort in Kinshasa, adhering to international construction and safety standards.',
      solution: 'Design of high-end apartments with superior quality materials, exclusive services (swimming pool, gym), and enhanced 24/7 security.',
      status: 'In Progress',
      tags: ['Real Estate', 'Luxury', 'Residential', 'Gombe'],
    },
    {
        images: [img('agro.jpg')],
        title: 'Congo Agro-Sustainable Farm',
        category: 'K-YENE Agro',
        description: 'Development of a 500-hectare farm using sustainable agriculture and smart irrigation techniques.',
        challenges: 'Ensuring high yield while preserving local biodiversity and optimizing water use.',
        solution: 'Implementation of solar-powered drip irrigation systems and organic farming practices.',
        status: 'Completed',
        tags: ['Agriculture', 'Sustainable', 'Solar'],
    },
    {
        images: [img('immobilier.jpg'), img('immobilier0.jpg'), img('immobilier1.jpg'), img('immobilier3.png')],
        title: 'K-YENE Real Estate Projects',
        category: 'K-YENE Real Estate',
        description: 'Discover our prestigious real estate projects that combine modern design, comfort, and sustainability to create exceptional living spaces.',
        challenges: 'The challenge was to create real estate projects that meet international standards while adapting to local needs and ensuring optimal return on investment.',
        solution: 'We developed innovative solutions in architectural design, sustainable materials, and project management to deliver high-quality real estate properties.',
        status: 'In Progress',
        tags: ['Real Estate', 'Luxury', 'Innovation'],
    },
    {
        images: [img('aviation.jpg')],
        title: 'Executive Air Charter',
        category: 'K-YENE Aviation',
        description: 'Establishment of a private jet service for business and leisure travel, offering flexibility, comfort, and confidentiality.',
        challenges: 'Obtaining international aviation safety certifications and training local crews to highest standards.',
        solution: 'Acquisition of a modern fleet and partnership with a renowned aviation training school for personnel.',
        status: 'Completed',
        tags: ['Aviation', 'Luxury', 'Transport'],
    },
    {
        images: [img('mining.jpg')],
        title: 'Kolwezi Cobalt Mine',
        category: 'K-YENE Mining',
        description: 'Operation of a strategic cobalt deposit using environmentally friendly extraction technologies.',
        challenges: 'Ensuring worker safety in demanding conditions and ensuring ethical traceability of the ore.',
        solution: 'Implementation of world-class safety protocols and a blockchain system for supply chain tracking.',
        status: 'In Progress',
        tags: ['Mining', 'Cobalt', 'Resources'],
    },
    {
        images: [img('immobilier3.png'), img('immobilier.jpg'), img('bureau.jpg'), img('immobilier0.jpg')],
        title: 'Tshatshi Project',
        category: 'K-YENE Multiservices',
        description: 'Because you deserve the best, Tshatshi Project offers a modern and luxurious construction, providing a high-end professional environment for your company\'s offices.',
        challenges: 'Designing a modern, aesthetic, and functional workspace capable of reflecting the image of excellence sought by companies.',
        solution: 'Creation of contemporary offices with quality materials, careful architecture, and customization options according to your needs.',
        status: 'In Progress',
        tags: ['Modern construction', 'Premium architecture', 'Professional offices', 'Interior design', 'Space planning'],
    },
    {
        images: [img('bureau.jpg')],
        title: 'Looking for an office?',
        category: 'K-YENE Multiservices',
        description: 'Modern and comfortable apartments, well-located professional offices, and properties carefully selected for their quality and potential.',
        challenges: 'Meeting the growing demand for modern, well-located offices tailored to business needs, while ensuring comfort, accessibility, and quality.',
        solution: 'Offering a selection of carefully designed offices and professional spaces, including contemporary designs, essential equipment, and custom layout options.',
        status: 'Upcoming',
        tags: ['Professional real estate', 'Modern offices', 'Interior design', 'Workspaces', 'Contemporary design'],
    }
];

const frVideos: Video[] = [
    { category: 'K-YENE Immobilier', title: 'Projets Immobiliers Modernes', views: '15.7K', duration: '0:35', thumbnailUrl: img('immobilier.jpg'), videoUrl: video('video_immobilier.mp4') },
    { category: 'K-YENE Mining', title: 'Nos Opérations Minières', views: '12.5K', duration: '0:33', thumbnailUrl: img('mining.jpg'), videoUrl: 'https://videos.pexels.com/video-files/3878779/3878779-hd.mp4' },
    { category: 'K-YENE Aviation', title: 'Transport Aérien Régional', views: '8.2K', duration: '0:13', thumbnailUrl: img('aviation.jpg'), videoUrl: 'https://videos.pexels.com/video-files/5969512/5969512-hd.mp4' },
    { category: 'K-YENE Agro', title: 'Chaîne Agroalimentaire', views: '6.8K', duration: '0:33', thumbnailUrl: img('agro.jpg'), videoUrl: 'https://videos.pexels.com/video-files/8451212/8451212-hd.mp4' },
    { category: 'K-YENE Multiservices', title: 'Logistique Import-Export', views: '9.1K', duration: '0:22', thumbnailUrl: img('bureau.jpg'), videoUrl: 'https://videos.pexels.com/video-files/7588365/7588365-hd.mp4' },
    { category: 'K-YENE Multiservices', title: 'Innovation et Technologie', views: '18.3K', duration: '0:14', thumbnailUrl: img('bureau.jpg'), videoUrl: 'https://videos.pexels.com/video-files/3214539/3214539-hd.mp4' },
];


const enVideos: Video[] = frVideos.map(v => ({
    ...v,
    category: {
        'K-YENE Mining': 'K-YENE Mining',
        'K-YENE Aviation': 'K-YENE Aviation',
        'K-YENE Immobilier': 'K-YENE Real Estate',
        'K-YENE Agro': 'K-YENE Agro',
        'K-YENE Multiservices': 'K-YENE Multiservices',
    }[v.category] || v.category,
    title: {
        'Nos Opérations Minières': 'Our Mining Operations',
        'Transport Aérien Régional': 'Regional Air Transport',
        'Projets Immobiliers Modernes': 'Modern Real Estate Projects',
        'Chaîne Agroalimentaire': 'Agri-food Chain',
        'Logistique Import-Export': 'Import-Export Logistics',
        'Innovation et Technologie': 'Innovation and Technology',
    }[v.title] || v.title,
}));

export const content: { [key: string]: Content } = {
  fr: {
    logoUrl: logoSvg,
    topBar: {
      phone: '+243 980 600 001',
      email: 'info@kyene-holding.com',
    },
    socials: socialLinks.map(s => ({...s, ariaLabel: `Suivez-nous sur ${s.name}`})),
    nav: {
      links: [
        { id: 'home', text: 'ACCUEIL' },
        { id: 'about', text: 'À PROPOS' },
        { id: 'staff', text: 'ÉQUIPE' },
        { id: 'services', text: 'NOS PÔLES' },
        { id: 'projects', text: 'PROJETS' },
      ],
      contact: 'Contact',
      language: 'FR',
    },
    hero: {
      subtitle: 'BIENVENUE CHEZ K-YENE',
      title: 'Construire aujourd’hui, pour un avenir durable.',
      description: 'K-YENE est un groupe congolais engagé dans des projets immobiliers, logistiques, agro-industriels, miniers et aériens. Notre mission : transformer vos ambitions en réalisations concrètes, avec rigueur, innovation et impact.',
      cta: 'Découvrir nos pôles',
    },
    about: {
      subtitle: 'Qui sommes-nous ?',
      title: 'Notre identité',
      p1: 'Fondé sur des valeurs d’excellence, d’intégrité et de vision durable, K-YENE Holding est un acteur de premier plan dans plusieurs secteurs clés en RDC. Notre groupe combine une connaissance profonde du marché local avec une expertise globale : nous développons des projets immobiliers, logistiques, agro-industriels, d’aviation VIP, et d’exploitation minière.',
      p2: 'Notre mission est de créer de la valeur durable, d\'assurer la satisfaction de nos clients et d\'innovover avec responsabilité. Nos atouts reposent sur une équipe locale et internationale, une gestion rigoureuse de nos projets (délais, budget, qualité), et des partenariats solides avec des institutions publiques et privées.',
      stats: [
        { value: '5+', label: 'Pôles d\'activités' },
        { value: '100+', label: 'Projets réalisés' },
        { value: '15+', label: 'Ans d\'expérience cumulée' },
      ],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop',
    },
    staff: {
        subtitle: 'Notre Équipe Dirigeante',
        title: 'Des experts passionnés à votre service',
        list: frStaff,
    },
    services: {
      subtitle: 'Nos expertises',
      title: 'Une synergie de compétences au service de vos ambitions',
      list: [
        { icon: 'Building', title: 'K-YENE Immobilier', description: 'Promotion, construction, gestion locative et aménagement intérieur haut de gamme pour logements et bureaux.' },
        { icon: 'Briefcase', title: 'K-YENE Multiservices', description: 'Solutions de transport, logistique, import-export et vente de véhicules, climatiseurs et meubles.' },
        { icon: 'Wrench', title: 'K-YENE Mining', description: 'Études de faisabilité, exploration, exploitation et conseil en développement durable pour le secteur minier.' },
        { icon: 'Plane', title: 'K-YENE Aviation', description: 'Transport aérien VIP sur mesure, offrant un service complet de logistique, sécurité et confort.' },
        { icon: 'Leaf', title: 'K-YENE Agro', description: 'Production, transformation et distribution agricole moderne, axée sur le développement durable des filières locales.' }
      ],
    },
    projects: {
      subtitle: 'Nos réalisations',
      title: 'Des projets qui transforment le paysage',
      cta: 'Voir tous les projets',
      allProjects: 'Tous les projets',
      readMore: 'En savoir plus',
      readLess: 'Voir moins',
      list: frProjects.map(p => ({
        ...p,
        images: (p.images || []).map(u => u.startsWith('images/') ? img(u.replace('images/','')) : u)
      })),
      page: {
        challenges: 'Défis & Objectifs',
        solution: 'Solution & Résultats',
        relatedProjects: 'Projets similaires',
        backToProjects: 'Retour aux projets',
      },
    },
    videos: {
        subtitle: 'Explorez nos activités à travers des vidéos captivantes de nos différents secteurs d\'activité',
        title: 'Nos Vidéos',
        watch_video: 'Regarder la vidéo',
        views_suffix: 'vues',
        duration_prefix: 'Durée:',
        list: frVideos,
    },
    faq: {
      subtitle: 'Trouvez rapidement des réponses aux questions les plus courantes sur nos services',
      title: 'Questions Fréquentes',
      list: [
        { question: 'Quels sont les domaines d\'activité de K-yene Holdings ?', answer: 'K-yene Holdings opère dans 5 pôles majeurs : Immobilier, Multiservices, Mining, Aviation et Agro.'},
        { question: 'Comment puis-je devenir partenaire de K-yene Holdings ?', answer: 'Nous sommes toujours ouverts à de nouvelles collaborations. Veuillez nous contacter via le formulaire sur notre page de contact pour discuter des opportunités de partenariat.'},
        { question: 'Dans quelles régions K-yene Holdings opère-t-elle ?', answer: 'Notre siège est à Kinshasa, en République Démocratique du Congo, mais nous gérons des projets dans plusieurs pays d\'Afrique, avec une vision d\'expansion continentale.'},
        { question: 'Quelle est l\'approche de K-yene en matière de durabilité ?', answer: 'La durabilité est au cœur de notre stratégie. Nous intégrons des pratiques écologiques et socialement responsables dans tous nos projets, de l\'utilisation d\'énergies renouvelables à l\'engagement communautaire.'}
      ],
    },
    cta: {
      title: 'Prêt à transformer votre vision en réalité ?',
      description: 'Rejoignez les entrepreneurs qui font confiance à Kyene Holdings pour accélérer leur croissance et atteindre leurs objectifs.',
      button: 'Planifier un entretien',
    },
    contactModal: {
      title: 'Nous contacter',
      nameLabel: 'Nom',
      namePlaceholder: 'Votre nom',
      emailLabel: 'Email',
      emailPlaceholder: 'votre@email.com',
      phoneLabel: 'Téléphone',
      phonePlaceholder: 'Votre téléphone',
      companyLabel: 'Entreprise',
      companyPlaceholder: 'Votre entreprise',
      messageLabel: 'Message',
      messagePlaceholder: 'Décrivez votre projet...',
      submitButton: 'Envoyer le message',
      validation: {
        nameRequired: 'Le nom est requis.',
        emailRequired: 'L\'email est requis.',
        emailInvalid: 'Veuillez entrer un email valide.',
        messageRequired: 'Le message est requis.',
      },
      successMessage: 'Message envoyé avec succès ! Nous vous répondrons bientôt.'
    },
    contact: {
      location: {
        title: 'Notre Siège Social',
        subtitle: 'Venez nous rencontrer pour discuter de vos projets et découvrir comment nous pouvons collaborer pour atteindre vos objectifs.',
      },
      addressCard: {
        title: 'Adresse',
        address: 'Av. des Nations-Unies, Gombe',
        country: 'Kinshasa, R.D. Congo',
        button: {
            text: 'Itinéraire',
            url: 'https://maps.app.goo.gl/uXaSisEE4eiBwgJk7',
        }
      },
      hoursCard: {
        title: 'Heures d\'ouverture',
        hours: [
            { day: 'Lundi - Vendredi', time: '9h00 - 17h00'},
            { day: 'Samedi', time: '9h00 - 13h00'},
            { day: 'Dimanche', time: 'Fermé'},
        ]
      },
      contactCard: {
        title: 'Contact',
        phone: '+243 980 600 001',
        email: 'info@kyene-holding.com',
        button: {
            text: 'Appeler maintenant',
            url: 'tel:+243980600001'
        }
      },
      form: {
        title: 'Envoyez-nous un message',
        nameLabel: 'Nom',
        namePlaceholder: 'Votre nom',
        emailLabel: 'Email',
        emailPlaceholder: 'votre@email.com',
        messageLabel: 'Message',
        messagePlaceholder: 'Bonjour, je voudrais discuter de...',
        submitButton: 'Envoyer le message',
        resetButton: 'Réinitialiser',
        validation: {
          nameRequired: 'Le nom est requis.',
          emailRequired: 'L\'email est requis.',
          emailInvalid: 'Veuillez entrer un email valide.',
          messageRequired: 'Le message est requis.',
        },
        successMessage: 'Message envoyé avec succès ! Nous vous répondrons bientôt.'
      }
    },
    footer: {
      tagline: 'Bâtir l’avenir, ensemble. Excellence et innovation dans chaque projet.',
      servicesTitle: 'Nos Pôles',
      servicesLinks: [
        { text: 'Immobilier', href: '#services' },
        { text: 'Multiservices', href: '#services' },
        { text: 'Mining', href: '#services' },
        { text: 'Aviation', href: '#services' },
        { text: 'Agro', href: '#services' },
      ],
      quickLinksTitle: 'Liens Rapides',
      quickLinks: [
        { text: 'Accueil', href: '#home' },
        { text: 'À Propos', href: '#about' },
        { text: 'Projets', href: '#projects' },
        { text: 'Contact', href: '#contact' },
      ],
      contactTitle: 'Contact Info',
      newsletter: {
        title: 'Abonnez-vous à notre newsletter',
        subtitle: 'Recevez nos dernières actualités et offres exclusives.',
        placeholder: 'Votre adresse email',
        button: 'S\'inscrire',
      },
      copyright: `© ${new Date().getFullYear()} K-yene Holding. Tous droits réservés.`,
      bottomLinks: {
          conditions: 'Termes & Conditions',
          privacy: 'Politique de confidentialité'
      }
    },
    multiservices: {
      title: 'K-YENE Multiservices',
      subtitle: 'Équipez vos espaces avec confiance',
      description: 'Livraison partout à Kinshasa',
      presentation: 'K-YENE Multiservices, filiale de K-YENE Holding, propose une sélection d\'équipements essentiels pour transformer appartements, bureaux et immeubles avec du matériel fiable, moderne et adapté aux besoins du quotidien.',
      productsTitle: 'Nos Produits',
      products: [
        'Splits / Climatiseurs',
        'Réfrigérateurs & Congélateurs',
        'Machines à laver',
        'Micro-ondes',
        'Chauffe-eaux',
        'Téléviseurs & appareils électroniques',
        'Frigos vitrés',
        'Frayons',
        'Lits et mobilier d\'aménagement'
      ],
      deliveryTitle: 'Livraison à Kinshasa',
      deliveryDescription: 'Nous assurons une livraison rapide et sécurisée dans toutes les communes de Kinshasa, avec un service professionnel et orienté satisfaction client.',
      whyChooseUs: {
        title: 'Pourquoi nous choisir ?',
        reasons: [
          'Qualité garantie',
          'Disponibilité immédiate',
          'Service client réactif',
          'Fiabilité et transparence',
          'Appartenance au groupe K-YENE Holding'
        ]
      },
      categories: frMultiserviceCategories,
      items: frMultiservices,
      filters: {
        all: 'Tous les produits',
        byCategory: 'Filtrer par catégorie',
        searchPlaceholder: 'Rechercher un produit...',
        sortBy: 'Trier par',
        sortOptions: {
          name: 'Nom',
          price: 'Prix',
          popularity: 'Popularité'
        }
      },
      productCard: {
        learnMore: 'En savoir plus',
        addToCart: 'Ajouter au panier',
        inStock: 'En stock',
        outOfStock: 'Rupture de stock',
        features: 'Caractéristiques'
      },
      whatsappMessage: 'Bonjour Assistant K-YENE MULTISERVICES ! Je besoin d\'en savoir plus sur'
    },
    assistant: {
        title: 'K-YENE Assistant',
        welcomeMessage: 'Hello! I am K-YENE virtual assistant. How can I help you today regarding our activities?',
        placeholder: 'Ask your question...',
        whatsappPrompt: "For more detailed assistance or to speak with a human, please continue on WhatsApp.",
        whatsappButton: 'Chat on WhatsApp',
        whatsappUrl: 'https://wa.me/243980600001'
    },
     seo: {
        home: { title: "K-YENE Holding | Partenaire d'Excellence en Immobilier et Services", description: "K-YENE est un groupe congolais engagé dans des projets immobiliers, logistiques, agro-industriels, miniers et aériens. Transformons vos ambitions en réalisations concrètes." },
        about: { title: "À Propos de K-yene | Notre Vision", description: "Découvrez la mission et la vision de K-yene, votre partenaire de confiance pour une croissance durable en Afrique." },
        services: { title: "Nos Pôles d'Activité | K-yene", description: "Explorez les 5 pôles d'expertise de K-yene : immobilier, multiservices, mining, aviation et agro-industrie." },
        projects: { title: "Nos Projets | K-yene", description: "Découvrez les projets transformateurs de K-yene qui façonnent le paysage économique et social." },
        faq: { title: "FAQ | K-yene", description: "Trouvez des réponses aux questions fréquentes sur K-yene, ses services et ses opérations." },
        contact: { title: "Contactez K-yene | Collaborons", description: "Contactez K-yene pour discuter de vos projets et explorer des opportunités de partenariat." }
    }
  },
  en: {
    logoUrl: logoSvg,
    topBar: {
      phone: '+243 980 600 001',
      email: 'info@kyene-holding.com',
    },
    socials: socialLinks.map(s => ({...s, ariaLabel: `Follow us on ${s.name}`})),
    nav: {
      links: [
        { id: 'home', text: 'HOME' },
        { id: 'about', text: 'ABOUT' },
        { id: 'staff', text: 'TEAM' },
        { id: 'services', text: 'OUR DIVISIONS' },
        { id: 'projects', text: 'PROJECTS' },
      ],
      contact: 'Contact',
      language: 'EN',
    },
    hero: {
      subtitle: 'WELCOME TO K-YENE',
      title: 'Building today, for a sustainable future.',
      description: 'K-YENE is a Congolese group engaged in real estate, logistics, agro-industrial, mining, and aviation projects. Our mission: to transform your ambitions into concrete achievements, with rigor, innovation, and impact.',
      cta: 'Discover our divisions',
    },
    about: {
      subtitle: 'Who we are',
      title: 'Our Identity',
      p1: 'Founded on values of excellence, integrity, and a sustainable vision, K-YENE Holding is a leading player in several key sectors in the DRC. Our group combines deep knowledge of the local market with global expertise: we develop real estate, logistics, agro-industrial, VIP aviation, and mining projects.',
      p2: 'Our mission is to create sustainable value, ensure client satisfaction, and innovate responsibly. Our strengths lie in a local and international team, rigorous project management (deadlines, budget, quality), and strong partnerships with public and private institutions.',
      stats: [
        { value: '5+', label: 'Business Divisions' },
        { value: '100+', label: 'Completed Projects' },
        { value: '15+', label: 'Years of cumulative experience' },
      ],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop',
    },
    staff: {
        subtitle: 'Our Executive Team',
        title: 'Passionate experts at your service',
        list: enStaff,
    },
    services: {
      subtitle: 'Our Expertise',
      title: 'A synergy of skills to serve your ambitions',
      list: [
        { icon: 'Building', title: 'K-YENE Real Estate', description: 'High-end promotion, construction, rental management, and interior design for residential and office properties.' },
        { icon: 'Briefcase', title: 'K-YENE Multiservices', description: 'Solutions for transport, logistics, import-export, and sales of vehicles, air conditioners, and furniture.' },
        { icon: 'Wrench', title: 'K-YENE Mining', description: 'Feasibility studies, exploration, exploitation, and consulting in sustainable development for the mining sector.' },
        { icon: 'Plane', title: 'K-YENE Aviation', description: 'Customized VIP air transport, offering a complete service of logistics, security, and comfort.' },
        { icon: 'Leaf', title: 'K-YENE Agro', description: 'Modern agricultural production, processing, and distribution, focused on the sustainable development of local sectors.' }
      ],
    },
    projects: {
      subtitle: 'Our achievements',
      title: 'Projects that transform the landscape',
      cta: 'View all projects',
      allProjects: 'All projects',
      readMore: 'Read more',
      readLess: 'Show less',
      list: enProjects.map(p => ({
        ...p,
        images: (p.images || []).map(u => u.startsWith('images/') ? img(u.replace('images/','')) : u)
      })),
      page: {
        challenges: 'Challenges & Goals',
        solution: 'Solution & Results',
        relatedProjects: 'Related projects',
        backToProjects: 'Back to projects',
      },
    },
    videos: {
        subtitle: 'Explore our activities through captivating videos from our various business sectors',
        title: 'Our Videos',
        watch_video: 'Watch video',
        views_suffix: 'views',
        duration_prefix: 'Duration:',
        list: enVideos,
    },
    faq: {
      subtitle: 'Quickly find answers to the most common questions about our services',
      title: 'Frequently Asked Questions',
      list: [
        { question: 'What are the business areas of K-yene Holdings?', answer: 'K-yene Holdings operates in 5 major divisions: Real Estate, Multiservices, Mining, Aviation, and Agro.'},
        { question: 'How can I partner with K-yene Holdings?', answer: 'We are always open to new collaborations. Please contact us through the form on our contact page to discuss partnership opportunities.'},
        { question: 'In which regions does K-yene Holdings operate?', answer: 'Our headquarters are in Kinshasa, Democratic Republic of Congo, but we manage projects in several African countries with a vision for continental expansion.'},
        { question: 'What is K-yene\'s approach to sustainability?', answer: 'Sustainability is at the core of our strategy. We integrate environmentally and socially responsible practices into all our projects, from using renewable energy to community engagement.'}
      ],
    },
    cta: {
      title: 'Ready to turn your vision into reality?',
      description: 'Join the entrepreneurs who trust Kyene Holdings to accelerate their growth and achieve their goals.',
      button: 'Schedule a meeting',
    },
    contactModal: {
      title: 'Contact Us',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      phoneLabel: 'Phone',
      phonePlaceholder: 'Your phone number',
      companyLabel: 'Company',
      companyPlaceholder: 'Your company',
      messageLabel: 'Message',
      messagePlaceholder: 'Describe your project...',
      submitButton: 'Send Message',
      validation: {
        nameRequired: 'Name is required.',
        emailRequired: 'Email is required.',
        emailInvalid: 'Please enter a valid email.',
        messageRequired: 'Message is required.',
      },
      successMessage: 'Message sent successfully! We will get back to you soon.'
    },
    contact: {
      location: {
        title: 'Our Headquarters',
        subtitle: 'Come meet us to discuss your projects and discover how we can collaborate to achieve your goals.',
      },
      addressCard: {
        title: 'Address',
        address: 'Av. des Nations-Unies, Gombe',
        country: 'Kinshasa, D.R. Congo',
        button: {
            text: 'Get Directions',
            url: 'https://maps.app.goo.gl/uXaSisEE4eiBwgJk7',
        }
      },
      hoursCard: {
        title: 'Opening Hours',
        hours: [
            { day: 'Monday - Friday', time: '9:00 AM - 5:00 PM'},
            { day: 'Saturday', time: '9:00 AM - 1:00 PM'},
            { day: 'Sunday', time: 'Closed'},
        ]
      },
      contactCard: {
        title: 'Contact',
        phone: '+243 980 600 001',
        email: 'info@kyene-holding.com',
        button: {
            text: 'Call now',
            url: 'tel:+243980600001'
        }
      },
      form: {
        title: 'Send Us a Message',
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email',
        emailPlaceholder: 'your@email.com',
        messageLabel: 'Message',
        messagePlaceholder: 'Hello, I would like to discuss...',
        submitButton: 'Send Message',
        resetButton: 'Reset',
        validation: {
          nameRequired: 'Name is required.',
          emailRequired: 'Email is required.',
          emailInvalid: 'Please enter a valid email.',
          messageRequired: 'Message is required.',
        },
        successMessage: 'Message sent successfully! We will get back to you soon.'
      }
    },
    footer: {
      tagline: 'Building the future, together. Excellence and innovation in every project.',
      servicesTitle: 'Our Divisions',
      servicesLinks: [
        { text: 'Real Estate', href: '#services' },
        { text: 'Multiservices', href: '#services' },
        { text: 'Mining', href: '#services' },
        { text: 'Aviation', href: '#services' },
        { text: 'Agro', href: '#services' },
      ],
      quickLinksTitle: 'Quick Links',
      quickLinks: [
        { text: 'Home', href: '#home' },
        { text: 'About', href: '#about' },
        { text: 'Projects', href: '#projects' },
        { text: 'Contact', href: '#contact' },
      ],
      contactTitle: 'Contact Info',
      newsletter: {
        title: 'Subscribe to our newsletter',
        subtitle: 'Receive our latest news and exclusive offers.',
        placeholder: 'Your email address',
        button: 'Subscribe',
      },
      copyright: `© ${new Date().getFullYear()} K-yene Holding. All rights reserved.`,
      bottomLinks: {
          conditions: 'Terms & Conditions',
          privacy: 'Privacy Policy'
      }
    },
    multiservices: {
      title: 'K-YENE Multiservices',
      subtitle: 'Equip your spaces with confidence',
      description: 'Delivery throughout Kinshasa',
      presentation: 'K-YENE Multiservices, a subsidiary of K-YENE Holding, offers a selection of essential equipment to transform apartments, offices and buildings with reliable, modern equipment adapted to daily needs.',
      productsTitle: 'Our Products',
      products: [
        'Splits / Air Conditioners',
        'Refrigerators & Freezers',
        'Washing Machines',
        'Microwaves',
        'Water Heaters',
        'Televisions & Electronic Devices',
        'Display Fridges',
        'Freezers',
        'Beds and Layout Furniture'
      ],
      deliveryTitle: 'Delivery in Kinshasa',
      deliveryDescription: 'We ensure fast and secure delivery in all communes of Kinshasa, with professional service and customer satisfaction oriented.',
      whyChooseUs: {
        title: 'Why choose us?',
        reasons: [
          'Guaranteed Quality',
          'Immediate Availability',
          'Responsive Customer Service',
          'Reliability and Transparency',
          'Part of K-YENE Holding Group'
        ]
      },
      categories: enMultiserviceCategories,
      items: enMultiservices,
      filters: {
        all: 'All products',
        byCategory: 'Filter by category',
        searchPlaceholder: 'Search for a product...',
        sortBy: 'Sort by',
        sortOptions: {
          name: 'Name',
          price: 'Price',
          popularity: 'Popularity'
        }
      },
      productCard: {
        learnMore: 'Learn more',
        addToCart: 'Add to cart',
        inStock: 'In stock',
        outOfStock: 'Out of stock',
        features: 'Features'
      },
      whatsappMessage: 'Hello K-YENE MULTISERVICES ASSISTANT! I need to know more about'
    },
    assistant: {
        title: 'K-YENE Assistant',
        welcomeMessage: 'Hello! I am the K-YENE virtual assistant. How can I help you today regarding our activities?',
        placeholder: 'Ask your question...',
        whatsappPrompt: "For more detailed assistance or to speak with a human, please continue on WhatsApp.",
        whatsappButton: 'Chat on WhatsApp',
        whatsappUrl: 'https://wa.me/243980600001'
    },
     seo: {
        home: { title: "K-YENE Holding | Partner of Excellence in Real Estate and Services", description: "K-YENE is a Congolese group engaged in real estate, logistics, agro-industrial, mining, and aviation projects. Let's turn your ambitions into concrete achievements." },
        about: { title: "About K-yene | Our Vision", description: "Discover the mission and vision of K-yene, your trusted partner for sustainable growth in Africa." },
        services: { title: "Our Business Divisions | K-yene", description: "Explore K-yene's 5 areas of expertise: real estate, multiservices, mining, aviation, and agro-industry." },
        projects: { title: "Our Projects | K-yene", description: "Discover K-yene's transformative projects that are shaping the economic and social landscape." },
        faq: { title: "FAQ | K-yene", description: "Find answers to frequently asked questions about K-yene, its services, and operations." },
        contact: { title: "Contact K-yene | Let's Collaborate", description: "Get in touch with K-yene to discuss your projects and explore partnership opportunities." }
    }
  },
};
