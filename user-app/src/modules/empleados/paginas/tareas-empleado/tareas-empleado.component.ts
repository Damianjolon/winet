import { Component } from '@angular/core';
import { Tarea } from '../../modelos';


@Component({
selector: 'app-tareas-empleado',
templateUrl: './tareas-empleado.component.html',
styleUrls: ['./tareas-empleado.component.css']
})
export class TareasEmpleadoComponent {
fecha = new Date();
tareasHoy: Tarea[] = [
{ id: 1, titulo: 'Llamar clientes', prioridad: 'MEDIA', estado: 'PENDIENTE', fecha: new Date().toISOString() },
{ id: 2, titulo: 'Actualizar inventario', prioridad: 'ALTA', estado: 'EN_PROCESO', fecha: new Date().toISOString() }
];
}
