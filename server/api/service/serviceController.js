const Service = require('./serviceModel')


//add service
 async function addService(req,res){
    let formData = req.body
    let {name,price,image,categoryId,createdAt}=formData
    let validations=[]
    if(!name){
        validations.push("name")
    }  
    if(!price){
        validations.push("price")
    }
    if(!image){
        validations.push("image")
    }
    if(!categoryId){
        validations.push("categoryId")
    }
    if(!createdAt){
        validations.push("createdAt")
    }

    
//   if(!name||!email||!password||!phone)
//  {
//   res.send({
//     success:true,
//     status:200,
//     message:"name ,email password and phone are required"
//   })
//  }
if(validations.length>0){
    res.send({
        success:false,
        status:400,
        message:validations.join(',')+"  required!!"
    })
}
else{
    console.log("req.files",req.files)
    let existingService = await Service.findOne({name:formData.name})
    if(!!existingService)
    {
        res.send({
            success:false,
            status:400,
            message:"service already exists  with this email"
        })
    }
    else{
        let total = await Service.countDocuments()
         
        let ServiceObj= new Service(formData)
        ServiceObj.autoId=total+1
        if(!!req.files)
        req.foreach(file=>{
    ServiceObj.image.push(".service/"+file.filename)
    });
    ServiceObj.save().then(data=>{
        res.send({
            success:true,
            status:200,
            message:"service added successfully",
            data:data
        })
    }).catch(err=>{
        res.send({
            success:false,
            status:500,
            message:"Error: "+ err
        })
    })
    }
}


}

//retrieve
function getAllService(req,res){
    let limit = 1000
    let startpoint = 0
    let formData = req.body
    if (formData.startpoint!=undefined){
        startpoint= formData.startpoint
        limit=10
    }
    let query ={quantity:{$ne:0}}
    Service.find(query)
    // .select("name email")
    .populate("categoryId","name")
    .sort({name:1,createdAt:-1})
    .skip(startpoint)
    .limit(limit)
    .then(ServiceList=>{
        res.send({
            success:true,
            status:200,
            message:"service loaded successfully",
            data:ServiceList
        })
    }).catch(err=>{
        res.send({
            success:false,
            status:500,
            message:"Error: "+err
        })
    })
}

//category wise service

function getCategoryWiseService(req,res){
// Service.find({_id:req.body._id})
Service.find({categoryId:formData.categoryId})
//.select("name email")
.populate("categoryId","name")
.sort({name:1,createdAt:-1})
.limit(5)
.then(ServiceList=>{
    res.send({
        success:true,
        status:200,
        message:"service loaded successfully",
        data:ServiceList
    })
}).catch(err=>{
    res.send({
        success:false,
        status:500,
        message:"Error: "+ err
    })
})
}

// single service
function getSingleService(req,res){
    Service.findOne({_id:req.body._id})
    .then(ServiceList=>{
        res.send({
            success:true,
            status:200,
            message:"service loaded successfully",
            data:ServiceList
         })
    }).catch(err=>{
        res.send({
            success:false,
            status:500,
            message:"Error: "+ err
        })
    })
}

// update service

function updateService(req,res){
    let formData= req.body
    Service.findOne({_id: formData._id})
    .then(ServiceObj=>{

        if(ServiceObj==null){
            res.send({
                success:false,
                status:404,
                message:"service not found"
            })
           }
           else{
            if(!!formData.name) ServiceObj.name =formData.name
            if(!!formData.price)ServiceObj.price =formData.price
            if(!!formData.categoryId)ServiceObj.categoryId =formData.categoryId
            ServiceObj.save().then(updateRes=>{
                res.send({
                    success:true,
                    status:200,
                    message:"updated",
                    data:updateRes
                })
            }).catch(err=>{
                res.send({
                    success:false,
                    status:500,
                    message:"Error: "+err
                })
            })
           }
    }).catch(err=>{
        res.send({
            success:false,
            status:500,
            message:"Error: "+err
        })
    })
}


module.exports = { addService, getAllService, getCategoryWiseService, getSingleService,updateService}






