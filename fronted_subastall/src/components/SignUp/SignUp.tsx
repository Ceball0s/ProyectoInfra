import React, { useState } from 'react';

import { register } from '../../services/auth/loginService';
import { RegisterRequest } from '../../types/Auth';
import { useNavigate } from 'react-router-dom';

// interface LoginFormProps {
//   FormHandle: React.Dispatch<React.SetStateAction<string>>;
// }


// export const SignUpForm: React.FC<LoginFormProps> = ({ FormHandle }) =>{
const SignUpForm = () =>{
  const toHome = () => {navigate('/');}
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [genter, setGender] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const credenciales: RegisterRequest = { username, password, firstname, lastname,country,date,genter};
      const mensaje = await register(credenciales);
      console.log('salida:', mensaje);
   
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 to-red-800" /*style={{ backgroundImage: 'url("/path/to/your/background.jpg")', backgroundSize: 'cover' }}*/>
      <div className="bg-[#E3CDA4] rounded-lg shadow-lg p-8 w-full max-w-md">
      <span className="bg-yellow-600 p-2 rounded-full">
            <span role="img" aria-label="Icono" onClick={toHome}>🏷️</span>
          </span>
      <h2 className="text-2xl font-semibold text-center mb-6 text-brown-800">
          SubastALL <span className="text-xl">🔨</span>
        </h2>
        <h2 className="text-center text-2xl font-bold mb-4">Crear Cuenta</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="form-controll">
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="form-controll">
            <input
              type="text"
              placeholder="Ingresa tu apellido"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="form-controll">
            <input
              type="Text"
              placeholder="Ingresa tu Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="form-controll">
            <input
              type="password"
              placeholder="Ingresa tu Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="form-controll">
            <input
              type="text"
              placeholder="Ingresa tu país"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="form-controll">
            <input
              type="date"
              name="birthdate"
              id="birthdate"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="form-controll">
            <select
              name="gender"
              required
              onChange={(e) => setGender(e.target.value)}
              value={genter}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Género</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-[#814c3c] text-white py-2 rounded hover:bg-[#5e362b] transition"
          >
            Crear Cuenta
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <span 
            onClick={() => navigate('/login')}
            className="text-yellow-700 cursor-pointer underline">
            Inicia sesión aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;