const {request, response} = require('express');
const bcrypt = require('bcryptjs');

const MedicosModel = require('../models/medico.model');

const getMedicos = async (req = request, res = response) => {

  try {

    let offset = 0;
    let limit = 0;
    let p_medicos;

    if (req.query.offset) {

      offset = Number(req.query.offset) || 0;
      limit = Number(process.env.PAGINATION_LIMIT);

      p_medicos = await MedicosModel.find({})
         .populate('user', 'name img')
         .populate('hospital', 'name img')

         // Paginación de datos

         // Establece desde que registro se va a empezar a mostrar la data
         .skip(offset)

         // Establece cuantos registros se van a mostrar desde la posición del offset,
         // en este caso se muestran de 5 en 5
         .limit(limit)

         // Organiza ascendente por id
         .sort({_id: -1})

    }

    if (!req.query.offset) {

      p_medicos = await MedicosModel.find({})
         .populate('user', 'name img')
         .populate('hospital', 'name img')
         // Organiza ascendente por id
         .sort({_id: -1})

    }

    // Obtiene el total de registros
    const p_records = MedicosModel.countDocuments();
    const [medicos, records] = await Promise.all([p_medicos, p_records]);

    return res.json({
      medicos,
      records,
      limit: req.query.offset ? limit : records,
    });
  } catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }

}

const getMedicoById = async (req = request, res = response) => {

  try {

    const medico_id = req.params.id;
    const medico = await MedicosModel.findById(medico_id).populate('hospital', 'name img');

    if (!medico) {

      return res.status(404).json({
        msg: 'No existe el Médico'
      });

    }

    res.json({
      medico
    });

  } catch (e) {

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

  } catch (e) {

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

    if (!medicoDb) {

      return res.status(404).json({
        msg: 'No existe el Médico'
      });

    }

    const changeFields = {
      ...req.body,
      user: user_uid
    }

    // Actualiza los datos, la opcion new: true
    // indica siempre retorne el nuevo valor ingresado
    // si todó va bien, de lo contrario retornaria el usuario
    // o la informacion como estab antes de la actualizacion, es
    // confuso por eso {new: true} par que retorne los nuevos datos
    // actualizados OK
    const medico = await MedicosModel.findByIdAndUpdate(medico_id, changeFields, {new: true});

    res.json({
      medico
    });

  } catch (e) {

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

    if (!medicoDb) {

      return res.status(404).json({
        msg: 'No existe el Médico'
      });

    }

    res.json({
      msg: 'Médico borrado con éxito',
      medicoDb
    });

  } catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }

}

module.exports = {
  getMedicos,
  getMedicoById,
  createMedico,
  updateMedico,
  deleteMedico
}
