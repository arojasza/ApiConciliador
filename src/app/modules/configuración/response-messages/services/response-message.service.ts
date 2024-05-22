import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, share } from 'rxjs';
import { mensajesRespuestaCreation, mensajesRespuestaReading, mensajesRespuestaUpdate } from '../interfaces/response-message';
import { environment } from '../../../../../environments/environment';
import { Paginated } from '../../../../shared/interfaces/pagination.interface';
import { PagedRequest } from '../../../../shared/interfaces/request.interfaces';
import { MessageResponse } from '../../../../shared/interfaces/response.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ResponseMessageService {

  private baseAPI: string = environment.baseUrl;
  private apiUrl: string = this.baseAPI + 'Messages/';

  constructor(private http: HttpClient) { }

  getList(request: PagedRequest): Observable<Paginated<mensajesRespuestaReading>> {
    return this.http.get<Paginated<mensajesRespuestaReading>>(
      `${this.apiUrl}Get?page=${request.page}&pageSize=${request.rows}`
    ).pipe(share());;
  }

  add(modelo: mensajesRespuestaCreation): Observable<MessageResponse> {
    console.log(modelo);
    return this.http.post<MessageResponse>(`${this.apiUrl}Create`, modelo).pipe(share());
  }

  update(modelo: mensajesRespuestaUpdate): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(
      `${this.apiUrl}Update`,
      modelo
    ).pipe(share());
  }

  delete(MessageId: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.apiUrl}Delete/${MessageId}`).pipe(share());
  }
}
