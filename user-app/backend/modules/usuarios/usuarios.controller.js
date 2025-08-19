const db = require('../../src/db');

// Obtener todos los usuarios con su rol
exports.getUsuarios = async (_req, res) => {
  try {
    const [rows] = await db.query(`
  SELECT u.id,
         u.primer_nombre,
         u.segundo_nombre,
         u.primer_apellido,
         u.segundo_apellido,
         u.usuario,
         r.nombre AS rol,
         u.estado
  FROM TT_USUARIOS u
  JOIN TC_ROLES r ON u.id_rol = r.id
`);
    res.json(rows);
  } catch (error) {
    console.error('[getUsuarios]', error);
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.sqlMessage || error.message });
  }
};

// Crear usuario
exports.createUsuario = async (req, res) => {
  try {
    const {
  primer_nombre,
  segundo_nombre,
  primer_apellido,
  segundo_apellido,
  usuario,
  password,
  id_rol
} = req.body;

if (!primer_nombre || !primer_apellido || !usuario || !password || !id_rol) {
  return res.status(400).json({ message: 'Faltan datos requeridos' });
}

await db.query(
  `INSERT INTO TT_USUARIOS
   (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, usuario, password, id_rol, estado)
   VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
  [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, usuario, password, id_rol]
);

    res.json({ ok: true, message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error('[createUsuario]', error);
    res.status(500).json({ ok: false, message: 'Error al crear usuario', error: error.sqlMessage || error.message });
  }
};

// Actualizar usuario
exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      usuario,
      password,
      id_rol,
      estado
    } = req.body;

   await db.query(
  `UPDATE TT_USUARIOS
   SET primer_nombre=?, segundo_nombre=?, primer_apellido=?, segundo_apellido=?,
       usuario=?, password=?, id_rol=?, estado=?
   WHERE id=?`,
  [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
   usuario, password, id_rol, estado ?? 1, id]
);


    res.json({ ok: true, message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('[updateUsuario]', error);
    res.status(500).json({ ok: false, message: 'Error al actualizar usuario', error: error.sqlMessage || error.message });
  }
};

// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM TT_USUARIOS WHERE id=?`, [id]);
    res.json({ ok: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('[deleteUsuario]', error);
    res.status(500).json({ ok: false, message: 'Error al eliminar usuario', error: error.sqlMessage || error.message });
  }
};
