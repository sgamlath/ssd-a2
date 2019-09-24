const express = require('express');
const mainRoute = require('./routes/main');
const authRoute = require('./routes/auth');
const passportConfig = require('./configs/passport');
const passport = require('passport');
const cookieSession = require('cookie-session');
const auth_keys = require('./configs/keys');
const nunjucks = require('nunjucks');
const fileUpload = require('express-fileupload');

let app = express();
const port = 4000 || process.env.PORT;
app.listen(port, () => console.log(`running on ${port}`));
nunjucks.configure('views', { autoescape: true,express: app });
app.use('/static', express.static('public'));
app.use(cookieSession({ keys: [auth_keys.session_key] }));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());
app.use('', mainRoute);
app.use('/auth', authRoute);
