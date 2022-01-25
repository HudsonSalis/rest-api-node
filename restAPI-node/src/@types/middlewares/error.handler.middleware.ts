import { Request, Response,NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { DatabaseError } from "pg";
import ForbbidenError from "../models/erros/forbbiden.error.model";

function errorHandle(error: any,req: Request, res: Response, next: NextFunction){
    if(error instanceof DatabaseError)
    {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    }else if(error instanceof ForbbidenError){
        res.sendStatus(StatusCodes.FORBIDDEN);
    }
    else{
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default errorHandle;
