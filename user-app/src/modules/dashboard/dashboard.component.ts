import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private router: Router,
    public auth: AuthService // 👈 lo hacemos público para usarlo en la vista
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
