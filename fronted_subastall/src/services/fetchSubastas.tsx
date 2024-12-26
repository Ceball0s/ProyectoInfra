import axios from 'axios';


export const fetchSubastas = async () => {
    const API_URL = 'http://localhost:8080/api/subasta/recomendaciones'; 
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al obtener las subastas');
      return await response.json();
    } catch (error) {
      console.error('Error en fetchSubastas:', error);
      throw error;
    }
};

export const getSubastaById = async (id: Number) => {
  try {
    const response = await fetch(`http://localhost:8080/api/subasta/${id}`);
    if (!response.ok) throw new Error("Error al obtener datos de la subasta");
    return await response.json();
   } catch (error) {
    console.error(error);
  }
}


export const consultarOfertas = async (id: Number) =>{
  
  try{
    const response = await fetch(`http://localhost:8080/api/ofertas/subasta/${id}`);
    // if (!response.ok) throw new Error("Error al obtener datos de la subasta");
    return response.json();
  }catch(error){
    console.error(error);
  }
}

export const consultarMejorOferta = async (id: number) => {
  const API_URL = `http://localhost:8080/api/ofertas/subasta/mejor/${id}`;

  try {
    const response = await axios.get((API_URL));
    
    //if (!response.ok) {
    //  throw new Error("Error al obtener las subastas");
    //}


    return await response.data; 
  } catch (error) {
    console.error(error);
    return [];
  }

}

export const addPuja = async (id: number, monto: number, token: string) => {
  

  // const API_URL = "http://localhost:8080/api/ofertas/crear"
  try {
    const response = await fetch(`http://localhost:8080/api/ofertas/crear`, {
      method: 'POST', // Método HTTP
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subastaId: id, // ID de la subasta
        monto: monto   // Monto de la oferta
      })
    });
  
    // Manejo específico del error 403
    if (response.status === 403) {
      const errorText = await response.text();
      console.error("Error:", errorText);
      alert("La oferta debe ser mayor al precio actual.");
      return; // Detener la ejecución aquí si hay un error
    }
  
    // Manejo de otros errores HTTP
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }
  
    // Si la solicitud es exitosa, procesar la respuesta
    const data = await response.json();
    console.log("Oferta enviada con éxito:", data);
    alert("Oferta enviada con éxito:");
    return data;
  
  } catch (error) {
    console.error("Error al enviar la oferta:", error);
    alert("Ocurrió un error inesperado. Inténtalo de nuevo más tarde.");
  }
  
}


export const fetchUserSubastas = async (token: string) => {
    const API_URL = 'http://localhost:8080/api/subasta/usuario';
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener las subastas");
      }
  
      return await response.json(); 
    } catch (error) {
      console.error(error);
      return [];
    }
}




export const addSubasta = async (subasta: object, token : string) => {
    const API_URL = 'http://localhost:8080/api/subasta/agregar';

    try {

        // Realiza la solicitud POST con axios
        const response = await axios.post(API_URL, subasta, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Retorna los datos recibidos del servidor
        return response.data;
    } catch (error) {
        // Manejo de errores: muestra el mensaje y re-lanza
        console.error('Error al agregar subasta:', error);
        //throw error.response?.data || new Error('Error al realizar la solicitud');
    }
}

export const updateSubasta = async (id: number, subastaData: any, token :string) => {
  const url = `http://localhost:8080/api/subasta/${id}`;
  console.log(token);
  try {
      const response = await axios.put(url, subastaData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
  } catch (error) {
      console.error("Error al actualizar la subasta", error);
      throw error;
  }
};

