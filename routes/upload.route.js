const { Router } = require('express')
const router = Router();

// Middlewares
const { validateJWT } = require('../middlewares/validate-jwt.middleware');
const { validateUploads } = require('../middlewares/validate-uploads.middleware');

const fileUpload = require('express-fileupload');
router.use(fileUpload());


// Controllers
const {

  upLoad,
  returnImg

} = require('../controllers/upload.controller');


router.put('/:type/:id', [validateJWT, validateUploads], upLoad);

router.get('/:type/:photo', [validateUploads], returnImg);


module.exports = router;
