const express     = require('express'), 
      router      = express.Router(),
      mongoose    = require('mongoose'),
      Character   = mongoose.model('Character'),
      Weapon      = mongoose.model('Weapon');

router.get('/characters', async (req, res) => {

});

router.get('/weapons', async (req, res) => {

});



module.exports = router;