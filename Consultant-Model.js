//var model = module.exports,
var express = require('express');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    urlDB = 'mongodb://localhost/myapp',
    fs = require('fs'),
    http = require('http');
//var csv=require('csv2json-convertor');//importing csv2json-

//connexion   
exports.connect = function() {
    var cb = function(err, res) {
        if (err) {
            console.log('WARNING !****DB erreur connexion****:' + urlDB + '. ' + err);
        }
        else { console.log('Connexion a la BD '+urlDB+' OK!!'); }
    };
    mongoose.connect(urlDB, cb);
};
//connect();
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
exports.ConsultantModel = mongoose.model('Consultant',consultantSchema);
