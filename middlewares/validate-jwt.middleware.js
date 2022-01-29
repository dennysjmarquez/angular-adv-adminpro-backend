const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = async (req = request, res = response, next) => {
	const { authorization: token } = req.headers;

	try {
		if (!token) {
			return res.status(401).json({
				msg: 'Token no definido',
			});
		}

		// Leer Token
		const data = await jwt.verify(token, process.env.JWT_SECRET);
		const { uid, role } = data.payLoad;

		// se pasa al controlador el uid
		req.usuario = { uid, role };

		next();
	} catch (e) {
		res.status(500).json({
			msg: 'Token no valido',
		});
	}
};

module.exports = {
	validateJWT,
};
