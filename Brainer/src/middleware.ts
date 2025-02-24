import { Request,Response,NextFunction } from "express";
import { JWT_PASSWORD } from "./config"; 
import jwt from "jsonwebtoken";

export const userMiddleware = ((req:Request,res:Response,next:NextFunction)=>{

    const header = req.headers["authorization"] ;
    try{
        var decoded = jwt.verify(header as string,JWT_PASSWORD) ;
        if(decoded){
            // @ts-ignore
            req.userId = decoded.id ;
            next() ;
         }
    }catch{
        res.json({
            message:"not logged in"
        })
    }
    

})