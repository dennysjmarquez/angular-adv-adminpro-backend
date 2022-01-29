const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const UsersModel = require('../models/usuario.model');
const { generateJWT } = require('../helpers/jwt.helper');

const getUsers = async (req = request, res = response) => {
	try {
		let offset = 0;
		let limit = 0;
		let p_users;

		if (req.query.offset) {
			offset = Number(req.query.offset) || 0;
			limit = Number(process.env.PAGINATION_LIMIT);

			p_users = UsersModel.find({}, 'name email role google img')

				// Paginación de datos

				// Establece desde que registro se va a empezar a mostrar la data
				.skip(offset)

				// Establece cuantos registros se van a mostrar desde la posición del offset,
				// en este caso se muestran de 5 en 5
				.limit(limit)

				// Organiza ascendente por id
				.sort({ _id: -1 });
		}

		if (!req.query.offset) {
			p_users = UsersModel.find({}, 'name email role google img')

				// Organiza ascendente por id
				.sort({ _id: -1 });
		}

		// obtiene el total de registros
		const p_records = UsersModel.countDocuments();

		// Optimizamos esperamos que todó termina de una sola vez
		const [users, records] = await Promise.all([p_users, p_records]);

		res.json({
			users,
			records,
			limit: req.query.offset ? limit : records,
		});
	} catch (e) {
		console.log(e);

		res.status(500).json({
			msg: 'Error inesperado… revisar logs',
		});
	}
};

const createUser = async (req = request, res = response) => {
	try {
		const { email, password } = req.body;
		const emailExists = await UsersModel.findOne({ email });

		if (emailExists) {
			return res.status(400).json({
				msg: 'El correo ya está registrado',
			});
		}

		// Crea un usuario nuevo
		const user = new UsersModel(req.body);

		// Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		// Guarda en la Db el user
		await user.save();

		// Genera un Token - JWT
		const token = await generateJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (e) {
		console.log(e);

		res.status(500).json({
			msg: 'Error inesperado… revisar logs',
		});
	}
};

const updateUser = async (req = request, res = response) => {
	try {
		const uid = req.params.id;

		// Se sacan los campos que no queremos que se actualicen
		// usando la desestructuracióny en este caso se saca del
		// objeto resultante newData el campo password, google
		// esto es mas efectivo que usar delete newData.password
		// ó delete newData.google
		//
		// En caso que el objeto tenga más propiedades que el número
		// de variables que requerimos crear, podemos guardar el resto
		// de la información en un último parámetro utilizando tres puntos ;)
		//
		// es decir password, google, email no estan en -> newData pero si
		// existen como variables gracias a la desestructuracióny es
		// decir -> password, google, email si contiene la información
		// pertinente pero en -> newData no existen eso
		const { password, google, email, ...newData } = req.body;

		const userDb = await UsersModel.findById(uid);

		if (!userDb) {
			return res.status(404).json({
				msg: 'No existe el usuario',
			});
		}

		// El email es unico en el modelo de usuario en la Db,
		// no se puede mandar el mismo email si este es diferente
		// es porque se mandó a actualizar y solo en ese caso
		// se agrega también a los nuevos datos
		if (!userDb.google && email && email !== userDb.email) {
			const emailExists = await UsersModel.findOne({ email });

			if (emailExists) {
				return res.status(400).json({
					msg: 'El correo ya está registrado',
				});
			} else {
				// Si se actualizo el email pues se agrega al conjunto
				// de nuevos datos para actualizar
				newData.email = email;
			}
		}

		// Actualiza los datos, la opcion new: true
		// indica siempre retorne el nuevo valor ingresado
		// si todó va bien, de lo contrario retornaria el usuario
		// o la informacion como estab antes de la actualizacion, es
		// confuso por eso {new: true} par que retorne los nuevos datos
		// actualizados OK
		const userUpdate = await UsersModel.findByIdAndUpdate(uid, newData, { new: true });

		res.json({
			userUpdate,
		});
	} catch (e) {
		console.log(e);

		res.status(500).json({
			msg: 'Error inesperado… revisar logs',
		});
	}
};

const deleteUser = async (req = request, res = response) => {
	try {
		const uid = req.params.id;

		const userDb = await UsersModel.findByIdAndDelete(uid);

		if (!userDb) {
			return res.status(404).json({
				msg: 'No existe el usuario',
			});
		}

		res.json({
			msg: 'Usuario borrado con éxito',
			userDb,
		});
	} catch (e) {
		console.log(e);

		res.status(500).json({
			msg: 'Error inesperado… revisar logs',
		});
	}
};

module.exports = {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
};
