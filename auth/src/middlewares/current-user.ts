import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import express from 'express';

interface UserPayLoad{
    id:string;
    email:string;
}

//! Below is updating or modifying existing interface of Request Object
declare global{
    namespace Express{
        interface Request{
            currentUser?: UserPayLoad;
        }
    }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    if(!req.session?.jwt){
        return next();
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)as UserPayLoad;
        req.currentUser = payload;
      } catch (error) {
      }
      next();
};
