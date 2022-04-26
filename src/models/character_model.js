const mongoose = require('mongoose');

const Character = new mongoose.Schema({
    name            : {type: String, required: true},
    region          : String,
    vision          : String,
    talent_material : {type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true},
    weekly_material : {type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true}
});

module.exports = mongoose.model('Character', Character);