const { Router } = require('express')
const router = Router();



// Middlewares
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJWT } = require('../middlewares/validate-jwt.middleware');

// Controllers
const {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico
} = require('../controllers/medicos.controller');

router.get('/', validateJWT, getMedicos);

router.post('/',

  // Middlewares

  [

    validateJWT,
    check('hospital', 'El id del hospital es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital no es válido').isMongoId(),
    check('name', 'El nombre del médico es obligatorio').not().isEmpty(),
    validateFields

  ], createMedico);

router.put('/:id',

  // Middlewares

  [

    validateJWT,
    check('hospital', 'El id del hospital es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital no es válido').isMongoId(),
    check('name', 'El nombre del médico es obligatorio').not().isEmpty(),
    validateFields

  ], updateMedico);

router.delete('/:id', validateJWT, deleteMedico);



module.exports = router;
