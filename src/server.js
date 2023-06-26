import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from "./config/database-connection.js";
import errorHandler from "./_middleware/error-handler.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(3000);
console.log('Servidor Rodando');