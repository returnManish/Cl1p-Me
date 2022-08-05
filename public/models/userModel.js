const mongoose = require('mongoose');


const DB_link = 'mongodb+srv://admin:AxWj03B0vQcNdnPB@cluster0.l0r2dts.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_link)
.then(function(db){
    console.log("db connected for userModel");
})
.catch(function(err){
    console.log("err for userModel");
    console.log(err);
})

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        // default:''
    }

})

const userModel =  mongoose.model('userModel',userSchema);

module.exports = userModel;