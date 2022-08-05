const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());


const port = process.env.PORT || 5000;
app.listen(port);

//static files
app.use('/static', express.static('./public/views/images'));
app.use('/css' , express.static('./public/css'))
//set templating engine
app.set('view engine' , 'ejs');
app.set('views' , 'public/views');
app.use(expressLayouts);

//navigation


//routing
const pageRouter = require('./public/routers/pageRouter');
app.use('' , pageRouter);



