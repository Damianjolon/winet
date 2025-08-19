// crear_admin.js
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

// ==== CONFIGURA TU CONEXIÓN AQUI ====
const dbConfig = {
  host: '82.197.82.50',
  user: 'u750816565_s34_winet_admi',
  password: 'heqgah-somguC-gagso1',
  database: 'u750816565_winet'
};
// ====================================

async function crearUsuario() {
  const passwordPlano = process.argv[2];

  if (!passwordPlano) {
    console.error('❌ Debes indicar una contraseña. Ejemplo: node crear_admin.js "Admin#2025"');
    process.exit(1);
  }

  try {
    // 1️⃣ Generar hash bcrypt
    const saltRounds = 10;
    const hash = bcrypt.hashSync(passwordPlano, saltRounds);

    console.log('✅ Contraseña original:', passwordPlano);
    console.log('✅ Hash generado:', hash);

    // 2️⃣ Conectar a la BD
    const connection = await mysql.createConnection(dbConfig);

    // 3️⃣ Borrar usuario admin anterior
    await connection.execute(`DELETE FROM TT_USUARIOS WHERE LOWER(usuario) = 'admin'`);

    // 4️⃣ Insertar nuevo usuario admin
    await connection.execute(
      `INSERT INTO TT_USUARIOS
       (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, usuario, password, id_rol, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ['Admin', '', 'Principal', '', 'admin', hash, 1, 1] // 1 = rol admin, estado activo
    );

    console.log('🎉 Usuario admin creado correctamente en la base de datos.');
    await connection.end();
  } catch (err) {
    console.error('❌ Error creando usuario admin:', err);
  }
}

crearUsuario();
