import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { catalogoNombreEntidadesService } from '../Services/catalogoNombreEntidades.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CrudCommand, CrudHandler } from '../../../../shared/interfaces/crud.interfaces';
import { CustomMessageService } from '../../../../services/custom-message.service';
import { StatusChipComponent } from '../../../../shared/components/status-chip/status-chip.component';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CatalogoNombreCreacion, CatalogoNombreEntidad } from '../Interfaces/CatalogoNombre.interfaces';
import { BrowserModule } from '@angular/platform-browser';
import { AreasService } from '../../areas/Services/areas.service';
import { PagedRequest } from '../../../../shared/interfaces/request.interfaces';
import { AreasEntidad } from '../../areas/Interfaces/areas.interfaces';
import { Paginated } from '../../../../shared/interfaces/pagination.interface';

@Component({
  selector: 'app-area-crud-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule,
    DividerModule,
    CommonModule,
    DropdownModule,
    RadioButtonModule,
    StatusChipComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MessageService],
  templateUrl: './conversionCantrosCosto.component.html',
})
export class conversionCantrosCostoModalComponent implements OnInit {
  public command!: CrudCommand<CatalogoNombreEntidad>;
  public checked: boolean = false;
  public : string = '';
  private _createReportSubscription!: Subscription;
  public formGroup: FormGroup = this._formBuilder.group({
    id: [0, []],
    codigo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    fechaCreacion: ['', [Validators.required]],
    fechaActualizacion: ['', [Validators.required]],
    usuarioCreacionModificacion: ['', [Validators.required]],
  });
  public mostrarCampoRequerido: boolean = false;
  private InitCommandHandler: CrudHandler = {
    CREATE: () => {
      this.formGroup.reset();
    },
    EDIT: (CatalogoNombreEntidad: CatalogoNombreEntidad) => {
      this.formGroup.reset(CatalogoNombreEntidad);
    },
    DELETE: (CatalogoNombreEntidad: CatalogoNombreEntidad) => {
      this.formGroup.reset(CatalogoNombreEntidad);
    },
  };

  public usuariosNombres: Paginated<AreasEntidad> = {
    totalPages: 0,
    totalCount: 0,
    result: []
  };
  private GetUsuarios(request?: PagedRequest) {
    console.log("entro a GetUsuarios")
    this.areaService.getList(request).subscribe({
      next: (usuarios) => (this.usuariosNombres = usuarios),
      error: (err) => { },
    });
    console.log(this.usuariosNombres)
  }

  public get area() {
    console.log(this.command.parameters.codigo)
    return this.command.parameters.codigo;

  }
  constructor(
    private messageServiceCustom: CustomMessageService,
    public _dynamicDialogRef: DynamicDialogRef,
    private _dynamicDialogConfig: DynamicDialogConfig,
    private _formBuilder: FormBuilder,
    private catalogoNombreEntidadesService: catalogoNombreEntidadesService,
    public ref: DynamicDialogRef,
    public areaService: AreasService
  ) { }

  OnSubmit() {
    this.command.parameters.fechaActualizacion
    this._onSubmitCommandHandler[this.command.method]()

    console.log(this.command.method);
  }
  private get createRequest(): CatalogoNombreCreacion {
    this.formGroup.get('')
    let creationRolRequest: CatalogoNombreCreacion = this.formGroup.value;
    return creationRolRequest;
  }

  private get rolRequest(): CatalogoNombreEntidad {
    let updateRolRequest: CatalogoNombreEntidad = this.formGroup.value;
    return updateRolRequest;
  }

  private _onSubmitCommandHandler: CrudHandler = {
    CREATE: () => {

      if (this.formGroup.valid) {
        console.log(this.createRequest)
        this._createReportSubscription = this.catalogoNombreEntidadesService.add(this.createRequest).subscribe({
          next: (response) => {
            this.messageServiceCustom.showSuccess(
              'Existo',
              `${response.message}`
            );
          },
          error: (error) => {
            console.log(error);
            this.messageServiceCustom.showError(
              'Error',
              error.error.errores.error[0].descripcion
            );
          },
          complete: () => {
            this._dynamicDialogRef.close({
              refreshTable: true,
            });
          }
        });
      }
    },
    EDIT: () => {
      if (this.formGroup.valid) {
        this._createReportSubscription = this.catalogoNombreEntidadesService.update(this.rolRequest.id, this.rolRequest).subscribe({
          next: (response) => {
            this.messageServiceCustom.showSuccess(
              'Exitoso',
              `${response.message}`
            );
          },
          error: (error) => {
            this.messageServiceCustom.showError(
              'Error',
              'Algo salió mal editando el Area'
            );
          },
          complete: () => {
            this.ref.close();
          }
        })
      }
    },
    DELETE: () => {
      if (this.formGroup.valid) {
        this._createReportSubscription = this.catalogoNombreEntidadesService.delete(this.rolRequest.id).subscribe({
          next: (response) => {
            this.messageServiceCustom.showSuccess(
              'Exitoso',
              `${response.message}`
            )
          },
          error: (error) => {
            this.messageServiceCustom.showError(
              'Oho',
              error.error.errores.error[0].descripcion,
              8000
            );

            console.log(error.error.errores.error[0].descripcion);
          },
          complete: () => {
            this._dynamicDialogRef.close({
              refreshTable: true,
            });
          }
        })
      }
    },
  };

  ngOnInit(): void {
    this.GetUsuarios() 
    this.command = this._dynamicDialogConfig.data as CrudCommand<CatalogoNombreEntidad>;
    this.InitCommandHandler[this.command.method](this.command.parameters);
    console.log(this.usuariosNombres.result)
  }

  FieldHasErrors(controlName: string) {
    return this.formGroup.get(controlName)?.touched && this.formGroup.get(controlName)?.errors;
  }

  CloseModal() {
    this._dynamicDialogRef.close({
      refreshTable: false,
    });
  }


  onCheckboxChange(value: number) {
    if (value === 1) {
      this.formGroup.patchValue({ estado: 1 });
    } else if (value === 2) {
      this.formGroup.patchValue({ estado: 2 });
    }
  }

}
