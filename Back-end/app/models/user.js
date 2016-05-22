var mongooose = require('mongoose');
var UserSchema = require('../schemas/user.js');
var User = mongooose.model('User', UserSchema);

module.exports = User;