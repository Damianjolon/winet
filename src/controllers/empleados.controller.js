const db = require('../db');

// SELECT
exports.getEmpleados = async (req, res) => {
  try {
    const [rows] = await db.query('CALL sp_getEmpleados()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener empleados' });
  }
};

// INSERT
exports.addEmpleado = async (req, res) => {
  try {
    const { nombre, puesto, salario, fechaIngreso } = req.body;
    await db.query('CALL sp_createEmpleado(?,?,?,?)', [nombre, puesto, salario, fechaIngreso]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al agregar empleado' });
  }
};

// UPDATE
exports.updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, puesto, salario, fechaIngreso } = req.body;
    await db.query('CALL sp_updateEmpleado(?,?,?,?,?)', [id, nombre, puesto, salario, fechaIngreso]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar empleado' });
  }
};

// DELETE
exports.deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('CALL sp_deleteEmpleado(?)', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar empleado' });
  }
};
