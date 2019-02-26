const mongoose = require('mongoose')
const { Schema } = mongoose
const productSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    description: { 
        type: String,
        required: true,
        minlength:2
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    price: { 
        type: Number,
        minlength: 1,
       required:true
    },
    stock: {
        type: Number,
        Min:0
    },
    codEligible: {
        type: Boolean,
        default: true,
        required:true
    },
    availableFrom: {
        type: Date,
        default:Date.now
    },
    imgURL: {
        type:String
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports={
Product
}