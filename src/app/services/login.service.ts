import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsuarioCreation, UsuarioEntidad } from '../shared/interfaces/login-form.interface';
import { MessageResponse } from '../shared/interfaces/response.interfaces';

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

}
