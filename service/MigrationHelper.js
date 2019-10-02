const mongoose = require("mongoose");
const User = require('../models/User');
const connectToDatabase = require('../db');
const bcrypt =require('bcrypt-nodejs');

function Migration()
{

    const initAdmin=()=>{
       console.log('initAdmin');
       connectToDatabase().then(
            ()=>{
                User.findOne({nm:'admin'},function(err,existingUser){
                    if(err){return false;};
                    if(!existingUser)
                    {
                        bcrypt.genSalt(10,function(error,salt){
                            if(error)
                            {
                                return false;
                            }
                            bcrypt.hash('admin',salt,null,function(err,hash){                                
                                if(err){
                                    return false;
                                }                                
                                const user=new User({
                                    phone:'999',
                                    nm:'admin',
                                    pwd:hash
                                });                
                                user.save(function(error){
                                    if(error){
                                        return false;
                                    }
                                });
                            })
                        });                        
                    }
                });
            }
       );
    };

    return [
        initAdmin
    ];
}

module.exports = Migration;