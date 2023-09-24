/* Imports */
const { Router } = require('express')
const user = require('../controllers/user')

/* Initialisations */
const bodyParser = require('body-parser')
const router = Router()

/* Routes */
router.post('/signup', bodyParser.json(), user.signup)
router.post('/login', bodyParser.json(), user.login)

/* Export */
module.exports = router