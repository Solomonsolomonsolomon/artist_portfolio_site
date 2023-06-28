

const{comment,viewComment}=require('./../controllers/comment.controller');


const router=require('express').Router();

router.post('/comment',comment);
//router.post('/viewcomment',viewComment)
module.exports=router;