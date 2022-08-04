const pageModel = require('../models/pageModel');

// module.exports.getHome = function getHome(req, res) {
//      res.render('index.ejs', { title: 'home'});
// }

module.exports.getHome = getHome = (req, res) => {
     return res.render('index.ejs', { title: 'home' })
}

module.exports.fetchPage = async function fetchPage(req, res) {
     try {
          // let currUser = req.cookies.username;
          // if (!currUser) currUser = '';
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
               // username: currUser
          });
     }
     catch(err) {
          console.log(err);
          return res.send(err.message);
     }
}

module.exports.updatePage = async function updatePage(req , res) {
     try{
          //TODO
          let link = req.body.currLink.substr(1);
          // console.log(link);
          let page = await pageModel.findOne({pageId : link});
          // console.log(page.id);
          if(page){

               if(req.body.pass == page.password){

                    let updatedContent = await pageModel.findByIdAndUpdate(page.id , {
                         pageContent : req.body.content,
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
                    password : req.body.pass
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