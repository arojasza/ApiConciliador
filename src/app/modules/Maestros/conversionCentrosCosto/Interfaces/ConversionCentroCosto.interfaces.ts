
export interface ConversionCentrosCostoCreacion{
    codigoConversion: string;
    centroCostoConversion: string;
    bancoConversion: number,
    estado: string | number,
    fechaCreacion: string,
    fechaActualizacion: string,
    usuarioCreacionModificacion: string
}

export interface ConversionCentrosCostoEntidad {
    id: number;
    codigoConversion: string;
    centroCostoConversion: string;
    bancoConversion: number,
    estado: string | number,
    fechaCreacion: string,
    fechaActualizacion: string,
    usuarioCreacionModificacion: string
}

export interface AreaCrudCommandParameters {
    area: ConversionCentrosCostoEntidad | null;
}