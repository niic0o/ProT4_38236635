//Encargado de inicializar nuestro servicio que vamos a proporcionar en nuestra api-rest
//Crea el servidor, define el puerto y otras configuraciones necesarias
import express from 'express';
import morgan from 'morgan';
import { router } from './routes.js';

const app = express(); //crea el servidor de la api rest

app.set('port', 3000);

app.use(morgan('dev'));

app.use(express.json()); //interprete para datos enviados en formato json

app.use(router);

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
