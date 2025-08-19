const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../src/db');

function isBcryptHash(s) {
  return typeof s === 'string' && /^\$2[aby]\$\d{2}\$/.test(s);
}

async function login(req, res) {
  try {
    // Log para diagnosticar rápidamente lo que llega del front
    console.log('[login] body:', req.body);

    // Acepta { usuario, password } o { email, password }
    let { usuario, email, password } = req.body || {};
    const rawUser = (usuario ?? email ?? '').toString(); // evita undefined
    const userKey = rawUser.trim().toLowerCase();

    if (!userKey || typeof password !== 'string') {
      return res.status(400).json({ ok: false, error: 'Faltan credenciales' });
    }

    // Usuario de emergencia (solo pruebas)
    if (userKey === 'emergencia' && password === '1234') {
      const token = jwt.sign(
        { id: 0, usuario: 'emergencia', id_rol: 1, rol: 'admin' },
        process.env.JWT_SECRET || 'dev',
        { expiresIn: process.env.JWT_EXPIRES || '2h' }
      );
      return res.json({ ok: true, token, user: { id: 0, usuario: 'emergencia', id_rol: 1 } });
    }

    // Trae solo columnas necesarias (ajusta nombres si en tu BD son otros)
    const [rows] = await db.query(
      'SELECT id, usuario, password, id_rol, estado FROM TT_USUARIOS WHERE LOWER(usuario) = ? LIMIT 1',
      [userKey]
    );

    if (!rows || rows.length === 0) {
      return res.status(401).json({ ok: false, error: 'Usuario no encontrado' });
    }

    const user = rows[0];

    if (Number(user.estado) === 0) {
      return res.status(403).json({ ok: false, error: 'Usuario inactivo' });
    }

    const hashed = user.password || '';
    const passOK = isBcryptHash(hashed)
      ? await bcrypt.compare(password, hashed)
      : (password === hashed);

    if (!passOK) {
      return res.status(401).json({ ok: false, error: 'Contraseña incorrecta' });
    }

    const payload = { id: user.id, usuario: user.usuario, id_rol: user.id_rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev', {
      expiresIn: process.env.JWT_EXPIRES || '2h'
    });

    return res.json({ ok: true, token, user: payload });
  } catch (err) {
    console.error('[auth.login] Error:', {
      message: err.message,
      sql: err.sqlMessage,
      code: err.code,
      stack: err.stack
    });
    return res.status(500).json({
      ok: false,
      error: err.sqlMessage || err.message || 'Error en login'
    });
  }
}

module.exports = { login };
