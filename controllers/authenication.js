const mongoose = require("mongoose");
const jwt=require('jwt-simple');
const User = require('../models/User');
const config=require('../config');
const connectToDatabase = require('../db');

function tokenForUser(user){
    return jwt.encode(
        {   sub:user.id
            ,iat:new Date().getTime()
        },
        config.secret
    );
}

exports.signin=function(req,res,net){

    //console.log(req);
    res.json({token:tokenForUser(req.user)}).send();

};


exports.signup=function(req,res,next){

    //console.log(req.body);
    connectToDatabase().then(
        ()=>{
            const phone=req.body.phone;
            const pwd=req.body.pwd;

            User.findOne({phone:phone},function(err,existingUser){

                if(err){return next(err);};

                if(existingUser)
                {
                    return res.status(422).send({error:'phone is in use!'});
                }

                const user=new User({
                    phone:phone,
                    //nm:'Frank',
                    pwd:pwd
                });

                user.save(function(error){
                    if(error){
                        return next(error);
                    }

                    res.json(user).send();
                });
            });
        }
    );

    //res.status(401).send();

    //res.send({success:true,messge:'signup'})

}