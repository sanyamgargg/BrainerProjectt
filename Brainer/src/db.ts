import mongoose , {Schema} from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/brainer")
.then(()=>{console.log("Connected to MongoDb.")})
.catch(()=>{console.log("connection unsuccessful.")})

//User Schema 

const userSchema = new Schema({

    password: {
        type:String,
        required:true
    },
    username: {
        type:String,
        required: true
        
    }
}) ;

const contentSchema = new Schema({
    link:{
        type:String,
        required:true
    } ,
    title: {
        type:String,
        required:true
    } ,
    type: {
        type:String,
        required:true
    } ,
    userId: {
        type: mongoose.Schema.ObjectId,
        ref:'User'
        
    },
    tags: [{type:mongoose.Schema.ObjectId , ref:"Tags"}]
})

const linkSchema = new Schema({
    hash:{
        type:String
    } ,
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
})

const tagsSchema = new Schema({
    tags: String
})

const userModel = mongoose.model('User',userSchema) ; 
const contentModel = mongoose.model('Content',contentSchema) ;
const linkModel = mongoose.model('Links',linkSchema) ;
const tagModel = mongoose.model('Tags',tagsSchema) ;

export {userModel,contentModel,linkModel,tagModel} ;
