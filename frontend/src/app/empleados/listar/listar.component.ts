import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoService, Empleado } from '../empleado.service';
import { FormularioComponent } from '../formulario/formulario.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html'
})
export class ListarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre_completo', 'puesto', 'salario', 'estado', 'acciones'];
  dataSource: Empleado[] = [];

  constructor(
    private empleadoService: EmpleadoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => this.dataSource = data,
      error: (err) => console.error('Error cargando empleados', err)
    });
  }

  abrirFormulario(): void {
    const dialogRef = this.dialog.open(FormularioComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarEmpleados();
    });
  }

  editarEmpleado(empleado: Empleado): void {
    const dialogRef = this.dialog.open(FormularioComponent, {
      width: '400px',
      data: empleado
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarEmpleados();
    });
  }

  eliminarEmpleado(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará al empleado de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.empleadoService.deleteEmpleado(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El empleado ha sido eliminado.', 'success');
            this.cargarEmpleados();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el empleado.', 'error');
          }
        });
      }
    });
  }
}
