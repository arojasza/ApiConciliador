import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share, tap } from 'rxjs';

import { PagedRequest } from '../../../../shared/interfaces/request.interfaces';
import { Paginated } from '../../../../shared/interfaces/pagination.interface';
import { MessageResponse } from '../../../../shared/interfaces/response.interfaces';
import { environment } from '../../../../../environments/environment';
import { CatalogoGeneralCreacion, CatalogoGeneralEntidad } from '../Interfaces/catalogoGeneral.interfaces';



@Injectable({
  providedIn: 'root',
})
export class CatalogoGeneralService {
  private baseAPI: string = environment.baseUrl;
  private apiUrl: string = this.baseAPI + 'CatalogoGeneral/';

  constructor(private http: HttpClient) {}

  getList(request: PagedRequest): Observable<Paginated<CatalogoGeneralEntidad>> {
    return this.http.get<Paginated<CatalogoGeneralEntidad>>(
      `${this.apiUrl}Get`
    );
  }

  add(modelo: CatalogoGeneralCreacion): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}Crear`, modelo).pipe(share());
  }

  update(idAreas: number, modelo: CatalogoGeneralCreacion): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(
      `${this.apiUrl}Actualizar`, 
      modelo
    ).pipe(share());
  }

  delete(idAreas: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.apiUrl}Eliminar/${idAreas}`).pipe(share());
  }
}
