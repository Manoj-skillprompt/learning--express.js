import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        index:true,
        trim:true,
    },
    avatar:{
        type:String,
        required:true,
    },
    coverimage:{
        type:String,
    },
    watchHistory:[{
        type:mongoose.Schema.ObjectId,
        ref:'Video'
    }],
    password:{
        type:String,
        required:[true,'password is required'],
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})
export const User= mongoose.model('User',userSchema)