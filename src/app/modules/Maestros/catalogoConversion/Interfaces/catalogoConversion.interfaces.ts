
export interface CatalogoConversionCreacion{
    idTabla: number;
    conjuntoConversion: string;
    codigoConversion: string;
    equivalenciaConversion: string;
    conjuntoRelacionado: string;
    valorRelacionado: string;
    estado: string | number,
    fechaCreacion: string,
    fechaActualizacion: string,
    usuarioCreacionModificacion: string
}

export interface CatalogoConversionEntidad {
    id: number;
    idTabla: number;
    conjuntoConversion: string;
    codigoConversion: string;
    equivalenciaConversion: string;
    conjuntoRelacionado: string;
    valorRelacionado: string;
    estado: string | number,
    fechaCreacion: string,
    fechaActualizacion: string,
    usuarioCreacionModificacion: string
}

export interface CatalogoConversionParameters {
    area: CatalogoConversionEntidad | null;
}