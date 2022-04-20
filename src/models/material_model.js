const mongoose = require('mongoose');

const Material = new mongoose.Schema({
    name         : {type: String, required: true},
    days_of_week : {type: String},
    domain       : {type: mongoose.Schema.Types.ObjectId, ref: 'Domain', required: true}
    // slug: {type: String, slug: "name"}
  });

module.exports = mongoose.model('Material', Material);
