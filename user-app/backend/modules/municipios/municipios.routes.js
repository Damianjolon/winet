const express = require('express');
const router = express.Router();
const municipiosController = require('./municipios.controller');

router.get('/listar', municipiosController.getMunicipios);

module.exports = router;
