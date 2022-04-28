const mongoose = require('mongoose');

const Domain = new mongoose.Schema({
    name         : {type: String, required: true},
    region       : {type: String, required: true},
    weekly_boss  : {type: String},
    type         : {type: String, required: true}
});

module.exports = mongoose.model('Domain', Domain);