export interface mensajesRespuestaCreation {
    Type: number;
    Code: number;
    title: string;
    Cause: string;
    Solution: string;
}

export interface mensajesRespuestaReading {
    IDMENSAJE: number;
    CAUSA: string;
    CODIGO: string;
    SOLUCION: string
    TIPO: string
    TITULO: string
}

export interface mensajesRespuestaUpdate {
    idMensaje: number,
    tipo: number,
    codigo: number,
    titulo: string,
    causa: string,
    solucion: string,
}