import {body} from 'express-validator';
import valRes from './expValidatorRes.js';

export const registerVal = [
  body("email", "Ingresa un correo electronico con su debida estructura").trim().isEmail().escape(),
  body("password", "Ingresa una contraseña con un minimo de 8 caracteres").trim().isLength({min: 8}).custom((value, {req})=>{
    if (value!==req.body.repassword) throw new Error("No coinciden las contraseñas");
    return value;
  }),
  valRes
];

export const loginVal = [
  body("email", "Ingresa un correo electronico con su debida estructura").trim().isEmail().escape(),
  body("password", "Ingresa una contraseña con un minimo de 8 caracteres").trim().isLength({ min: 8 }),
  valRes
]

export const numVal = [
  body("numInit", "Ingresa un valor numerico").trim().isNumeric(),
  valRes
]