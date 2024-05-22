
export interface CatalogoGeneralCreacion{
    idTabla: number;
    tipoCatalogoGeneral: string;
    codigo: string;
    descripcion: string;
    orden: number;
    fechaCreacion: string,
    usuarioCreacionModificacion: string
}

export interface CatalogoGeneralEntidad {
    id: number,
    idTabla: number,
    tipoCatalogoGeneral: string,
    codigo: string,
    descripcion: string,
    orden: number,
    fechaCreacion: string,
    usuarioCreacionModificacion: string
}

export interface  CatalogoGeneralParameters {
    area: CatalogoGeneralEntidad | null;
}