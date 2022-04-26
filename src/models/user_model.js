let mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username     : {type: String, required: true, unique: true},
  password     : {type: String, required: true},

  characters   : [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
  weapons      : [{type: mongoose.Schema.Types.ObjectId, ref: 'Weapon'}],
  pollAnswers  : [{type: mongoose.Schema.Types.ObjectId, ref: 'PollAnswer'}]
});

module.exports = mongoose.model('User', userSchema);