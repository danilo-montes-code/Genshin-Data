let mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username     : {type: String, required: true, unique: true},
  password     : {type: String, required: true},
  lastVisited  : { type: Date, default: new Date() },

  characters   : [String], //[{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
  weapons      : [String] //[{type: mongoose.Schema.Types.ObjectId, ref: 'Weapon'}]
  // pollAnswers : [{type: String} : {type: mongoose.Schema.Types.ObjectId, ref: 'PollAnswer'}]
});

module.exports = mongoose.model('User', userSchema);