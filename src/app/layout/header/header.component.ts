import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ConfirmDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [ConfirmationService]
})
export class HeaderComponent {
  @Input() appName = '';
  @Input() username = '';
  constructor(private confirmationService: ConfirmationService,  private router: Router) {}

  ConfirmCerrarSesion() {
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


