
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados.component';
import { ListaEmpleadosComponent } from './paginas/lista-empleados/lista-empleados.component';
import { FormEmpleadoComponent } from './paginas/formulario-empleado/formulario-empleado.component';
import { TareasEmpleadoComponent } from './paginas/tareas-empleado/tareas-empleado.component';
import { AsignarTareaComponent } from './paginas/asignar-tarea/asignar-tarea.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    EmpleadosComponent,
    ListaEmpleadosComponent,
    FormEmpleadoComponent,
    TareasEmpleadoComponent,
    AsignarTareaComponent
  ],
  imports: [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  EmpleadosRoutingModule
  ]
})
export class EmpleadosModule { }
