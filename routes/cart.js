const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

function mapCartItems(cart) {
    return cart.items.map(c => ({
        ...c.courseId._doc, count: c.count
    }))
}

router.post('/add', async (req, res) => {
    const course = await Course.findById(req.body.id)
    await req.user.addToCart(course)
    res.redirect('/cart')
})

router.delete('/remove/:id', async (req, res) => {
    const cart = await cart.remove(req.params.id)
    res.status(200).json(cart)
})

router.get('/', async (req, res) => {
    const user = await req.user
    .populate['cart.items.courseId']

    console.log('User:', user)

    const courses = mapCartItems(user.cart)

    res.render('cart', {
        title: 'Cart',
        isCart: true,
        courses: courses,
        price: 0,
    })
})

module.exports = router;