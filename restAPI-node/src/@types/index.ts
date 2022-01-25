import express, { Request, Response, NextFunction} from 'express';
import errorHandle from './middlewares/error.handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.routes';
import jwtAuthenticationMiddleware from './middlewares/jwt-authetication.middleware';

const app = express();


//conf
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//rotas
app.use(statusRoute);
app.use(authorizationRoute);

app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);


app.use(errorHandle); 

//iniciar
app.listen(3000, () => {
    console.log('aplicaco executando na porta 3000');
})