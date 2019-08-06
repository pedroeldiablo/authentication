// const Authentication = require('./controllers/authentication');

import {
    signup
} from './controllers/authentication';

module.exports = function(app) {
    app.post('/signup', signup);
};
