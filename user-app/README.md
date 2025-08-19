# UserApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Instrucciones
1. Crear el proyecto base
bash
npm install -g @angular/cli
ng new user-app --routing --style=scss
cd user-app
ng add @angular/material
Esto crea el proyecto con soporte de rutas y SCSS, e instala Angular Material para los componentes visuales.

🔐 2. Crear el sistema de login
📁 Estructura
plaintext
src/app/auth/
├── login/              # Componente de login
├── auth.service.ts     # Servicio de autenticación
├── auth.guard.ts       # Guard para proteger rutas
📦 Comandos
bash
ng generate module auth
ng generate component auth/login
ng generate service auth/auth
ng generate guard auth/auth

3. Crear la estructura visual (layout)
📁 Estructura
plaintext
src/app/layout/
├── header/
├── sidebar/
├── footer/
├── main-layout/        # Contenedor principal
📦 Comandos
bash
ng generate component layout/header
ng generate component layout/sidebar
ng generate component layout/footer
ng generate component layout/main-layout
🧭 main-layout.component.html

4. Crear el CRUD de usuarios
📁 Estructura
plaintext
src/app/users/
├── user-list/          # Lista de usuarios
├── user-form/          # Formulario de usuario
├── user.service.ts     # Servicio de datos
├── users.module.ts     # Módulo de usuarios
📦 Comandos
bash
ng generate module users
ng generate component users/user-list
ng generate component users/user-form
ng generate service users/user

5. Configurar rutas

6. Módulo principal (app.module.ts)
Asegúrate de importar todo lo necesario:

ts
@NgModule({
  declarations: [
    AppComponent,
   ....
  ],
  imports: [
    BrowserModule,
  ....
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}


¿Cómo debe funcionar el flujo?
Inicio en /login Se muestra solo el formulario de login, sin layout.

Login exitoso Se guarda el token (si lo hay) y se redirige a una ruta como /users.

Ruta /users protegida por AuthGuard Si el usuario está autenticado, se carga el MainLayoutComponent, que incluye:

<app-header>

<app-sidebar>

<router-outlet> para el contenido

<app-footer>

🧭 Verifica tu configuración de rutas
En app-routing.module.ts, debe estar algo así:

ts
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UserListComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
Esto asegura que:

El login se muestra sin layout.

Las rutas internas usan el layout completo.

El guard protege el acceso si no hay sesión.

🧠 ¿Y cómo redirigir después del login?
En login.component.ts, después de validar credenciales:

ts
this.router.navigate(['/users']);
O si quieres redirigir dinámicamente:

ts
this.router.navigate([returnUrl || '/users']);
🧩 ¿Y si ves el login junto al layout?
Eso ocurre si el login está dentro del layout. Para evitarlo:

Asegúrate de que el login esté fuera del MainLayoutComponent.

Verifica que app.component.html solo tenga <router-outlet>.
