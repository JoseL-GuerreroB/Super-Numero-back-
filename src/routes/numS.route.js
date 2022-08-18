import {Router} from 'express';
import { deleteNumS, deleteNumSs, getNumSs, postNumS } from '../controllers/numS.controller.js';
import { numVal } from '../middlewares/expValidator.js';
import { requiereToken } from '../middlewares/jwtValidator.js';

const crudSN = Router();

crudSN.get('/SN', requiereToken, getNumSs);
crudSN.post('/SN', requiereToken, numVal, postNumS);
crudSN.delete('/SN/:id', requiereToken, deleteNumS);
crudSN.delete('/SN', requiereToken, deleteNumSs);

export default crudSN;