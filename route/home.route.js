






const {Router}=require('express');
const router=Router();
const {homePage}=require('./../controller/home.controller')
router.route('/').get(homePage)
module.exports=router;