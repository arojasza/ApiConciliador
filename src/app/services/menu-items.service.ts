import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  constructor() { }

  getItems() {
    return [
      {
        label: 'Modulos',
        escape: true,
        items: [
          {
            label: 'Niveles de Acceso',
            icon: 'fas fa-user-check',
            routerLink: '/niveles-acceso',
            title: 'Se configuran los niveles de acceso '
          },
          {
            label: 'Usuarios',
            icon: 'fas fa-user',
            routerLink: '/modulos/usuarios',
            title: 'Este apartado te permite crear, editar y eliminar usuarios dentro de la aplicación.'
          },
          {
            label: 'Empresa',
            icon: 'fas fa-user',
            routerLink: '/modulos/usuarios',
            title: 'Este apartado te permite crear, editar y eliminar usuarios dentro de la aplicación.'
          },
          {
            label: 'Bancos',
            icon: 'fas fa-university',
            routerLink: '/modulos/usuarios',
            title: 'Este apartado te permite crear, editar y eliminar usuarios dentro de la aplicación.'
          },
          {
            label: 'Banco Empresa',
            icon: 'fas fa-piggy-bank',
            routerLink: '/modulos/usuarios',
            title: 'Este apartado te permite crear, editar y eliminar usuarios dentro de la aplicación.'
          },
          {
            label: 'Conversión centros costo',
            icon: 'fas fa-search-dollar',
            routerLink: '/modulos/usuarios',
            title: 'Este apartado te permite crear, editar y eliminar usuarios dentro de la aplicación.'
          }
        ]
      }
    ];
  }
}
