import express from 'express';
import MainController from './controllers/MainController';
import CurrenciesController  from './controllers/CurrenciesController';

const routes = express.Router();

const mainController = new MainController();
const currenciesController = new CurrenciesController();

routes.get('/transaction', mainController.listAll);
routes.post('/transaction', mainController.create);
routes.put('/transaction/:id', mainController.update);
routes.delete('/transaction/:id', mainController.delete);

routes.get('/currencies', currenciesController.listAll);

export default routes;