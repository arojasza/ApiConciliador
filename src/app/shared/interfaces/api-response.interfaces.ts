export interface IApiDataResponse<T> {
    data: T
}

export interface IApiMessageResponse {
    message: string
}

export interface IErrorResponse {
    errores: IErrors;
}

export interface IErrors {
    error: IError[]
}

export interface IError {
    codigo:string;
    descripcion:string;
}

export interface ErrorDescription {
    descripcion: string;
  }
  