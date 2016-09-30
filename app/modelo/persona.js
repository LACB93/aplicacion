var mongoose = require('mongoose');

module.exports = mongoose.model('Persona', {
	nombre: String,
	usuario: String,
	email: String,
	mensaje: String
});