const userModel = require('../models/userModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const JWT_KEY = 'C++321'

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