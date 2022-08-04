const mongoose = require('mongoose');


const DB_link = 'mongodb+srv://admin:AxWj03B0vQcNdnPB@cluster0.l0r2dts.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_link)
.then(function(db){
    console.log("db connected for pageModel");
})
.catch(function(err){
    console.log("err for pageModel");
    console.log(err);
})

const pageSchema = new mongoose.Schema({
    pageId:{
        type:String,
        require:true
    },
    pageContent:{
        type:String,
    },
    password:{
        type:String,
        default:''
    }

})

const pageModel =  mongoose.model('pageModel',pageSchema);

module.exports = pageModel;