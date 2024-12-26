import  { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SubastaCard from '../subasta/SubastaCard';
import { fetchSubastas } from '../../services/fetchSubastas';

export const CarruselSubastas = () => {
  interface Subasta {
    id: number;
    nombre: string;
    descripcion: string;
    fotos: string[];
    precioActual: number;
    precioInicial: number;
    fechaCreacion: string;
    fechaCierre: string;
    estado: string;
    usuario_subasta: {
      firstname: string;
      lastname: string;
      country: string;
  }
}

  const [subastas, setSubastas] = useState<Subasta[]>([]);
  const [isLoading, setIsLoading] = useState(true); 




  useEffect(() => {
    const loadSubastas = async () => {
      try {
        const data = await fetchSubastas(); 
        setSubastas(data);
      } catch (error) {
        console.error('Error al cargar las subastas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubastas();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Subastas activas</h2>
      
      {/* Mostrar un mensaje de carga */}
      {isLoading ? (
        <p>Cargando subastas...</p>
      ) : subastas.length > 0 ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {subastas.map((subasta) => (
            <SwiperSlide key={subasta.id}>
              <SubastaCard
                id={subasta.id} // Campo "id"
                nombre={subasta.nombre} // Campo "nombre" del array
                descripcion={subasta.descripcion} // Campo "descripcion"
                fotos={[subasta.fotos[0]]} // Toma la primera imagen del array "fotos" y la envuelve en un array
                precioActual={subasta.precioActual} // Precio actual
                precioInicial={subasta.precioInicial} // Precio inicial
                fechaCreacion={subasta.fechaCreacion} // Fecha de creación
                estado={subasta.estado} // Estado de la subasta
                usuario_subasta={subasta.usuario_subasta} // Usuario de la subasta
                label="Ultima puja" // Etiqueta fija para la moneda
                fechaCierre={subasta.fechaCierre} // Fecha de cierre como cuenta regresiva
                onBid={() => console.log(`Puja realizada en ${subasta.nombre}`)} // Acción al pujar
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No hay subastas activas en este momento.</p>
      )}
    </div>
  );
};

export default CarruselSubastas;
