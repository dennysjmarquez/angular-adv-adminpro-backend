const { request, response } = require('express');
const UsersModel = require('../models/usuario.model');

const validateRole =
	(roles = [], paramsUID = false) =>
	async (req = request, res = response, next) => {
		try {
			let getParamsUID;
			const { uid } = req.usuario;

			// Obtener el usuario del uid
			const usuario = await UsersModel.findById(uid);

			if (paramsUID) {
				getParamsUID = req.params.id;
			}

			if (!usuario || !roles.includes(usuario.role) && paramsUID && getParamsUID !== uid) {
				return res.status(403).json({
					msg: 'Acceso denegado',
				});
			}

			next();
		} catch (e) {
			return res.status(403).json({
				msg: 'Acceso denegado',
			});
		}
	};

module.exports = {
	validateRole,
};
