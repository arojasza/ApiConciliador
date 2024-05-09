export interface UsuarioCreation {
   Nombre: string;
   Correo: string;
   Contraseña: string;
   Activo: boolean;
}

export interface UsuarioEntidad {
   usuarioId: number;
   nombre: string;
   correo: string;
   contraseña: string;
   activo: boolean;
}

export interface UsuariosCrudCommandParameters {
   area: UsuarioEntidad | null;
}