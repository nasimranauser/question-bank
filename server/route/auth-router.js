const express = require('express');
// package
const multer = require("multer");
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
router.route('/update').put(app.updateuser);
router.route('/test').post(app.test);
// predefine route.
// this
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "../../client/src/images/students/");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now();
//       cb(null, uniqueSuffix + file.originalname);
//     },
//   });
  
//   const upload = multer({ storage: storage });
  
//   app.post("/upload-image", upload.single("image"), async (req, res) => {
//     console.log(req.body);
//     const imageName = req.file.filename;
//     // check first, this user and deleted old img in folder.
    
//   });
// this.
module.exports = router;