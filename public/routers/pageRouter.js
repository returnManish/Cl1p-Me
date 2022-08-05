const express = require('express');
const pageRouter = express.Router();

const { getHome, fetchPage, updatePage, delPage } = require('../controllers/pageController');
// const getHome = require('../controllers/pageController');

const { createUser, loginUser, logoutUser } = require('../controllers/userController');



pageRouter.route('/signup')
    .get((req, res) => {
        res.render('signup.ejs', { title: 'signup', username: '' })
    })

    .post(createUser)


pageRouter.route('/login')
    .get((req, res) => {
        return res.render('login.ejs', { title: 'login', username: '' })
    })

    .post(loginUser)


pageRouter.route('/contact')
    .get((req, res) => {
        //TODO
        let currUser = req.cookies.username; //todo
        if (!currUser) currUser = '';
        return res.render('contact.ejs', { title: 'contact', username: currUser })//TDO
    })
//TODO


pageRouter.route('/about')
    .get((req, res) => {
        let currUser = req.cookies.username; //todo
        if (!currUser) currUser = '';
        return res.render('about.ejs', { title: 'about', username: currUser })//todo
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