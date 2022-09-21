import {ValidationError} from 'express-validator';

// !Custom error class
export class RequestValidationError extends Error {
    constructor(public errors: ValidationError []){
        super();

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
}