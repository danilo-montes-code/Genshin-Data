const mongoose = require('mongoose');

const Character = new mongoose.Schema({
    name            : {type: String, required: true},
    region          : {type: String, required: true},
    vision          : {type: String, required: true},
    talent_material : {type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true},
    weekly_material : {type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true}
    // slug: {type: String, slug: "name"}
});

module.exports = mongoose.model('Character', Character);