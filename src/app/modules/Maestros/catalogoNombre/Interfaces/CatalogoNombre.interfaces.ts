
export interface CatalogoNombreCreacion{
    codigo: string;
    descripcion: string;
    fechaCreacion: string,
    fechaActualizacion: string,
    usuarioCreacionModificacion: string
}

export interface CatalogoNombreEntidad {
    id: number;
    codigo: string;
    descripcion: string;
    fechaCreacion: string,
    fechaActualizacion: string,
    usuarioCreacionModificacion: string
}

export interface CatalogoNombreParameters {
    area: CatalogoNombreEntidad | null;
}