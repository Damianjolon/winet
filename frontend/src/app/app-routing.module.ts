import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
   {
        path: 'empleados',
        loadChildren: () => import('./empleados/empleados.module').then(m => m.EmpleadosModule)
      },
       {
        path: 'recibos',
        loadChildren: () => import('./recibos/recibos.module').then(m => m.RecibosModule)
      },
  // 👇 cambio: redirigir directamente a dashboard/bienvenida en vez de login
  { path: '', redirectTo: '/dashboard/bienvenida', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard/bienvenida' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
