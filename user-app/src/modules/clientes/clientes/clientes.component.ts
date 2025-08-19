import { Component } from '@angular/core';

interface Cliente {
  avatar?: string;
  nombre: string;
  celular: string;
  email: string;
  saldo: number;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  displayedColumns = ['avatar', 'nombre', 'celular', 'email', 'saldo', 'acciones'];

  clientes: Cliente[] = [
    { nombre: 'AMZ EATS', celular: ' 99187-2458', email: 'amzeats.mkt@gmail.com', saldo: 51.06 },
    { nombre: 'Andre Luis', celular: '1657-2369', email: 'araujoandrejp@gmail.com', saldo: 0 },
    { nombre: 'André Manfini Garcia', celular: '99604-0594', email: 'del-hlate@hotmail.com', saldo: 107.0 },
    { nombre: 'Andrea Guerra Nascimento', celular: '', email: 'andrea.guerra@email.com', saldo: 2.95 }
  ];

  buscar = '';

  getSaldoClass(saldo: number) {
    if (saldo > 0) return 'saldo-positivo';
    if (saldo < 0) return 'saldo-negativo';
    return 'saldo-cero';
  }
}
