const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const passport=require('passport');
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const port =process.env.port||4000;
app.listen(port,function () {
    console.log("listening to port"+port);
});

const user=require('./routes/user');


app.use('/',user);


