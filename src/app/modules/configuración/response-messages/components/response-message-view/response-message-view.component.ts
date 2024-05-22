import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ErrorDescription } from '../../../../../shared/interfaces/api-response.interfaces'; 
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DialogService } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Observable, Subscription } from 'rxjs';
import { mensajesRespuestaReading } from '../../interfaces/response-message';
import { CustomMessageService } from '../../../../../services/custom-message.service';
import { Paginated } from '../../../../../shared/interfaces/pagination.interface';
import { PagedRequest } from '../../../../../shared/interfaces/request.interfaces';
import { CrudHandler, CrudOptions } from '../../../../../shared/interfaces/crud.interfaces';
import { ViewTitleComponent } from '../../../../../shared/components/view-title/view-title.component';
import { ResponseMessageService } from '../../services/response-message.service';
import { responseMessageData } from '../../services/response-message-data.service';

@Component({
  selector: 'app-response-message-view',
  standalone: true,
  imports: [
    FormsModule,
    ViewTitleComponent,
    TableModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DividerModule,
    InputSwitchModule,
    TagModule,
    RouterOutlet,
    CardModule,
    AvatarModule,
  ],
  templateUrl: './response-message-view.component.html',
  providers: [CustomMessageService],
})
export class ResponseMessageViewComponent  implements OnInit, OnDestroy{
  public selectedMethod!: CrudOptions;
  public pageTitle: string = 'Configuración de plantilla';
  public viewDescription: string = 'Realiza búsquedas de manera agil por medio de los siguientes filtros';
  public loadingDataTable: boolean = false;
  public selectedUserRemittance!: mensajesRespuestaReading;

  private _mensajesRespuesta$!: Observable<Paginated<mensajesRespuestaReading>>;
  private _mensajesRespuesta!: Subscription;
  public pagedRequest: PagedRequest = {
    rows: 5,
    page: 1,
  };

  public paginatedRespuestaMensajes: Paginated<mensajesRespuestaReading> = {
    result: [],
    totalCount: 0,
    totalPages: 0,
  };

  private _dialogHandler: CrudHandler = {
    CREATE: () => {
      this._router.navigateByUrl('/configuracion/configuracion-plantilla/crear-o-modificar');
    },
    EDIT: (parameter: mensajesRespuestaReading) => {

      this._router.navigateByUrl('/configuracion/configuracion-plantilla/crear-o-modificar');
    },
    DELETE: (parameter: mensajesRespuestaReading) => {

    },
  };

  private _menuItem: MenuItem = {
    label: 'Listar',
    routerLink: 'remesadoras/ver',
  };

  constructor(
    private _responseMessageService: ResponseMessageService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _remittanceService: responseMessageData,
    private _router: Router
  ) {}

  public OpenDialog(
    method: CrudOptions,
    parameters: mensajesRespuestaReading | null = null
  ) {
    this.selectedMethod = method;
    this._dialogHandler[method](parameters);
  }

  public PageChange(event: TableLazyLoadEvent) {
    let { first, rows } = event;

    if (first !== undefined && rows !== undefined && rows !== null) {
      this.pagedRequest.page = first / rows + 1;
      this.pagedRequest.rows = rows;
    }

    this.GetRemittances();
  }

  public GetSeverity(data: boolean) {
    return data ? '#00a1ae' : '#ff6900';
  }

  public GetStatusText(data: boolean) {
    return data ? 'Activo' : 'Inactivo';
  }

  private GetRemittances() {
    this.loadingDataTable = true;
    this._mensajesRespuesta$ = this._responseMessageService.getList(
      this.pagedRequest
    );

    this._mensajesRespuesta = this._mensajesRespuesta$.subscribe({
      next: (response) => {
        console.log(response)
        this.paginatedRespuestaMensajes = response;
      },
      error: (err) => {},
      complete: () => {
        this.loadingDataTable = false;
      },
    });
  }

  ngAfterViewInit(): void {
    this._changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this._remittanceService.AddBreadcrumb(this._menuItem);
    });
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this._remittanceService.RemoveLastBreadcrumb();
    });
  }
}
