const express = require('express');
const router = express.Router();
const handlers = require('./queries');

router.get('/', handlers.homePage);
router.post('/query', handlers.runQuery);

module.exports = router;