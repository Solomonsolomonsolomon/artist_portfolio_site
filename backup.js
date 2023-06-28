//NOTE multer.controller.js has the route upload.route.js not multer.route.js
require('dotenv').config();
const path=require('path')
const express=require('express');
const app=express();
const server=require('http').createServer(app);
const router=express.Router();
const cors=require('cors');
const PORT=process.env.PORT||9999
const session=require('express-session');
const flash=require('express-flash');
let mongoStore=require('connect-mongo')
const {User}=require('./model/database');
const {Picture}=require('./model/database');
const passport=require('passport');
const {protectedRoute, adminRoute}=require('./config/passportmiddleware');
//requiring routes
const signup=require('./routes/signup.routes')
const home=require('./routes/home.routes')
const login=require('./routes/login.routes');
const upload=require('./routes/upload.route')
const slash=require('./routes/slash.routes')
const deleteImg=require('./routes/deleteimg.route')
const onePic=require('./routes/onepicture.route')
const like=require('./routes/likes.routes');
const logout=require('./routes/logout.routes');
const comment=require('./routes/comment.route');
//enabling cors
app.use(cors())
//accepting form data;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//rendering css and js
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname,'views')))
app.use(express.static(path.join(__dirname,'views','css')))
//setting view engine
app.set('view engine','ejs')
//for flash messages
app.use(flash());
//requiring passport configuration
require('./config/passport');
//session configuration here 
app.use(session({
    secret:process.env.SECRET,
    saveUninitialized:true,
    resave:false,
    cookie:{maxAge:1000*60*60*10 },//10 hours
    store:new mongoStore({
           mongoUrl:'mongodb://localhost:27017/piquetrest',
           collectionName:'sessions'
    })
}))
//initializing passport
app.use(passport.initialize());
app.use(passport.session())
//serializing and deserializing users
passport.serializeUser(function(user, done) {
    done(null,user._id)
  });
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
//routes start here
app.post('/d',(req,res)=>{User.deleteMany({}).then(()=>{res.json({msg:'cleared db'})})})
//OPEN ROUTES //can be accessed by anyone.withor without logging in
app.use('/',slash)//landing page
app.use('/',signup);//signup route
app.use('/',login);//login route
//NOTE multer.controller.js has the route upload.route.js not multer.route.js
//ADMIN ROUTES are routes that can only be accessed by admin.ADMIN ROUTES are not protected by default
app.use('/',protectedRoute,adminRoute,upload)//upload route   
app.use('/',adminRoute,deleteImg) //deleteImg  
//PROTECTED ROUTES are routes that you cant access until you are logged in
app.use('/',protectedRoute,like);//like a picture!!
app.use('/',protectedRoute,logout)//logout route
app.use('/',protectedRoute,comment);//comment route
app.use('/',protectedRoute,onePic);//renders single image//allows like and comment
app.use((req,res,next)=>{res.redirect('./')})//incase of wandering
//listener function
server.listen(PORT,(err)=>{
    if(err)throw new Error('error in listening');
    console.log(`${new Date()}\n ${PORT}`);
})
