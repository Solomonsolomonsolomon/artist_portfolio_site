const router=require('express').Router();
const{getLogin,postLogin}=require('./../controllers/login.controller');
const passport=require('passport')
const app=require('express')();

router.route('/login')
.get(getLogin)
.post(
    passport.authenticate('local',{failureFlash:true,successRedirect:'/',failureRedirect:'/login',successFlash:'successful login!!!'})
)
 
module.exports=router;