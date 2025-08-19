const express = require('express');
const router = express.Router();
const rolesController = require('./roles.controller');

router.get('/', rolesController.getRoles);

module.exports = router;
