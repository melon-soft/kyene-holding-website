import React, { useState, useRef, useMemo } from 'react';
import { useContent } from '../context/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Heart,
  ThumbsUp,
  Grid3X3,
  List,
  ShoppingCart,
  MessageCircle,
  Filter,
  X,
  Snowflake,
  Zap,
  Tv,
  Bed,
  Flame,
  Store
} from 'lucide-react';

interface MultiserviceItem {
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

const MultiservicesPage: React.FC = () => {
  const { content } = useContent();
  const { addToast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef, { threshold: 0.1 });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [heartedItems, setHeartedItems] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('name');

  const { multiservices } = content;

  // Icônes pour les catégories
  const categoryIcons: { [key: string]: React.ReactNode } = {
    climatisation: <Snowflake className="w-5 h-5" />,
    electromenager: <Zap className="w-5 h-5" />,
    electronique: <Tv className="w-5 h-5" />,
    mobilier: <Bed className="w-5 h-5" />,
    chauffage: <Flame className="w-5 h-5" />,
    professionnel: <Store className="w-5 h-5" />,
  };

  // Filtrage et tri des produits
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = multiservices.items;

    // Filtrer par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item: MultiserviceItem) => item.category === selectedCategory);
    }

    // Filtrer par recherche
    if (searchTerm) {
      filtered = filtered.filter((item: MultiserviceItem) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Trier les produits
    const sorted = [...filtered].sort((a: MultiserviceItem, b: MultiserviceItem) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'price':
          const priceA = parseInt(a.price?.replace('$', '') || '0');
          const priceB = parseInt(b.price?.replace('$', '') || '0');
          return priceA - priceB;
        case 'popularity':
          return (b.likes + b.hearts) - (a.likes + a.hearts);
        default:
          return 0;
      }
    });

    return sorted;
  }, [multiservices.items, selectedCategory, searchTerm, sortBy]);

  const handleSendToWhatsApp = (item: MultiserviceItem) => {
    const message = `Bonjour Assistant K-YENE MULTISERVICES ! Je besoin d'en savoir plus sur ${item.title}`;
    const whatsappUrl = `https://wa.me/243980600001?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    addToast('Redirection vers WhatsApp...', 'success');
  };

  const toggleLike = (productId: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const toggleHeart = (productId: string) => {
    setHeartedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const getAvailabilityColor = (availability?: string) => {
    switch (availability) {
      case 'En stock':
      case 'In Stock':
        return 'text-green-600 bg-green-100';
      case 'Livraison 48h':
      case '48h Delivery':
        return 'text-yellow-600 bg-yellow-100';
      case 'Sur commande':
      case 'On Order':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="multiservices" ref={sectionRef} className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            {multiservices.title}
          </h1>
          <p className="text-xl text-slate-600 mb-2 font-medium">
            {multiservices.subtitle}
          </p>
          <p className="text-lg text-slate-500">
            {multiservices.description}
          </p>
        </motion.div>

        {/* Présentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-slate-200"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <ShoppingCart className="w-7 h-7 text-red-600" />
            Présentation
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            {multiservices.presentation}
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-4">{multiservices.productsTitle}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-slate-600">
            {multiservices.products.map((product: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center group"
              >
                <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                <span className="group-hover:text-red-600 transition-colors">{product}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filtres et recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-slate-200"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Barre de recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={multiservices.filters.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-2">
              {/* Filtre par catégorie */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white transition-all"
              >
                <option value="all">{multiservices.filters.all}</option>
                {multiservices.categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>

              {/* Tri */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white transition-all"
              >
                <option value="name">{multiservices.filters.sortOptions.name}</option>
                <option value="price">{multiservices.filters.sortOptions.price}</option>
                <option value="popularity">{multiservices.filters.sortOptions.popularity}</option>
              </select>

              {/* Bouton de vue */}
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                title={viewMode === 'grid' ? 'Vue liste' : 'Vue grille'}
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Compteur de résultats */}
          <div className="mt-4 text-sm text-slate-600">
            {filteredAndSortedProducts.length} produit{filteredAndSortedProducts.length > 1 ? 's' : ''} trouvé{filteredAndSortedProducts.length > 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* Grille de produits */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={viewMode === 'grid'
              ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
            }
          >
            {filteredAndSortedProducts.map((product: MultiserviceItem, index: number) => (
              <motion.div
                key={product.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                  }`}
              >
                {/* Image du produit */}
                <div className={`relative ${viewMode === 'grid' ? 'h-56' : 'md:w-64 h-56 md:h-auto'} bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden group`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const icon = document.createElement('div');
                        icon.className = 'absolute inset-0 flex items-center justify-center';
                        icon.innerHTML = `<div class="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center"><svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg></div>`;
                        parent.appendChild(icon);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Badge de disponibilité */}
                  {product.availability && (
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(product.availability)}`}>
                      {product.availability}
                    </div>
                  )}
                </div>

                {/* Contenu de la carte */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* En-tête */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium flex items-center gap-1">
                        {categoryIcons[product.category]}
                        {multiservices.categories.find((c: any) => c.id === product.category)?.name}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 hover:text-red-600 transition-colors">
                      {product.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {product.description}
                  </p>

                  {/* Caractéristiques */}
                  {product.features && product.features.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {product.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                          <span
                            key={featureIndex}
                            className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {product.features.length > 3 && (
                          <span className="px-2 py-1 bg-slate-200 text-slate-600 text-xs rounded-full">
                            +{product.features.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-3 mt-auto">
                    {/* Likes et Hearts */}
                    <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleLike(product.id)}
                          className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${likedItems.has(product.id)
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          title="J'aime"
                        >
                          <ThumbsUp className={`w-4 h-4 ${likedItems.has(product.id) ? 'fill-current' : ''}`} />
                          <span className="text-sm font-medium">
                            {product.likes + (likedItems.has(product.id) ? 1 : 0)}
                          </span>
                        </button>

                        <button
                          onClick={() => toggleHeart(product.id)}
                          className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${heartedItems.has(product.id)
                            ? 'bg-red-500 text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          title="Favori"
                        >
                          <Heart className={`w-4 h-4 ${heartedItems.has(product.id) ? 'fill-current' : ''}`} />
                          <span className="text-sm font-medium">
                            {product.hearts + (heartedItems.has(product.id) ? 1 : 0)}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Bouton En savoir plus */}
                    <button
                      onClick={() => handleSendToWhatsApp(product)}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                    >
                      <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      {multiservices.productCard.learnMore}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Message si aucun résultat */}
        {filteredAndSortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucun produit trouvé</h3>
            <p className="text-slate-600 mb-6">Essayez de modifier vos critères de recherche</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}

        {/* Sections supplémentaires */}
        <div className="mt-16 space-y-8">
          {/* Livraison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200"
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-4">{multiservices.deliveryTitle}</h3>
            <p className="text-blue-700 leading-relaxed">{multiservices.deliveryDescription}</p>
          </motion.div>

          {/* Pourquoi nous choisir */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">{multiservices.whyChooseUs.title}</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {multiservices.whyChooseUs.reasons.map((reason: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-700 group-hover:text-red-600 transition-colors">{reason}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MultiservicesPage;
