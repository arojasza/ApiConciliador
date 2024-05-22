import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ConversionCentroCostoService } from '../Services/conversionCentroCosto.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CrudCommand, CrudHandler } from '../../../../shared/interfaces/crud.interfaces';
import { CustomMessageService } from '../../../../services/custom-message.service';
import { StatusChipComponent } from '../../../../shared/components/status-chip/status-chip.component';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConversionCentrosCostoCreacion, ConversionCentrosCostoEntidad } from '../Interfaces/ConversionCentroCosto.interfaces';
import { BrowserModule } from '@angular/platform-browser';
import { AreasService } from '../../areas/Services/areas.service';
import { PagedRequest } from '../../../../shared/interfaces/request.interfaces';
import { AreasEntidad } from '../../areas/Interfaces/areas.interfaces';
import { Paginated } from '../../../../shared/interfaces/pagination.interface';
import { format } from 'date-fns';
import { DateService } from '../../../../services/date.service';

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
  public command!: CrudCommand<ConversionCentrosCostoEntidad>;
  public checked: boolean = false;
  public lista: SelectItem[]= [];

  private _createReportSubscription!: Subscription;
  public formGroup: FormGroup = this._formBuilder.group({
    id: [0, []],
    codigoConversion: ['', [Validators.required]],
    centroCostoConversion: ['', [Validators.required]],
    bancoConversion: ['', [Validators.required]],
    estado: ['1', [Validators.required]],
    fechaCreacion: [''],
    fechaActualizacion: [''],
    usuarioCreacionModificacion: ['', [Validators.required]],
  });
  public mostrarCampoRequerido: boolean = false;
  private InitCommandHandler: CrudHandler = {
    CREATE: () => {
      this.formGroup.reset();
    },
    EDIT: (ConversionCentrosCostoEntidad: ConversionCentrosCostoEntidad) => {
      this.formGroup.reset(ConversionCentrosCostoEntidad);
    },
    DELETE: (ConversionCentrosCostoEntidad: ConversionCentrosCostoEntidad) => {
      this.formGroup.reset(ConversionCentrosCostoEntidad);
    },
  };

  public usuariosNombres: Paginated<AreasEntidad> = {
    totalPages: 0,
    totalCount: 0,
    result: []
  };

  private GetUsuarios(request?: PagedRequest) {
    console.log("entro a GetUsuarios")
    this.areaService.getList(request).subscribe(
      (usuarios: any) => {
        this.usuariosNombres = usuarios;
        this.usuariosNombres.result.forEach(user => {
          this.lista.push({ label: user.nombres, value: user.nombres });
        });
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  public get area() {
    console.log(this.command.parameters.centroCostoConversion)
    return this.command.parameters.centroCostoConversion;

  }
  constructor(
    private messageServiceCustom: CustomMessageService,
    public _dynamicDialogRef: DynamicDialogRef,
    private _dynamicDialogConfig: DynamicDialogConfig,
    private _formBuilder: FormBuilder,
    private ConversionCentroCostoService: ConversionCentroCostoService,
    public ref: DynamicDialogRef,
    public areaService: AreasService,
    private dateService: DateService
  ) {
    const today = this.dateService.getCurrentFormattedDate();
  }

  OnSubmit() {
    this.command.parameters.fechaActualizacion
    this._onSubmitCommandHandler[this.command.method]()

    console.log(this.command.method);
  }
  private get createRequest(): ConversionCentrosCostoCreacion {
    this.formGroup.get('')
    let creationRolRequest: ConversionCentrosCostoCreacion = this.formGroup.value;
    return creationRolRequest;
  }

  private get rolRequest(): ConversionCentrosCostoEntidad {
    let updateRolRequest: ConversionCentrosCostoEntidad = this.formGroup.value;
    return updateRolRequest;
  }

  private _onSubmitCommandHandler: CrudHandler = {
    CREATE: () => {

      if (this.formGroup.valid) {
        console.log(this.createRequest)
        this._createReportSubscription = this.ConversionCentroCostoService.add(this.createRequest).subscribe({
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
        this._createReportSubscription = this.ConversionCentroCostoService.update(this.rolRequest.id, this.rolRequest).subscribe({
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
        this._createReportSubscription = this.ConversionCentroCostoService.delete(this.rolRequest.id).subscribe({
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
    this.command = this._dynamicDialogConfig.data as CrudCommand<ConversionCentrosCostoEntidad>;
    this.InitCommandHandler[this.command.method](this.command.parameters);
    const estadoValue = this.command.parameters.estado === 1 || this.command.parameters.estado === '1' ? 1 : 2;
    this.formGroup.patchValue({ estado: estadoValue });
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
