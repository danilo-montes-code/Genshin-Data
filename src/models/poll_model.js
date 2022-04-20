const mongoose = require('mongoose');

const Poll = new mongoose.Schema({
    question : {type: String, required: true},
    answers  : [{type: mongoose.Schema.Types.ObjectId, ref: 'PollAnswer'}],
    pollNum  : {type: Number, required: true}
});

module.exports = mongoose.model('Poll', Poll);