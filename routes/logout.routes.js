const { logout } = require('./../controllers/logout.controller');
const router=require('express').Router();
router.get('/logout',logout)
module.exports=router;