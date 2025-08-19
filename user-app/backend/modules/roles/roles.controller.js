const db = require('../../src/db');

exports.getRoles = async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nombre, descripcion FROM TC_ROLES');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener roles:', err);
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};
