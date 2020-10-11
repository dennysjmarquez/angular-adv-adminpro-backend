const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const HospitalsModel = require('../models/hospital.model');
const { generateJWT } = require('../helpers/jwt.helper');



const getHospitals = async (req = request, res = response) => {

  try{

    const hospitals = await HospitalsModel.find().populate('user', ['img']);

    return res.json({
      hospitals
    });

  }catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }

}

const createHospital = async (req = request, res = response) => {

  try {


    // Crea un hospital
    const hospital = new HospitalsModel({
      user: req.uid,
      ...req.body
    });


    // Guarda en la Db
    await hospital.save();

    return res.json({
      hospital
    });


  }catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }


}

const updateHospital = async (req = request, res = response) => {

  res.json({
    'ok': 'updateHospital'
  });

}

const deleteHospital = async (req = request, res = response) => {

  res.json({
    'ok': 'deleteHospital'
  });


}




module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}
