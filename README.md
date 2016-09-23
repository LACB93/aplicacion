# aplicación
>>>>>>> abd8b8200dc1696d2d0544dfaf6ef5386c051fdc


Aplicación utilizando MEAN(Mongo-Express-Angular-Node)
===================

Aquí se muestra como desarrollar una aplicación web con MEAN(Mongo-Express-Angular-Node) 

----------


MEAN
-------------
MEAN utiliza las tecnologías de MongoDB, Express, AngularJS y NodeJS para hacer aplicaciones web y utilizan el mismo lenguaje de programación, **Javascript**. 

Este tipo de aplicaciones consiste en desarrollar una **API REST con NodeJS y Express** y esta API puede hacer un **CRUD** (**C** reate - **R** ead - **U** pload - **D** elete) a la base de datos de **MongoDB**. Con este API se comunicará **AngularJS (que es el Frontend)** haciendo peticiones (Get, Post, Put y Delete) cuyos datos se actualizaran en la aplicación. 

```sequence

Note right of MongoDB: Base de Datos
MongoDB-> Node + Express: respuesta de la base de datos 
Note right of Node + Express: API REST
Node + Express->MongoDB: consulta a la base de datos
Note right of AngularJS:FRONTEND
Node + Express-> AngularJS: devuelve un objeto en json
AngularJS-> Node + Express: llamada al API

```
Esta es un aplicación web que consistirá en hacer **CRUD** de objetos "Persona" a tráves de un formulario y una tabla para visualizarlos. En esta aplicación se hacen las 4 peticiones al API **(Get, Post, Put y Delete)** y el CRUD en la base de datos. En las siguientes imágenes vemos lo que hará la aplicación; y será hacer un "Read" de todos los objetos "Persona" que hay en la base de datos para mostrarlos en la tabla. Podrá "Registrar" ("Create") un objeto "Persona" a tráves del formulario de registro y una vez que seleccionemos un objeto de la tabla, lo rellenará en el formulario que esta a lado derecho de  la tabla y lo podremos "Modificar" ("Update") o "Borrar" ("Delete") y en los archivos HTML se validaran los formularios de Registro y Login con AngularJS.

