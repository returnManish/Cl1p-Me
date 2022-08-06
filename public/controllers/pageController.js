const pageModel = require('../models/pageModel');
const reviewModel = require('../models/reviewModel');

// module.exports.getHome = function getHome(req, res) {
//      res.render('index.ejs', { title: 'home'});
// }

module.exports.getHome = getHome = (req, res) => {
     let currUser = req.cookies.username; //todo
     if (!currUser) currUser = '';
     return res.render('index.ejs', { title: 'CL1p-home' , username: currUser})//todo
}

module.exports.fetchPage = async function fetchPage(req, res) {
     try {
          let currUser = req.cookies.username; //todo
          if (!currUser) currUser = '';
          let link = req.params.id;
          // console.log(typeof link);
          let pageOfData = await pageModel.findOne(
               {
                     pageId: link 
               });

          //  console.log(pageOfData.pageId)
          let content = '';     
          if(pageOfData){
               // console.log('1111');
               content = pageOfData.pageContent;
          }
          
          // console.log(content);

          return res.render('data.ejs' ,{
               title : `${link}`,
               userContent : content,
               username: currUser //todo
               // username: ''

          });
     }
     catch(err) {
          console.log(err);
          return res.send(err.message);
     }
}

module.exports.updatePage = async function updatePage(req , res) {
     try{

          let link = req.body.currLink.substr(1);
          // console.log(link);
          let page = await pageModel.findOne({pageId : link});
          // console.log(page.id);
          if(page){

               if(req.body.pass == page.password){

                    let updatedContent = await pageModel.findByIdAndUpdate(page.id , {
                         pageContent : req.body.content,
                         username : req.cookies.username
                         //TODO
                    })

               }
               else{
                    return res.send('Err in password')
               }

          }
          else{
               //if page not found then create
               let newpage = await pageModel.create({
                    pageId : link,
                    pageContent : req.body.content,
                    password : req.body.pass,
                    username : req.cookies.username
                    //TODO
               })
          }

          return res.json({
               message : "updation handled got link"
          })
     }
     catch(err) {
          console.log(err);
          return res.send(err.message);
     }
}


// delete 


module.exports.delPage = async function delPage(req , res) {
     try{
          let link = req.body.currLink.substr(1);
          // console.log(link);
          let page = await pageModel.findOne({pageId : link});
          // console.log(page.id);
          if(page){

               if(req.body.pass == page.password){
                    let deletedContent = await pageModel.findByIdAndDelete(page.id);
               }
               else{
                    return res.send('Err in password')
               }
          }
          return res.send("deletion handled");
          // return res.json({
          //      message : "deletion handled"
          // })

     }
     catch(err) {
          console.log(err);
          return res.send(err.message);
     }
}

module.exports.addReview =async function addReview(req , res){
     try{
          let data = req.body;
          let review = reviewModel.create({
               name:data.name,
               phone:data.phone,
               email:data.email,
               message:data.mess
          })

          if(review){
               res.send('Form submitted');
          }
          else{
               res.send('err from server');
          }
     }
     catch(err){
          res.send(err.message);
     }
    
}