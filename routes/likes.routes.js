const router=require('express').Router();
const {like,dislike}=require('./../controllers/like.controller')
router.post('/like',like);
router.post('/dislike',dislike)







module.exports=router;