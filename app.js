/**
 * Module dependencies.
 */

const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
//const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
//const lusca = require('lusca');
const dotenv = require('dotenv');
//const MongoStore = require('connect-mongo')(session);
//const flash = require('express-flash');
const path = require('path');
//const mongoose = require('mongoose');
//const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
//dotenv.load({ path: '.env.example' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const writeController = require('./controllers/write');
const cvController = require('./controllers/cv');


/**
 * API keys and Passport configuration.
 */
//const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();
console.log('  create express server\n');

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
console.log('  create Express configuration\n');
//app.use(logger('dev')); removed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

console.log('  before Primary app routers\n');

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/write',writeController.getArticles);
app.get('/cv',cvController.getCV);
console.log('  before errorHandler\n');

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
