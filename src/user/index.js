const User = require('../models/user_model');
const UserService = require('./user_service');

module.exports = UserService(User);