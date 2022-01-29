const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const UsersModel = require('../models/usuario.model');
const { googleVerifyIdToken } = require('../helpers/googleVerifyIdToken.helper');
const { generateJWT } = require('../helpers/jwt.helper');

const login = async (req = request, res = response) => {
	const { email, password } = req.body;

	try {
		// Verifica el Email
		const userDb = await UsersModel.findOne({ email });
		if (!userDb) {
			return res.status(404).json({
				msg: 'No se ha podido encontrar tu cuenta',
			});
		}

		// Verifica el Password
		const validPass = bcrypt.compareSync(password, userDb.password);

		if (!validPass) {
			return res.status(400).json({
				msg: 'Contraseña incorrecta',
			});
		}

		const payLoad = {
			uid: userDb.id,
			role: userDb.role,
		};

		// Genera un Token de JWT
		const token = await generateJWT(payLoad);

		res.json({
			token,
			usuario: userDb
		});
	} catch (e) {

		res.status(500).json({
			msg: 'Error inesperado… revisar logs',
		});
	}
};

const loginGoogle = async (req = request, res = response) => {
	const { token: G_token } = req.body;

	try {
		const { email, name, picture } = await googleVerifyIdToken(G_token);

		// Se chequea si el usuario existe o se va a crear uno nuevo
		const userDB = await UsersModel.findOne({ email });

		let userNew;

		if (!userDB) {
			userNew = new UsersModel({
				password: '123456',
				name,
				email,
				google: true,
				img: picture,
			});

			// Guarda en la Db el user
			await userNew.save();
		} else {
			userNew = userDB;
			userNew.google = true;

			// Guarda en la Db el user
			await userNew.save();
		}

		const payLoad = {
			uid: userNew.id,
			role: userNew.role,
		};

		// Genera un Token de JWT
		const token = await generateJWT(payLoad);

		res.json({
			token,
			usuario: userNew
		});
	} catch (e) {
		console.log(e);

		res.status(500).json({
			msg: 'El Token no es correcto ',
		});
	}
};

const tokenRenew = async (req = request, res = response) => {
	try {
		// Se obtiene el uid del usuario
		const { uid } = req.usuario;

		// Obtener el usuario del uid
		const usuario = await UsersModel.findById(uid);

		if (!usuario) {
			throw 'No se ha podido encontrar la cuenta'
		}

		// PayLoad del Token
		const payLoad = {
			uid: usuario.id,
			role: usuario.role,
		};

		// Genera un Token de JWT
		const token = await generateJWT(payLoad);

		// Regresa un nuevo Token
		res.status(200).json({
			token,
			usuario,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			msg: 'Error inesperado… revisar logs',
		});
	}
};

module.exports = {
   login,
   loginGoogle,
   tokenRenew
}
