//on requiert nos modules
var http = require('http');
var express = require('express'),
fs = require('fs'),
app = express();
var port= 8080;
var destinationFile = 'files';

//Mon module perso
var serviceConsultant = require('./Models/Consultant-Model.js')

app.use(express.bodyParser());

/*****API****/

//Affichage index
app.get('/', function(req, res){
	//res.render('index');
	res.sendfile(__dirname+'/views/index.html');
});

//upload fichier + depot dans un dossier + extraction data + save dans mongo
app.post('/upload', function(req, res){
	var csvFileName=req.files.myfile.name;
	var pathFile = __dirname + '/files/'+req.files.myfile.name;
	serviceConsultant.uploadFile2(req.files.myfile.path, pathFile, csvFileName, res);
	//console.log(__dirname + '/files/'+req.files.myfile.name);
}); 

//Afficher la liste des consultants 
app.get('/AfficheConsultants', function (req, res){serviceConsultant.getAllConsultants(req, res)});
//Afficher un consultant
app.get('/AfficheConsultants/:id', function(req, res) {
	//var id = req.params.id;
	//console.log(req.params.id);
	serviceConsultant.getConsultant(req.params.id, res);
});


app.listen(port);
console.log('Application running on http://localhost:'+port);
