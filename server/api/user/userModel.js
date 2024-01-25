const mongoose = require('mongoose')

const userSchema = new  mongoose.Schema({
    autoId:{type:Number,default:0},
    name:{type:String,default:""},
    email:{type:String,default:''},
    address:{type:String,default:''},
    phone:{type:String,default:''},
    password:{type:String,default:''},
    createdAt:{type:Date,default:Date.now()},
    status:{type:Boolean,default:true}
})
   

module.exports = mongoose.model('user', userSchema)