const { request, response } = require('express');

const UserModel = require('../models/usuario.model');
const HospitalModel = require('../models/hospital.model');
const MedicoModel = require('../models/medico.model');


// Convierte un String a una expresión regular que no distingue entre mayúsculas y minúsculas
const regexInsensitive = (value) =>value ? new RegExp(value, 'i') : '';


const searchAll = async (req = request, res = response) => {

  try{


    const q = req.query.q || '';


    // Se hacen las búsquedas simultaneas en vez de esperar con el await a que termina una por una
    const [Users, Hospitals, Medicos] = await Promise.all([
      UserModel.find({ name: regexInsensitive(q) }),
      HospitalModel.find({ name: regexInsensitive(q) }),
      MedicoModel.find({ name: regexInsensitive(q) })
    ]);

    let Result = {};

    Users.length && (Result.Users = Users);
    Hospitals.length && (Result.Hospitals = Hospitals);
    Medicos.length && (Result.Medicos = Medicos);


    Object.keys(Result).length || (Result = []);

    return res.json({
      Search: q,
      Result
    });

  }catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }


}

const searchUser = async (req = request, res = response) => {

  try{

    const q = req.query.q;
    const User = await UserModel.find({ name: regexInsensitive(q) });


    return res.json({
      Search: q,
      Result: User
    });

  }catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }


}

const searchMedico = async (req = request, res = response) => {

  try{

    const q = req.query.q || '';
    const Medico = await MedicoModel.find({ name: regexInsensitive(q) })
      .populate('user', ['name', 'img'])
      .populate('hospital', ['name', 'img']);

    return res.json({
      Search: q,
      Result: Medico
    });

  }catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }


}

const searchHospital = async (req = request, res = response) => {

  try{


    const q = req.query.q || '';
    const Hospital = await HospitalModel.find({ name: regexInsensitive(q) })
      .populate('user', ['name', 'img']);

    return res.json({
      Search: q,
      Result: Hospital
    });

  }catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }


}



module.exports = {

  searchAll,
  searchUser,
  searchMedico,
  searchHospital

}