![enter image description here](https://lh3.googleusercontent.com/-76BlaWAzElU/V-QABlObXBI/AAAAAAAAAgk/Lf1QyGZKIvcrR60sdyDFIWIXrEd6dAxtACLcB/s0/Captura+de+pantalla+2016-09-22+a+las+10.59.47+a.m..png "form registro")

![enter image description here](https://lh3.googleusercontent.com/-KzK3opqjHMA/V-QAOOqGKrI/AAAAAAAAAgs/OhZ3Ph7lNDY4XrSEXAFF7akzfOJLo2cGQCLcB/s0/Captura+de+pantalla+2016-09-22+a+las+11.00.40+a.m..png "form login")

![enter image description here](https://lh3.googleusercontent.com/-4I5PQuq1UWI/V-QBYriV13I/AAAAAAAAAhE/yidW__vBT5EmHrfJNrYOOuQcDNGZd2KAwCLcB/s0/Captura+de+pantalla+2016-09-22+a+las+11.05.32+a.m..png "tabla")


----------

En la siguiente imagen vemos cual va a ser la estructura del proyecto que se desarrolla.

![enter image description here](https://lh3.googleusercontent.com/-APr4Gg1mVFA/V-QDVh0XkCI/AAAAAAAAAhQ/TNKxo7rJ6t4XnzbBYjZtrP_beMpeM6c8gCLcB/s0/Captura+de+pantalla+2016-09-22+a+las+11.13.48+a.m..png "folder")


Se debe tener instalado **NodeJS, Express y MongoDB** en el entorno de desarrollo. En ella hay una carpeta “angular” que tiene los ficheros del frontend (“index.html, login.html y tabla.html” ), los estilos css y el archivo que hará las llamadas al API  (“core.js”).

En la carpeta “app” vamos a tener el API  que esta hecho con NodeJS y Express. En esta carpeta tendremos el archivo “persona.js” en la que tenemos definido el modelo del objeto “Persona” y las rutas de la API. Dentro del “controller.js” están las funciones que se ejecutan al llamar a cada ruta.

Por último tenemos los ficheros “package.json” para ver las dependencias que se necesitaran y luego el fichero “server.js” en el que estará la configuración del servidor. 

###Código fuente de los archivos:

Aquí esta el “package.json” que es la información relacionada con el proyecto y nos da las dependencias que vamos a necesitar para el proyecto. las dependencias que se necesitan son las librerías de **“mongoose”** y **“express”**. **“mongoose”** nos permitirá definir el modelo de datos que se guardará en MongoDB. También tiene un repositorio de Git. El código de package es el siguiente:

```
{
  "name": "aplicacion",
  "version": "1.0.0",
  "description": "app",
  "main": "server.js",
  "dependencies": {
     "express": "~3.4.4",
    "mongoose": "~3.6.2"
    },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/LACB93/aplicacion.git"
  },
  "author": "lcruz@next-cloud.mx",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/LACB93/aplicacion/issues"
  },
  "homepage": "https://github.com/LACB93/aplicacion#readme"
}

```

El siguiente archivo es el **“server.js”** en el cual configuraremos el servidor. En el vamos a definir que librereías utilizaremos **(express y mongoose)** y el puerto por el que escuchara la aplicación. El puerto definido es el 3000. También esta la conexión a la base de datos Mongo **('mongodb://localhost:27017/usua_reg')**  y cargaremos las rutas de la aplicación en el archivo **(“routes.js”)**.

```
var express  = require('express');
var app      = express();  // Utilizamos express
var mongoose = require('mongoose'); // mongoose para mongodb
var port  	 = process.env.PORT || 3000; // Escuchará en el puerto 3000


mongoose.connect('mongodb://localhost:27017/usua_reg'); // Se hace la conexión a la base de datos de Mongo con nombre "usua_reg"


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

```

Para el API con NodeJS se mostrará el modelo de datos que se utiliza. Eso esta en el archivo “persona.js” y esta definido un modelo con nombre, usuario y email que son todos un String. Su código es el siguiente:

```
var mongoose = require('mongoose');

module.exports = mongoose.model('Persona', {
	nombre: String,
	usuario: String,
	email: String
});
```

En el archivo “routes.js” se definen las rutas de la API y sus acciones con los 4 tipos de llamadas (Get, Post, Put y Delete):

```
var Persona = require('./modelo/persona');
var Controller = require ('./controller');

module.exports = function(app) {

	// Devuelve todas las personas
	app.get('/api/persona', Controller.getPersona);
	
	// Crea una nueva persona
	app.post('/api/persona', Controller.setPersona);
	
	// Modifica los datos de una persona
	app.put('/api/persona/:persona_id', Controller.updatePersona);
	
	// Borra a una persona
	app.delete('/api/persona/:persona_id', Controller.removePersona);


	// formularios
	app.get('/', function(req, res) {
		res.sendfile('./angular/login.html');
	});

	app.get('./angular/login.html', function(req, res) {
		res.sendfile('./angular/tabla.html');
	});
};
```

En el archivo **“controller.js”** escribimos las funciones de cada llamada de la API: 

```
var Persona = require('./modelo/persona');


// Obtiene todos los objetos Persona de la base de datos
exports.getPersona = function (req, res){
	Persona.find(
		function(err, persona) {
			if (err)
				res.send(err)
					res.json(persona); // devuelve todas las Personas en JSON
				}
			);
}

// Guarda un objeto Persona en base de datos
exports.setPersona = function(req, res) {

		// Se crea el objeto Persona
		Persona.create(
			{nombre : req.body.nombre,	usuario: req.body.usuario, email: req.body.email},
			function(err, persona) {
				if (err)
					res.send(err);

				// Obtine y devuelve todas las personas
				Persona.find(function(err, persona) {
				 	if (err)
				 		res.send(err)
				 	res.json(persona);
				});
			});

	}

// Se modifica un objeto Persona de la base de datos
exports.updatePersona = function(req, res){
	Persona.update( {_id : req.params.persona_id},
					{$set:{nombre : req.body.nombre,	usuario: req.body.usuario, email: req.body.email}},
					function(err, persona) {
						if (err)
							res.send(err);

				// Obtine y devuelve todas las personas
				Persona.find(function(err, persona) {
				 	if (err)
				 		res.send(err)
				 	res.json(persona);
				});
			});
	}

// Se elimina un objeto Persona de la base de Datos
exports.removePersona = function(req, res) {
	Persona.remove({_id : req.params.persona_id}, function(err, persona) {
		if (err)
			res.send(err);

			// Obtine y devuelve todas las personas tras borrar a una de ellas
			Persona.find(function(err, persona) {
				if (err)
					res.send(err)
				res.json(persona);
			});
		});
}
```

Ya se tiene API con NodeJS desarrollado y se tiene que unirlo con AngularJS **(frontend)**.

Dentro de Angular tenemos los archivos “core.js” e “index.html”, "login.html" y "tabla.html". El archivo “core.js” hace la peticiones al API y de tener actualizados los modelos de datos para que los muestre la aplicación. El código del archivo “core.js” es el siguiente:

```
angular.module('MainApp', [])


function mainController($scope, $http) {
	$scope.newPersona = {};
	$scope.personas = {};
	$scope.selected = false;

	// Se obtienen todos los datos de la base de datos
	$http.get('/api/persona').success(function(data) {
		$scope.personas = data;
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	// Función para registrar a una persona
	$scope.registrarPersona = function() {
		$http.post('/api/persona', $scope.newPersona)
		.success(function(data) {
				$scope.newPersona = {};
				$scope.personas = data;
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función para editar los datos de una persona
	$scope.modificarPersona = function(newPersona) {
		$http.put('/api/persona/' + $scope.newPersona._id, $scope.newPersona)
		.success(function(data) {
				$scope.newPersona = {};
				$scope.personas = data;
				$scope.selected = false;
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función que borra un objeto persona 
	$scope.borrarPersona = function(newPersona) {
		$http.delete('/api/persona/' + $scope.newPersona._id)
		.success(function(data) {
			$scope.newPersona = {};
			$scope.personas = data;
			$scope.selected = false;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función para seleccionar el objeto en la tabla
	$scope.selectPerson = function(persona) {
		$scope.newPersona = persona;
		$scope.selected = true;
		console.log($scope.newPersona, $scope.selected);
	};
}
```


Por último se muestran los archivos “index.html”, "login.html" y "tabla.html" que es donde esta AngularJS (esta página tiene los estilos CSS de bootstrap y también archivos "estilos.css" y "login.css"). Lo primero que se hace es cargar las librerías de AngularJS de su página web:

```
<!-- Cargamos angular -->
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>
```

Luego se carga el archivo “core.js” donde están las funciones que harán las llamadas el API:

```
<!-- Cargamos el javascript de angular -->
<script src="core.js"></script>
```

En el “index.html” esta la etiqueta ng-app=”MainApp” que es el contexto en el se encuadra esta vista. Hay también otras etiquetas como ng-model, ng-repeat, ng-click, ng-disabled.

Luego se van a mostrar los datos de la base de datos en una tabla que esta en el archivo "tabla.html".  En el siguiente código de la tabla, esta la etiqueta “ng-repeat” y se le indica que nos vaya seleccionando un objeto “persona” del array “personas” que tenemos definido en el “core.js”. Una vez que se tiene el objeto “persona” se pone en la tabla accediendo a sus atributos ({{ persona.nombre }}, {{ persona.usuario }},…).  Con la etiqueta “ng-click” ejecutaremos la función “selectPerson(persona)” que esta definida en el “core.js” y que agarra el objeto persona que seleccionemos al pulsar una fila de la tabla para mostrarla en el formulario.


<table class="table table-striped">
					<tr class="info">
						<td class="colum">Nombre</td>
						<td class="colum">Usuario</td>
						<td class="colum">Email</td>
					</tr>
					<tr ng-repeat="persona in personas" ng-click="selectPerson(persona)">
						<td class="columna">{{ persona.nombre }}</td>
						<td class="columna">{{ persona.usuario }}</td>
						<td class="columna">{{ persona.email }}</td>
					</tr>
				</table>

```
<table class="table table-striped">
					<tr class="info">
						<td class="colum">Nombre</td>
						<td class="colum">Usuario</td>
						<td class="colum">Email</td>
					</tr>
					<tr ng-repeat="persona in personas" ng-click="selectPerson(persona)">
						<td class="columna">{{ persona.nombre }}</td>
						<td class="columna">{{ persona.usuario }}</td>
						<td class="columna">{{ persona.email }}</td>
					</tr>
				</table>
```

Así es como esta hecho el formulario y como se hizo una sencilla validación del mismo, impidiendo registrar una persona sino tiene sus campos rellenos o modificarlo y borrarlo sino ha sido seleccionado. En este formulario se definen los “input” y al final de cada input ponemos a que atributo del objeto persona corresponde y al poner “required” indicamos que es un campo obligatorio.

```
<div class="form-group">
			<div class="col-sm-10">
			<input type="text" id="nombre" name="nombre" placeholder="Nombre Completo" class="form-control input-lg text-center" ng-model="newPersona.nombre" required>

			</div>


			<div class="col-sm-10">
			<input type="email" id="email" name="email" placeholder="Email" class="form-control input-lg text-center" ng-model="newPersona.email" required> // si no se escribe un email no se insertara en la tabla

			</div>
			<div class="col-sm-10">
			<input type="text" id="usuario" name="usuario" placeholder="Usuario" class="form-control input-lg text-center" ng-model="newPersona.usuario" required>

			</div>
			<div class="col-sm-10">
			<input type="password" id="contraseña" name="contraseña" placeholder="Contraseña" class="form-control input-lg text-center" required>

			</div>
			<div class="col-sm-10">
			<input type="password" id="confirm_contra" name="confirm_contra" placeholder="Confirmar la contraseña" class="form-control input-lg text-center" required>

			</div>
```

Después se definen las diferentes acciones del formulario. Dentro de todos los botones definimos las funciones que se tienen que ejecutar tras pulsar el botón con la etiqueta “ng-click“. También se inhabilitarán (poniendo “ng-disabled“) a los botones sino cumplen los requisitos para hacer cada una de las acciones, como que los atributos no sean nulos. 

```
<!-- Acciones que se pueden realizar en el formulario -->
<a href="login.html" class="btn btn-primary" ng-click="registrarPersona()" ng-disabled="myForm.$invalid || selected">Registrate</a>
<button type="submit" class="btn btn-warning btn-lg" ng-click="modificarPersona(newPersona)" ng-disabled="!newPersona.nombre || !newPersona.usuario || !newPersona.email || !selected">Modificar</button>
					<button type="submit" class="btn btn-danger btn-lg" ng-click="borrarPersona(newPersona)" ng-disabled="!newPersona.nombre || !newPersona.usuario || !newPersona.email || !selected">Borrar</button>

```

Al formulario no se le hizo una validación muy exhaustiva pero AngulaJS nos permite validar muchas cosas como que el campo deba ser un email, etc.  Aquí se muestra el código del “index.html”, "login.html" y "tabla.html" 

###index.html

```
<!doctype html>


<html ng-app="MainApp">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Usuarios</title>
		<!-- Cargamos bootstrap -->
		<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
		<!-- Cargamos los estilos.css -->
		<link rel="stylesheet" type="text/css" href="estilos.css">
	
	<!-- Cargamos angular -->
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>

	<!-- Cargamos el javascript de angular -->
	<script src="core.js"></script>

</head>
<body ng-controller="mainController">
<h1>Registrate<span class="label label-success"></span></h1>
	<div class="jumbotron boxlogin">
	<form action="/" class="form-horizontal">
		<h2 class="form_titulo">CREA UNA CUENTA</h2>
		<div class="form-group">
			<div class="col-sm-10">
			<input type="text" id="nombre" name="nombre" placeholder="Nombre Completo" class="form-control input-lg text-center" ng-model="newPersona.nombre" required>

			</div>


			<div class="col-sm-10">
			<input type="email" id="email" name="email" placeholder="Email" class="form-control input-lg text-center" ng-model="newPersona.email" required>

			</div>
			<div class="col-sm-10">
			<input type="text" id="usuario" name="usuario" placeholder="Usuario" class="form-control input-lg text-center" ng-model="newPersona.usuario" required>

			</div>
			<div class="col-sm-10">
			<input type="password" id="contraseña" name="contraseña" placeholder="Contraseña" class="form-control input-lg text-center" required>

			</div>
			<div class="col-sm-10">
			<input type="password" id="confirm_contra" name="confirm_contra" placeholder="Confirmar la contraseña" class="form-control input-lg text-center" required>

			</div>
			<div class="col-sm-10">
			<a href="login.html" class="btn btn-primary" ng-click="registrarPersona()" ng-disabled="myForm.$invalid || selected">Registrate</a>
			</div>
		</div>
		</form>



		</div>

</body>
</html>

```

###login.html

```
<!doctype html>

<html ng-app="MainApp">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Usuarios</title>

	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="login.css">

	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>

	<script src="core.js"></script>

</head>
<body ng-controller="mainController">

	
			<div class="col-sm-4 col-sm-offset-1 text-center">
				<form name="myForm">
				<h1>Inicia Sesión</h1>
					<div class="form-group">
						<!-- <input type="text" class="form-control input-lg text-center" placeholder="Nombre" ng-model="newPersona.nombre" required>
						<br>-->
						<input type="text" class="form-control input-lg text-center" placeholder="Usuario"  required>
						<br>
						<!--<input type="text" class="form-control input-lg text-center" placeholder="Email" ng-model="newPersona.email" required>
						<br>-->
						<input type="password" class="form-control input-lg text-center" placeholder="Contraseña" required>


					</div>


					

					<a href="tabla.html" class="btn btn-success btn-lg" >Inicia Sesión</a>
					<div>
					<br>
					<p>¿No tienes una cuenta? <a href="index.html">Registrate</a></p>
					</div>
					
				</form>
			</div>
		</div>
	</div>
</body>
</html>

```


###tabla.html

```
<!doctype html>

<html ng-app="MainApp">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Usuarios</title>

	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="login.css">

	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>

	<script src="core.js"></script>

</head>
<body ng-controller="mainController">

	<div class="container">

		<div class="jumbotron text-center" ng-prueba>
			<h1>Nº de Registros: <span class="label label-success">{{ personas.length }}</span></h1>
		</div>

		<div class="row">
			<div class="col-sm-6 col-sm-offset-1">
				<table class="table table-striped">
					<tr class="info">
						<td class="colum">Nombre</td>
						<td class="colum">Usuario</td>
						<td class="colum">Email</td>
					</tr>
					<tr ng-repeat="persona in personas" ng-click="selectPerson(persona)">
						<td class="columna">{{ persona.nombre }}</td>
						<td class="columna">{{ persona.usuario }}</td>
						<td class="columna">{{ persona.email }}</td>
					</tr>
				</table>
			</div>
			

							<div class="col-sm-4 col-sm-offset-1 text-center">
				<form name="myForm">
					<div class="form-group">
						<input type="text" class="form-control input-lg text-center" placeholder="Nombre" ng-model="newPersona.nombre" required>
						<br>
						<input type="text" class="form-control input-lg text-center" placeholder="Usuario" ng-model="newPersona.usuario" required>
						<br>
						<input type="text" class="form-control input-lg text-center" placeholder="Email" ng-model="newPersona.email" required>
						<br>
						<!--<input type="password" class="form-control input-lg text-center" placeholder="Contraseña"required>-->


					</div>
					
					<button type="submit" class="btn btn-warning btn-lg" ng-click="modificarPersona(newPersona)" ng-disabled="!newPersona.nombre || !newPersona.usuario || !newPersona.email || !selected">Modificar</button>
					<button type="submit" class="btn btn-danger btn-lg" ng-click="borrarPersona(newPersona)" ng-disabled="!newPersona.nombre || !newPersona.usuario || !newPersona.email || !selected">Borrar</button>
					<div>
					<br>
					<p>Ir a la pàgina de <a href="index.html">registro</a></p>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>

```

###Poner en funcionamiento el proyecto

**npm install**: Se tiene que ejecutar este comando en la carpeta del proyecto para que se descargue las librerías de express y mongose, o sea, las dependencias del proyecto (si hay algún problema se puede intentar como “sudo”). 

```
npm install
```

**node server.js**: En la carpeta del proyecto se tiene que ejecutar este comando. Este comando es para poner a correr el servidor y que el proyecto funcione.

```
node server.js
```

**http://localhost:3000**: Se puede ver la aplicación web yendo al navegador y poniendo la URL de la máquina local donde este el proyecto y el puerto.

```
http://localhost:3000
```