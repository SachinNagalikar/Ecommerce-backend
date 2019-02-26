const express = require('express')
const mongoose = require('./config/database')
const { usersRouter } = require('./app/controllers/users-controller')
const { categoriesRouter } = require('./app/controllers/categories-controller')
const {productsRouter}=require('./app/controllers/products-controllers')
const app = express()
app.use('/upload',express.static('upload'))
app.use(express.json())
const port = 3000
app.get('/', (req, res) => {
    res.send('Welcome to the Ecommerce')
})
app.use('/products',productsRouter)
app.use('/users',usersRouter)
app.use('/categories',categoriesRouter)
app.listen(port, () => {
    console.log('Listening to port 3000')
}) 