const mongoose = require('mongoose');

const Domain = new mongoose.Schema({
    name         : {type: String, required: true},
    region       : {type: String, required: true},
    weekly_boss  : {type: String}
    // slug: {type: String, slug: "name"}
});

module.exports = mongoose.model('Domain', Domain);