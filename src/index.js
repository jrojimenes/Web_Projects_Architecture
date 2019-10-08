const express = require('express');
const morgan  = require('morgan');
const path    = require('path');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const flash      = require('connect-flash');
const session    = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport   = require('passport');
const {database} = require('./keys');
//////////////////////////////////////////////////////Initializations
const app = express();
require('./lib/passport')
//////////////////////////////////////////////////////Settings
app.set('port', process.env.PORT || 4000);

//set the path views dir
app.set('views', path.join(__dirname,'views')); 

//////Configurate handlebars
app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        layoutsDir   : path.join(app.get('views'), 'layouts'),
        partialsDir  : path.join(app.get('views'), 'Partials'),
        extname      : '.hbs',
        helpers      : require('./lib/handlebars')
}));

//configurate the use of handlebars 
app.set('view engine', '.hbs');


////////////////////////////////////////////////////Midlewares

//Flash module need a session, we configurate this function 
app.use(session({
  secret: 'mysqlnodesession',
  resave: false,
  saveUninitialized: false,
  //We save the session on database
  store: new MySQLStore(database)

}));
//Initialize the flash module for show messages
app.use(flash());

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));

//aceptar info desde el front
app.use(bodyParser.urlencoded({extended: false}));

//enviar y recibir json
app.use(bodyParser.json());

///////////////////////////////////////////////////Global variables
app.use((req,res,next) =>{

   app.locals.success = req.flash('success');
   
   app.locals.message = req.flash('message');

   //Save user info in to global variables
   app.locals.user = req.user;

next();
});


//////////////////////////////////////////////////Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/link'));
app.use(require('./routes/authentication'));


///////////////////////////////////////////////////Public
//--in this route we put the images, css, etc
app.use(express.static(path.join(__dirname, 'public')));



///////////////////////////////////////////////////Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});