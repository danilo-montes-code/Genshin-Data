const express = require('express'), 
      router = express.Router(),
      passport = require('passport'),
      mongoose = require('mongoose'),
      User = mongoose.model('User'),
      PollAnswer = mongoose.model('PollAnswer'),
      Poll = mongoose.model('Poll'),
      fs = require('fs');
require('dotenv').config();

const CURRENT_POLL_INDEX = 0;

router.get('/', (req, res) =>  {
  res.render('index');
});

router.get('/poll', (req, res) => {
  fs.readFile('polls.json', async (err, data) => {
    if (err) {
      console.log('Could not read polls file');
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);

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

    mongoose.disconnect();
    res.render('poll', {question: currentPoll.question,
                        answerChoices: currentPoll.answers,
                        votes: votes
                      });
  });
});

router.post('/poll', async (req, res) => {
  // connect to db
  await mongoose.connect(process.env.MONGODB_URI);

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
  mongoose.disconnect();

  res.redirect('/poll-submitted');
});


router.get('/poll-submitted', (req, res) => {
  res.render('submittedForm');
});

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });


// router.get('/login', (req, res) =>  {
//   res.render('login');
// });

// router.get('/register', (req, res) =>  {
//   res.render('register');
// });

// router.post('/register', (req, res) =>  {
//   const {username, password} = req.body;
//   User.register(new User({username}), req.body.password, (err, user) => {
//     if (err) {
//       res.render('register',{message:'Your registration information is not valid'});
//     } else {
//       passport.authenticate('local')(req, res, function() {
//         res.redirect('/');
//       });
//     }
//   });   
// });

// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user) => {
//     if(user) {
//       req.logIn(user, (err) => {
//         res.redirect('/');
//       });
//     } else {
//       res.render('login', {message:'Your login or password is incorrect.'});
//     }
//   })(req, res, next);
// });

module.exports = router;
