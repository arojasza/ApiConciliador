// src/app/services/excel.service.ts
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public getColumnsFromFile(file: File): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        if (worksheet && worksheet['!ref']) {
          const headers = this.getHeaderRow(worksheet);
          resolve(headers);
        } else {
          reject(new Error('El archivo no contiene datos o está mal formado'));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  private getHeaderRow(sheet: XLSX.WorkSheet): string[] {
    const headers: string[] = [];
    const range = XLSX.utils.decode_range(sheet['!ref'] as string);
    const firstRow = range.s.r; // Índice de la primera fila

    for (let col = range.s.c; col <= range.e.c; ++col) {
      const cellAddress = XLSX.utils.encode_cell({ c: col, r: firstRow });
      const cell = sheet[cellAddress];
      const header = cell && cell.t ? XLSX.utils.format_cell(cell) : `UNKNOWN ${col}`;
      headers.push(header);
    }
    return headers;
  }
}