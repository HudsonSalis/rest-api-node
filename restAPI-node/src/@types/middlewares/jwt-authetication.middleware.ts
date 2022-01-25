import { Response,NextFunction,Request } from "express";
import ForbbidenError from "../models/erros/forbbiden.error.model";
import JWT from 'jsonwebtoken';

async function jwtAuthenticationMiddleware(req:Request, res: Response, next: NextFunction){

    try {
        const authorizationHeader = req.headers['authorization'];

        if( !authorizationHeader){
            throw new ForbbidenError('Credenciais não informadas');
        }
        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Bearer' || !token){
            throw new ForbbidenError('Tipo de autenticação inválida')
        }

        const tokenPayload = JWT.verify(token, 'my_secret_key');

        try {
            if( typeof tokenPayload !== 'object' || !tokenPayload.sub){
                throw new ForbbidenError('Credenciais não informadas');
            }
            const uuid = tokenPayload.sub;
    
            const user = {uuid: tokenPayload.sub, username: tokenPayload.username};
    
            req.user = user;
    
            next();
        } catch (error) {
            throw new ForbbidenError('Token inválido')
        }

        

    } catch (error) {
        next(error);
    }
}

export default jwtAuthenticationMiddleware;