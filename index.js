const express = require("express")
const app=express()
require("./mongoose")
const multer = require("multer")
const blog=require("./blogmodel")
app.use(express.static("public"))
app.use(express.json())

const storage = multer.diskStorage({
    destination:(req,res,cb)=>
    {
        cb(null,"public/uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
const upload = multer({storage:storage}).single("image")
app.post('/',async(req,res)=>{

    upload(req,res,async (err)=>{
        const data = new blog({name:req.body.name,
            image:"localhost:4000/uploads/"+req.file.filename
    })
     await data.save()
    res.send("file upladed")
})
}).listen(4000)