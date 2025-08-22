export interface Empleado {
id: number;
primer_nombre: string;
segundo_nombre?: string;
primer_apellido: string;
segundo_apellido?: string;
email: string;
telefono?: string;
puesto: string;
rol?: string; // para mostrar en UI
estado: 'ACTIVO'|'INACTIVO';
fechaIngreso?: string; // ISO
}


export interface Tarea {
id: number;
titulo: string;
descripcion?: string;
prioridad: 'BAJA'|'MEDIA'|'ALTA';
estado: 'PENDIENTE'|'EN_PROCESO'|'COMPLETADA';
asignadoA?: number; // id empleado
fecha?: string; // ISO (para diarias)
}
