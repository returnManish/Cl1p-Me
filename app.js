const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
app.listen(port);

app.use('/',(req,res)=>{
    return res.json({
        message:"Response send"
    })
})