let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: [true, "email already registered"],
  },
  firstName: String,
  lastName: String,
  profilePhoto: String,
  password: String,
  source: { type: String, required: [true, "source not specified"] },
  lastVisited: { type: Date, default: new Date() },

  characters : [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
  weapons    : [{type: mongoose.Schema.Types.ObjectId, ref: 'Weapon'}]
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;