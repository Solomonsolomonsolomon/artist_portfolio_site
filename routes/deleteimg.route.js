




const express=require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
const router=require('express').Router();
const {deletePicture}=require('./../controllers/deletepicture.controller')
router.route('/deleteImg').post(deletePicture)
console.log(deletePicture)
module.exports=router;
