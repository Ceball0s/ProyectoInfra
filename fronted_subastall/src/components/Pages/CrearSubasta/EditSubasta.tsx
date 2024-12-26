import React, { useState, useEffect } from "react";
import { Navbar } from "../../Navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { getSubastaById, updateSubasta } from "../../../services/fetchSubastas";
import { format } from "date-fns";




const EditSubasta = () => {
    const { id } = useParams(); // Obtener el ID desde la URL
    const navigate = useNavigate(); // Para redirigir después de editar

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioInicial, setPrecioInicial] = useState(0);
    const [fechaCierre, setFechaCierre] = useState("");
    const [horaCierre, setHoraCierre] = useState("");
    const [fotos, setFotos] = useState("");
    const [token, setToken] = useState("");
    const API_BASE_URL = "http://127.0.0.1:8080/api/subasta/foto/";

    useEffect(() => {
        const fetchSubasta = async () => {
            try {
                const data = await getSubastaById(Number(id));
                const token = localStorage.getItem("authToken"); 
                token?.toString();

                if (!token || token == "") {
                    alert("No estás autenticado.");
                    navigate("/login");
                    return;
                }
                setToken(token);
                setNombre(data.nombre || "");
                setDescripcion(data.descripcion || "");
                setPrecioInicial(data.precioInicial || "");
                
                // Formatear la fecha a 'yyyy-MM-dd'
                const formattedDate = data.fechaCierre
                    ? format(new Date(data.fechaCierre), "yyyy-MM-dd")
                    : "";
                setFechaCierre(formattedDate);
    
                // Extraer solo la hora de la fecha ISO
                const formattedTime = data.fechaCierre
                    ? format(new Date(data.fechaCierre), "HH:mm")
                    : "";
                setHoraCierre(formattedTime);
    
                setFotos(data.fotos || null);
            } catch (error) {
                console.error("Error al cargar la subasta", error);
            }
        };
    
        fetchSubasta();
    }, [id]);

    // Función para manejar la actualización del formulario
    const manejarFormulario = async (e: React.FormEvent) => {
        e.preventDefault();
        const convertirFecha = (fecha: string, hora: string): string => {
          return `${fecha}T${hora}:00`;
        };

        // Construye el objeto de subasta
        const updatedData = {
          nombre: nombre,
          descripcion: descripcion,
          precioInicial: precioInicial,
          estado: 'ACTIVA',
          fechaCierre: convertirFecha(fechaCierre, horaCierre),
        };

        try {
            if (id) {
                await updateSubasta(Number(id), updatedData, token);
                alert("Subasta actualizada correctamente");
            } else {
                alert("ID de subasta no válido");
            }
            alert("Subasta actualizada correctamente");
        } catch (error) {
            alert("Error al actualizar la subasta");
        }
    };

    // Función para previsualizar imágenes
    const previewImage = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => setFotos(reader.result as string);
        reader.readAsDataURL(file);
    };
    
    return (
        <div className="bg-[#FFF] p-8">
          
          <div className="fixed top-0 left-0 w-full bg-red-800 text-white shadow-md z-50">
            <Navbar />
          </div>
    
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto mt-16">
            {/* Columna Izquierda */}
            <div className="flex flex-col items-center bg-[#E3CDA4] w-full lg:w-1/3 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-[#703030] mb-4">Imagen del Producto</h2>
    
              <div className="w-40 h-40 rounded-full bg-[#703030] flex items-center justify-center overflow-hidden mb-4">
                {fotos && (
                  <img src={`${API_BASE_URL}${fotos[0]}`}  className="object-cover w-full h-full" />
                )}
              </div>
    
              <input
                type="file"
                accept="image/*"
                onChange={(e) => previewImage(e.target.files![0])}
              />
            </div>
    
            {/* Columna Derecha */}
            <div className="bg-[#E3CDA4] w-full lg:w-2/3 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-[#703030] mb-4">Detalles del Producto</h2>
    
              <form onSubmit={manejarFormulario} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Título</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                  />
                </div>
    
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Descripción</label>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                    className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                  />
                </div>
    
                <div>
                  <label className="block text-sm font-medium">Precio Inicial</label>
                  <input
                    type="number"
                    value={precioInicial}
                    onChange={(e) => setPrecioInicial(Number(e.target.value))}
                    required
                    className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                  />
                </div>
    
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Fecha de Cierre</label>
                    <input
                      type="date"
                      value={fechaCierre}
                      onChange={(e) => setFechaCierre(e.target.value)}
                      required
                      className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Hora de Cierre</label>
                    <input
                      type="time"
                      value={horaCierre}
                      onChange={(e) => setHoraCierre(e.target.value)}
                      required
                      className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                    />
                  </div>
                </div>
    
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-[#703030] text-white rounded-lg py-2 hover:bg-[#502020]"
                  >
                    Editar Subasta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}

export default EditSubasta;