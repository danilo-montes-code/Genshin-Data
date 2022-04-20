const express = require('express'), 
      router = express.Router(),
      //passport = require('passport'),
      mongoose = require('mongoose'),
      User = require('../src/models/user_model')
      PollAnswer = require('../src/models/pollAnswer_model'),
      fs = require('fs');


const CURRENT_POLL_INDEX = 0;

router.get('/', async (req, res) =>  {
  // get characters if user is logged in
  let characters = [];
  if (req.user.username) {
    const user = await User.find({username: req.user.username}).exec();    
    characters = user[0].characters;
  }

  res.render('index', {
    username: req.user?.username,
    characters: characters
  });
});

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

router.get('/track-characters', (req, res) => {
  const characters = [
    "Albedo",
    "Amber",
    "Barbara",
    "Bennett",
    "Diluc",
    "Diona",
    "Eula",
    "Fischl",
    "Jean",
    "Kaeya",
    "Klee",
    "Lisa",
    "Mona",
    "Noelle",
    "Razor",
    "Rosaria",
    "Sucrose",
    "Venti",
    "Beidou",
    "Chongyun",
    "Ganyu",
    "Hu Tao",
    "Keqing",
    "Ningguang",
    "Qiqi",
    "Shenhe",
    "Xiangling",
    "Xiao",
    "Xingqiu",
    "Xinyan",
    "Yanfei",
    "Yun Jin",
    "Zhongli",
    "Arataki Itto",
    "Gorou",
    "Kaedehara Kazuha",
    "Kamisato Ayaka",
    "Kamisato Ayato",
    "Kujou Sara",
    "Raiden Shogun",
    "Sangonomiya Kokomi",
    "Sayu",
    "Thoma",
    "Yae Miko",
    "Yoimiya"
  ];

  res.render('trackCharacters', {characters});
});


router.post('/track-characters', async (req, res) => {
  // get characters from form
  const characters = req.body.character;

  // get user from database and update characters
  await User.findOneAndUpdate({username: req.user.username}, {characters: characters});

  res.redirect('/');
});

module.exports = router;
