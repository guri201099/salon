const user = require('../api/user/userModel')

exports.createAdmin =  async function(){
    let userObj = new User({
        name:"admin",
        email:"admin1@gmail.com",
        phone:9115691156 ,
        password:"9hbjus%gtteik#dghbcfvg$jmduhnk",
        userType:1
    })

    let existingAdmin= await User.findeOne({email:userObj.email})
    if(existingAdmin){
        console.log("Admin already exists")
    }
    else{
        userObj.save().then(x=>{
            console.log("Admin created")
        })
        .catch(err=>{
            console.log("Admin creation error:",err)
        })
    }
}