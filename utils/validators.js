const { body } = require('express-validator/check')
const { trusted } = require('mongoose')

exports.registerValidators = [
    body('email').isEmail().withMessage('Enter the correct email'), 
    body('password', 'Password should be alphanumeric type with 6 to 56 symbols length').isLength({min: 6, max: 56}).isAlphanumeric(),
    body('confirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords should be the same')
        }
        return true
    }),
    body('name').isLength({min: 1}).withMessage ('Name shoul consist minimum of 1 symbol')


]