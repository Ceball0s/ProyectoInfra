import { Navbar } from '../../Navbar/Navbar';
import { useState, useEffect } from 'react';
import { addSubasta } from '../../../services/fetchSubastas';



const CrearSubasta = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioInicial, setPrecioInicial] = useState("");
    const [fotos, setFotos] = useState("");
    const [fechaCierre, setFechaCierre] = useState("");
    const [horaCierre, setHoraCierre] = useState("23:59");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");

    //----------Traer al token del localStorage----------------
    useEffect(() => {
        const token = localStorage.getItem("authToken"); // Obtén el token desde el localStorage
        token?.toString();
        if (!token) {
            setError("No estás autenticado.");
            setLoading(false);
            return;
        }

        
        setToken(token);
    }, []);

    const manejarFormulario = async (e: React.FormEvent) => {
        e.preventDefault();

        if (new Date(fechaCierre) <= new Date()) {
            alert('La fecha de cierre debe ser posterior a hoy.');
            return;
        }

        // Construye el objeto de subasta
        const nuevaSubasta = {
            nombre: nombre,
            descripcion: descripcion,
            precioInicial: parseFloat(precioInicial),
            fotos:[fotos],
            fechaCierre: convertirFecha(fechaCierre, horaCierre),
        };

        try {
            const resultado = await addSubasta(nuevaSubasta, token);
            console.log('Subasta agregada exitosamente:', resultado);
            alert('Subasta creada correctamente');
            setNombre('');
            setDescripcion('');
            setPrecioInicial('');
            setFotos('');
            setFechaCierre('');
        } catch (error) {
            alert('Hubo un error al crear la subasta.');
        }
    };

    const previewImage = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFotos(reader.result as string);
        };
    }

    const convertirFecha = (fecha: string, hora: string): string => {
        return `${fecha}T${hora}:00`;
    };

    const validarFecha = (fecha: string) => {
        const now = new Date();
        const cierre = new Date(fecha);
        const diff = cierre.getTime() - now.getTime()

        console.log(diff)
        if (diff < 0) return "Fecha invalida";
        else setFechaCierre(fecha);

    }

    return (
        <div className="bg-[#FFF] p-8">

            {/* Barra de Navegación */}
            <div className="fixed top-0 left-0 w-full bg-red-800 text-white shadow-md z-50">
                <Navbar />
            </div>

            {/* Contenido principal */}
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto mt-16">
                {/* Columna Izquierda */}
                <div className="flex flex-col items-center bg-[#E3CDA4] w-full lg:w-1/3 rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-[#703030] mb-4">Imagen del Producto</h2>

                    {/* Contenedor del Círculo para la Vista Previa */}
                    <div className="w-40 h-40 rounded-full bg-[#703030] flex items-center justify-center overflow-hidden mb-4">
                        {fotos && (
                            <img
                                src={fotos}
                                alt="Vista previa"
                                className="object-cover w-full h-full"
                            />
                        )}
                    </div>

                    {/* Espaciador para empujar el input hacia abajo */}
                    <div className="flex-grow"></div>

                    {/* Input para Seleccionar Imagen */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => previewImage(e.target.files![0])}
                        className=""

                    />
                </div>

                {/* Columna Derecha */}
                <div className="bg-[#E3CDA4] w-full lg:w-2/3 rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-[#703030] mb-4">Detalles del Producto</h2>

                    {/* Formulario */}
                    <form onSubmit={manejarFormulario} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Título */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Título</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                                className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                            />
                        </div>

                        {/* Descripción */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                                className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                            />
                        </div>

                        {/* Precio Inicial */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Precio Inicial</label>
                            <input
                                type="number"
                                value={precioInicial}
                                onChange={(e) => setPrecioInicial(e.target.value)}
                                min="0"
                                required
                                className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                            />
                        </div>

                        {/* Fecha y Hora de Cierre */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Fecha de Cierre */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha de Cierre</label>
                                <input
                                    type="date"
                                    value={fechaCierre}
                                    onChange={(e) => validarFecha(e.target.value)}
                                    required
                                    className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                                />
                            </div>

                            {/* Hora de Cierre */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hora de Cierre</label>
                                <input
                                    type="time"
                                    onChange={(e) => setHoraCierre(e.target.value)}
                                    required
                                    className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Botón de Enviar */}
                        <div className="col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-[#703030] text-white rounded-lg py-2 px-4 shadow-lg hover:bg-[#502020]"
                            >
                                Crear Subasta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CrearSubasta;