import express from "express" ;
import mongoose from "mongoose" ;
import jwt from "jsonwebtoken" ;
import {contentModel, linkModel, userModel} from "./db" ;
import {JWT_PASSWORD} from "./config" ;
import { userMiddleware } from "./middleware";
import { randomgen } from "./utils";

const app = express() ;
app.use(express.json()) ;

app.post("/api/v1/signup",async(req,res)=>{
    
    const {email,password,name} = req.body ;


    try{
        await userModel.create({
            email:email,
            password:password,
            name:name
        }) ;
    
        res.json({
            name:name,
            email:email,
            password:password
        }) ;
    }catch(e){
        message:e
    }
    

}) ;

app.post("/api/v1/signin",async(req,res)=>{
    const {email,password} = req.body ;

    const checkPassword = await userModel.findOne({
        email:email,
        password:password
    }) ;

    if(checkPassword){
        const token = jwt.sign({
            id:checkPassword._id 
        },JWT_PASSWORD) ;
        res.json({
            token:token 
        })
    }else{
        res.json({
            message:"Incorrect credentials."
        })
    }
});

app.post("/api/v1/content",userMiddleware,async(req,res)=>{
    const {link,title} = req.body ;
    await contentModel.create({
        link:link,
        title:title,
        //@ts-ignore
        userId:req.userId,
        tags:[]
    })
    res.json({
        message:"Content Added."
    })
});

app.get("/api/v1/content",userMiddleware,async(req,res)=>{
    //@ts-ignore
    const userId = req.userId ;
    const content = await contentModel.find({
        userId:userId
    }).populate("userId","email") ;
    res.json({
        content:content
    })

});

app.delete("/api/v1/content",userMiddleware,async(req,res)=>{
    const contentId = req.body.contentId ;

    await contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId:req.userId
    })

    res.json({
        message:"content deleted."
    })
});

app.post("/api/v1/brain/share ",userMiddleware,async(req,res)=>{
    const {share} = req.body ;
    if(share){
        const existingLink  = await linkModel.findOne({
            //@ts-ignore
            userId: req.userId 
        })
        if(existingLink){
            res.json({
                message: existingLink.hash
            })
            return ;
        }

        const hash = randomgen(10);
       await linkModel.create({
         //@ts-ignore
            userId: req.userId,
            hash: hash
        })
        res.json({
            message:"/share/"+hash
        })
    }else{
         await linkModel.deleteOne({
             //@ts-ignore
            userId: req.userId
           
        })
        res.json({
            message: "Link Removed."
        })
    }
    

});

app.get("/api/v1/brain/:shareLink",async(req,res)=>{
    const hash = req.params.shareLink ; 

    const link = await linkModel.findOne({
        hash:hash
    })

    if(!link){
        res.status(411).json({
            message:"Incorrect Input."
        })
        return ;
    }

    const user = await userModel.findOne({
        _id:link?.userId
    })

    const content = await contentModel.find({
        userId: link?.userId
    })

    res.json({
        user:user?.email ,
        content:content
    })


});

app.listen(3000) ;