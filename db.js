const mongoose = require('mongoose'),
URLSlugs = require('mongoose-url-slugs'),
passportLocalMongoose = require('passport-local-mongoose');


const User = new mongoose.Schema({
  // username, password
  characters : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  weapons    : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' }],
});

const Character = new mongoose.Schema({
  name            : {type: String, required: true},
	region          : {type: String, required: true},
	vision          : {type: String, required: true},
	talent_material : {type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true},
	weekly_material : {type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true}
});

const Weapon = new mongoose.Schema({
  name               : {type: String, required: true},
  class              : {type: String, required: true},
  rarity             : {type: Number, required: true},
	stats              : {type: Object, required: true},
	ascension_material : {type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true},
});

const Material = new mongoose.Schema({
  name         : {type: String, required: true},
  days_of_week : {type: String},
	domain       : {type: mongoose.Schema.Types.ObjectId, ref: 'Domain', required: true},
});

const Domain = new mongoose.Schema({
  name         : {type: String, required: true},
  region       : {type: String, required: true},
	weekly_boss  : {type: String}
});


User.plugin(passportLocalMongoose);
List.plugin(URLSlugs('name'));

mongoose.model('User', User);
mongoose.model('Character', Character);
mongoose.model('Weapon', Weapon);
mongoose.model('Material', Material);
mongoose.model('Domain', Domain);

mongoose.connect(/* atlus url */));
