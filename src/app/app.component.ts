import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalModule, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { MenuModule } from 'primeng/menu';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuItemsService } from './services/menu-items.service';
import { MenuItem } from 'primeng/api';
import { CustomBreadcrumbService } from './services/custom-breadcrumb.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ProfileType } from './shared/interfaces/profileType';
import { FooterComponent } from './layout/footer/footer.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BreadcrumbModule, CommonModule, MsalModule, RouterOutlet, RouterLink, MenuModule, NavbarComponent, HeaderComponent, FooterComponent, CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular 17 Sample - MSAL Angular v3';
  @ViewChild('miBoton') miBoton!: ElementRef;
  public items!: MenuItem[];
  public items2!: MenuItem[];
  private _breadcrumbItems$!: Observable<MenuItem[]>;
  isIframe = false;
  loginDisplay = false;
  profile: ProfileType | undefined;

  private readonly _destroying$ = new Subject<void>();
  constructor(
    private router: Router,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private menuService: MenuItemsService,
    private _customBreadcrumbService: CustomBreadcrumbService,
    private http: HttpClient
  ) {
  }


  /**
   * Elemento del ciclo de vida de angular Gestiona las redirecciones después de la autenticación, 
   * actualiza la interfaz de usuario según el estado de inicio de sesión y escucha eventos de 
   * inicio de sesión o cierre de sesión
   */
  ngOnInit(): void {
    this._breadcrumbItems$ = this._customBreadcrumbService.GetBreadcrumb();
    this._breadcrumbItems$.subscribe({
      next: (items) => (this.items = [...items]),
    });
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
    this.getProfile(environment.apiConfig.uri)
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

  getProfile(url: string) {
    this.http.get(url)
      .subscribe(profile => {
        this.profile = profile;
      });
  }
}
