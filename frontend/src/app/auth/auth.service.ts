import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Ejemplo: login con usuarios de prueba
    if ((username === 'admin' && password === '1234') ||
        (username === 'user' && password === '1234')) {
      this.isAuthenticated = true;
      localStorage.setItem('user', username);
      this.router.navigate(['/dashboard/bienvenida']);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('user');
  }
}
