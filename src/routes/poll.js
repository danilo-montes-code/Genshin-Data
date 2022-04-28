const express     = require('express'), 
      router      = express.Router(),
      mongoose    = require('mongoose'),
      CurrentPoll = mongoose.model('CurrentPoll'),
      Poll        = mongoose.model('Poll'),
      PollAnswer  = mongoose.model('PollAnswer'),
      User        = mongoose.model('User');


// function for verifying if the user is logged in
const isAuthenticated = (req, res, next) => {
  if(!req.user) {
    res.redirect('/'); 
  } else {
    next();
  }
}

router.get('/', isAuthenticated, async (req, res) => {

    // get current poll title from db
    const currentPoll = await CurrentPoll.findOne({}).exec();

    // get poll from db
    const poll = await Poll.findOne({title: currentPoll.title}).populate('userAnswers').exec();

    // init votes object
    let votes = poll.answerOptions.reduce((prev, answer) => {
      return {...prev, [answer] : 0};
    }, {});

    // count up votes
    poll.userAnswers.forEach(userAnswer => {
      votes[userAnswer.answer] += 1;
    });

    // res.render('poll', {question: poll.question,
    //                     answerOptions: poll.answerOptions,
    //                     votes: votes
    //                   });
    res.render('poll', {poll, votes});
});
  
router.post('/', isAuthenticated, async (req, res) => {
    // parse poll response
    const {answer, title} = req.body;

    // find poll document
    const poll = await Poll.findOne({title}).exec();

    // create poll response
    const pollResp = new PollAnswer({
        poll   : poll.id, 
        answer : answer,
        pollee : req.user.id
    });

    await pollResp.save();

    // add newly created poll response to userAnswers in poll
    poll.userAnswers.push(pollResp.id);
    await poll.save();

    // add poll answer to user's list of poll answers
    const user = await User.findById(req.user.id).exec();
    user.pollAnswers.push(pollResp.id);
    await user.save();
    
    res.redirect('/poll/submitted');
});


router.get('/submitted', (req, res) => {
    res.render('submittedForm');
});

module.exports = router;