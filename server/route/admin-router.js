const express = require('express');
const app = require('../controller/admin-controller')
const router = express.Router();

// user
router.route('/user').get(app.getuser);
router.route('/user/delete').delete(app.userdelete);
// exam
router.route('/exam/create').post(app.examcreate);
router.route('/exam').get(app.exam);
router.route('/exam/delete').delete(app.examdelete);
// get enrolled exam.
router.route('/exam/enrolled').get(app.enrolleddata);

module.exports = router;