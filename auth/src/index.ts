import express from  'express';
import 'express-async-errors';
import {json} from  'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// ! below checks for non route exists
app.all('*',async (req, res)=>{
    throw new NotFoundError();
});
app.use(errorHandler);

// ! connect to mongodb instance
const start = async ()=>{
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