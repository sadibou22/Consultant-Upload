//var model = module.exports,
var express = require('express');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    urlDB = 'mongodb://localhost/myapp',
    fs = require('fs'),
    http = require('http');
var csv=require('csv2json-convertor');//importing csv2json-

//connexion   
var connect = function() {
    var cb = function(err, res) {
        if (err) {
            console.log('WARNING !****DB erreur connexion****:' + urlDB + '. ' + err);
        }
        else { console.log('Connexion a la BD '+urlDB+' OK!!'); }
    };
    mongoose.connect(urlDB, cb);
};
connect();
//
// Mes Schemas
//creation de schema d'enregistrement des consultants
var consultantSchema = mongoose.Schema({
	/*Prenom : { type: String },
	Nom : { type: String },
	Competences : [{ nom: String, niveau: Number }],
	Projets : [{ ProjectName:String , Debut:Date, Fin:Date ,Competences:[{ nom: String, niveau: Number }] }]*/
    Prenom : { type: String },
	Nom : { type: String },
	Competences : { type: String },
	Projet : { type: String }
});

//creation de mon model pour les consultants(ma classe)
var ConsultantModel = mongoose.model('Consultant',consultantSchema);

//
// Mes methodes 
//
//get un consultant by id
exports.getConsultant = function(id, callback) {
    //console.log(id);
    //var id = req.params.id;
    ConsultantModel.findById(id, function(err, consultant){
		if(err) {
			console.log(err);
		} else {
			//console.log(consultants);
			callback.json(consultant);
		}
	});
    console.log('test jai trouvé un consultant avec son id');
};

//get tous les consultants
exports.getAllConsultants = function(req, res) {
    ConsultantModel.find(null)
	.exec(function(error, consultants){
		if(error) {
			res.send('error');
			console.log(error);
		} else {
			//console.log(consultants);
			res.json(consultants);
		}
	});
    console.log('test Tous les consultants');
};

//upload fichier + depot dans un dossier + extraction data + save dans mongo
exports.uploadFile2 = function (filename, filePath, csvFileName, callback){
    //console.log(csvFileName);
    fs.readFile(filename, function(err, data){
        //var newPath = __dirname + '/files/'+c.files.myfile.name;
        if(err){
            throw err;
        }
        fs.writeFile(filePath, data, function (err) {
	  	if(err) {throw err;}
	    callback.redirect('back');
	  });
        
    });
    //save in mongoDB
   var data1=csv.csvtojson(csvFileName); //csvtojson is function that accepts csv filenames and returns JSON object
   //save data in mongo
   saveInMongo(data1);
    //test contenu via log
/*for (var i=0; i< data1.length; i++){
	console.log('tester mon document ' +i);//tester mon premier document
	console.log(data1[i]);//where key is the from json key-value format
}
console.log(csvFileName);*/
};


//methode pour sauvegarder dans mongodb
var saveInMongo = function (data){
    //test contenu via log
for (var i=0; i< data.length; i++){
	console.log('tester mon document ' +i);//tester mon premier document
	console.log(data[i]);//where key is the from json key-value format
}
    for (var i=0; i< data.length; i++){
		var c = new ConsultantModel({
		Prenom : data[i].Prenom,
		Nom : data[i].Nom,
		Competences : data[i].Competences,
		Projet :data[i].Projet
	});
	
	c.save(function (err) {
  	if(err) {throw err;}
  console.log('saved!!!! yeah');
	});
  }
    
}
