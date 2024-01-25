const mongoose = require('mongoose')

const reviewSchema = new mongoose.schema({
    autoId:{type:Number,default:0},
    review:{type:String,default:''},
    rating:{type:number,default:''},
    userId:{type:mongoose.schema.types.objectId,default:null,ref:'user'},
    serviceId:{type:mongoose.schema.types.objectId,default:null,ref:'service'},
    createdAt:{type:Date,default:Date.now()},
    status:{type:Boolean,default:true}
})

module.exports = mongoose.model('review', reviewSchema)