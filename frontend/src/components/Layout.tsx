import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Simulador de Microprocesador</h1>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span>Bienvenido, {user.name}</span>
                <nav className="flex space-x-4">
                  <Link to="/simulator" className="hover:text-gray-300">Simulador</Link>
                  <Link to="/management" className="hover:text-gray-300">Administración</Link>
                </nav>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          UGMA-CUMANÁ MICROPROCESADOR | PROF. NOHEMI PINTO
        </div>
      </footer>
    </div>
  );
};

export default Layout;