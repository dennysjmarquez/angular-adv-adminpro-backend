const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const MedicosModel = require('../models/medico.model');
const { generateJWT } = require('../helpers/jwt.helper');



const getMedicos = async (req = request, res = response) => {

  try{

    const medicos = await MedicosModel.find()
      .populate('user', ['name', 'img'])
      .populate('hospital', ['name', 'img']);

    return res.json({
      medicos
    });

  }catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }

}

const createMedico = async (req = request, res = response) => {

  try {

    // Crea un medico
    const medico = new MedicosModel({
      user: req.uid,
      ...req.body
    });

    // Guarda en la Db
    await medico.save();

    return res.json({
      medico
    })


  }catch (e) {


    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }

}

const updateMedico = async (req = request, res = response) => {

  try {

    const medico_id = req.params.id;
    const user_uid = req.uid;

    const medicoDb = await MedicosModel.findById(medico_id);

    if(!medicoDb){

      return  res.status(404).json({
        msg: 'No existe el Médico'
      });

    }

    const changeFields = {
      ...req.body,
      user: user_uid
    }

    // Actualiza los datos, la opcion new: true
    // indica siempre retorne el nuevo valor ingresado
    // si todo va bien, de lo contrario retornaria el usuario
    // o la informacion como estab antes de la actualizacion, es
    // confuso por eso {new: true} par que retorne los nuevos datos
    // actualizados OK
    const medico = await MedicosModel.findByIdAndUpdate(medico_id, changeFields, { new: true });

    res.json({
      medico
    });

  }catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }

}

const deleteMedico = async (req = request, res = response) => {

  try {

    const medico_id = req.params.id;
    const medicoDb = await MedicosModel.findByIdAndDelete(medico_id);

    if(!medicoDb){

      return res.status(404).json({
        msg: 'No existe el Médico'
      });

    }

    res.json({
      msg: 'Médico borrado con éxito',
      medicoDb
    });

  }catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }

}




module.exports = {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico
}
