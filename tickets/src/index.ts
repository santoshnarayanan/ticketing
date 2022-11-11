import mongoose from 'mongoose';
import { app } from './app';

// ! connect to mongodb instance
const start = async ()=>{
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined');
    }
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log("Connectiong to MongoDb");
    }
    catch(err){
        console.error(err);
    }

    app.listen(3000, ()=>{
        console.log("express application - Listening on port 3000!")
    });
};

start();