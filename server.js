require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || '', // importante si es vacío
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306
});

// Endpoint de prueba: SELECT empleados
app.get('/api/empleados', async (req, res) => {
  try {
    const [rows] = await pool.query('CALL sp_getEmpleados()');
    res.json(rows[0]); // si tu SP devuelve un SELECT
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener empleados', error: err.message });
  }
});

// Arrancar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
