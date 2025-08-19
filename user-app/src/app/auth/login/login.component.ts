import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // mantiene tu SCSS
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],  // 👈 nombre de campo igual al backend
      password: ['', Validators.required],
      remember: [false]
    });
  }

  submit() {  // 👈 antes se llamaba login()
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading = true;
  this.error = '';

  const { usuario, password } = this.form.getRawValue();

  this.auth.login(usuario, password).subscribe({
    next: ok => {
      this.loading = false;
      if (ok) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Credenciales inválidas';
      }
    },
    error: err => {
      this.loading = false;
      const e = err?.error;
      this.error = e?.error || e?.message || e?.msg || 'Error de servidor';
      console.error('Login error:', err);
    }
  });
}

}
