const { Schema, model } = require('mongoose');

const hospitalSchema = Schema(
	{
		name: {
			type: String,
			required: true,
		},
		img: {
			type: String,
		},
		user: {
			required: true,
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
	},

	// Por defecto mongoose le agrega al los modelos un s al final del nombre del modelo,
	// y en este caso seria por defecto “Hospitals” y con esta opción le damos un
	// nombre personalizado “hospitales” y así va a aparecer en la Db de mongoose
	{ collection: 'hospitales' }
);

// Esto para modificar los nombre de los campos retornados de la Db
hospitalSchema.method('toJSON', function () {
	// Al extraer los campos dejan de ser regresados, como por ejemplo
	// el Password no conviene que se muestre ese valor por seguridad y
	// por lo tanto no se regresa , igual se extrae el __v por pura estetica

	const { __v, _id, ...object } = this.toObject();

	object.uid = _id;

	return object;
});

module.exports = model('Hospital', hospitalSchema);
