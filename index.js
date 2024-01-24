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
        const data = new blog({
            blogId:req.body.blogId,
            name:req.body.name,
            description:req.body.description,
            category:req.body.category,
            image:"localhost:4000/uploads/"+req.file.filename
    })
     await data.save()
    res.send("file upladed")
})
})

app.get("/",async(req,res)=>{
    const data = await blog.find()
    res.send(data) 
})

// app.put("/update",async(req,res)=>{
//     let update = await blog.updateOne({name:req.body.name},{$set:{name:req.body.name,image:req.body.image}})
//     res.send({message:"Update Successfully!!", data:update})
// })

// app.delete("/delete",async(req,res)=>{
//     let deletee = await blog.deleteOne({name:req.body.name})
// })

app.listen(4000)