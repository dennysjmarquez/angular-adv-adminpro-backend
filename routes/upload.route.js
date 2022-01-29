const { Router } = require('express');
const router = Router();
const { ROLES } = require('../constant');

// Middlewares
const { validateJWT } = require('../middlewares/validate-jwt.middleware');
const { validateUploads } = require('../middlewares/validate-uploads.middleware');

const fileUpload = require('express-fileupload');
router.use(fileUpload());

// Controllers
const { upLoad, returnImg } = require('../controllers/upload.controller');
const { validateRole } = require('../middlewares/validate-role.middleware');


router.put('/:type/:id', [validateJWT, validateRole([ROLES.ADMIN_ROLE], true), validateUploads], upLoad);

router.get('/:type/:photo', [validateUploads], returnImg);

module.exports = router;
