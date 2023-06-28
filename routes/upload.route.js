







const {upload,getUpload}=require('./../controllers/multer.controller');
const router=require('express').Router();
 const express=require('express');
 const app=express();
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
router.route('/upload')
.get(getUpload)
.post(upload)



module.exports=router
