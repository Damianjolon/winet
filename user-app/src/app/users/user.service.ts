// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3001/api/usuarios';
  private rolesUrl = 'http://localhost:3001/api/roles';
  private modulosUrl = 'http://localhost:3001/api/modulos';
  private permisosUrl = 'http://localhost:3001/api/permisos';

  constructor(private http: HttpClient) {}

  // --- Usuarios ---
 crearUsuario(usuario: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/crear`, usuario);
  }

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  actualizarUsuario(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/cambiar/${id}`, user);
  }

  // --- Catálogos dinámicos ---
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.rolesUrl);
  }

  getModulos(): Observable<any[]> {
    return this.http.get<any[]>(this.modulosUrl);
  }

  getPermisos(): Observable<any[]> {
    return this.http.get<any[]>(this.permisosUrl);
  }
}
