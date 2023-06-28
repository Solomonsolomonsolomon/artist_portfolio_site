




const express=require('express');
const{slash,getImages}=require('./../controllers/slash.controller')
const router=express.Router()
router.route('/')
.get(slash)

router.route('/getimages')
.get(getImages)

module.exports=router