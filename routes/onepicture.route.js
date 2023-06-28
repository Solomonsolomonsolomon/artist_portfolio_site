





const router=require('express').Router();
const {onePicture,pic}=require('./../controllers/onepicture.controller')

router.route('/:id')
.post(pic)


module.exports=router