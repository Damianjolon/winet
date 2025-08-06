import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { ListarComponent } from './listar/listar.component';
import { FormularioComponent } from './formulario/formulario.component';

const routes: Routes = [
  { 
    path: '',
     component: EmpleadosComponent,
     children: [
      {
        path: '', component: ListarComponent},
        { path: 'crear', component: FormularioComponent },
      { path: 'editar/:id', component: FormularioComponent }
    ]
  } // /dashboard/empleados
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule {}
