import { Component, Input } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MenubarModule, } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { MenuItemsService } from '../../services/menu-items.service';
import { MsalService } from '@azure/msal-angular';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ 
    MenubarModule,
    MenuModule,
    SidebarModule,
    CommonModule,
    ConfirmDialogModule,
    PanelMenuModule,
    RouterOutlet, RouterModule
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [ConfirmationService]
})
export class NavbarComponent {
  display: boolean = true; // Definir la propiedad display aquí
  sidebarVisible: boolean = true;
  items = [
    {
        label: 'File',
        icon: 'pi pi-pw pi-file',
        items: [{
                label: 'New', 
                icon: 'pi pi-fw pi-plus',
                items: [
                    {label: 'User', icon: 'pi pi-fw pi-user-plus'},
                    {label: 'Filter', icon: 'pi pi-fw pi-filter'}
                ]
            },
            {label: 'Open', icon: 'pi pi-fw pi-external-link'},
            {separator: true},
            {label: 'Quit', icon: 'pi pi-fw pi-times'}
        ]
    },
    {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
            {label: 'Delete', icon: 'pi pi-fw pi-trash'},
            {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
    },
    {
        label: 'Help',
        icon: 'pi pi-fw pi-question',
        items: [
            {
                label: 'Contents',
                icon: 'pi pi-pi pi-bars'
            },
            {
                label: 'Search', 
                icon: 'pi pi-pi pi-search', 
                items: [
                    {
                        label: 'Text', 
                        items: [
                            {
                                label: 'Workspace'
                            }
                        ]
                    },
                    {
                        label: 'User',
                        icon: 'pi pi-fw pi-file',
                    }
            ]}
        ]
    },
    {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog',
        items: [
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {label: 'Save', icon: 'pi pi-fw pi-save'},
                    {label: 'Update', icon: 'pi pi-fw pi-save'},
                ]
            },
            {
                label: 'Other',
                icon: 'pi pi-fw pi-tags',
                items: [
                    {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                ]
            }
        ]
    }
]
  constructor(private confirmationService: ConfirmationService,     private authService: MsalService,  private router: Router,private menuService: MenuItemsService) {
  }
  public get itemsMenu(): MenuItem[] {
    return this.menuService.getItems();
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
    this.authService.logoutRedirect();
    sessionStorage.removeItem('SessionBW');
  }

}
