import User from "../models/User.js";
import { comparar, encriptar } from "../libs/bcrypt.js";
import { generarToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const {email, password} = req.body;
  try {
    const emailre = await User.findOne({email});
    if (emailre) return res.status(400).json({error: "Correo ya existente", mensaje: "Registrate con otro correo o inicia sesion"});
    const hashPass = await encriptar(password);
    let user = new User({
      email,
      password: hashPass,
    });
    user = await user.save();
    const {token} = generarToken(user._id);
    res.status(201).json({sesion: true, mensaje: `Sesion creada`, token});
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Por el momento el servidor esta inactivo, favor de intentarlo más tarde."
    });
  }
}

export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user) return res.status(403).json({
      error: "Usuario no encontrado", 
      mensaje: `El correo ${email} no esta registrado, favor de registrarte para poder ingresar a la aplicacion.`
    });
    const resPassword = await comparar(password, user.password);
    if(!resPassword) return res.status(403).json({
      error: "Contraseña incorrecta",
      mensaje: "Ingresa la contraseña correcta"
    });
    const {token} = generarToken(user._id);
    return res.json({ token});
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Por el momento el servidor esta inactivo, favor de intentarlo más tarde."
    });
  }
} 

export const sesion = async (req, res) => {
  const {uid} = req;
  try {
    const user = await User.findById(uid);
    if(!user) return res.status(403).json({error: "Usuario no registrado", mensaje: "No pudimos encontrar el usuario"});
    return res.status(200).json({ sesion: true, mensaje: "Sesion iniciada", user });
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Por el momento el servidor esta inactivo, favor de intentarlo más tarde."
    });
  }
}