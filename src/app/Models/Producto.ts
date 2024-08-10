import Categoria from "./Categoria";

interface Productos{
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    estado: boolean;
    categoria: Categoria;
}

export default Productos;