import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalModule, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { MenuModule } from 'primeng/menu';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeaderComponent } from './layout/header/header.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MsalModule, RouterOutlet, RouterLink, MenuModule, NavbarComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular 17 Sample - MSAL Angular v3';
  @ViewChild('miBoton') miBoton!: ElementRef;

  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private router: Router,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {
  }


  /**
   * Elemento del ciclo de vida de angular Gestiona las redirecciones después de la autenticación, 
   * actualiza la interfaz de usuario según el estado de inicio de sesión y escucha eventos de 
   * inicio de sesión o cierre de sesión
   */
  ngOnInit(): void {

    this.authService.handleRedirectObservable().subscribe();
    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents();
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED),
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = "/";
        } else {
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      })

  }




  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }


  /**
   * Este metodo verifica si hay una cuenta activa en el contexto de la autenticación utilizando MSAL
   */
  checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();
    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  /**
   * Metodo que redirecciona al componente de microsft para lautentenficación por el AD
   */
  loginRedirect() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  /**
   * Mentodo encargado de deslogear al usuario
   * @param popup valida si se quiere usar el popup
   */
  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  /**
   * Libera los recurso utilizados, metodo del ciclo de vida encargado de 
   * de ejecutarse antes de que el componente sea destruido
   */
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  public get nameUser() {
    return '';
  }

  public get items() {
    return [
      {
        label: 'Modulos',
        escape: true,
        items: [{
          label: 'Niveles de Acceso',
          icon: 'fas fa-user-check',
          routerLink: '/niveles-acceso',
        },
        {
          label: 'Usuarios',
          icon: 'fas fa-user',
          routerLink: '/modulos/usuarios',
        }
        ]
      },
    ];;
  }

  someFn() {
    console.log('hi')
  }
}
