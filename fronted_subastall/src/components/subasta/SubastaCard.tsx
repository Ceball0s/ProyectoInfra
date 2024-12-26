import React from 'react';
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";


interface subastaCardProps {
  id: number;
  nombre: string;
  descripcion: string;
  precioInicial: number;
  precioActual: number;
  fotos: string[];
  fechaCreacion: string;
  fechaCierre: string;
  estado: string;
  usuario_subasta: {

    firstname: string;

    lastname: string;

    country: string;

  };
  label: string;
  showEdit?: boolean;
  onBid: () => void;
}

export const SubastaCard: React.FC<subastaCardProps> = ({
  id,
  nombre,
  descripcion,
  fotos,
  precioActual,
  label,
  fechaCierre,
  showEdit = false,
  onBid,
}) => {
  const navigate = useNavigate();

  const API_BASE_URL = "http://127.0.0.1:8080/api/subasta/foto/";

  // Cálculo de tiempo restante
  const getTimeRemaining = () => {
    const now = new Date();
    const cierre = new Date(fechaCierre);
    const diff = cierre.getTime() - now.getTime();

    if (diff <= 0) return "Subasta finalizada";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days} días restantes`;
    if (hours > 0) return `${hours} horas restantes`;
    return `${minutes} minutos restantes`;
  };

  const toAuctionRoom = () => {
    navigate(`/subasta/${id}`);
  }
 

  const timeRemaining = getTimeRemaining();


  return (
    <div className="relative border rounded-lg shadow-lg p-4 w-64 h-90 bg-white flex flex-col">

      {showEdit && (
        <div className="absolute top-2 right-2 opacity-0 hover:opacity-90 transition-opacity duration-300">
          <Link to={`/editSubasta/${id}`} className="text-gray-600 hover:text-blue-500">
            <FiEdit size={24} />
          </Link>
        </div>
      )}

      <div className="h-40 flex items-center justify-center bg-gray-100">
        <img
          src={`${API_BASE_URL}${fotos[0]}`} // Concatenamos la URL base con el nombre del archivo
          alt={nombre}
          className="bg-white h-full w-full object-contain rounded-t-lg"
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
          {timeRemaining}
        </div>
      </div>

      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{nombre}</h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {descripcion}
        </p>
        <div className="mt-4">
          <p className="text-xl font-bold text-gray-800">
            ${precioActual} <span className="text-green-600 text-sm">{label}</span>
          </p>
          <p className="text-sm text-green-500 mt-1">Envío gratis</p>
        </div>
      </div>


      <button
        onClick={toAuctionRoom}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Puja ahora
      </button>
    </div>
  );
};

export default SubastaCard;
