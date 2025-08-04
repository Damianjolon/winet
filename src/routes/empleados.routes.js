const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleados.controller');

// Endpoints
router.get('/', empleadosController.getEmpleados);
router.post('/', empleadosController.createEmpleado);

module.exports = router;
