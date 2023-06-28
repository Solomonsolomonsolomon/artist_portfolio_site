




const router=require('express').Router();
const {home}=require('./../controllers/homecontroller');
router.get('/home',home)



module.exports=router;
