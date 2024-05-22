
export interface AreasCreation {
    identificacion: string;
    nombres: string;
    correo: string;
    rol: number,
    estado: string,
    ultimaConexion: string,
    fechaCreacion: string,
    fechaActualizacion: string,
    usuarioCreacionModificacion: string
}

export interface AreasEntidad {
    id: number;
    identificacion: string;
    nombres: string;
    correo: string;
    rol: number,
    estado: string,
    ultimaConexion: string,
    fechaCreacion: string,
    fechaActualizacion: string,
    usuarioCreacionModificacion: string
}

export interface AreaCrudCommandParameters {
    area: AreasEntidad | null;
}