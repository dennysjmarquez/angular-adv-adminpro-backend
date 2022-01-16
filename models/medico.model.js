const { Schema, model } = require('mongoose');

const medicoSchema = Schema({
	user: {
		type: Schema.Types.ObjectID,
		ref: 'User',
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	img: {
		type: String,
	},
	hospital: {
		type: Schema.Types.ObjectID,
		ref: 'Hospital',
		required: true,
	},
});

// Esto para modificar los nombre de los campos retornados de la Db
medicoSchema.method('toJSON', function () {
	// Al extraer los campos dejan de ser regresados, como por ejemplo
	// el Password no conviene que se muestre ese valor por seguridad y
	// por lo tanto no se regresa , igual se extrae el __v por ura estetica
	// se retorna el object con los campos modificados si así se necesita
	// como es el caso del _id que se cambió por uid

	const { __v, _id, ...object } = this.toObject();
	object.uid = _id;

	return object;
});

module.exports = model('Medico', medicoSchema);
