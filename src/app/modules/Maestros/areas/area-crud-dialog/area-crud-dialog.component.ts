import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { AreasService } from '../Services/areas.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { AreasCreation, AreasEntidad } from '../Interfaces/areas.interfaces';
import { CommonModule } from '@angular/common';
import { CrudCommand, CrudHandler } from '../../../../shared/interfaces/crud.interfaces';
import { CustomMessageService } from '../../../../services/custom-message.service';

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
  ],
  providers: [MessageService],
  templateUrl: './area-crud-dialog.component.html',
})
export class AreaCrudDialogComponent implements OnInit {
  public command!: CrudCommand<AreasEntidad>;
  private _createReportSubscription!: Subscription;
  public formGroup: FormGroup = this._formBuilder.group({
    id: [0, []],
    identificacion: ['', [Validators.required]],
    nombres: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    rol: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    ultimaConexion: ['', [Validators.required]],
    fechaCreacion: ['', [Validators.required]],
    fechaActualizacion: ['', [Validators.required]],
    usuarioCreacionModificacion: ['', [Validators.required]],
  });
  public mostrarCampoRequerido: boolean = false;
  private InitCommandHandler: CrudHandler = {
    CREATE: () => {
      this.formGroup.reset();
    },
    EDIT: (AreasEntidad: AreasEntidad) => {
      this.formGroup.reset(AreasEntidad);
    },
    DELETE: (AreasEntidad: AreasEntidad) => {
      this.formGroup.reset(AreasEntidad);
    },
  };

  public get area() {
    console.log(this.command.parameters.Nombres)
    return this.command.parameters.Nombres;

  }
  constructor(
    private messageServiceCustom: CustomMessageService,
    public _dynamicDialogRef: DynamicDialogRef,
    private _dynamicDialogConfig: DynamicDialogConfig,
    private _formBuilder: FormBuilder,
    private areasService: AreasService,
    public ref: DynamicDialogRef,
  ) { }

  OnSubmit() {
    this._onSubmitCommandHandler[this.command.method]()
  }
  private get createRequest(): AreasCreation {
    let creationRolRequest: AreasCreation = this.formGroup.value;
    return creationRolRequest;
  }

  private get rolRequest(): AreasEntidad {
    let updateRolRequest: AreasEntidad = this.formGroup.value;
    return updateRolRequest;
  }

  private _onSubmitCommandHandler: CrudHandler = {
    CREATE: () => {
      if (this.formGroup.valid) {
        this._createReportSubscription = this.areasService.add(this.createRequest).subscribe({
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
        this._createReportSubscription = this.areasService.update(this.rolRequest.Id, this.rolRequest).subscribe({
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
        this._createReportSubscription = this.areasService.delete(this.rolRequest.Id).subscribe({
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
    this.command = this._dynamicDialogConfig.data as CrudCommand<AreasEntidad> ;
    this.InitCommandHandler[this.command.method](this.command.parameters);
  }

  FieldHasErrors(controlName: string) {            
    return this.formGroup.get(controlName)?.touched && this.formGroup.get(controlName)?.errors;
  }

  CloseModal() {
    this._dynamicDialogRef.close({
      refreshTable: false,
    });
  }
}
