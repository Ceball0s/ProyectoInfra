import { Navbar } from "../Navbar/Navbar";


export const Profile = () => {

    return (
        <div className="bg-[#FFF] p-8">

            <div className="fixed top-0 left-0 w-full bg-red-800 text-white shadow-md z-50">
                <Navbar />
            </div>
    
            {/*--------------- Contenido Principal -------------*/}
            {/* Usa mt-[height del navbar] para evitar solapamientos */}
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto mt-16">
                
                {/*----------- Columna Izquierda ----------*/}
                <div className="flex flex-col items-center bg-[#E3CDA4] w-full lg:w-1/3 rounded-lg p-6 shadow-lg">
                    <div className="w-24 h-24 rounded-full bg-[#703030]"></div>
                    <h2 className="text-lg font-bold mt-4">Miguel Ceballos</h2>
                    <p className="text-sm text-gray-600">Colombia</p>
                </div>
    
                {/* ----------Columna Derecha ----------*/}
                <div className="bg-[#E3CDA4] w-full lg:w-2/3 rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-[#703030] mb-4">Detalles del Perfil</h2>
                    <div className="space-y-4">
                        {/*---------- Campos--------- */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Usuario</label>
                            <input
                                type="text"
                                value="usuario"
                                disabled
                                className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                value="Miguel"
                                disabled
                                className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Apellido</label>
                            <input
                                type="text"
                                value="Ceballos"
                                disabled
                                className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                            <input
                                type="text"
                                value="16/07/2003"
                                disabled
                                className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Género</label>
                            <input
                                type="text"
                                value="Masculino"
                                disabled
                                className="w-full bg-[#FFF] text-black rounded-lg p-2 shadow-inner"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}    