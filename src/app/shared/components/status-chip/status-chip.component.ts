import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { zip } from 'rxjs';

@Component({
  selector: 'app-status-chip',
  standalone: true,
  imports: [ChipModule, InputSwitchModule, FormsModule],
  templateUrl: './status-chip.component.html',
  styles: '',
})
export class StatusChipComponent implements OnInit{
  @Input()

  public estado: any;
  public status: string= '';
  public valor: boolean = false;

  ngOnInit(): void {
    this.valor = this.estado === "1" || this.estado === 1 ? true : false;
    console.log(this.valor);
  }

  GetStatusText(){
    return this.status ? 'Activo' : 'Inactivo';
  }

  GetStatusClass(){
    let color = this.status ? 'green' : 'red';
    return `bg-${color}-100 text-${color}-700 text-sm font-semibold w-8 justify-content-center`;    
  }
}
