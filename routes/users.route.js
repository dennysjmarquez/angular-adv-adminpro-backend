const { Router } = require('express');
const router = Router();
const { ROLES } = require('../constant');

// Middlewares
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJWT } = require('../middlewares/validate-jwt.middleware');
const { validateRole } = require('../middlewares/validate-role.middleware');

// Controllers
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');

router.get('/', [validateJWT, validateRole([ROLES.ADMIN_ROLE])], getUsers);

router.post(
	'/',

	// Middlewares

	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('password', 'La contraseña es obligatoria').not().isEmpty(),
		check('email', 'El email es obligatorio').not().isEmpty(),
		check('email', 'No es un email valido').isEmail(),
		validateFields,
	],
	createUser
);

router.put(
	'/:id',

	// Middlewares

	[
		validateJWT,
		validateRole([ROLES.ADMIN_ROLE], true),
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'No es un email valido').isEmail(),
		check('role', 'El Role es obligatorio').not().isEmpty(),
		validateFields,
	],
	updateUser
);

router.delete(
	'/:id',

	// Middlewares

	[validateJWT, validateRole([ROLES.ADMIN_ROLE])],
	deleteUser
);

module.exports = router;
