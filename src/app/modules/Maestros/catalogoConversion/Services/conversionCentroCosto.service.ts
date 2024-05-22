import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share, tap } from 'rxjs';

import { PagedRequest } from '../../../../shared/interfaces/request.interfaces';
import { Paginated } from '../../../../shared/interfaces/pagination.interface';
import { MessageResponse } from '../../../../shared/interfaces/response.interfaces';
import { environment } from '../../../../../environments/environment';
import { CatalogoConversionCreacion, CatalogoConversionEntidad } from '../Interfaces/catalogoConversion.interfaces';


@Injectable({
  providedIn: 'root',
})
export class ConversionCentroCostoService {
  private baseAPI: string = environment.baseUrl;
  private apiUrl: string = this.baseAPI + 'CatalogoConversion/';

  constructor(private http: HttpClient) {}

  getList(request: PagedRequest): Observable<Paginated<CatalogoConversionEntidad>> {
    return this.http.get<Paginated<CatalogoConversionEntidad>>(
      `${this.apiUrl}Get`
    );
  }

  add(modelo: CatalogoConversionCreacion): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}Crear`, modelo).pipe(share());
  }

  update(idAreas: number, modelo: CatalogoConversionCreacion): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(
      `${this.apiUrl}Actualizar`, 
      modelo
    ).pipe(share());
  }

  delete(idAreas: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.apiUrl}Eliminar/${idAreas}`).pipe(share());
  }
}
