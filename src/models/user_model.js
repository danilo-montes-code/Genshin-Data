const mongoose              = require("mongoose"),
      passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
  username     : {type: String, required: true},
  // password is stored as separate salt and hash by passport
  characters   : [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
  weapons      : [{type: mongoose.Schema.Types.ObjectId, ref: 'Weapon'}],
  pollAnswers  : [{type: mongoose.Schema.Types.ObjectId, ref: 'PollAnswer'}]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);