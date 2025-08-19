require('dotenv').config({ path: __dirname + '/../.env' });
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// CORS: permite Angular (4200) y deja json-server (3000) intacto
app.use(cors({ origin: ['http://localhost:4200'], credentials: false }));

// Rutas
app.use('/api/auth', require('../modules/auth/auth.routes'));

app.use((err, _req, res, _next) => {
  console.error('[global]', err);
  res.status(500).json({ ok: false, error: err.message || 'Error inesperado' });
});

// Nuevas rutas de administración
app.use('/api/roles', require('../modules/roles/roles.routes'));
app.use('/api/modulos', require('../modules/modulos/modulos.routes'));
app.use('/api/usuarios', require('../modules/usuarios/usuarios.routes'));

const cors = require('cors');
app.use(cors());


// Salud
app.get('/api/health', (_req, res) => res.json({ ok: true }));

const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
