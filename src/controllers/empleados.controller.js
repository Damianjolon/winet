const db = require('../models/db');

// GET: listar empleados
exports.getEmpleados = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM empleados ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener empleados' });
  }
};

// POST: crear nuevo empleado
exports.createEmpleado = async (req, res) => {
  try {
    const { nombre, puesto, salario } = req.body;

    if (!nombre || !puesto || !salario) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const [result] = await db.query(
      'INSERT INTO empleados (nombre, puesto, salario) VALUES (?, ?, ?)',
      [nombre, puesto, salario]
    );

    res.json({ id: result.insertId, nombre, puesto, salario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear empleado' });
  }
};
