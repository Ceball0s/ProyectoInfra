import { useState, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import { SubastaCard } from "../subasta/SubastaCard";
import { Subasta } from "../../types/Auth";
import { fetchUserSubastas } from "../../services/fetchSubastas";


export const SubastaPage: React.FC = () => {
    const [showFilters, setShowFilters] = useState(true);
    const [subastas, setSubastas] = useState<Subasta[]>([]);
    const [Loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const token = localStorage.getItem("authToken"); // Obtén el token desde el localStorage
        if (!token) {
            setError("No estás autenticado.");
            setLoading(false);
            return;
        }

        const getSubastas = async () => {
            try {
                setLoading(true);
                const data = await fetchUserSubastas(token);
                setSubastas(data);
            } catch (error) {
                setError("Hubo un error al cargar las subastas.");
            } finally {
                setLoading(false);
            }
        };


        getSubastas();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full bg-red-800 text-white shadow-md z-50">
                <Navbar />
            </div>

            {/* Contenedor principal */}
            <div className="pt-16 flex max-w-7xl mx-auto">
                {/* Panel lateral de filtros */}
                {showFilters && (
                    
                    <aside className="bg-white w-64 p-4 shadow-lg">
                        <h2 className="text-lg font-bold">Filtrar por</h2>
                        <div className="mt-4 space-y-4">
                            {/* Filtros */}
                            <div className="FFF">
                                <label className="block text-sm font-medium text-gray-700">
                                    Categoría
                                </label>
                                <select className="w-full bg-gray-200 p-2 rounded">
                                    <option>Todas</option>
                                    <option>Electrónica</option>
                                    <option>Vehículos</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Precio
                                </label>
                                <input
                                    type="range"
                                    className="w-full"
                                    min="0"
                                    max="1000"
                                />
                            </div>
                            {/* Botones */}
                            <div className="flex space-x-2">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Aplicar
                                </button>
                                <button className="bg-gray-300 px-4 py-2 rounded">
                                    Limpiar
                                </button>
                            </div>
                        </div>
                    </aside>
                )}


                {/* Botón para ocultar/mostrar filtros */}
                <div className="bg-gray-100 p-2">
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
                    </button>
                </div>

                {/* Sección de subastas */}
                <main className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    {Loading ? (
                        <p className="text-center text-gray-500">Cargando subastas...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : subastas.length === 0 ? (
                        <div className="col-span-full text-center p-4 bg-white rounded shadow-md">
                            <p className="text-gray-500 font-bold">No hay subastas aún.</p>
                        </div>
                    ) : (
                        subastas.map((subasta) => (
                            <SubastaCard
                                key={subasta.id}
                                id={subasta.id}
                                nombre={subasta.nombre}
                                descripcion={subasta.descripcion}
                                fotos={[subasta.fotos[0]]}
                                precioActual={subasta.precioActual}
                                precioInicial={subasta.precioInicial}
                                fechaCreacion={subasta.fechaCreacion}
                                fechaCierre={subasta.fechaCierre}
                                estado={subasta.estado}
                                usuario_subasta={subasta.usuario_subasta}
                                label="Ultima puja"
                                showEdit = {true}
                                onBid={() => console.log(`Puja realizada en ${subasta.nombre}`)}
                            />
                        ))
                    )}

                </main>
            </div>
        </div>
    );
};