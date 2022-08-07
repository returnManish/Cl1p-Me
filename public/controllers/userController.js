const userModel = require('../models/userModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const JWT_KEY = 'C++321'

const pageModel = require('../models/pageModel');


module.exports.createUser = async function createUser(req , res){
    try{
        let salt =await bcrypt.genSalt(10);
        let hashedPass = await bcrypt.hash(req.body.password , salt);

        let createdUser = await userModel.create({
            name:req.body.name,
            username:req.body.password,
            email:req.body.email,
            password:hashedPass
        })

       return res.send('User Created, Login Now!');

    }
    catch(err){
       return res.send(err.message);
    }
};

module.exports.loginUser = async function loginUser(req , res){
    try{
        let currUser = await userModel.findOne({username : req.body.username});
        // console.log(user);
        // console.log(req.body.password)
        // covert res.body.pass into hased to compare with Db pass

        // console.log(user.password)
        // console.log(res.body.password);
        if(currUser){
            let match = await bcrypt.compare(req.body.password , currUser.password); //decript
            if(match){
                //TODO 
                let uid = currUser['id'];
                let token = jwt.sign({payload:uid} , JWT_KEY); //token
                res.cookie('login', token , {httpOnly:true});
                res.cookie('username' , req.body.username ,{httpOnly:true} )
                return res.send('user Logged In successfully');
            }
            else{
                return res.send('wrong password');
            }
        }
        else{
            return res.send('user not found in db')
        }
    }
    catch(err){
        return res.send(err.message);
    }

};

module.exports.logoutUser =async function logoutUser(req , res){
    res.cookie('login', ' ', {maxAge:1});
    res.cookie('username', ' ', {maxAge:1});
    // alert('Logged Out successfully')
    // res.send('Logged Out successfully');
    return res.redirect('/')
};

module.exports.showAllUrls = async function showAllUrls(req , res){
    try{
            let unknownuser  = req.params.id;
            let loggedin_user  = req.cookies.username; //id->user
            // user1 is same as user
            // console.log(user1);
            // console.log(user);
            if(!loggedin_user){
                return res.render('showUrl' , {
                    title: "err",
                    username : '',
                    allLinks : [],
                    msg : 'Access Denied. Login to see',
                    err : 'Error 401'
                });
            }
            if(unknownuser != loggedin_user){
                return res.render('showUrl' , {
                    title: "err",
                    username : '',
                    allLinks : [],
                    msg : 'Access Denied',
                    err : 'Error 403'
                });
            }
            let pages_info = await pageModel.find({username:loggedin_user});//full schema
            // console.log(allUsers_info)
            let allLinks = [];
            for(let i = 0 ; i<pages_info.length ; i++){
                allLinks[i] = pages_info[i].pageId;
                // console.log(allLinks)
            }


            let msg = '';
            if(pages_info.length != 0){
                msg = 'List of all links updated'
            }
            else{
                msg  = 'No links found. Plz create links to see'
            }
            // console.log(allLinks.length)
            return res.render('showUrl' , {
                title: "MyUrls",
                username : loggedin_user,
                allLinks : allLinks,
                msg : msg
            });
    }
    catch(err){
        res.send(err.message)
    }
    
}