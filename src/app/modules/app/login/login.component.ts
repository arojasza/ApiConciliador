import { HttpClientModule } from '@angular/common/http';
import { Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { UserEntidad } from './interfaces/user.interfaces';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { CustomMessageService } from '../../../services/custom-message.service';
import { LoginService } from './Services/login.service';
import { ErrorDescription } from '../../../shared/interfaces/api-response.interfaces';
import { MessageService } from 'primeng/api';
import { MsalModule } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [

    MsalModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService, CustomMessageService],
})
export class LoginComponent {
  public username: string | undefined;
  public password: string | undefined;
  public formSubmitted = true;
  public auth2: any;
  loading: boolean = false;

  public formGroup: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    public _customMessageService: CustomMessageService,
    private usuariosService: LoginService,
    private _messageServiceCustom: CustomMessageService,
  ) { }

  private get userRequest(): UserEntidad {
    let updateUserRequest: UserEntidad = this.formGroup.value;
    return updateUserRequest;
  }

  login() {
    if (this.formGroup.valid) {
      console.log("entro a GetUsuarios")
      this.usuariosService.getUsuarioByCredenciales(this.formGroup.controls['username'].value, this.formGroup.controls['password'].value).subscribe({
        next: (usuario) => {
          this._messageServiceCustom.showSuccess(
            'Existo', 'Se ha ingresado correctamente')
          this.formGroup.reset()
          usuario.activo = false;
          this.usuariosService.update(usuario).subscribe({
            next: () => {
              this._messageServiceCustom.showSuccess(
                'Existo', 'Se actualizó el estado del usuario'
              );
            },
            error: (err) => {
              err = err as ErrorDescription;
              this._messageServiceCustom.showError('Error', 'Error al validar las credenciales');
            }
          });
          sessionStorage.setItem('DatosUsuario', JSON.stringify(usuario))
        }
        ,
        error: (err) => {
          err = err as ErrorDescription;
          this._messageServiceCustom.showError('Error', 'error al validar las credenciales');
          this.formGroup.reset()
        }
      });
    } else {
      this.formGroup.markAsTouched();
    }
  }


  FieldHasErrors(controlName: string) {
    return this.formGroup.touched && this.formGroup.get(controlName)?.errors;
  }
}
