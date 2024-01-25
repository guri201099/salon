const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:''},
    price:{type:Number,default:''},
    image:{type:String,default:''},
    categoryId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'category'},
    createdAt:{type:Date,default:Date.now()},
    status:{type:Boolean,default:true}
})

module.exports = mongoose.model('service', serviceSchema)