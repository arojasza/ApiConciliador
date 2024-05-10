import { Component, Input } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MenubarModule, } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuModule } from 'primeng/menu';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ 
    MenubarModule,
    MenuModule,
    CommonModule,
    ConfirmDialogModule,
    RouterOutlet, RouterLink, RouterLinkActive
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [ConfirmationService]
})
export class NavbarComponent {
  mostrarCerrarSesion: boolean = true;
  @Input() itemsMenu : MenuItem[] | undefined;
  constructor(private confirmationService: ConfirmationService,  private router: Router) {
  }

  ConfirmCerrarSesion() {
    console.log("Entró")
    this.confirmationService.confirm({
      message: '¿Está seguro que desea salir de la sesión?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.CerrarSesion()
      },
      reject: () => {
      }
    });
  }

  CerrarSesion() {
    sessionStorage.removeItem('SessionBW');
    this.router.navigate(['/'])
  }
}
