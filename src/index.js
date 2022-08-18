import express from 'express';
import cors from 'cors';
import { ORIGIN1, ORIGIN2, PORT } from './libs/config.js';
import conexionDB from './db.js';
import rutasAuth from './routes/auth.route.js';
import crudSN from './routes/numS.route.js';

const app = express();
conexionDB();

const whiteList = [ORIGIN1, ORIGIN2];

app.use(cors({
  origin: function (origin, cb) {
    if (whiteList.includes(origin)) return cb(null, origin);
    return cb("Error de cors");
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rutasAuth);
app.use('/app', crudSN);

app.listen(PORT, () => console.log("El servidor esta activo"));