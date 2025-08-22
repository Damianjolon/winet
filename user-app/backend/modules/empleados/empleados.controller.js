const db = require('../../src/db');

/** Normaliza fecha a YYYY-MM-DD */
function toYYYYMMDD(value) {
  if (!value) return null;
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const d = new Date(value);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

/** ========= LISTAR ========= */
exports.getEmpleados = async (_req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        e.id,
        e.primer_nombre,
        e.segundo_nombre,
        e.primer_apellido,
        e.segundo_apellido,
        e.DPI,
        e.puesto,
        e.salario,
        e.fecha_ingreso,
        e.telefono,
        e.direccion,
        e.zona,
        e.colonia,
        e.id_municipio,
        m.nombre AS municipio,
        e.id_estado,
        e.email
      FROM TT_EMPLEADOS e
      LEFT JOIN TC_MUNICIPIOS m ON m.id = e.id_municipio
      ORDER BY e.id DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('[getEmpleados]', error);
    res.status(500).json({ message: 'Error al obtener empleados', error: error.sqlMessage || error.message });
  }
};

/** ========= OBTENER POR ID (extra útil para editar) ========= */
exports.getEmpleadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(`
      SELECT
        e.id,
        e.primer_nombre,
        e.segundo_nombre,
        e.primer_apellido,
        e.segundo_apellido,
        e.DPI,
        e.puesto,
        e.salario,
        e.fecha_ingreso,
        e.telefono,
        e.direccion,
        e.zona,
        e.colonia,
        e.id_municipio,
        e.id_estado,
        e.email
      FROM TT_EMPLEADOS e
      WHERE e.id = ?
    `, [id]);

    const item = rows && rows[0];
    if (!item) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json(item);
  } catch (error) {
    console.error('[getEmpleadoById]', error);
    res.status(500).json({ message: 'Error al obtener empleado', error: error.sqlMessage || error.message });
  }
};

/** ========= CREAR ========= */
exports.createEmpleado = async (req, res) => {
  try {
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      DPI,
      puesto,
      salario,
      fecha_ingreso,
      telefono,
      direccion,
      zona,
      colonia,
      id_municipio,
      id_estado,   // opcional; por defecto ACTIVO
      email
    } = req.body;

    // Validaciones mínimas
    if (!primer_nombre || !primer_apellido || !DPI || !puesto || salario == null || !id_municipio) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    if (String(DPI).length !== 13) {
      return res.status(400).json({ message: 'El DPI debe tener 13 dígitos' });
    }

    const fecha = toYYYYMMDD(fecha_ingreso) || toYYYYMMDD(new Date());
    const estado = id_estado || 'ACTIVO';

    await db.query(
      `INSERT INTO TT_EMPLEADOS
       (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
        DPI, puesto, salario, fecha_ingreso, telefono, direccion, zona, colonia,
        id_municipio, id_estado, email)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        primer_nombre, (segundo_nombre ?? null), primer_apellido, (segundo_apellido ?? null),
        DPI, puesto, Number(salario), fecha, (telefono ?? null), (direccion ?? null), (zona ?? null), (colonia ?? null),
        Number(id_municipio), estado, (email ?? null)
      ]
    );

    res.json({ ok: true, message: 'Empleado creado correctamente' });
  } catch (error) {
    console.error('[createEmpleado]', error);
    if (error && error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ ok: false, message: 'DPI duplicado' });
    }
    res.status(500).json({ ok: false, message: 'Error al crear empleado', error: error.sqlMessage || error.message });
  }
};

/** ========= EDITAR ========= */
exports.updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      DPI,
      puesto,
      salario,
      fecha_ingreso,
      telefono,
      direccion,
      zona,
      colonia,
      id_municipio,
      id_estado,
      email
    } = req.body;

    if (!primer_nombre || !primer_apellido || !DPI || !puesto || salario == null || !id_municipio) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    if (String(DPI).length !== 13) {
      return res.status(400).json({ message: 'El DPI debe tener 13 dígitos' });
    }

    const fecha = toYYYYMMDD(fecha_ingreso) || toYYYYMMDD(new Date());

    const [r] = await db.query(
      `UPDATE TT_EMPLEADOS
       SET primer_nombre=?, segundo_nombre=?, primer_apellido=?, segundo_apellido=?,
           DPI=?, puesto=?, salario=?, fecha_ingreso=?, telefono=?, direccion=?,
           zona=?, colonia=?, id_municipio=?, id_estado=?, email=?
       WHERE id=?`,
      [
        primer_nombre, (segundo_nombre ?? null), primer_apellido, (segundo_apellido ?? null),
        DPI, puesto, Number(salario), fecha, (telefono ?? null), (direccion ?? null),
        (zona ?? null), (colonia ?? null), Number(id_municipio), (id_estado || 'ACTIVO'), (email ?? null),
        id
      ]
    );

    // @ts-ignore
    if (!r || r.affectedRows === 0) {
      return res.status(404).json({ ok: false, message: 'Empleado no encontrado' });
    }

    res.json({ ok: true, message: 'Empleado actualizado correctamente' });
  } catch (error) {
    console.error('[updateEmpleado]', error);
    if (error && error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ ok: false, message: 'DPI duplicado' });
    }
    res.status(500).json({ ok: false, message: 'Error al actualizar empleado', error: error.sqlMessage || error.message });
  }
};

/** ========= ELIMINAR ========= */
exports.deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const [r] = await db.query(`DELETE FROM TT_EMPLEADOS WHERE id=?`, [id]);
    // @ts-ignore
    if (!r || r.affectedRows === 0) {
      return res.status(404).json({ ok: false, message: 'Empleado no encontrado' });
    }
    res.json({ ok: true, message: 'Empleado eliminado correctamente' });
  } catch (error) {
    console.error('[deleteEmpleado]', error);
    res.status(500).json({ ok: false, message: 'Error al eliminar empleado', error: error.sqlMessage || error.message });
  }
};
