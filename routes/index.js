const express = require('express'), 
      router = express.Router(),
      passport = require('passport'),
      mongoose = require('mongoose'),
      User = mongoose.model('User'),
      PollAnswer = mongoose.model('PollAnswer'),
      fs = require('fs');
require('dotenv').config();

router.get('/', (req, res) =>  {
  res.render('index');
});

router.get('/poll', (req, res) => {
  fs.readFile('polls.json', (err, data) => {
    if (err) {
      console.log('Could not read polls file');
      return;
    }
    
    data = JSON.parse(data);
    currentPoll = data.polls[0];


    // get votes from db
    

    res.render('poll', {question: currentPoll.question,
                        answerChoices: currentPoll.answers,
                        // votes: votes
                      });
  });
});

router.post('/poll', async (req, res) => {
  // connect to db
  await mongoose.connect(process.env.MONGODB_URI);

  // parse poll response
  const body = req.body;
  const answer = body.answer;

  // create poll response
  const pollResp = new PollAnswer({
    answer: answer
  });

  await pollResp.save();
  mongoose.disconnect();

  res.redirect('/poll');
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
