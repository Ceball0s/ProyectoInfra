import { fetchSubastas } from "../services/fetchSubastas"


export const search = async (query: string) => {
    const subastas = await fetchSubastas();

    subastas.filter((subasta: any) => {
        return subasta.nombre.includes(query);
    });
}