const { Router } = require('express')
const router = Router();

// Middlewares
const { validateJWT } = require('../middlewares/validate-jwt.middleware');

// Controllers
const {

  searchAll,
  searchUser,
  searchMedico,
  searchHospital

} = require('../controllers/search.controller');


router.get('/', validateJWT, searchAll);
router.get('/user', validateJWT, searchUser);
router.get('/medico', validateJWT, searchMedico);
router.get('/hospital', validateJWT, searchHospital);


module.exports = router;
