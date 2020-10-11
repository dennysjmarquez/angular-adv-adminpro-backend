const { Router } = require('express')
const router = Router();



// Middlewares
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJWT } = require('../middlewares/validate-jwt.middleware');

// Controllers
const {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
} = require('../controllers/hospitals.controller');


router.get('/', validateJWT, getHospitals);

router.post('/',

  // Middlewares

  [

    validateJWT,
    validateFields

  ], createHospital);

router.put('/:id',

  // Middlewares

  [

    validateJWT,
    validateFields

  ], updateHospital);

router.delete('/:id', validateJWT, deleteHospital);



module.exports = router;
