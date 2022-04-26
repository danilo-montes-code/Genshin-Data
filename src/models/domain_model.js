const mongoose = require('mongoose');

const Domain = new mongoose.Schema({
    name         : {type: String, required: true},
    region       : {type: String, required: true},
    weekly_boss  : {type: String}
});

module.exports = mongoose.model('Domain', Domain);