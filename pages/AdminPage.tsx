import React, { useEffect } from 'react';
// FIX: Changed import to a default import to resolve module resolution error.
import Logo from '../components/Logo';

interface AdminPageProps {
  navigate: (path: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ navigate }) => {
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo className="h-10 w-auto text-slate-700" />
              <span className="ml-3 text-xl font-semibold text-slate-700">Admin Dashboard</span>
            </div>
            <div>
              <button
                onClick={() => navigate('/')}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 mr-4"
              >
                View Site
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Welcome, Admin!</h1>
        <p className="mt-2 text-slate-600">
          This is the admin dashboard. From here you can manage the content of the website.
        </p>
        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Content Management</h2>
          <p className="mt-2 text-slate-500">
            Functionality to add, edit, and delete projects, services, and other content will be available here.
          </p>
          {/* Placeholder for future content management sections */}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
