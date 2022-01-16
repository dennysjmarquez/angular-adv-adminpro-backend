const { Router } = require('express')
const router = Router();

// Middlewares
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJWT } = require('../middlewares/validate-jwt.middleware');

// Controllers
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');



router.get('/', validateJWT, getUsers);

router.post('/',

  // Middlewares

  [

    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'No es un email valido').isEmail(),
    validateFields

  ], createUser);

router.put('/:id',

  // Middlewares

  [

    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'No es un email valido').isEmail(),
    check('role', 'El Role es obligatorio').not().isEmpty(),
    validateFields

  ], updateUser);

router.delete('/:id', validateJWT, deleteUser);



module.exports = router;
