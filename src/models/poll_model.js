const mongoose = require('mongoose');

const Poll = new mongoose.Schema({
    title         : {type: String, required: true},
    question      : {type: String, required: true},
    answerOptions : [{type: String, required: true}],
    userAnswers   : [{type: mongoose.Schema.Types.ObjectId, ref: 'PollAnswer'}]
});

module.exports = mongoose.model('Poll', Poll);