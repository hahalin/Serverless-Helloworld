const passport = require('passport');
const User = require('../models/User');
const config=require('../config');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const LocalStrategy=require('passport-local');


//localStrategy
const localLogin=new LocalStrategy(
    {usernameField:'phone'},
    function(phone,password,done){
        console.log(phone);
        console.log(password);
        User.findOne({phone:phone},function(err,user){
            if(err) {return done(err);}
            if(!user){
                return done(null,false);
            }
            //compare password
            user.comparePassword(password,function(err,isMatch){
                if(err) {
                    return done(err);
                }
                if(!isMatch)
                {
                    return done(null,false);
                }
                return done(null,user);
            })  
        })
    }
);

const jwtoptions={
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:config.secret
};

const jwtLogin=new JwtStrategy(jwtoptions,function(payload,done){

    User.findById(payload.sub,function(err,user){
        if(err){
            return done(err,false);
        }
        if(user){
            done(null,user);
        }
        else{
            done(null,false);
        }
    });

});

passport.use(jwtLogin);
passport.use(localLogin);