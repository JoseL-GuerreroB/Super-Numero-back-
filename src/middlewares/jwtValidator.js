import jwt from "jsonwebtoken";
import { jwtSecret } from "../libs/config.js";
import { erroresToken } from "../libs/jwt.js";

export const requiereToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) return res.status(401).json({ error: "Token inexistente", mensaje: "No existe el token en el header, usa Bearer" });
    token = token.split(" ")[1];
    // Bearer tokenfdvo444...
    const { uid } = jwt.verify(token, jwtSecret);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: erroresToken[error.message] });
  }
}
