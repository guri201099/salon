const { sanitizeFilter } = require("mongoose")
const user=require("./userModel")
const bcrypt = require('bcrypt')
const salt =10
const jwt =require('jsonwebtoken')


// adduser
async function add(req,res){
    let formData =req.body
    let{name,email,password,address,phone}=formData
    let validations=[]
   if(!name)
   {
    validations.push("name")
   }
   if(!email)
   {
    validations.push("email")
   }
   if(!password)
   {
    validations.push("password")
   }
   if(!address)
   {
    validations.push("address")
   }
   if(!phone)
   {
    validations.push("phone")
   }
   if (validations.length>0){
    res.send({
        success:false,
        status:400,
        message:validations.join(",")+" required!!"
    })
   }
   else{
    let existingUser = await user.findOne({email:formData.email})
    if (!!existingUser){
        res.send({
            success:false,
            status:400,
            message:"User already exists with this email"
        })
    }
    else{
        let total =await user.countDocuments()
        userObj.autoId = total + 1
        userObj.name = formData.name
        userObj.email = formData.email
        userObj.address = formData.address
        userObj.phone=formData.phone
    let encryptedPswd = bcrypt.hashSync(formData.password,salt)
    userObj.password = encryptedPswd

    userObj.save().then(( userData)=>{
        res.send({
            success:true,
            status:200,
            message:"New User Added",
            data:userData
        })
    })
    .catch((error)=>{
        res.send({
            success:false,
            status:500,
            message:"Error"+error
})
})
}
}
}



// login
async function login(req,res){
    let formData =req.body
    console.log(formData)
    let {email,password}= formData
    let validations=[]

    if(!email){
        validations.push("email")
    }
    if(!password){
        validations.push("password")
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join("+")+" required!!"
        })
    }
    else{
        let userData = await user.findOne({email:formData.email})
        if(!userData){
            res.send({
                success:false,
                status:400,
                message:"user doesn't exists with email"
            })
        }
    else{
        let hasMatched = bcrypt.compareSync(formData.password,userData.password)
        if(!hasMatched)
        {
            res.send({
                success:false,
                status:400,
                message:"invalid credentials"
            })
        }
    else{
        let payload= {_id:userData._id, name: userData.name,usreType: userData.type}
        const token =jwt.sign(payload,"SECRET123")
        console.log("token: ",token)
        res.send({
            success:true,
            status:200,
            message:"login succesful",
            token:token,
            data:userData
        })
    }
    }
    }
}

// all user
function getAllUser(req,res){
    //user.find({_id:req.body._id})
    user.find()
    //.select("name email")
    .select("-password")
    .sort({name:1,createdAt:-1})
    .limit(5)
    .then(userlist=>{
        res.send({
            success:true,
            status:200,
            message:"User loaded successfully",
            data:userlist
        })
        })
        .catch(err=>{
            res.send({
                success:false,
                status:500,
                message:"Error: "+ err
            })
        })
   }

// single user
function getSingleUser(req,res){
    user.findOne({_id:req.body._id})
    .then(userlist=>{
        res.send({
            success:true,
            status:200,
            message:"User loaded successfully",
            data:userlist
        })
    })
    .catch(err=>{
        res.send({
            success:false,
            status:500,
            message:"Error: "+ err
        })
    })
}

// update
function updateUser(req,res){
    let formData= req.body
    user.findOne({_id: formData._id})
    .then(userlist=>{
        if(userObj==null){
            res.send({
                success:false,
                status:404,
                messsage:"User not found"
            })
        }
        else{
            if(formData.name)userObj.name = formData.name
            if(formData.email)userObj.email= formData.email
            if(formData.address)userObj.address=formData.address
            if(formData.phone)userObj.phone=formData.phone
            if(formData.password)userObj.password=formdata.password
            userObj.save().then(updateRes=>{
                res.send({
                    success:true,
                    status:200,
                    message:"Updated",
                    data:updateRes
                })
            })
            .catch(err=>{
                res.send({
                    success:false,
                    status:500,
                    message:"Err: "+ err
                })
            })
        }

    })
}



module.exports = { add , login , getAllUser , getSingleUser , updateUser }