const express = require('express')
const router = express.Router();
const { getMessages, addMessages } = require('../controllers/messagesController');
const { route } = require('./userRoutes');

router.post('/addmessages', addMessages);
router.post('/getmessages', getMessages);

module.exports = router;