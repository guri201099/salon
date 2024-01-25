const mongoose = require('mongoose')

const bookingSchema = new mongoose.schema({
    autoId:{type:Number,default:0},
    categoryId:{type:mongoose.schema.types.objectId,default:null,ref:'category'},
    services:[{type:mongoose.schema.types.objectId,default:null,ref:service}],
    userId:{type:mongoose.schema.types.objectId,default:null,ref:'user'},
    finalAmount:{type:Number,default:0},
    appointmentDate:{type:Date,default:null},
    // appointmentTime:{type:Time,default:''},
    createdAt:{type:Date,default:Date.now()},
    status:{type:Boolean,default:true}
})

module.exports = mongoose.model('booking', bookingSchema)