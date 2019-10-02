const mongoose = require('mongoose');  
const bcrypt =require('bcrypt-nodejs');

var User;

if(mongoose.models.User)
{
    User=mongoose.model('User');
}
else
{
    var UserSchema = new mongoose.Schema({  
        phone: String,
        nm: String,
        pwd:String
    });

    UserSchema.methods.comparePassword = function(candidatedPassword,callback){
        bcrypt.compare(candidatedPassword,this.pwd,function(err,isMatch){
            if(err){
                return callback(err);
            }
            callback(null,isMatch);
        })
    };

    User=mongoose.model('User',UserSchema);
}



module.exports = User;
