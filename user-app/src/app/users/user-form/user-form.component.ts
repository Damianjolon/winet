import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar   // ✅ inyectamos snackbar
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
    this.userService.getRoles().subscribe(r => this.roles = r);
    this.userService.getModulos().subscribe(m => this.modulos = m);
    this.userService.getPermisos().subscribe(p => this.permisos = p);

    this.idUsuario = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idUsuario) {
      this.editMode = true;
      this.userService.listarUsuarios().subscribe(usuarios => {
        const user = usuarios.find(u => u.id === this.idUsuario);
        if (user) {
          this.userForm.patchValue(user);
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
      this.userService.actualizarUsuario(this.idUsuario, this.userForm.value).subscribe({
        next: () => {
          this.showMessage('✅ Usuario actualizado con éxito');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('❌ Error al actualizar:', err);
          this.showMessage('⚠️ Error al actualizar usuario', true);
        }
      });
    } else {
      this.userService.crearUsuario(this.userForm.value).subscribe({
        next: () => {
          this.showMessage('✅ Usuario creado con éxito');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('❌ Error al crear:', err);
          this.showMessage('⚠️ Error al crear usuario', true);
        }
      });
    }
  }

  // 📌 Método para mostrar snackbar
  private showMessage(message: string, error: boolean = false): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: error ? ['error-snackbar'] : ['success-snackbar']
    });
  }
}
