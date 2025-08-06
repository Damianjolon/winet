const express = require('express');
const router = express.Router();
const empleadosCtrl = require('../controllers/empleadosController');

router.get('/', empleadosCtrl.getEmpleados);
router.post('/', empleadosCtrl.addEmpleado);
router.put('/:id', empleadosCtrl.updateEmpleado);
router.delete('/:id', empleadosCtrl.deleteEmpleado);

module.exports = router;
