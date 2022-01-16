const { response, request } = require('express');

const validateUploads = (req = request, res = response, next) => {
	const { type } = req.params;

	const typesValid = ['hospitals', 'medicos', 'users'];

	// Verifica que sea un folder valido permitido
	if (!typesValid.includes(type)) {
		return res.status(404).json({
			msg: 'Error: no existe está dirección',
		});
	}

	next();
};

module.exports = {
	validateUploads,
};

