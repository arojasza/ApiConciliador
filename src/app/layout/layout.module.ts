import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [BreadcrumbComponent, FooterComponent, HeaderComponent, SidebarComponent],
  exports: [BreadcrumbComponent, FooterComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
