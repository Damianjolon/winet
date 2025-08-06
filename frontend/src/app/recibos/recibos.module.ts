import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecibosComponent } from './recibos.component';
import { RecibosRoutingModule } from './recibos-routing.module';

// Angular Material necesarios para <mat-card> y <button>
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RecibosComponent],
  imports: [
    CommonModule,
    RecibosRoutingModule,
    MatCardModule,   // 👈 habilita <mat-card>
    MatButtonModule  // 👈 habilita <button mat-raised-button>
  ]
})
export class RecibosModule {}
