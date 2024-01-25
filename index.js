const express = require('express')
const app = express()
const port = 5000
const adminRoutes=require("./routes/adminRoutes")
const seed =  require('./server/config/seeder')
require('./server/config/db')

app.use(express.urlencoded())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("welcome to the server")
})
app.use('/admin',adminRoutes)

app.listen(port,(err)=>{
    if (err)
    console.log("error occured---",err);
    else
    console.log("server is running");
})