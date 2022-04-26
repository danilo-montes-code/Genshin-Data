const mongoose = require('mongoose');

const Material = new mongoose.Schema({
    name         : {type: String, required: true},
    days_of_week : String,
    domain       : {type: mongoose.Schema.Types.ObjectId, ref: 'Domain', required: true}
  });

module.exports = mongoose.model('Material', Material);
