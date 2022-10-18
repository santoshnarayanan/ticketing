import mongoose from "mongoose";

//! An interface that describes proprties that are required
//! to create a new user
interface UserAttrs{
    email: string;
    password:string;
}

//! An interface describes the properties that 
//! user model has
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs:UserAttrs): UserDoc;
}

//! An interface describes the properties that 
//! user model has
interface UserDoc extends mongoose.Document{
    email: string;
    password:string
}

const userSchema  = new mongoose.Schema({
    email:{
        type:String, required: true
    },
    password:{
        type:String, required: true
    }
});

userSchema.statics.build = (attrs:UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export  {User};