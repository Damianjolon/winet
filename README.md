# sitio-spa

# en scripts agrega el alias de start:api
ejecuta como npm run start:api para simular el servidor json

Debe estar instalado express

# Servidor de prueba
Para Node.js 18, puedes usar versiones anteriores de json-server y json-server-auth que son compatibles.

Versiones recomendadas para Node 18
Agrega estas versiones en tu instalación:

npm install json-server@0.17.3 json-server-auth@2.1.0 express@4.18.2 --save-dev

Ejecutar donde se encuentra el archivo db.json

y luego ejecutar con el comando: 
npx json-server-auth db.json --port 3000

🛠️ Guía de Configuración y Avances del Proyecto Angular 16
1. 📦 Creación del Proyecto Angular
Se creó un nuevo proyecto con Angular CLI compatible con Angular 16:

bash
npm install -g @angular/cli@16
ng new nombre-del-proyecto
cd nombre-del-proyecto
Se seleccionó la opción de incluir routing y se eligió CSS como preprocesador.

2. 🧪 Configuración del Servidor de Prueba con json-server
Se instaló json-server compatible con Node 18:

bash
npm install json-server@0.17.3 --save-dev
Se creó el archivo db.json en la raíz del proyecto con datos simulados, por ejemplo:

json
{
  "users": [
    { "id": 1, "email": "admin@example.com", "password": "1234" }
  ]
}
Se agregó un script en package.json para iniciar el servidor:

json
"scripts": {
  "api": "json-server --watch db.json --port 3000"
}
Se ejecutó el servidor con:

bash
npm run api
3. 🔐 Creación del Componente de Login
Se generó el componente:

bash
ng generate component pages/login
Se implementó un formulario reactivo con FormBuilder y validaciones básicas (email, password).

Se configuró el método login() para hacer una petición GET al servidor de prueba:

ts
this.http.post<User[]>(`apiUri,object`)
Se agregó redirección condicional si el usuario existe.

4. 🧹 Limpieza de la Pantalla Inicial
Se identificó que el contenido de bienvenida de Angular seguía apareciendo.

Se limpió el archivo app.component.html para dejar solo:

html
<router-outlet></router-outlet>
5. ⚙️ Configuración de Rutas
Se definieron rutas en app-routing.module.ts:

ts
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
