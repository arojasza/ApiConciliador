import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserEntidad } from './interfaces/user.interfaces';
import { CustomMessageService } from '../../../services/custom-message.service';
import { LoginService } from './Services/login.service';
import { ErrorDescription } from '../../../shared/interfaces/api-response.interfaces';
import { MessageService } from 'primeng/api';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalModule, MsalService } from '@azure/msal-angular';
import { environment } from '../../../../environments/environment';
import { RedirectRequest } from '@azure/msal-browser';


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
  ambiente: boolean = false;
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
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
  ) {

    this.ambiente = environment.production;
  }

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

  onIngresarClick(){
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }
}
