import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EmpleadosService, EmpleadoCreate, Municipio } from '../../empleados.service';

@Component({
  selector: 'app-formulario-empleado',
  templateUrl: './formulario-empleado.component.html',
  styleUrls: ['./formulario-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {

  titulo = 'Nuevo empleado';
  form!: FormGroup;

  municipios: Municipio[] = [];   // <- usado por el template
  cargando = false;               // <- usado por el template
  id?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: EmpleadosService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [],
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      DPI: ['', Validators.required],
      puesto: ['', Validators.required],
      salario: [null, [Validators.required, Validators.min(0)]],
      fecha_ingreso: [this.hoyISO(), Validators.required],
      telefono: [''],
      direccion: [''],
      zona: [''],
      colonia: [''],
      id_municipio: [null, Validators.required],
      id_estado: ['ACTIVO'] // oculto en el HTML; por defecto ACTIVO
    });

    // Cargar municipios (dinámico)
    this.api.listarMunicipios().subscribe({
      next: (list) => this.municipios = list || [],
      error: () => this.snack.open('No se pudieron cargar los municipios', 'Cerrar', { duration: 3000 })
    });

    // Si viene id en la ruta => edición
    const rawId = this.route.snapshot.paramMap.get('id');
    if (rawId) {
      this.id = +rawId;
      this.titulo = 'Editar empleado';
      this.api.obtener(this.id).subscribe((e: any) => {
        // Normaliza la fecha si no viene en yyyy-MM-dd
        this.form.patchValue({
          id: e.id,
          primer_nombre: e.primer_nombre,
          segundo_nombre: e.segundo_nombre,
          primer_apellido: e.primer_apellido,
          segundo_apellido: e.segundo_apellido,
          DPI: e.DPI,
          puesto: e.puesto,
          salario: e.salario,
          fecha_ingreso: this.aISO(e.fecha_ingreso),
          telefono: e.telefono,
          direccion: e.direccion,
          zona: e.zona,
          colonia: e.colonia,
          id_municipio: e.id_municipio,
          id_estado: e.id_estado ?? 'ACTIVO'
        });
      });
    }
  }

  /** yyyy-MM-dd ajustado por timezone para <input type="date"> */
  private hoyISO(): string {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  /** Normaliza cualquier fecha a yyyy-MM-dd (o hoy si es falsy) */
  private aISO(value: any): string {
    if (!value) return this.hoyISO();
    const d = new Date(value);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;
    // Construcción TIPADA explícita del payload (evita el error TS2352)
    const payload: EmpleadoCreate = {
      id: v.id ?? undefined,
      primer_nombre: v.primer_nombre!,
      segundo_nombre: v.segundo_nombre || undefined,
      primer_apellido: v.primer_apellido!,
      segundo_apellido: v.segundo_apellido || undefined,
      DPI: v.DPI!,
      puesto: v.puesto!,
      salario: Number(v.salario),
      fecha_ingreso: v.fecha_ingreso!, // yyyy-MM-dd
      telefono: v.telefono || undefined,
      direccion: v.direccion || undefined,
      zona: v.zona || undefined,
      colonia: v.colonia || undefined,
      id_municipio: Number(v.id_municipio),
      id_estado: v.id_estado || 'ACTIVO'
    };

    this.cargando = true;

    // Usa tus métodos existentes (crear/actualizar)
    const req$ = this.id
      ? this.api.actualizar(this.id, payload)
      : this.api.crear(payload);

    req$.subscribe({
      next: () => {
        this.snack.open('Empleado guardado', 'OK', { duration: 2000, panelClass: 'success-snackbar' });
        this.router.navigate(['/empleados']);
      },
      error: () => {
        this.snack.open('Error al guardar', 'Cerrar', { duration: 3500, panelClass: 'error-snackbar' });
      },
      complete: () => this.cargando = false
    });
  }

  cancelar(): void {
    this.router.navigate(['/empleados']); // volver al listado
  }
}
