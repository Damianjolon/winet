import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../empleados.service';
import { Empleado } from '../../modelos';


@Component({
selector: 'app-lista-empleados',
templateUrl: './lista-empleados.component.html',
styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
data: Empleado[] = [];
buscar = '';
estado: 'TODOS'|'ACTIVO'|'INACTIVO' = 'TODOS';
cargando = true;


constructor(private api: EmpleadosService, private router: Router) {}


ngOnInit() {
this.api.listar().subscribe(res => { this.data = res; this.cargando = false; });
}


filtrar(): Empleado[] {
const term = this.buscar.toLowerCase();
return this.data.filter(e => {
const matchText = (
`${e.primer_nombre} ${e.segundo_nombre??''} ${e.primer_apellido} ${e.segundo_apellido??''} ${e.email} ${e.puesto}`
).toLowerCase().includes(term);
const matchEstado = this.estado === 'TODOS' ? true : e.estado === this.estado;
return matchText && matchEstado;
});
}


crear() { this.router.navigate(['/empleados/nuevo']); }
editar(e:Empleado) { this.router.navigate(['/empleados/editar', e.id]); }
verTareas(e:Empleado) { this.router.navigate(['/empleados/tareas/asignar', e.id]); }
}
