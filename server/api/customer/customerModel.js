const mongoose = require('mongoose')

const customerSchema = new mongoose.schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:''},
    email:{type:String,default:''},
    address:{type:String,default:''},
    phone:{type:String,default:''},
    userId:{type:mongoose.schema.types.objectId,default:null,ref:'user'},
    createdAt:{type:Date,default:Date.now()},
    status:{type:Boolean,default:true}
})

module.exports = mongoose.model('customer', customerSchema)