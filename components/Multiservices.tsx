import React, { useState, useMemo, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useRouter } from '../hooks/useRouter';
import { motion } from 'framer-motion';
import {
  Search,
  Heart,
  ThumbsUp,
  Grid3X3,
  List,
  ShoppingCart,
  MessageCircle,
  X,
  Snowflake,
  Zap,
  Tv,
  Bed,
  Flame,
  Store
} from 'lucide-react';

const Multiservices: React.FC = () => {
  const { content } = useContent();
  const { multiservices } = content;
  const { navigate } = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef, { threshold: 0.1 });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [heartedItems, setHeartedItems] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('name');

  // Icônes pour les catégories
  const categoryIcons: { [key: string]: React.ReactNode } = {
    climatisation: <Snowflake className="w-4 h-4" />,
    electromenager: <Zap className="w-4 h-4" />,
    electronique: <Tv className="w-4 h-4" />,
    mobilier: <Bed className="w-4 h-4" />,
    chauffage: <Flame className="w-4 h-4" />,
    professionnel: <Store className="w-4 h-4" />,
  };

  // Filtrage et tri des produits
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = multiservices.items;

    // Filtrer par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item: any) => item.category === selectedCategory);
    }

    // Filtrer par recherche
    if (searchTerm) {
      filtered = filtered.filter((item: any) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Trier les produits
    const sorted = [...filtered].sort((a: any, b: any) => {
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

  const handleSendToWhatsApp = (product: any) => {
    const message = `Bonjour Assistant K-YENE MULTISERVICES ! Je besoin d'en savoir plus sur ${product.title}`;
    const whatsappUrl = `https://wa.me/243980600001?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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

  return (
    <section id="multiservices" ref={sectionRef} className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center max-w-4xl mx-auto mb-12 animate-on-scroll">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            {multiservices.title}
          </h2>
          <p className="text-xl text-slate-600 mb-2 font-medium">
            {multiservices.subtitle}
          </p>
          <p className="text-lg text-slate-500">
            {multiservices.description}
          </p>
        </div>

        {/* Présentation */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-slate-200 animate-on-scroll" style={{ transitionDelay: '100ms' }}>
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <ShoppingCart className="w-7 h-7 text-red-600" />
            Présentation
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            {multiservices.presentation}
          </p>

          <h4 className="text-xl font-semibold text-slate-900 mb-4">{multiservices.productsTitle}</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-slate-600">
            {multiservices.products.map((product: string, index: number) => (
              <div key={index} className="flex items-center group">
                <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                <span className="group-hover:text-red-600 transition-colors">{product}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-slate-200 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
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
                  className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
        </div>

        {/* Grille de produits */}
        <div className={viewMode === 'grid'
          ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'
          : 'space-y-4 mb-12'
        }>
          {filteredAndSortedProducts.map((product: any, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                }`}
            >
              {/* Image du produit */}
              <div className={`relative ${viewMode === 'grid' ? 'h-56' : 'md:w-64 h-56 md:h-auto'} bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden group`}>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

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
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium flex items-center gap-1">
                      {categoryIcons[product.category]}
                      {multiservices.categories.find((c: any) => c.id === product.category)?.name}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {product.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed flex-grow">
                  {product.description}
                </p>

                {/* Caractéristiques */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-5">
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {multiservices.productCard.features}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {product.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                        <span
                          key={featureIndex}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs rounded-lg font-medium border border-blue-200"
                        >
                          {feature}
                        </span>
                      ))}
                      {product.features.length > 3 && (
                        <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">
                          +{product.features.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3 mt-auto">
                  {/* Bouton En savoir plus */}
                  <button
                    onClick={() => handleSendToWhatsApp(product)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3.5 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl group/btn"
                  >
                    <MessageCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span>En savoir plus</span>
                  </button>

                  {/* Like et Heart */}
                  <div className="flex items-center justify-center gap-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => toggleLike(product.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${likedItems.has(product.id)
                          ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      title="J'aime"
                    >
                      <ThumbsUp className={`w-4 h-4 ${likedItems.has(product.id) ? 'fill-current' : ''}`} />
                      <span className="text-sm font-semibold">
                        {product.likes + (likedItems.has(product.id) ? 1 : 0)}
                      </span>
                    </button>

                    <button
                      onClick={() => toggleHeart(product.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${heartedItems.has(product.id)
                          ? 'bg-red-500 text-white shadow-md hover:bg-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      title="Favori"
                    >
                      <Heart className={`w-4 h-4 ${heartedItems.has(product.id) ? 'fill-current' : ''}`} />
                      <span className="text-sm font-semibold">
                        {product.hearts + (heartedItems.has(product.id) ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
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
          </div>
        )}

        {/* Sections supplémentaires */}
        <div className="space-y-8">
          {/* Livraison */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 animate-on-scroll">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">{multiservices.deliveryTitle}</h3>
            <p className="text-blue-700 leading-relaxed">{multiservices.deliveryDescription}</p>
          </div>

          {/* Pourquoi nous choisir */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 animate-on-scroll">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">{multiservices.whyChooseUs.title}</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {multiservices.whyChooseUs.reasons.map((reason: string, index: number) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-700 group-hover:text-red-600 transition-colors">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Multiservices;
