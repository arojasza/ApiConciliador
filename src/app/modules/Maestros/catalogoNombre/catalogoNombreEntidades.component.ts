import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CatalogoNombreParameters, CatalogoNombreCreacion, CatalogoNombreEntidad } from './Interfaces/CatalogoNombre.interfaces';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService } from 'primeng/dynamicdialog';
import { conversionCantrosCostoModalComponent } from './conversionCentrosCosto-crud-modal/conversionCantrosCosto.component';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CustomMessageService } from '../../../services/custom-message.service';
import { Paginated } from '../../../shared/interfaces/pagination.interface';
import { PagedRequest } from '../../../shared/interfaces/request.interfaces';
import { CrudCommand } from '../../../shared/interfaces/crud.interfaces';
import { ViewTitleComponent } from '../../../shared/components/view-title/view-title.component';
import { CustomBreadcrumbService } from '../../../services/custom-breadcrumb.service';
import { StatusChipComponent } from '../../../shared/components/status-chip/status-chip.component';
import { catalogoNombreEntidadesService } from './Services/catalogoNombreEntidades.service';

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [
    TooltipModule,
    FormsModule,
    CommonModule,
    ViewTitleComponent,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    StatusChipComponent],
  templateUrl: './catalogoNombreEntidades.component.html',
  providers: [DialogService, MessageService, CustomMessageService, ConfirmationService],
})
export class CatalogoNombreEntidades implements OnInit {
  public loadingTable: boolean = false;
  public pageTitle: string = 'Parametrización de nombres de catalogos';
  public viewDescription: string = 'Realiza búsquedas de manera agil por medio de los siguientes filtros';
  public Areas: Array<CatalogoNombreEntidad> = [];
  public paginatedAreas: Paginated<CatalogoNombreEntidad> = {
    totalPages: 0,
    totalCount: 0,
    result: []
  };
  public dialogHeader!: string;
  public pageInfo: PagedRequest = {
    page: 1,
    rows: 5,
    keyParameter: ''
  };
  constructor(
    private _customBreadcrumbService: CustomBreadcrumbService,
    private areaService: catalogoNombreEntidadesService,
    private dialogService: DialogService,
  ) { }

  Search() {
    console.log("entra")
    this.pageInfo.page = 1;
    this.pageInfo.rows = 5;
    this.LoadData(this.pageInfo);
  }

  LoadData(request: PagedRequest) {
    this.GetAreas(request);
  }


  ngOnInit(): void {
    setTimeout(() => {
      this._customBreadcrumbService.AddBreadcrumb(this._menuItem);
    });
    this.LoadData(this.pageInfo);
  }

  LoadAreas(event: TableLazyLoadEvent) {
    let { first, rows } = event;

    if (first !== undefined && rows !== undefined && rows !== null) {
      this.pageInfo.page = first / rows + 1;
      this.pageInfo.rows = rows;
    }

    this.LoadData(this.pageInfo);
  }

  private GetAreas(request: PagedRequest) {
    console.log("entro a GetAreas")
    this.loadingTable = true;
    this.areaService.getList(request).subscribe({
      next: (Areas) => (this.paginatedAreas = Areas),
      error: (err) => { },
      complete: () => {
        this.loadingTable = false;
      },
    });
  }

  RowsChange(rowsSize: number) {
    console.log(rowsSize);
  }

  ConfirmCreateDialog() {
    let data: CrudCommand<CatalogoNombreParameters> = {
      method: 'CREATE',
      parameters: {
        area: null
      },
    };

    const ref = this.dialogService.open(conversionCantrosCostoModalComponent,
      {
        header: 'Adicionar empresa',
        width: '50vw',
        data,
      });


    ref.onClose.subscribe({
      next: (data) => {
        this.LoadData(this.pageInfo);
      },
    });
  }

  ConfirmEditDialog(report: CatalogoNombreEntidad) {
    let data: CrudCommand<CatalogoNombreEntidad> = {
      method: 'EDIT',
      parameters: report
    };

    const ref = this.dialogService.open(conversionCantrosCostoModalComponent, {
      header: 'Editar reporte',
      width: '50vw',
      data,
    });

    ref.onClose.subscribe({
      next: (data) => {
        this.LoadData(this.pageInfo);
      },
    });
  }

  ConfirmDeleteDialog(report: CatalogoNombreEntidad) {
    let data: CrudCommand<CatalogoNombreEntidad> = {
      method: 'DELETE',
      parameters: report
    };

    const ref =this.dialogService.open(conversionCantrosCostoModalComponent, {
      header: 'Eliminar Conversión',
      width: '30vw',
      data,
    });

    ref.onClose.subscribe({
      next: (data) => {
        this.LoadData(this.pageInfo);
      },
    });
  }

  private _menuItem: MenuItem = {
    label: 'Empresa',
    routerLink:'/empresa'
  };
}