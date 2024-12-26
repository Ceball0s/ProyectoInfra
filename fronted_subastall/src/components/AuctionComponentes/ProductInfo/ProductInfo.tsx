import react from "react";

interface ProductInfoProps {
    nombre: string;
    descripcion: string;
    imagen: string; // URL de la imagen
}

const ProductInfo: React.FC<ProductInfoProps> = ({
    nombre,
    descripcion,
    imagen,
}) => {
    
    return (
        
        <div className="flex items-center bg-white rounded-lg shadow-md p-4">
            {/* Imagen del Producto */}
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {imagen ? (
                    <img
                        src={imagen}
                        alt={nombre}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <span className="text-gray-500 text-xs">No Img</span>
                )}
            </div>

            {/* Información del Producto */}
            <div className="ml-4 flex-1 overflow-hidden">
                <h2 className="text-lg font-semibold truncate">{nombre}</h2>
                <p className="text-gray-500 text-sm truncate">
                    {descripcion.length > 80 ? descripcion.slice(0, 80) + "..." : descripcion}
                </p>
            </div>

            {/* Icono de expansión */}
            <div className="ml-2">
                <button className="text-gray-400 hover:text-gray-600">
                    ⤡
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;