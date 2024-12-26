import React, { useEffect, useState } from 'react';
import { consultarMejorOferta } from '../../../services/fetchSubastas';

interface ContadorInfoProps {
  id: number;
}

const ContadorInfo: React.FC<ContadorInfoProps> = ({id}) => {
  
  
  const [subastaData, setSubastaData] = useState<{
    monto: number;
    usuario_oferta: { firstname: string; lastname: string };
    tiempoRestante: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await consultarMejorOferta(id);

        // Validar la estructura de los datos
        if (!data || !data.subasta || !data.subasta.fechaCierre) {
          console.error("Los datos recibidos no son válidos:", data);
          return;
        }

        const fechaCierre = new Date(data.subasta.fechaCierre);
        const ahora = new Date();

        // Calcular tiempo restante
        const diffMs = fechaCierre.getTime() - ahora.getTime();
        const tiempo = diffMs > 0
          ? new Date(diffMs).toISOString().substr(11, 8) // hh:mm:ss
          : "Finalizada";

        // Actualizar el estado con los datos de la subasta
        setSubastaData({
          monto: data.subasta.precioActual,
          usuario_oferta: data.usuario_oferta || { firstname: "N/A", lastname: "N/A" },
          tiempoRestante: tiempo,
        });
      } catch (error) {
        console.error("Error al obtener la información de la subasta:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!subastaData) {
    return <div>Cargando...</div>;
  }
  if (Object.keys(subastaData).length === 0) {
    return <div>Aun no hay una oferta</div>;
  }

  return (
    <div className="flex flex-row items-center justify-between  h-full w-full p-4 font-bold rounded-md shadow-lg">
    <img
      src="" // Cambiar por URL dinámica si aplica
      alt="Perfil"
      className="w-16 h-16 rounded-full object-cover mr-4" // Tamaño ajustado
    />
    <div className="flex flex-col flex-grow">
      <div className="text-lg font-bold text-gray-800">
        {subastaData.monto} USD
      </div>
      <div className="text-sm text-gray-600">
        {subastaData.usuario_oferta.firstname} {subastaData.usuario_oferta.lastname}
      </div>
    </div>
    <div className="text-lg font-mono text-green-600">
      {subastaData.tiempoRestante}
    </div>
  </div>
  );
};

export default ContadorInfo;
