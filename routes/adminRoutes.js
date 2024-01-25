const router = require('express').Router()
const user=require("../server/api/user/UserController")
const serviceController = require('../server/api/service/serviceController')
const categoryController = require('../server/api/category/categoryController')
const bookingController = require('../server/api/booking/bookingController')
const customerController = require('../server/api/review/reviewController')

const path = require('path')
const multer= require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./server/public/category')
        },
        filename:function(req,file,cb){
        const filename = Date.now() + path.extname(file.originalname)
        cb(null,filename)
        }
    })
    const upload = multer({storage:storage})

    const storageProd = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'./server/public/service')
        },
        filename:function(req,file,cb){
           // console.log("file:",file)
            const filename = Date.now() + path.extname(file.originalname)
            cb(null,filename)
        }
    })
    const uploadProd = multer({storage:storageProd})



router.get('/',(req,res)=>{
    res.send({
        message:"welcome to the adminRoutes"
    })
})

//user
router.post("/user/login",user.login)
router.post("/user/add",user.add)
router.post("/user/all",user.getAllUser)
router.post("/user/single",user.getSingleUser)
router.post("/user/update",user.updateUser)

//service
router.post("/service/add",serviceController.addService)
router.post("/service/all",serviceController.getAllService)
router.post("/service/single",serviceController.getSingleService)
router.post("/service/categoryWise",serviceController.getCategoryWiseService)
router.post("/service/update",serviceController.updateService)

//category
router.post("/category/add",upload.single('image'),categoryController.addCategory)
router.post("/category/all",categoryController.getAllCategory)
router.post("/category/single",categoryController.getSingleCategory)
router.post("/category/delete",categoryController.deleteCategory)
router.post("/category/update",categoryController.updateCategory)











module.exports= router