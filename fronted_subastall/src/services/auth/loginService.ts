import axios, { AxiosError} from 'axios';
import { Credentials, RegisterRequest, User } from '../../types/Auth';

const environment = {
  urlHost: 'http://localhost:8080/',
  };

const currentUser: User = {
  id: 0, // valor por defecto
  username: '', // valor por defecto
  lastname: '', // valor por defecto
  firstname: '', // valor por defecto
  country: '', // valor por defecto
  token: sessionStorage.getItem('token') || '', // solo inicializamos el token
};

export const login = async (credentials: Credentials): Promise<string> => {
  try {
    const response = await axios.post(`${environment.urlHost}auth/login`, credentials);
    const { token } = response.data;

    sessionStorage.setItem('token', token);
    currentUser.token = token;

    return token;
  } catch (error: unknown) {
    if (error instanceof AxiosError) { // Verificamos si el error es de tipo AxiosError
      console.error('Error al iniciar sesión:', error.response || error.message);
      throw new Error(error.response?.data?.message || 'Error de conexión');
    } else {
      console.error('Error desconocido:', error);
      throw new Error('Error desconocido');
    }
  }
};



export const register = async (user: RegisterRequest): Promise<String> => {
  try {
    // Envía el objeto de usuario requerido por el servidor
    await axios.post(`${environment.urlHost}auth/register`, user);
    console.log('Usuario registrado exitosamente');
    return 'Usuario registrado exitosamente';
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Error al registrar usuario:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error de conexión');
    } else {
      console.error('Error desconocido:', error);
      throw new Error('Error desconocido');
    }
  }
};



export const logout = (): void => {
  sessionStorage.removeItem('token');
  currentUser.token = '';
};

export const getToken = (): string | null => currentUser.token;
