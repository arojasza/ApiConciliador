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
            routerLink: '/modulos/empresa',
            title: 'Este apartado te permite crear, editar y eliminar usuarios dentro de la aplicación.'
          },
          {
            label: 'Conversión centros costo',
            icon: 'fas fa-search-dollar',
            routerLink: '/modulos/conversioncentroscosto',
            title: 'Este apartado te permite crear, editar y eliminar usuarios dentro de la aplicación.'
          },
          {
            label: 'Catalogo general',
            icon: 'fas fa-search-dollar',
            routerLink: '/modulos/catalogogeneral',
            title: 'Este apartado te permite crear, editar y eliminar usuarios dentro de la aplicación.'
          },
          {
            label: 'Catalogo nombre',
            icon: 'fas fa-search-dollar',
            routerLink: '/modulos/catalogonombre',
            title: 'Este apartado te permite crear, editar y eliminar usuarios dentro de la aplicación.'
          },
          {
            label: 'Catalogo conversión',
            icon: 'fas fa-search-dollar',
            routerLink: 'modulos/catalogoconversion',
            title: 'Este apartado te permite crear, editar y eliminar usuarios dentro de la aplicación.'
          }
        ]
      },
      {
        label: 'Configuración',
        escape: true,
        items: [
          {
            label: 'Configuración de plantilla',
            icon: 'fa-solid fa-gear',
            routerLink: 'configuracion/configuracion-plantilla',
            title: 'Se configuran las plantillas'
          }
        ]
      }
    ] 
  }
}
