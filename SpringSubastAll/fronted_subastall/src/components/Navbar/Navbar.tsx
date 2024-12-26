// Navbar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../types/AuthContext';
import { ButtonProfile } from '../ButtonsProfile/ButtonProfile';


export const Navbar: React.FC = () => {
  const navigate = useNavigate();  // Usamos el hook de navegación para redirigir
  const { token } = useAuth();
  const [query, setQuery] = React.useState<string>('');

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    navigate('/login');  // Redirigir a la página de login
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Redirige a la página de búsqueda con la query
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  const toAddSubasta = () => {
    navigate('/addSubasta');
  }

  const toHome = () => {
    navigate('/');
  }

  return (
    <nav className="bg-red-800 text-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="bg-yellow-600 p-2 rounded-full">
            <span role="img" aria-label="Icono" onClick={toHome}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M17.303 5.197A7.5 7.5 0 0 0 6.697 15.803a.75.75 0 0 1-1.061 1.061A9 9 0 1 1 21 10.5a.75.75 0 0 1-1.5 0c0-1.92-.732-3.839-2.197-5.303Zm-2.121 2.121a4.5 4.5 0 0 0-6.364 6.364.75.75 0 1 1-1.06 1.06A6 6 0 1 1 18 10.5a.75.75 0 0 1-1.5 0c0-1.153-.44-2.303-1.318-3.182Zm-3.634 1.314a.75.75 0 0 1 .82.311l5.228 7.917a.75.75 0 0 1-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 0 1-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 0 1-1.247-.606l.569-9.47a.75.75 0 0 1 .554-.68Z" clipRule="evenodd" />
              </svg>
            </span>
          </span>
          <h1 className="text-lg font-bold">SubastALL</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4 hidden sm:block">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Actualiza el estado local
                              onKeyDown={handleKeyDown}
            placeholder="Buscar sobre artículos del hogar"
            className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring focus:ring-yellow-600 shadow-sm"
          />
        </div>

        {/* Botón Login o Iconos de Usuario */}
        <div className="flex items-center space-x-4">
          {!token ? (
            <>
              <button
                onClick={handleLogin}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full">
                Login
              </button>
              <button
                onClick={() => navigate('/SignUp')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                SignUp
              </button>
            </>
          ) : (
            <>
              <button className="p-2 rounded-full hover:bg-red-700 transition duration-300" onClick={toAddSubasta}>
                <span role="img" aria-label="Crear Subasta">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              {/* Icono de Notificaciones */}
              <button className="p-2 rounded-full hover:bg-red-700 transition duration-300">
                <span role="img" aria-label="Notificaciones">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              {/* Icono de Perfil */}
              <ButtonProfile />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;