import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpleadosComponent } from './paginas/lista-empleados/lista-empleados.component';
import { FormEmpleadoComponent } from './paginas/formulario-empleado/formulario-empleado.component';
import { TareasEmpleadoComponent } from './paginas/tareas-empleado/tareas-empleado.component';
import { AsignarTareaComponent } from './paginas/asignar-tarea/asignar-tarea.component';


const routes: Routes = [
{ path: '', component: ListaEmpleadosComponent },
{ path: 'nuevo', component: FormEmpleadoComponent },
{ path: 'editar/:id', component: FormEmpleadoComponent },
{ path: 'tareas', component: TareasEmpleadoComponent },
{ path: 'tareas/asignar/:id', component: AsignarTareaComponent }
];


@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class EmpleadosRoutingModule {}
