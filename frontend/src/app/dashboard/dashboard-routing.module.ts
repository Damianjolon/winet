import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BienvenidaComponent } from '../bienvenida/bienvenida.component';
import { ClientesComponent } from '../clientes/clientes.component';
import { InventarioComponent } from '../inventario/inventario.component';
import { EmpleadosComponent } from '../empleados/empleados.component';
import { RecibosComponent } from '../recibos/recibos.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: 'bienvenida', component: BienvenidaComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'inventario', component: InventarioComponent },
      { path: 'empleados', loadChildren: () => import('../empleados/empleados.module').then(m => m.EmpleadosModule) },
      { path: 'recibos', component: RecibosComponent },
      { path: '', redirectTo: 'bienvenida', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
