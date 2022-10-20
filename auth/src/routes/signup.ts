import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from './../errors/database-connection-error';
import { setOriginalNode } from 'typescript';
import { BadRequestError } from './../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({min:4, max:20})
    .withMessage('Password must be between 4 and 20 characters')
],
async (req :Request, res: Response)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }

    const {email,password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new BadRequestError('Email in use');
    }

    const user = User.build({email, password});
    await user.save(); //saving details to mongoDb

    // Generate JWT
    const userJwt = jwt.sign({
        id:user.id,
        email:user.email
    }, 
    process.env.JWT_KEY!
    );

    //Store in session object
    req.session = {
        jwt:userJwt
    };

    res.status(201).send(user); //record is created 
});

export {router as signUpRouter};