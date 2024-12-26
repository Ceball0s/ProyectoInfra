import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSubastas } from "../../services/fetchSubastas";
import { CATEGORIAS_PALABRAS_RESERVADAS } from "../../constants/categorias";
import SubastaCard from "../subasta/SubastaCard";
import Navbar from "../Navbar/Navbar";

const CategoriaPage: React.FC = () => {
  const { category } = useParams<{ category: string }>(); // Obtener la categoría desde la URL
  const [filteredSubastas, setFilteredSubastas] = useState<any[]>([]);

  useEffect(() => {
    const getFilteredSubastas = async () => {
      try {
        const allSubastas = await fetchSubastas();
        const reservedWords = CATEGORIAS_PALABRAS_RESERVADAS[category || ""] || [];

        // Filtrar las subastas cuyo nombre contenga alguna palabra reservada
        const filtered = allSubastas.filter((subasta: any) =>
          reservedWords.some((word) =>
            subasta.nombre.toLowerCase().includes(word.toLowerCase())
          )
        );

        setFilteredSubastas(filtered);
      } catch (error) {
        console.error("Error al obtener las subastas filtradas:", error);
      }
    };

    getFilteredSubastas();
  }, [category]);

  const noResults = filteredSubastas.length === 0;

  return (
    <div>
      <Navbar />

      {/* Encabezado dinámico */}
      {category && (
        <h1 className="text-center mt-4 text-2xl font-semibold">
          Subastas en la categoría: "{category}"
        </h1>
      )}

      {/* Cartel de "No encontrado" con recomendaciones */}
      {noResults && (
        <div className="mt-8 mx-auto max-w-4xl bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-2">No se encontraron subastas</h2>
          <p className="mb-2">
            Lo sentimos, no pudimos encontrar subastas en esta categoría, pero
            puedes explorar otras opciones.
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

export default CategoriaPage;