
var http = require('http');
var express = require('express'),
fs = require('fs');
var csv=require('csv2json-convertor');//importing csv2json-
var serviceConsultant = require('../Models/Consultant-Model.js');

//
// Mes methodes /*A transferer dans un autre fichier */
//
//get un consultant by id
exports.getConsultant = function(id, callback) {
    
    serviceConsultant.ConsultantModel.findById(id, function(err, consultant){
		if(err) {
			console.log(err);
		} else {
			//console.log(consultants);
			callback.json(consultant);
		}
	});
    console.log('test jai trouv� un consultant avec son id');
};

//get tous les consultants
exports.getAllConsultants = function(req, res) {
    serviceConsultant.ConsultantModel.find(null)
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
exports.uploadFile2 = function (localPath, filePath, csvFileName, callback){
    //console.log(csvFileName);
    fs.readFile(localPath, function(err, data){
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
 
console.log('localle file cheikh cest la :'+localPath);
};


//methode pour sauvegarder dans mongodb
var saveInMongo = function (data){
    //test contenu via log
for (var i=0; i< data.length; i++){
	console.log('tester mon document ' +i);//tester mon premier document
	console.log(data[i]);//where key is the from json key-value format
}
    for (var i=0; i< data.length; i++){
		var c = new serviceConsultant.ConsultantModel({
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
