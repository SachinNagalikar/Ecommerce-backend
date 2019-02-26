const express = require('express')
const router = express.Router()
const { Product } = require('../models/product')
const multer = require('multer')
const { authorization } = require('../middlewares/authorization')
const { authenticateUser } = require('../middlewares/authenticate')
const path=require('path')
const storage= multer.diskStorage(
    {
        destination: "./upload/",
        filename: function (req, file,cb) {
    cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname.toLowerCase()))
        }
    })
const upload = multer({
    storage:storage
})


router.get('/',(req,res)=>{

    Product.find()
        .then((product) => {
          console.log('welcome to product')
        res.send(product) 
        })
        .catch((err) => {
        res.send(err)
    })
})

router.get('/:name', (req, res) => {
    const name=req.params.name
    Product.find(name)
        .then((product) => {
        res.send(product)
        })
        .catch((err) => {
        res.send(err)
    })
})

router.get('/:id', (req, res) => {
    const id=req.params.id
    Product.findById(id)
        .then((product) => {
        res.send(product)
        })
        .catch((err) => {
        res.send(err)
    })
})



router.put('/:id',authenticateUser,authorization,(req, res) => {
    const product = req.body
    const id= req.params.id
    Product.findByIdAndUpdate(id, product, function (err, data) {
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

router.post('/add',upload.single("productImg"), (req, res) => {
    console.log(req.file)
    const body = req.body
    const filedest = req.file.destination
    let imgURL = filedest.slice(1) + req.file.filename
    body.imgURL = imgURL
    console.log(req.file)
    const product = new Product(body)
    console.log(product)
    product.save()
    .then((product)=>{  
        res.send({
            product,
            notice: 'successfully added'
        })
    })
    .catch((err) => {
    res.send(err)
})
})

router.delete('/:id',authenticateUser,authorization,  (req, res) => {
    const id = req.params.id
    Product.findByIdAndDelete(id)
        .then((product) => {
            if (product) {
                res.send(product)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    productsRouter:router
}