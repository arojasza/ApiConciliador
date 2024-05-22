import { Component, OnInit } from '@angular/core';
import { AreasService } from './Services/areas.service';
import { FormsModule } from '@angular/forms';
import { AreaCrudCommandParameters, AreasEntidad } from './Interfaces/areas.interfaces';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService } from 'primeng/dynamicdialog';
import { AreaCrudDialogComponent } from './area-crud-dialog/area-crud-dialog.component';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CustomMessageService } from '../../../services/custom-message.service';
import { Paginated } from '../../../shared/interfaces/pagination.interface';
import { PagedRequest } from '../../../shared/interfaces/request.interfaces';
import { CrudCommand } from '../../../shared/interfaces/crud.interfaces';
import { ViewTitleComponent } from '../../../shared/components/view-title/view-title.component';
import { CustomBreadcrumbService } from '../../../services/custom-breadcrumb.service';
import { StatusChipComponent } from '../../../shared/components/status-chip/status-chip.component';

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
  templateUrl: './areas.component.html',
  providers: [DialogService, MessageService, CustomMessageService, ConfirmationService],
})
export class AreasComponent implements OnInit {
  public loadingTable: boolean = false;
  public pageTitle: string = 'Parametrización de usuarios';
  public viewDescription: string = 'Realiza búsquedas de manera agil por medio de los siguientes filtros';
  public Areas: Array<AreasEntidad> = [];
  public paginatedAreas: Paginated<AreasEntidad> = {
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
    private areaService: AreasService,
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
    let data: CrudCommand<AreaCrudCommandParameters> = {
      method: 'CREATE',
      parameters: {
        area: null
      },
    };

    const ref = this.dialogService.open(AreaCrudDialogComponent,
      {
        header: 'Añadir usuario',
        width: '50vw',
        data,
      });


    ref.onClose.subscribe({
      next: (data) => {
        this.LoadData(this.pageInfo);
      },
    });
  }

  ConfirmEditDialog(report: AreasEntidad) {
    let data: CrudCommand<AreasEntidad> = {
      method: 'EDIT',
      parameters: report
    };

    const ref = this.dialogService.open(AreaCrudDialogComponent, {
      header: 'Editar usuario',
      width: '50vw',
      data,
    });

    ref.onClose.subscribe({
      next: (data) => {
        this.LoadData(this.pageInfo);
      },
    });
  }

  ConfirmDeleteDialog(report: AreasEntidad) {
    let data: CrudCommand<AreasEntidad> = {
      method: 'DELETE',
      parameters: report
    };

    const ref =this.dialogService.open(AreaCrudDialogComponent, {
      header: 'Eliminar usuario',
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
    label: 'Usuarios',
    routerLink:'/usuarios'
  };
}