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

  try {

    const hospital_id = req.params.id;
    const user_uid = req.uid;

    const hospitalDb = await HospitalsModel.findById(hospital_id);

    if(!hospitalDb){

      return  res.status(404).json({
        msg: 'No existe el Hospital'
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
    const hospital = await HospitalsModel.findByIdAndUpdate(hospital_id, changeFields, { new: true });

    res.json({
      hospital
    });

  }catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }

}

const deleteHospital = async (req = request, res = response) => {

  try {

    const hospital_id = req.params.id;


    const hospitalDb = await HospitalsModel.findByIdAndDelete(hospital_id);

    if(!hospitalDb){

      return res.status(404).json({
        msg: 'No existe el Hospital'
      });

    }

    res.json({
      msg: 'Hospital borrado con éxito',
      hospitalDb
    });

  }catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }

}




module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}
