const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send("Hello, Kody!");
  // res.json({"message": "Hello, Kody!"})
});

router.post('/', indexController.storeUserData);

module.exports = router;
