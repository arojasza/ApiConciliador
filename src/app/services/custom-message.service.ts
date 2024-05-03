import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {

  constructor(private messageService: MessageService) { }

   // Método para mostrar un mensaje con delay personalizado
  showMessage(severity: string, summary: string, detail: string, life: number): void {
    this.messageService.add({ severity: severity, summary: summary, detail: detail, life: life });
  }

  // Método para mostrar un mensaje de éxito con delay personalizado
  showSuccess(summary: string, detail: string, life: number = 3000): void {
    this.showMessage('success', summary, detail, life);
  }

  // Método para mostrar un mensaje de error con delay personalizado
  showError(summary: string, detail: string, life: number = 3000): void {
    this.showMessage('error', summary, detail, life);
  }

  // Método para mostrar un mensaje de advertencia con delay personalizado
  showWarning(summary: string, detail: string, life: number = 3000): void {
    this.showMessage('warn', summary, detail, life);
  }

  // Método para mostrar un mensaje de información con delay personalizado
  showInfo(summary: string, detail: string, life: number = 3000): void {
    this.showMessage('info', summary, detail, life);
  }
}
