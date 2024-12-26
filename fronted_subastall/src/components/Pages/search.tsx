import React, { useState, useEffect } from "react";
import { fetchSubastas } from "../../services/fetchSubastas";
import Navbar from "../Navbar/Navbar";
import SubastaCard from "../subasta/SubastaCard";
import { useParams } from "react-router-dom";

const SearchSubasta: React.FC = () => {
  const [subastas, setSubastas] = useState<any[]>([]);
  const [filteredSubastas, setFilteredSubastas] = useState<any[]>([]);
  const [noResults, setNoResults] = useState(false); // Estado para mostrar recomendaciones
  const { query } = useParams<{ query: string }>();

  // Cargar las subastas al montar el componente
  useEffect(() => {
    const loadSubastas = async () => {
      const data = await fetchSubastas();
      setSubastas(data);

      if (query) {
        filterSubastas(data, query);
      } else {
        setFilteredSubastas(data); // Mostrar todas si no hay query
      }
    };
    loadSubastas();
  }, [query]);

  // Función para filtrar subastas
  const filterSubastas = (data: any[], query: string) => {
    const filtered = data.filter((subasta) =>
      subasta.nombre.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      setNoResults(true); // No encontró resultados
      setFilteredSubastas(data); // Mostrar todas las subastas como recomendación
    } else {
      setNoResults(false); // Sí encontró resultados
      setFilteredSubastas(filtered);
    }
  };

  return (
    <div>
      <Navbar />

      {/* Encabezado dinámico */}
      {query && (
        <h1 className="text-center mt-4 text-2xl font-semibold">
          Resultados de búsqueda para: "{query}"
        </h1>
      )}

      {/* Cartel de "No encontrado" y recomendaciones */}
      {noResults && (
        <div className="mt-8 mx-auto max-w-4xl bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-2">Subasta no encontrada</h2>
          <p className="mb-2">
            Lo sentimos, no pudimos encontrar ninguna subasta que coincida con
            tu búsqueda, pero aquí tienes algunas recomendaciones:
          </p>
        </div>
      )}

      {/* Lista de subastas */}
      <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSubastas.length > 0 ? (
          filteredSubastas.map((subasta) => (
            <SubastaCard
              key={subasta.id}
              id={subasta.id}
              nombre={subasta.nombre}
              descripcion={subasta.descripcion}
              fotos={subasta.fotos}
              precioActual={subasta.precioActual}
              precioInicial={subasta.precioInicial}
              fechaCreacion={subasta.fechaCreacion}
              estado={subasta.estado}
              usuario_subasta={subasta.usuario_subasta}
              label="Oferta Actual"
              fechaCierre={subasta.fechaCierre}
              onBid={() => console.log(`Pujar en la subasta ${subasta.id}`)}
            />
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-600">
            No se encontraron resultados
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchSubasta;