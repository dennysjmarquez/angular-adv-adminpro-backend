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

  res.json({
    'ok': 'updateMedico'
  });

}

const deleteMedico = async (req = request, res = response) => {

  res.json({
    'ok': 'deleteMedico'
  });


}




module.exports = {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico
}
