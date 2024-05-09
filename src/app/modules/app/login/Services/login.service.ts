import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { UsuarioCreation, UsuarioEntidad } from '../interfaces/login-form.interface';
import { Observable, share } from 'rxjs';
import { MessageResponse } from '../../../../shared/interfaces/response.interfaces';
import { environment } from '../../../../../environments/environment';

const base_url = environment.baseUrl;
declare const gapi: any;
@Injectable({
  providedIn: 'root',
})
export class LoginService {
 private baseAPI: string = environment.baseUrl;
  private apiUrl: string = this.baseAPI + 'Usuario/';

  constructor(private http: HttpClient) {}

  getList(): Observable<UsuarioEntidad> {
    return this.http.get<UsuarioEntidad>(
      `${this.apiUrl}GetUsuarios`
    );
  }

  getUsuarioByCredenciales(correo: string, contraseña: string): Observable<UsuarioEntidad> {
    return this.http.get<UsuarioEntidad>(
      `${this.apiUrl}GetUsuarioByCredenciales?correo=${correo}&contrasena=${contraseña}`
    );
  }

  add(modelo: UsuarioCreation): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}Create`, modelo).pipe(share());
  }

  update(modelo: UsuarioEntidad): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.apiUrl}ActualizarUsuario`, 
      modelo
    ).pipe(share());
  }

  delete(idAreas: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.apiUrl}Delete/${idAreas}`).pipe(share());
  }

  logout() {
    // Eliminar el usuario del sessionStorage al cerrar sesión
    sessionStorage.removeItem('usuario');
    console.log('Usuario eliminado del sessionStorage');
  }

}
