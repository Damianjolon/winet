import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  usuarios: any[] = [];
  displayedColumns: string[] = ['id', 'nombre_completo', 'usuario', 'rol', 'estado', 'acciones'];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.userService.listarUsuarios().subscribe({
      next: (data: any) => this.usuarios = data,
      error: (err: any) => console.error('Error al cargar usuarios:', err)
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.userService.eliminarUsuario(id).subscribe({
        next: () => this.cargarUsuarios(),
        error: (err: any) => console.error('Error al eliminar usuario:', err)
      });
    }
  }

  editar(usuario: any): void {
    // 🚀 navega al formulario con el ID
    this.router.navigate(['/usuarios/edit', usuario.id]);
  }
}
