import React, { useState } from 'react';
// import { login, logout, getToken } from '../../services/auth/loginService';
import { login } from '../../services/auth/loginService';
import { Credentials } from '../../types/Auth';
import { useAuth } from '../../types/AuthContext';
//import { Navigate, useNavigate } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';



const LoginForm = () => {
  const toHome = () => {navigate('/');}
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const { login: authenticate } = useAuth();
  const navigate = useNavigate();
  //const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const credenciales: Credentials = { username, password };
      const token = await login(credenciales);
      console.log('Token recibido:', token);
      authenticate(token, username)
      navigate('/'); // Redirigir a la página principal
      
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // const handleLogout = () => {
  //   logout();
  //   console.log('Sesión cerrada:', getToken());
  // };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-red-400 to-red-800">
      <div className="bg-[#E3CDA4] rounded-lg shadow-lg p-8 w-96">
        <span className="bg-yellow-600 p-2 rounded-full">
            <span role="img" aria-label="Icono" onClick={toHome}>🏷️</span>
          </span>
        <h2 className="text-2xl font-semibold text-center mb-6 text-brown-800">
          SubastALL <span className="text-xl">🔨</span>
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Correo Electrónico"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              onChange={(e) => setUser(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="text-right text-sm text-red-600">
            <a href="#" className="hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">O inicia también con:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
              Google
            </button>
            <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
              Apple ID
            </button>
            <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
              Facebook
            </button>
          </div>
        </div>
        <div className="text-center mt-6">
          <a
            href="#"
            className="text-sm text-red-600 hover:underline font-medium"
            onClick={() => navigate('/SignUp')}
          >
            Crear cuenta nueva
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
