const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendStatus(200);
});

router.post('/', indexController.storeUserData);

module.exports = router;
