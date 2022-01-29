const {request, response} = require('express');
const bcrypt = require('bcryptjs');

const HospitalsModel = require('../models/hospital.model');
const {generateJWT} = require('../helpers/jwt.helper');

const getHospitals = async (req = request, res = response) => {
  try {

    let offset = 0;
    let limit = 0;
    let p_hospitals;

    if(req.query.offset){

      offset = Number(req.query.offset) || 0;
      limit = Number(process.env.PAGINATION_LIMIT);

      p_hospitals = HospitalsModel.find({})
         // Rellena el campo de ref user del modelo
         .populate('user', ['img', 'name'])

         // Paginación de datos

         // Establece desde que registro se va a empezar a mostrar la data
         .skip(offset)

         // Establece cuantos registros se van a mostrar desde la posición del offset,
         // en este caso se muestran de 5 en 5
         .limit(limit)

         // Organiza ascendente por id
         .sort({_id: -1})

    }

    if(!req.query.offset){

      p_hospitals = HospitalsModel.find({})
         // Rellena el campo de ref user del modelo
         .populate('user', ['img', 'name'])
         // Organiza ascendente por id
         .sort({_id: -1})

    }

    // Obtiene el total de registros
    const p_records = HospitalsModel.countDocuments();
    const [hospitals, records] = await Promise.all([p_hospitals, p_records]);

    return res.json({
      hospitals,
      records,
      limit: req.query.offset ? limit: records,
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs',
    });
  }
};

const createHospital = async (req = request, res = response) => {
  try {
    // Crea un hospital
    const hospital = new HospitalsModel({
      user: req.usuario.uid,
      ...req.body,
    });

    // Guarda en la Db
    await hospital.save();

    return res.json({
      hospital,
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs',
    });
  }
};

const updateHospital = async (req = request, res = response) => {
  try {
    const hospital_id = req.params.id;
    const user_uid = req.usuario.uid;

    const hospitalDb = await HospitalsModel.findById(hospital_id);

    if (!hospitalDb) {
      return res.status(404).json({
        msg: 'No existe el Hospital',
      });
    }

    const changeFields = {
      ...req.body,
      user: user_uid,
    };

    // Actualiza los datos, la opcion new: true
    // indica siempre retorne el nuevo valor ingresado
    // si todó va bien, de lo contrario retornaria el usuario
    // o la informacion como estab antes de la actualizacion, es
    // confuso por eso {new: true} par que retorne los nuevos datos
    // actualizados OK
    const hospital = await HospitalsModel.findByIdAndUpdate(hospital_id, changeFields, {new: true});

    res.json({
      hospital,
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs',
    });
  }
};

const deleteHospital = async (req = request, res = response) => {
  try {
    const hospital_id = req.params.id;

    const hospitalDb = await HospitalsModel.findByIdAndDelete(hospital_id);

    if (!hospitalDb) {
      return res.status(404).json({
        msg: 'No existe el Hospital',
      });
    }

    res.json({
      msg: 'Hospital borrado con éxito',
      hospitalDb,
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs',
    });
  }
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}
