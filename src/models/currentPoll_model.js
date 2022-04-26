const mongoose = require('mongoose');

const CurrentPoll = new mongoose.Schema({
    title : String
});

module.exports = mongoose.model('CurrentPoll', CurrentPoll);