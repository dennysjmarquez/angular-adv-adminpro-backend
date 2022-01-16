const { Schema, model } = require('mongoose');

const userSchema = Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		default: 'USER_ROLE',
	},
	google: {
		type: Boolean,
		default: false,
	},
});

// Esto para modificar los nombre de los campos retornados de la Db
userSchema.method('toJSON', function () {
	// Al extraer los campos dejan estos de ser regresados, como por ejemplo
	// el Password no conviene que se muestre ese valor por seguridad y
	// por lo tanto no se regresa , igual se extrae el __v por pura estetica
	// se retorna el object con los campos modificados si así se necesita
	// como es el caso del _id que se cambió por uid

	const { __v, _id, password, ...object } = this.toObject();

	object.uid = _id;

	return object;
});

module.exports = model('User', userSchema);
