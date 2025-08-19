const db = require('../../src/db');

exports.getModulos = async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nombre, descripcion FROM TC_MODULOS');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener módulos:', err);
    res.status(500).json({ error: 'Error al obtener módulos' });
  }
};
