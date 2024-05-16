import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-view-title',
  standalone: true,
  imports: [ButtonModule, ConfirmDialogModule, ToastModule],
  templateUrl: './view-title.component.html',
  styleUrl: './view-title.component.scss'
})
export class ViewTitleComponent {

  @Input() viewTitle = '';
  @Input() viewDescription = '';
}
