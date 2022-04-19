const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

require('dotenv').config();

// const User = new mongoose.Schema({
//   // username, password
//   characters : [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
//   weapons    : [{type: mongoose.Schema.Types.ObjectId, ref: 'Weapon'}]
//   // poll_answers : [{type: String} : {type: mongoose.Schema.Types.ObjectId, ref: 'PollAnswer'}]
// });

const Character = new mongoose.Schema({
  name            : {type: String, required: true},
  region          : {type: String, required: true},
  vision          : {type: String, required: true},
  talent_material : {type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true},
  weekly_material : {type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true}
  // slug: {type: String, slug: "name"}
});

const Weapon = new mongoose.Schema({
  name               : {type: String, required: true},
  class              : {type: String, required: true},
  rarity             : {type: Number, required: true},
  stats              : {type: Object, required: true},
  ascension_material : {type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true}
  // slug: {type: String, slug: "name"}
});

const Material = new mongoose.Schema({
  name         : {type: String, required: true},
  days_of_week : {type: String},
  domain       : {type: mongoose.Schema.Types.ObjectId, ref: 'Domain', required: true}
  // slug: {type: String, slug: "name"}
});

const Domain = new mongoose.Schema({
  name         : {type: String, required: true},
  region       : {type: String, required: true},
  weekly_boss  : {type: String}
  // slug: {type: String, slug: "name"}
});

const Poll = new mongoose.Schema({
  question : {type: String, required: true},
  answers  : [{type: mongoose.Schema.Types.ObjectId, ref: 'PollAnswer'}],
  pollNum  : {type: Number, required: true}
});

const PollAnswer = new mongoose.Schema({
  poll    : {type: Number, required: true}, // {type: mongoose.Schema.Types.ObjectId, ref: Poll, required: true},
  answer  : {type: String, required: true},
  pollee  : {type: String} // { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true}
});


// User.plugin(passportLocalMongoose);
mongoose.model('Character', Character);
mongoose.model('Weapon', Weapon);
mongoose.model('Material', Material);
mongoose.model('Domain', Domain);
mongoose.model('Poll', Poll);
mongoose.model('PollAnswer', PollAnswer);

mongoose.connect(process.env.MONGODB_URI, 
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (error) => {
    if (error) console.log(error)
});