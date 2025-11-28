import React, { useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { ContentProvider, useContent } from './context/ContentContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import MultiservicesPage from './pages/MultiservicesPage';
import { useRouter } from './hooks/useRouter';
import Preloader from './components/Preloader';
import FloatingActions from './components/FloatingActions';
import { slugify } from './utils';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout: React.FC<{ children: React.ReactNode; seo: any }> = ({ children, seo }) => {
    useEffect(() => {
        if (seo) {
            document.title = seo.title;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', seo.description);
            }
        }
    }, [seo]);

    return (
        <div className="bg-slate-50 text-slate-800">
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingActions />
        </div>
    );
};

const AppContent: React.FC = () => {
  const { pathname, navigate } = useRouter();
  const { content, isLoading, error } = useContent();
  const [pageSeo, setPageSeo] = useState<any>(null);

  useEffect(() => {
    if (isLoading || !content) return;

    if (pathname.startsWith('/project/')) {
        const slug = pathname.substring('/project/'.length);
        const project = content.projects.list.find(p => slugify(p.title) === slug);
        if (project) {
            setPageSeo({
                title: `${project.title} | K-yene Holding`,
                description: project.description.substring(0, 160)
            });
        }
    } else if (pathname === '/multiservices') {
        setPageSeo({
            title: 'K-YENE Multiservices | K-yene Holding',
            description: 'K-YENE Multiservices, filiale de K-YENE Holding, propose une sélection d\'équipements essentiels pour transformer appartements, bureaux et immeubles avec du matériel fiable, moderne et adapté aux besoins du quotidien.'
        });
    } else if (pathname === '/') {
        setPageSeo(content.seo.home);
    }
  }, [pathname, isLoading, content]);

  useEffect(() => {
    if (isLoading || !content) return;

    const hash = window.location.hash;
    if (pathname === '/' && hash) {
      const id = hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Delay to ensure content is rendered
    }
  }, [pathname, isLoading, content]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-700">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Failed to Load Content</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    if (pathname.startsWith('/project/')) {
        const slug = pathname.substring('/project/'.length);
        return <ProjectPage slug={slug} />;
    }

    switch (pathname) {
      case '/admin':
        return <AdminPage navigate={navigate} />;
      case '/login':
        return <LoginPage navigate={navigate} />;
      case '/multiservices':
        return <MultiservicesPage />;
      default:
        return <HomePage />;
    }
  };

  const showLayout = !['/admin', '/login'].includes(pathname);

  const pageVariants = {
    initial: { opacity: 0, x: '-100vw' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '100vw' },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <>
      {showLayout ? (
        <MainLayout seo={pageSeo}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </MainLayout>
      ) : (
        renderPage()
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ContentProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ContentProvider>
    </LanguageProvider>
  );
};

export default App;
