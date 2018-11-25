const express = require('express');
const router = express.Router();
const user=require('../models/user_sql');
const jwt = require('jsonwebtoken');
const data_secret=require('../config/dbConnection');
const passport=require('passport');
router.get('/abc', function (req, res) {
    res.send('test == abc');
});

router.get('/xx', function (req, res) {
    user.test();
    res.send('test --->');
});
router.post('/register', function(req, res, next) {

       var name = req.body.name;
       var email = req.body.email;
       var password = req.body.password;

    user.create_new_user(name,email,password,function (err,result) {
        if (err) {
            res.json({status: false, msg: "data not insert"});
        }
        if (result) {
            res.json({status: true, msg: "data insert success"});
        }
    });

});

router.post('/login',function (req,res) {
    const email=req.body.email;
    const password=req.body.password;
    user.findByMail(email,function (err,user_obj) {

        if(err) throw err;
        if(!user_obj){
            res.json({state:false,msg:"no user found"})
        }

        user.passwordCheck(password,user_obj[0].password,function (err,math) {
            if(err)throw err;
            if(math){
                var token = jwt.sign(user_obj[0], data_secret.secret,{expiresIn:86400*3});
                console.log("token ----->",token);
                res.json({
                        state:true,
                        token:"JWT "+token,
                        user:{
                            id:user_obj[0].id,
                            name:user_obj[0].name,
                            username:user_obj[0].email
                        }
                    }
                );
            }else{
                res.json({state:false,msg:"password not match"})
            }

        });
    })

});

router.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.json({user:req.user});
    }
);

module.exports=router;