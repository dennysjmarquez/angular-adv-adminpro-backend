const { Router } = require('express');
const router = Router();
const { ROLES } = require('../constant');

// Middlewares
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJWT } = require('../middlewares/validate-jwt.middleware');
const { validateRole } = require('../middlewares/validate-role.middleware');

// Controllers
const { getMedicos, getMedicoById, createMedico, updateMedico, deleteMedico } = require('../controllers/medicos.controller');

router.get('/', validateJWT, getMedicos);

router.get(
	'/:id',

	// Middlewares

	[validateJWT],
	getMedicoById
);

router.post(
	'/',

	// Middlewares

	[
		validateJWT,
		validateRole([ROLES.ADMIN_ROLE]),
		check('hospital', 'El id del hospital es obligatorio').not().isEmpty(),
		check('hospital', 'El id del hospital no es válido').isMongoId(),
		check('name', 'El nombre del médico es obligatorio').not().isEmpty(),
		validateFields,
	],
	createMedico
);

router.put(
	'/:id',

	// Middlewares

	[
		validateJWT,
		validateRole([ROLES.ADMIN_ROLE]),
		check('hospital', 'El id del hospital es obligatorio').not().isEmpty(),
		check('hospital', 'El id del hospital no es válido').isMongoId(),
		check('name', 'El nombre del médico es obligatorio').not().isEmpty(),
		validateFields,
	],
	updateMedico
);

router.delete(
	'/:id',

	// Middlewares

	[validateJWT, validateRole([ROLES.ADMIN_ROLE])],
	deleteMedico
);

module.exports = router;
