
const Authenication=require('./controllers/authenication');
const passportService=require('./service/passport');
const passport=require('passport');
const connectToDatabase = require('./db');
const Note = require('./models/Note');

const requireAuth=passport.authenticate('jwt',{session:false});
const requireSignin=passport.authenticate('local',{session:false});

module.exports=function(app){

    app.get('/',requireAuth,function(req,res,next){
        console.log(req.user.nm);
        res.send('I am home page');
    });
    app.post('/signin',requireSignin,Authenication.signin);
    app.post('/signup',Authenication.signup);

    app.get("/notes",(req,res)=>{
        connectToDatabase()
          .then(() => {
            Note.find()
              .then(notes => {
                res.status(200).send(notes);
              })
              .catch(err => res.send('Could not fetch the notes.'));
          });
    }); 
    
    app.post("/notes",(req,res,next)=>{
        console.log('do connect db');
        connectToDatabase()
        .then(()=>{
            console.log(req.body);
            Note.create(req.body)
            .then(note => {
                res.send(note);
            })
            .catch(err =>{
                res.status(500).send(err);
            });
        });
    });
    
    app.get("/hello",(req,res)=>{
        var hello={message:'hello world'}
        res.status(200).send(hello);
    });
     
    
}
