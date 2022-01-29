const {request, response} = require('express');

const UserModel = require('../models/usuario.model');
const HospitalModel = require('../models/hospital.model');
const MedicoModel = require('../models/medico.model');

// TODO: implementar esto en las demas busquedas
const escapeStringRegexp = require('escape-string-regexp');

// Convierte un String a una expresión regular que no distingue entre mayúsculas y minúsculas
const regexInsensitive = (value) => (value ? new RegExp(value, 'i') : '');

const searchAll = async (req = request, res = response) => {
   try {
      const q = req.query.q || '';

      // Se hacen las búsquedas simultaneas en vez de esperar con el await a que termina una por una
      const [Users, Hospitals, Medicos] = await Promise.all([
         UserModel.find({name: regexInsensitive(q)}),
         HospitalModel.find({name: regexInsensitive(q)}),
         MedicoModel.find({name: regexInsensitive(q)}),
      ]);

      let results = {
         users: Users,
         hospitals: Hospitals,
         medicos: Medicos,
      };

      return res.json({
         results,
      });
   } catch (e) {
      console.log(e);

      res.status(500).json({
         msg: 'Error inesperado… revisar logs',
      });
   }
};

const searchUser = async (req = request, res = response) => {
   try {
      const offset = Number(req.query.offset) || 0;
      const limit = 10;
      const q = escapeStringRegexp(decodeURIComponent(req.query.q));

      const p_users = UserModel.find({name: regexInsensitive(q)})

         // Paginación de datos

         // Establece desde que registro se va a empezar a mostrar la data
         .skip(offset)

         // Establece cuantos registros se van a mostrar desde la posición del offset,
         // en este caso se muestran de 5 en 5
         .limit(limit);

      // obtiene el total de registros
      const p_records = UserModel.countDocuments({name: regexInsensitive(q)});

      const [users, records] = await Promise.all([p_users, p_records]);

      return res.json({
         Search: q,
         users,
         records,
         limit,
      });
   } catch (e) {
      console.log(e);

      res.status(500).json({
         msg: 'Error inesperado… revisar logs',
      });
   }
};

const searchMedico = async (req = request, res = response) => {
   try {
      const offset = Number(req.query.offset) || 0;
      const limit = 10;
      const q = escapeStringRegexp(decodeURIComponent(req.query.q));

      const p_medico = MedicoModel.find({name: regexInsensitive(q)})
         .populate('user', ['name', 'img'])
         .populate('hospital', ['name', 'img'])

         // Paginación de datos

         // Establece desde que registro se va a empezar a mostrar la data
         .skip(offset)

         // Establece cuantos registros se van a mostrar desde la posición del offset,
         // en este caso se muestran de 5 en 5
         .limit(limit);

      const p_records = MedicoModel.countDocuments({name: regexInsensitive(q)});

      const [medicos, records] = await Promise.all([p_medico, p_records]);

      return res.json({
         Search: q,
         medicos,
         records,
         limit,
      });
   } catch (e) {
      console.log(e);

      res.status(500).json({
         msg: 'Error inesperado… revisar logs',
      });
   }
};

const searchHospital = async (req = request, res = response) => {
   try {
      const offset = Number(req.query.offset) || 0;
      const limit = 10;
      const q = escapeStringRegexp(decodeURIComponent(req.query.q));

      const p_hospital = HospitalModel.find({name: regexInsensitive(q)})
         .populate('user', ['name', 'img'])

         // Paginación de datos

         // Establece desde que registro se va a empezar a mostrar la data
         .skip(offset)

         // Establece cuantos registros se van a mostrar desde la posición del offset,
         // en este caso se muestran de 5 en 5
         .limit(limit);

      const p_records = HospitalModel.countDocuments({name: regexInsensitive(q)});

      const [hospitals, records] = await Promise.all([p_hospital, p_records]);

      return res.json({
         Search: q,
         hospitals,
         records,
         limit,
      });
   } catch (e) {
      console.log(e);

      res.status(500).json({
         msg: 'Error inesperado… revisar logs',
      });
   }
};

module.exports = {
   searchAll,
   searchUser,
   searchMedico,
   searchHospital,
};
