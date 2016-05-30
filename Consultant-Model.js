//var model = module.exports,
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    urlDB = 'mongodb://localhost/myapp';

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
	Prenom : { type: String },
	Nom : { type: String },
	Competences : [{ nom: String, niveau: Number }],
	Projets : [{ ProjectName:String , Debut:Date, Fin:Date ,Competences:[{ nom: String, niveau: Number }] }]
});

//creation de mon model pour les consultants(ma classe)
var ConsultantModel = mongoose.model('Consultant',consultantSchema);



//
// Mes methodes 
//
exports.getOneConsultant = function() {
    ConsultantModel.findOne({
        //mon code ici
    });
    console.log('test jai trouvé un consultant avec son id');
};


exports.getConsultant = function(consultants) {
    ConsultantModel.find({
         //mon code ici
    });
    console.log('test Tous les consultants');
};

exports.uploadFile = function(){
    console.log('test je vais uploader');
     //mon code ici
};

