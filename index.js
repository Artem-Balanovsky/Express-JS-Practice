const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const cartRoutes = require('./routes/cart');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const User = require('./models/user');


const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('631597b113deceb1de596e1f')
        req.user = user
        next()
    } catch (e) {
        console.log(e)
    }
})

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = 'mongodb+srv://Artem_Balanovskyi:QXYrAGkx2L-.5HZ@cluster.w2mzpqy.mongodb.net/shop'
        await mongoose.connect(url, {
            useNewUrlParser: true
        })
        const candidate = await User.findOne()
        if (!candidate) {
            const user = new User({
                email: 'anton@gmail.com',
                name: 'Anton',
                cart: { items: [] }
            })
            await user.save()
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e);
    }

}

start()

