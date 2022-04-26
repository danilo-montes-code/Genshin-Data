const mongoose              = require("mongoose"),
      passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
  username     : {type: String, required: true},
  
  characters   : [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
  weapons      : [{type: mongoose.Schema.Types.ObjectId, ref: 'Weapon'}],
  pollAnswers  : [{type: mongoose.Schema.Types.ObjectId, ref: 'PollAnswer'}]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);