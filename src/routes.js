import express from 'express';
import { LocalController } from './controllers/LocalController.js';

const routes = express.Router();

routes.get('/locais', LocalController.findAll);
routes.get('/locais/:id', LocalController.findByPk);
routes.post('/locais', LocalController.create);
routes.put('/locais/:id', LocalController.update);
routes.delete('/locais/:id', LocalController.delete);

export default routes;