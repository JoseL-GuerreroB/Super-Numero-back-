import { Router } from "express";
import { login, register, sesion } from "../controllers/auth.controller.js";
import { loginVal, registerVal } from "../middlewares/expValidator.js";
import { requiereToken } from "../middlewares/jwtValidator.js";

const rutasAuth = Router();

rutasAuth.post('/auth/register', registerVal, register);
rutasAuth.post('/auth/login', loginVal, login);

rutasAuth.get('/', requiereToken, sesion);

export default rutasAuth;