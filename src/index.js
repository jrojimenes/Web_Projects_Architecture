const express = require('express');
const morgan  = require('morgan');
const path    = require('path');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
//////////////////////////////////////////////////////Initializations
const app = express();

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
app.use(morgan('dev'));

//aceptar info desde el front
app.use(bodyParser.urlencoded({extended: false}));

//enviar y recibir json
app.use(bodyParser.json());

///////////////////////////////////////////////////Global variables
app.use((req,res,next) =>{
next();
});


//////////////////////////////////////////////////Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/link'));


///////////////////////////////////////////////////Public
//--in this route we put the images, css, etc
app.use(express.static(path.join(__dirname, 'public')));



///////////////////////////////////////////////////Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});