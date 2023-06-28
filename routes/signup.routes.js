



const {getSignup}=require('./../controllers/signup.controller')

const {postSignup}=require('./../controllers/signup.controller')

const router=require('express').Router();

router.route('/signup')
    .get(getSignup)
    .post(postSignup)



module.exports=router