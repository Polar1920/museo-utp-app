export interface User {
    id: number;
    nombre_usuario: string;
    rol: string;
    nombre: string;
    apellido: string;
    cedula: string;
    nivel: number;
    foto: string | null;
    facultad: string;
    carrera: string;
}