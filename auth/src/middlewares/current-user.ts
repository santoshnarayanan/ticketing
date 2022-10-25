import { currentUser } from './current-user';
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    if(!req.session?.jwt){
        return next();
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        req.currentUser = payload;
      } catch (error) {
      }
      next();
};
