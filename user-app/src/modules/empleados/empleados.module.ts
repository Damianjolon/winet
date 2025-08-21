import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados.component';
import { ListaEmpleadosComponent } from './modules/empleados/paginas/lista-empleados/lista-empleados.component';
import { FormularioEmpleadoComponent } from './modules/empleados/paginas/formulario-empleado/formulario-empleado.component';
import { TareasEmpleadoComponent } from './modules/empleados/paginas/tareas-empleado/tareas-empleado.component';
import { AsignarTareaComponent } from './modules/empleados/paginas/asignar-tarea/asignar-tarea.component';



@NgModule({
  declarations: [
    EmpleadosComponent,
    ListaEmpleadosComponent,
    FormularioEmpleadoComponent,
    TareasEmpleadoComponent,
    AsignarTareaComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule
  ]
})
export class EmpleadosModule { }
