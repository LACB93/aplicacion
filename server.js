var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var port  	 = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost:27017/usua_reg');

app.configure(function() {
	app.use(express.static(__dirname + '/angular'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

//app.get('angular/registro.html', function(req,res){
//		res.sendfile('registro');
//	})

require('./app/routes.js')(app);


app.listen(port);
console.log("APP por el puerto " + port);
