const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
app.listen(port);

app.use('/static', express.static('./frontend/resources/images'));

app.use('/',(req,res)=>{
    return res.sendFile('frontend/index.html',{root:__dirname});
})
