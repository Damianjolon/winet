import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Empleado {
  id: number;
  nombre_completo: string;
  puesto: string;
  salario: number;
  fecha_ingreso: string;
  direccion: string;
  zona: string;
  colonia: string;
  municipio: string;
  departamento: string;
  pais: string;
  estado: string;
}


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000/api/empleados';

  constructor(private http: HttpClient) {}
getEmpleados(): Observable<Empleado[]> {
  return this.http.get<Empleado[]>(`${this.apiUrl}/empleados`);
}


createEmpleado(empleado: Empleado): Observable<any> {
  return this.http.post(`${this.apiUrl}/empleados`, empleado);
}

updateEmpleado(id: number, empleado: Empleado): Observable<any> {
  return this.http.put(`${this.apiUrl}/empleados/${id}`, empleado);
}

deleteEmpleado(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/empleados/${id}`);
}
  // luego agregarás insert, update, delete aquí...
}

