import { Injectable } from '@angular/core';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getCurrentFormattedDate(): string {
    // Formatea la fecha actual usando date-fns
    return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  }
}
