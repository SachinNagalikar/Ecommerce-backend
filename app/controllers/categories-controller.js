const express = require('express')
const router = express.Router()
const { authorization } = require('../middlewares/authorization')
const { authenticateUser } = require('../middlewares/authenticate')
const { Category } = require('../models/category')

router.get('/',(req, res) => {
    Category.find()
        .then((category) => {
            res.send(category)
        })
        .catch((err) => {
        res.send(err)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Category.findById(id)
        .then((category) => {
            if (category) {
                res.send(category)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
        res.send(err)
    })
})

router.post('/',authenticateUser,authorization, (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.save()
        .then((category) => {
        res.send(category)
        })
        .catch((err) => {
        res.send(err)
    })
})

router.put('/:id',authenticateUser,authorization,(req, res) => {
    const id = req.params.id
    const category = req.body
    Category.findByIdAndUpdate(id, category, function (err, data) {
            if (err) {
                console.log(err)
            }

    })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/:id',authenticateUser,authorization, (req, res) => {
    const id = req.params.id
    Category.findByIdAndDelete(id)
        .then((category) => {
            if (category) {
                res.send(category)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})
module.exports = {
    categoriesRouter:router
}