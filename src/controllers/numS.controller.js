import NumS from "../models/NumS.js";

function filtrarNum(value) {
  let res=0;
  const num = value.toString();
  for (const n of num) {
    res = res + parseInt(n);
  }
  return res;
}

export const getNumSs = async(req, res) => {
  try {
    const sNums = await NumS.find({uid: req.uid});
    res.status(201).json(sNums);
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Por el momento el servidor esta inactivo, favor de intentarlo más tarde.",
    });
  }
}

export const postNumS = async(req, res) => {
  const ssNum = req.body;
  const {uid} = req;
  ssNum.uid = uid;
  let str = ssNum.numInit.toString();
  try {
    let userAnt = await NumS.findOne({
      $and: [
        { numInit: ssNum.numInit }, { uid: uid },
      ]
    });
    if (userAnt) return res.status(200).json({numero: userAnt});
    while (str.length >= 2) {
      const resultado = filtrarNum(str);
      str = resultado.toString();
    }
    ssNum.superNum = str;
    const sNum = new NumS(ssNum);
    await sNum.save();
    res.status(201).json({mensaje: "mensaje creado", numero:sNum});
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Por el momento el servidor esta inactivo, favor de intentarlo más tarde.",
    });
  }
}

export const deleteNumS = async (req,res) => {
  const { id } = req.params;
  const { uid } = req;
  try {
    let sNum = await NumS.findOne({
      $and: [
        { _id: id }, { uid: uid },
      ]
    });
    if (!sNum || sNum.length === 0) return res.status(403).json({ error: "NumS no encontrado", mensaje: "No puedes eliminar un recurso inexistente" });
    await NumS.findByIdAndRemove(id);
    return res.status(200).json({ok: true, numero: sNum});
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Por el momento el servidor esta inactivo, favor de intentarlo más tarde.",
    });
  }
}

export const deleteNumSs = async (req, res) => {
  const { uid } = req;
  try {
    await NumS.deleteMany({ uid: uid });
    return res.status(200).json({ ok: true, mensaje: "Se eliminaron los documentos" });
  } catch (error) {
    return res.status(500).json({
      error: "Error del servidor",
      mensaje: "Por el momento el servidor esta inactivo, favor de intentarlo más tarde.",
    });
  }
}