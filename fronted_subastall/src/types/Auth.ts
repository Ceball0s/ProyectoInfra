export interface RegisterRequest {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    country: string;
    date: String;
    genter: String;
}

export interface Credentials {
    username: string;
    password: string;
}

export interface User {
    id: number;
    username: string;
    lastname: string;
    firstname: string;
    country: string;
    token: string;
}


export interface Subasta {
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

export interface Puja {
    subastaId: number;
    monto: number;
}

