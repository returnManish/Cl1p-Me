const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

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

app.use('/contact',(req,res)=>{
    return res.render('contact.ejs' , {title : 'contact'})
})
app.use('/signup',(req,res)=>{
    return res.render('signup.ejs' , {title : 'signup'})
})
app.use('/login',(req,res)=>{
    return res.render('login.ejs' , {title : 'login'})
})
app.use('/about',(req,res)=>{
    return res.render('about.ejs' , {title : 'about'})
})
app.use('/',(req,res)=>{
    return res.render('index.ejs' , {title : 'home'})
})


