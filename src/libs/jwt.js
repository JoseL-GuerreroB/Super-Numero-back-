import jwt from "jsonwebtoken";
import { jwtSecret } from "./config.js";

export const generarToken = (uid) => {
  try {
    const token = jwt.sign({ uid }, jwtSecret);
    return { token};
  } catch (error) {
    console.log(error);
  }
}

export const erroresToken = {
  "invalid signature": "La firma del JWT no es válida",
  "jwt expired": "JWT expirado",
  "invalid token": "Token no válido",
  "No Bearer": "Utiliza formato Bearer",
  "jwt malformed": "JWT formato no válido",
};