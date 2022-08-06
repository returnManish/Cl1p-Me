const mongoose = require('mongoose');


const DB_link = 'mongodb+srv://admin:AxWj03B0vQcNdnPB@cluster0.l0r2dts.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_link)
.then(function(db){
    console.log("db connected for reviewModel");
})
.catch(function(err){
    console.log("err for reviewModel");
    console.log(err);
})

const reviewSchema = new mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:Number,
        default: 123
    },
    email:{
        type:String
    },
    message:{
        type:String,
        default:'no message'
    }

})

const reviewModel =  mongoose.model('reviewModel',reviewSchema);

module.exports = reviewModel;