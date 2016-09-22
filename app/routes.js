var Persona = require('./modelo/persona');
var Controller = require ('./controller');

module.exports = function(app) {


	app.get('/api/persona', Controller.getPersona);

	app.post('/api/persona', Controller.setPersona);

	app.put('/api/persona/:persona_id', Controller.updatePersona);

	app.delete('/api/persona/:persona_id', Controller.removePersona);


	app.get('/', function(req, res) {
		res.sendfile('./angular/login.html');
	});

	app.get('./angular/login.html', function(req, res) {
		res.sendfile('./angular/tabla.html');
	});
};