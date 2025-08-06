import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadosRoutingModule } from './empleados-routing.module';

// Angular Material necesarios para <mat-card> y <button>
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [EmpleadosComponent],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    MatCardModule,   // 👈 habilita <mat-card>
    MatButtonModule  // 👈 habilita <button mat-raised-button>
  ]
})
export class EmpleadosModule {}
