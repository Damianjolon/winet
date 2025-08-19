import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  displayedColumns: string[] = ['nombre', 'fecha'];
  data = [
    { nombre: 'Juan Pérez', fecha: '2025-08-14' },
    { nombre: 'María Gómez', fecha: '2025-08-13' }
  ];
}
