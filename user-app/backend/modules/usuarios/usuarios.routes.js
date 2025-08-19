const express = require('express');
const router = express.Router();
const usuariosController = require('./usuarios.controller');

// CRUD Usuarios con verbos claros
router.get('/listar', usuariosController.getUsuarios);
router.post('/crear', usuariosController.createUsuario);
router.put('/cambiar/:id', usuariosController.updateUsuario);
router.delete('/eliminar/:id', usuariosController.deleteUsuario);

module.exports = router;
