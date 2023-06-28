



const path=require('path')
module.exports.homePage=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','client','home','home.html'))
}