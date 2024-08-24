const express = require('express');
const app = require('../controller/admin-controller')
const router = express.Router();

router.route('/user').get(app.getuser);

module.exports = router;