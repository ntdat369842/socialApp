require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const path = require('path');

const setupPassport = require('./config/setuppassport');
const routes = require('./controllers/route');
const {mongoose} = require('./db/mongoose');

const port = process.env.PORT || 3000;

let app = express();

setupPassport();

app.set('port', port);

app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'ejs');

app.use( bodyParser.urlencoded({
    extended: false
}) );
app.use( cookieParser() );
app.use( session( {
    secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
    resave: true,
    saveUninitialized: true
}) );
app.use( flash() );

app.use(routes);

app.listen(app.get('port'), () => {
    console.log(`Server started on port ${ app.get('port') }`);
});