
export interface AreasCreation {
    Identificacion: string;
    Nombres: string;
    Correo: string;
    Rol: number,
    Estado: string,
    UltimaConexion: string,
    FechaCreacion: string,
    FechaActualizacion: string,
    UsuarioCreacionModificacion: string
}

export interface AreasEntidad {
    Id: number;
    Identificacion: string;
    Nombres: string;
    Correo: string;
    Rol: number,
    Estado: string,
    UltimaConexion: string,
    FechaCreacion: string,
    FechaActualizacion: string,
    UsuarioCreacionModificacion: string
}

export interface AreaCrudCommandParameters {
    area: AreasEntidad | null;
}