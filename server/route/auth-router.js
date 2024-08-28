const express = require('express');
// import controller
const app = require('../controller/auth-controller');
// import schema
const testSchema = require('../validators/test-validator');
// validate
const validate = require('../middleware/validate-middleware')
// import middleware
const authMiddleware = require('../middleware/auth-middleware');

// init router r
const router = express.Router();

router.route('/').get(app.home);
router.route('/register').post(app.register);
router.route('/login').post(app.login);
router.route('/cuser').get(authMiddleware, app.cuser);
router.route('/test').post(app.test);
module.exports = router;