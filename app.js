//on requiert nos modules
var http = require('http');
var express = require('express'),
fs = require('fs'),
app = express();
var port= 8080;
//Mon module perso
//var serviceConsultant = require(__dirname+'./get_consultant.js')
var csv=require('csv2json-convertor');//importing csv2json-convertor
//Base de Données
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp');

app.use(express.bodyParser());
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'ejs');
//app.set('views', __dirname+'/views');



//Affichage index
app.get('/', function(req, res){
	//res.render('index');
	res.sendfile(__dirname+'/views/index.html');
});


//upload fichier
//app.post('/upload', serviceConsultant.uploadFile()); 
app.post('/upload', function(req, res){

	console.log(req.files.myfile);
	fs.readFile(req.files.myfile.path, function (err, data) {
	  var newPath = __dirname + '/files/'+req.files.myfile.name;
	  fs.writeFile(newPath, data, function (err) {
	  	if(err) {throw err;}
	    res.redirect('back');
	  });
	});
	
	//res.send('module yeah');	
});

//Convertir le fichier CSV en JSON method1 : save comme documents Json dans un tableau
var data1=csv.csvtojson("consultant.csv"); //csvtojson is function that accepts csv filenames and returns JSON object
console.log(data1);//data1 is variable used to store returning JSON object

//test contenu via log
for (var i=0; i< data1.length; i++){
	console.log('tester mon document ' +i);//tester mon premier document
	console.log(data1[i]);//where key is the from json key-value format
}

//Connexion a la BD
var db = mongoose.connection;
//test si ca cest bien passé
db.on('error', function(error){
	console.log('WARNING !****DB erreur connexion****');
	console.log(error);
});

db.on('open', function(){
	console.log('DB connexion OK!!');
});

//creation de schema d'enregistrement des consultants
var consultantSchema = mongoose.Schema({
	Prenom : { type: String },
	Nom : { type: String },
	Competences : { type: String },
	Projet : { type: String }
});
//creation de mon model pour les consultants(ma classe)
var ConsultantModel = mongoose.model('Consultant',consultantSchema);

//sauvegarder les donner du fichier dans MongoDB
app.post('/saveInMongo', function(req, res){
	
	for (var i=0; i< data1.length; i++){
		var c = new ConsultantModel({
		Prenom : data1[i].Prenom,
		Nom : data1[i].Nom,
		Competences : data1[i].Competences,
		Projet :data1[i].Projet
	});
	
	c.save(function (err) {
  	if (err) return handleError(err);
  // saved!
	});
	
	res.sendfile(__dirname+'/views/save_data.html');
	//vider mon array aprés la sauvegarde
	//data1 = [];
}

console.log('cool consultant save succes....');
});

//Afficher la liste des consultants (asynchrone)
app.get('/consultants', function(req, res){
	ConsultantModel.find(function(error, consultants){
		if(error) {
			console.log(error);
		} else {
			//console.log(consultants);
			res.json(consultants);
		}
	});
});

//Afficher un consultant
app.get('/consultants/:id', function(req, res){
	//var consultant = ConsultantModel[req.params.id -1];
	ConsultantModel.findById(req.params.id, function(error, consultant){
		if(error) {
			console.log(error);
		} else {
			//console.log(consultants);
			res.json(consultant);
		}
	});
});



app.listen(port);
console.log('Application running on http://localhost:'+port);
