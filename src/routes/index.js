const { populate } = require('../models/character_model');

const express    = require('express'),
      fns        = require('date-fns'),
      tz         = require('date-fns-tz'), 
      router     = express.Router(),
      User       = require('mongoose').model('User');
      
// home page
router.get('/', async (req, res) =>  {
  // get characters if user is logged in
  let characters = [],
      weapons    = [],
      domains    = [];
  
  if (req.user) {
    const user = await  User.findById(req.user.id)
                            .populate(
                                [
                                    {
                                        path: 'characters',
                                        populate : [
                                            {
                                                path: 'talent_material',
                                                populate : {path: 'domain'}
                                            },
                                            {
                                                path: 'weekly_material',
                                                populate : {path: 'domain'}
                                            }
                                        ]
                                    },
                                    {
                                        path: 'weapons',
                                        populate :  {
                                                        path: 'ascension_material',
                                                        populate : {path: 'domain'}
                                                    }
                                    }
                                ]).exec();

    characters = user.characters;
    weapons = user.weapons;
    console.log(characters);
    console.log(weapons);

    // let charDoms = characters.reduce((prev, curr) => {

    // }, []);

    // let weapDoms = weapons.reduce((prev, curr) => {

    // }, []);
    
    // domains = charDoms.concat(weapDoms);
  }

  // getting current day and time until resets
  const today = new Date(),
        day   = dayOfWeek(today.getDay());
        
  // despite the variable names, these refer to when the reset occurs, which is based on time zones:
  //    US     : GMT-5
  //    Europe : GMT+1
  //    Asia   : GTM+8
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
        tomorrow = fns.subHours(fns.startOfTomorrow(today), getRegionOffset(timeZone)),
        nextWeek = fns.subHours(fns.startOfDay(fns.nextMonday(today)), getRegionOffset(timeZone));

  let dhours   = fns.differenceInHours(tomorrow, today) % 24,
      dminutes = fns.differenceInMinutes(tomorrow, today) % 60,
      dseconds = fns.differenceInSeconds(tomorrow, today) % 60,
      wdays    = fns.differenceInDays(nextWeek, today) % 7;

  res.render('index', {characters, weapons, day,
                       dhours, dminutes, dseconds, wdays});
});

function dayOfWeek(day) {
    const dayNames = {
        0 : 'Sunday',
        1 : 'Monday', 
        2 : 'Tuesday',
        3 : 'Wednesday',
        4 : 'Thursday',
        5 : 'Friday',
        6: 'Saturday'
  }
  return dayNames[day];
}

function getRegionOffset(timeZone) {
  const region = timeZone.split('/')[0],
        convs  = {
          'America' : -5,
          'Asia'    :  1,
          'Europe'  :  8
        };
  return convs[region];

}

// about page
router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
