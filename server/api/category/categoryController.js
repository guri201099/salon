const category = require('./categoryModel')



//addCategory
async function addCategory(req,res){
    let formData =req.body
    let {name}=formData
    let validations=[]

    if(!name){
        validations.push("name")
    }
    if (validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join(",")+" required!!"
        })
    }
    else{
        let existingCategory =await category.findOne({name:formData.name})
        if(!!existingCategory)
        {
            res.send({
                success:false,
                status:400,
                message:"Category already exists with this email"
            })
         }else{

            let total = await category.countDocuments()

            let categoryObj= new category()
            categoryObj.autoId = total+1
            categoryObj.name =formData.name
            categoryObj.description =formData.description
            if(!!req.file){
                console.log("req.file:",req.file)
                categoryObj.image="/category/"+req.file.filename
            }
            categoryObj.save().then(data=>{
                res.send({
                    success:true,
                    status:200,
                    message:"category added successfully",
                    data:data
                })
             }).catch(err=>{
                res.send({
                    success:false,
                    status:500,
                    message:"Error: "+err
                })
             })
         }
    }
}

//retrieve

function getAllCategory(req,res){
    let limit = 1000
    let startpoint = 0
    let formData=req.body
    if(formData.startpoint!=undefined)
    { 
     startpoint= formData.startpoint
     limit = 5
}
category.find({isDeleted:false})
.sort({name:1,createdAt:-1})
.skip(startpoint)
.limit(limit)
.then(async categoryList=>{
    let total= await category.countDocuments({isDeleted:false})
    res.send({
        success:true,
        status:200,
        message:"Categories loaded successfully",
        total:total,
        totalLoaded:categoryList.length,
        data:categoryList
    })
})
.catch(err=>{
    res.send({
        success:false,
        status:500,
        message:"Error: "+err
    })
})
}

//getsinglecategory
function getSingleCategory(req,res){
    category.findOne({_id:req.body._id,isDeleted:false})
    .then(categoryList=>{
        res.send({
            success:true,
            status:200,
            message:"categorys loaded successfully",
            data:categoryList
        })
    }).catch(err=>{
        res.send({
            success:false,
            status:500,
            message:"Error: "+ err
        })
    })
}

//delete category
function deleteCategory(req,res){
    let formData= req.body
    category.findOne({_id: formData._id,isDeleted:false})
    .then(categoryObj=>{

        if(categoryObj==null){
            res.send({
                success:false,
                status:404,
                message:"category not found"
            })
        }
        else{
            categoryObj.isDeleted= true
            categoryObj.save().then(updateRes=>{
                res.send({
                    success:true,
                    status:200,
                    message:"Deleted"
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
                message:"Error "+err
            })
    })
}

//update
function updateCategory(req,res){
    let formData= req.body
    category.findOne({_id:formData._id})
    .then(categoryObj=>{
        if(categoryObj==null){
            res.send({
                success:false,
                status:404,
                message:"category not found"  
            })
        }
        else{
            if(!!formData.name) categoryObj.name = formData.name
            if(!!formData.image) categoryObj.image = formData.image
            
            categoryObj.save().then(updateRes=>{
                res.send({
                    success:true,
                    status:200,
                    message:"Updated",
                    data:updateRes
                })
            }).catch(err=>{
                res.send({
                    success:false,
                    status:500,
                    message:"Error: "+err
                })
            }).catch(err=>{
                res.send({
                    success:false,
                    status:500,
                    message:"Error: " +err
                })
            })
        }
    })
}





module.exports ={addCategory, getAllCategory, getSingleCategory, deleteCategory, updateCategory}