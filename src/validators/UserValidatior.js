const { body } = require('express-validator');

const loginValidator = [
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 4 characters').isLength({min: 4}),
]

module.exports = {loginValidator};