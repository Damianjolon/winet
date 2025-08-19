import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  roles: any[] = [];
  modulos: any[] = [];
  permisos: any[] = [];
  editMode = false;
  idUsuario!: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      id_rol: ['', Validators.required],
      modulos: [[]],
      permisos: [[]],
      estado: [1]
    });
  }

  ngOnInit(): void {
    // Cargar opciones dinámicas
    this.userService.getRoles().subscribe(r => this.roles = r);
    this.userService.getModulos().subscribe(m => this.modulos = m);
    this.userService.getPermisos().subscribe(p => this.permisos = p);

    // 📌 Revisar si venimos en modo edición
    this.idUsuario = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idUsuario) {
      this.editMode = true;
      // ⚡ sería mejor un getUsuarioById, pero con lo que tienes:
      this.userService.listarUsuarios().subscribe(usuarios => {
        const user = usuarios.find(u => u.id === this.idUsuario);
        if (user) {
          this.userForm.patchValue(user);
          // Para no forzar password vacío
          this.userForm.get('password')?.reset();
        }
      });
    }
  }

  toggleModulo(moduloId: number, checked: boolean): void {
    const modulos = this.userForm.get('modulos')?.value || [];
    this.userForm.patchValue({
      modulos: checked ? [...modulos, moduloId] : modulos.filter((id: number) => id !== moduloId)
    });
  }

  togglePermiso(permisoId: number, checked: boolean): void {
    const permisos = this.userForm.get('permisos')?.value || [];
    this.userForm.patchValue({
      permisos: checked ? [...permisos, permisoId] : permisos.filter((id: number) => id !== permisoId)
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    if (this.editMode) {
      // 🔹 Actualizar
      this.userService.actualizarUsuario(this.idUsuario, this.userForm.value).subscribe({
        next: () => {
          alert('Usuario actualizado con éxito');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('❌ Error al actualizar:', err);
          alert('Error al actualizar usuario');
        }
      });
    } else {
      // 🔹 Crear
      this.userService.crearUsuario(this.userForm.value).subscribe({
        next: () => {
          alert('Usuario creado con éxito');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('❌ Error al crear:', err);
          alert('Error al crear usuario');
        }
      });
    }
  }
}
