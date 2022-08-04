const express = require('express');
const pageRouter = express.Router();

const { getHome, fetchPage, updatePage, delPage } = require('../controllers/pageController');
// const getHome = require('../controllers/pageController');



pageRouter.route('/contact')
    .get((req, res) => {
        return res.render('contact.ejs', { title: 'contact' })
    })
//TODO

pageRouter.route('/signup')
    .get((req, res) => {
        res.render('signup.ejs', { title: 'signup' })
    })

pageRouter.route('/login')
    .get((req, res) => {
        return res.render('login.ejs', { title: 'login' })
    })

pageRouter.route('/about')
    .get((req, res) => {
        return res.render('about.ejs', { title: 'about' })
    })



pageRouter.route('/').get(getHome);

pageRouter.route('/:id')
    .get(fetchPage)
    .patch(updatePage)
    .delete(delPage)
// .get ( (req, res) => {
//     return res.render('data.ejs', { title: 'mydata' })
// })


module.exports = pageRouter;