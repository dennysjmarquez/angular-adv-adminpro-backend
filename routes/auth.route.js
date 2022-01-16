const {Router} = require('express')
const router = Router();
const {check} = require('express-validator');

const {validateFields} = require('../middlewares/validate-fields.middleware');
const {validateJWT} = require('../middlewares/validate-jwt.middleware')

// Controllers
const {login, loginGoogle, tokenRenew} = require('../controllers/auth.controller');


router.post('/',

  [

    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'No es un email valido').isEmail(),
    validateFields

  ], login);

router.post('/google',

  [

    check('token', 'El token de Google es obligatorio').not().isEmpty(),
    validateFields

  ], loginGoogle);


router.get('/tokenrenew',

  [

    validateJWT

  ], tokenRenew);


module.exports = router;
