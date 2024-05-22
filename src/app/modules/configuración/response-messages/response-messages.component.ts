import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DialogService } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Observable } from 'rxjs';
import { ViewTitleComponent } from '../../../shared/components/view-title/view-title.component';
import { CustomBreadcrumbService } from '../../../services/custom-breadcrumb.service';

@Component({
  selector: 'app-response-messages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ViewTitleComponent,
    TableModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DividerModule,
    InputSwitchModule,
    TagModule,
    RouterOutlet,
    BreadcrumbModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, DialogService, ConfirmationService],
  templateUrl: './response-messages.component.html',
})
export class ResponseMessagesComponent implements OnInit {
  public pageTitle: string = 'Mensajes';
  public breadcrumbItems: MenuItem[] = [];
  public breadcrumbItems$!: Observable<MenuItem[]>;
  constructor(
    private _remittanceService: CustomBreadcrumbService,
  ) {}

  ngOnInit(): void {
    this.breadcrumbItems$ = this._remittanceService.GetBreadcrumb();
    this.breadcrumbItems$.subscribe({
      next: (items) => (this.breadcrumbItems = [...items]),
    });
  }
}
