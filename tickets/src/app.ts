import express from  'express';
import 'express-async-errors';
import {json} from  'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler,NotFoundError } from '@santoshntickets/common';

const app = express();
app.set('trust proxy', true); // traffic is routed through ingrex-ngnix
app.use(json());
app.use(cookieSession({
    signed:false, //encryption because jwt is encryted
    secure: process.env.NODE_ENV != 'test'  // https
})
);

// ! below checks for non route exists
app.all('*',async (req, res)=>{
    throw new NotFoundError();
});
app.use(errorHandler);

export {app};