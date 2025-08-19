import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';

interface LoginResponse {
  ok: boolean;
  message?: string;
  error?: string;
  user?: { id: number; usuario: string; rol?: any; id_rol?: any };
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private loggedIn = false;

  constructor(private http: HttpClient) {}

  login(usuario: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { usuario, password })
      .pipe(
        map(resp => {
          if (resp && resp.ok) {
            this.loggedIn = true; // sin token por ahora
            return true;
          }
          // Si el backend respondiera 200 con ok:false, opcionalmente:
          throw new Error(resp?.error || 'Credenciales inválidas');
        })
      );
  }

  logout() { this.loggedIn = false; }
  isAuthenticated(): boolean { return this.loggedIn; }
}
