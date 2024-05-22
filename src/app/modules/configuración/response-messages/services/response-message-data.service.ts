import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable, share } from 'rxjs';
import { mensajesRespuestaReading } from '../interfaces/response-message';
import { CrudCommand } from '../../../../shared/interfaces/crud.interfaces';

@Injectable({
  providedIn: 'root',
})
export class responseMessageData {
  private _userRemittanceCommand!: CrudCommand<mensajesRespuestaReading>;

  private _home: MenuItem = {
    label: 'Mensajes respuesta',
    routerLink: 'mensajesRespuesta',
  };

  private _items: MenuItem[] = [this._home];

  private _breadcrumbBehaviorSubject!: BehaviorSubject<MenuItem[]>;

  constructor() {
    this._breadcrumbBehaviorSubject = new BehaviorSubject(this._items);
  }

  public GetUserRemittanceCommand() {
    return this._userRemittanceCommand;
  }

  public GetUserRemittance() {
    return this._userRemittanceCommand.method;
  }

  public SetRemittance(userRemittanceCommand: CrudCommand<mensajesRespuestaReading>) {
    this._userRemittanceCommand = userRemittanceCommand;
  }

  public GetBreadcrumb(): Observable<MenuItem[]> {
    return this._breadcrumbBehaviorSubject.asObservable().pipe(share());
  }

  public AddBreadcrumb(item: MenuItem) {
    this._items.push(item);
    this._breadcrumbBehaviorSubject.next(this._items || []);
  }

  public RemoveLastBreadcrumb() {
    this._items.pop();
    this._breadcrumbBehaviorSubject.next(this._items || []);
  }
}
