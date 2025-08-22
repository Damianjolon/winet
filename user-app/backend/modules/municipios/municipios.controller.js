const db = require('../../src/db');

exports.getMunicipios = async (_req, res) => {
  try {
    const [rows] = await db.query(`SELECT id, nombre FROM TT_MUNICIPIOS ORDER BY nombre ASC`);
    res.json(rows);
  } catch (error) {
    console.error('[getMunicipios]', error);
    res.status(500).json({ message: 'Error al obtener municipios', error: error.sqlMessage || error.message });
  }
};
