
export interface EmpresaCreacion{
    nombreEmpresa: string;
    codigoEmpresa: string;
    direccionEmpresa: number,
    estado: string | number,
    fechaCreacion: string,
    fechaActualizacion: string,
    usuarioCreacionModificacion: string
}

export interface EmpresaEntidad {
    id: number;
    nombreEmpresa: string;
    codigoEmpresa: string;
    direccionEmpresa: number,
    estado: string | number,
    fechaCreacion: string,
    fechaActualizacion: string,
    usuarioCreacionModificacion: string
}

export interface EmpresaParameters {
    area: EmpresaEntidad | null;
}