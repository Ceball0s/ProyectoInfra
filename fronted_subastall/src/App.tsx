// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/Home/Home';
import LoginForm  from './components/LoginForm/LoginForm'; // Asegúrate de crear este componente
import SignUp from './components/SignUp/SignUp';
import {Profile} from './components/Profile/Profile';
import { SubastaPage } from './components/SubastaPage/SubastaPage'
import { AuthProvider } from './types/AuthContext';
import  CrearSubasta  from './components/Pages/CrearSubasta/CrearSubasta';
import EditSubasta from './components/Pages/CrearSubasta/EditSubasta';
import AuctionRoom from './components/Pages/AuctionRoom';
import SearchSubasta from './components/Pages/search';
import CategoriaPage from './components/Pages/categoriaPage';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta para la página principal (HomePage)*/}
          <Route path="/" element={<HomePage />} />

          {/* Ruta para la página de login*/}
          <Route path="/login" element={<LoginForm />} />

          {/* Ruta para la página de Registro*/}
          <Route path="/SignUp" element={<SignUp />} />

          <Route path='/Profile' element={<Profile />} />

          <Route path="/subastas" element={<SubastaPage />} />

          <Route path="/addSubasta" element={<CrearSubasta />} />

          <Route path="/editSubasta/:id" element={<EditSubasta />} />

          <Route path='/subasta/:id' element={<AuctionRoom />} />

          <Route path='search/:query' element={<SearchSubasta />} />

          <Route path='/categoria/:category' element={<CategoriaPage />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
