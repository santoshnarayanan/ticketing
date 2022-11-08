import express from  'express';
import 'express-async-errors';
import {json} from  'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from '../../common/src/middlewares/error-handler';
import { NotFoundError } from '../../common/src/errors/not-found-error';

const app = express();
app.set('trust proxy', true); // traffic is routed through ingrex-ngnix
app.use(json());
app.use(cookieSession({
    signed:false, //encryption because jwt is encryted
    secure: process.env.NODE_ENV != 'test'  // https
})
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// ! below checks for non route exists
app.all('*',async (req, res)=>{
    throw new NotFoundError();
});
app.use(errorHandler);

export {app};