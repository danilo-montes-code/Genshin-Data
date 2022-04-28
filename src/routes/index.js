const express    = require('express'),
      fns        = require('date-fns'), 
      router     = express.Router(),
      User       = require('mongoose').model('User');
      
// home page
router.get('/', async (req, res) =>  {
  // get characters if user is logged in
  let characters = [],
      weapons    = [];
  
  if (req.user) {
    console.log('user logged in');
    const user = await User.findById({username: req.user.id})
                           .populate('characters', 'name')
                           .populate('weapons', 'name')
                           .exec();

    characters = user.characters;
    weapons    = user.weapons;
  }

  // getting current day and time until resets
  const today = new Date(),
        day   = dayOfWeek(today.getDay());
        
  const tomorrow = fns.startOfTomorrow(today),
        nextWeek = fns.startOfDay(fns.nextMonday(today));
  
  let dhours   = fns.differenceInHours(tomorrow, today) % 24,
      dminutes = fns.differenceInMinutes(tomorrow, today) % 60,
      dseconds = fns.differenceInSeconds(tomorrow, today) % 60,
      wdays    = fns.differenceInDays(nextWeek, today) % 7;

  res.render('index', {characters, weapons, day,
                       dhours, dminutes, dseconds, wdays});
});

function dayOfWeek(day) {
  return day === 0 ? 'Sunday' :
         day === 1 ? 'Monday' :
         day === 2 ? 'Tuesday' :
         day === 3 ? 'Wednesday' :
         day === 4 ? 'Thursday' :
         day === 5 ? 'Friday' :
                     'Saturday';
}


// about page
router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
