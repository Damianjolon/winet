import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BienvenidaComponent } from '../bienvenida/bienvenida/bienvenida.component';





@NgModule({
  declarations: [
    BienvenidaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
