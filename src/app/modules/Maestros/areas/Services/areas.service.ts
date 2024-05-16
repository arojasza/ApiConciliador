import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share, tap } from 'rxjs';
import {
  AreasCreation,
  AreasEntidad,
} from '../Interfaces/areas.interfaces';
import { PagedRequest } from '../../../../shared/interfaces/request.interfaces';
import { Paginated } from '../../../../shared/interfaces/pagination.interface';
import { MessageResponse } from '../../../../shared/interfaces/response.interfaces';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AreasService {
  private baseAPI: string = environment.baseUrl;
  private apiUrl: string = this.baseAPI + 'Usuario/';

  constructor(private http: HttpClient) {}

  getList(request: PagedRequest): Observable<Paginated<AreasEntidad>> {
    return this.http.get<Paginated<AreasEntidad>>(
      `${this.apiUrl}GetUsuarios`
    );
  }

  add(modelo: AreasCreation): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}CrearUsuario`, modelo).pipe(share());
  }

  update(idAreas: number, modelo: AreasEntidad): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(
      `${this.apiUrl}ActualizarUsuario`, 
      modelo
    ).pipe(share());
  }

  delete(idAreas: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.apiUrl}EliminarUsuario/${idAreas}`).pipe(share());
  }
}
