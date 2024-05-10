const { body } = require('express-validator');

const CategoryValidate = [
    body('code', 'Code does not Empty').not().isEmpty(),
    body('name', 'Name does not Empty').not().isEmpty(),
]

module.exports = {CategoryValidate};