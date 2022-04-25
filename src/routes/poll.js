const express = require('express'), 
      router = express.Router(),
      //passport = require('passport'),
      mongoose = require('mongoose'),
      User = mongoose.model('User'),
      PollAnswer = mongoose.model('PollAnswer'),
      fs = require('fs');

const CURRENT_POLL_INDEX = 0;

router.get('/poll', (req, res) => {
    fs.readFile('polls.json', async (err, data) => {
      if (err) {
        console.log('Could not read polls file');
        return;
      }
  
      data = JSON.parse(data);
      currentPoll = data.polls[CURRENT_POLL_INDEX];
  
      // get votes from db, only including answers
      const loggedAnswers = await PollAnswer.find({poll : CURRENT_POLL_INDEX});
  
      // init votes object
      let votes = currentPoll.answers.reduce((prev, answer) => {
        return {...prev, [answer] : 0};
      }, {});
  
      // count up votes
      loggedAnswers.forEach((answer) => {
        votes[answer.answer] += 1;
      });
  
      res.render('poll', {question: currentPoll.question,
                          answerChoices: currentPoll.answers,
                          votes: votes
                        });
    });
  });
  
router.post('/poll', async (req, res) => {
    // parse poll response
    const body = req.body;
    const answer = body.answer;

    // find poll document
    const poll = CURRENT_POLL_INDEX;
    //const pollDoc = await Poll.find()

    // create poll response
    const pollResp = new PollAnswer({
        poll   : poll, 
        answer : answer
    });

    await pollResp.save();

    res.redirect('/poll-submitted');
});


router.get('/poll-submitted', (req, res) => {
    res.render('submittedForm');
});