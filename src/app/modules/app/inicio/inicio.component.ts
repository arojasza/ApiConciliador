import { Component } from '@angular/core';
import { MenuItemsService } from '../../../services/menu-items.service';
import { CommonModule } from '@angular/common';
import { CustomBreadcrumbService } from '../../../services/custom-breadcrumb.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  menuItems: any[];

  constructor(
    private _customBreadcrumbService: CustomBreadcrumbService,
    private menuService: MenuItemsService) {
    this.menuItems = this.menuService.getItems();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this._customBreadcrumbService.Reset();
    });
  }
}
