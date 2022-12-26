const login = require('./login.controller');
const interest = require('./interests.controller');
const profile = require('./profile/profile.controller');
const chest = require('./offers/chest.controller');
const produce = require('./offers/produce.controller');
const home = require('./home.controller');

module.exports = {
    login,
    interest,
    profile,
    chest,
    produce,
    home
};