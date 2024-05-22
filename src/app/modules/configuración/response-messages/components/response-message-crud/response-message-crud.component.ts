import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CustomMessageService } from '../../../../../services/custom-message.service';
import { responseMessageData } from '../../services/response-message-data.service';
import { ResponseMessageService } from '../../services/response-message.service';
import { CrudCommand, CrudHandler } from '../../../../../shared/interfaces/crud.interfaces';
import { ErrorDescription } from '../../../../../shared/interfaces/api-response.interfaces';
import { mensajesRespuestaCreation, mensajesRespuestaReading, mensajesRespuestaUpdate } from '../../interfaces/response-message';
import { ExcelService } from '../../../../../services/excel-service.service';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-response-message-crud',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputSwitchModule,
    ButtonModule,
    InputTextModule,
    DividerModule,
    PasswordModule,
    InputTextareaModule,
    CommonModule,
    FileUploadModule
  ],
  providers: [],
  templateUrl: './response-message-crud.component.html',
})
export class ResponseMessageCrudComponent  {
  columns: string[] = [];

  constructor(private excelService: ExcelService) { }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.excelService.getColumnsFromFile(file).then((columns) => {
        this.columns = columns;
      }).catch((error) => {
        console.error('Error reading file:', error);
      });
    }
  }
}
