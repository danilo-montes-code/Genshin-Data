let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  profilePhoto: String,
  password: String,
  source: { type: String, required: [true, "source not specified"] },
  lastVisited: { type: Date, default: new Date() },

  characters : [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
  weapons    : [{type: mongoose.Schema.Types.ObjectId, ref: 'Weapon'}]
  // pollAnswers : [{type: String} : {type: mongoose.Schema.Types.ObjectId, ref: 'PollAnswer'}]
});

// const User = new mongoose.Schema({
//   // username, password
//   characters : [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
//   weapons    : [{type: mongoose.Schema.Types.ObjectId, ref: 'Weapon'}]
//   // poll_answers : [{type: String} : {type: mongoose.Schema.Types.ObjectId, ref: 'PollAnswer'}]
// });



const userModel = mongoose.model('User', userSchema);

module.exports = userModel;