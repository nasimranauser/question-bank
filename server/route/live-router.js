const express = require('express');
// import middleware
const enrollMiddleware = require('../middleware/enrollMiddleware');
const joiningMiddleware = require('../middleware/joiningMiddleware');
const questionMiddleware = require('../middleware/questionMiddleware')
const ansMiddleware = require('../middleware/ans-middleware')
const getansMiddleware = require('../middleware/gans-middleware');
const completedMiddleware = require("../middleware/completedMiddleware")

const router = express.Router();
const app = require('../controller/live-controller')

router.route('/add').post(app.add_exam);
router.route('/get').get(app.get_exam);
router.route('/get/:eid/:sid').get(app.get_cexam);
router.route('/enroll').post(enrollMiddleware, app.enrolled);
router.route('/joining').get(joiningMiddleware, app.joiningexam);
router.route('/completed').get(completedMiddleware, app.completed);
router.route('/question/add').post(app.addquestion);
router.route('/question/get').get(questionMiddleware, app.getquestion);
router.route('/answer/put').post(ansMiddleware, app.reciveanswer);
router.route('/answer/get').get(getansMiddleware, app.getans);


module.exports = router;