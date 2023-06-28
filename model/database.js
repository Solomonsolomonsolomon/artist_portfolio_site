


const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on('error',(err)=>{
    console.log(err);
}).once('open',()=>{
    console.log('db connected successfully')
})
const {Schema,model}=require('mongoose');
let User=model('User',Schema(
    {
    email:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    likes:[{
        type:Schema.Types.ObjectId,
        ref:'Picture'
    }],
    preferredCategories:[{
        type:String
    }],
    admin:{
        type:Boolean,
    }
}

))
let Picture=model('Picture',Schema({
    url:{
        type:String
    },
    description:{
        type:String
    },
    likedBy:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    noOfLikes:{
        type:Number,
        default:0
    }
}))

const Like=model('Like',Schema({
    user:{
        type:Schema.Types.ObjectId
    },
    postId:{
        type:Schema.Types.ObjectId
    }
}))


const Comment=model('Comment',Schema({
    comment:{
            type:String
    },
    author:{
     type:String
    },
    picture:{
        type:Schema.Types.ObjectId,
        ref:'Picture'
    },
    time:{
        type:String
    }
}))
module.exports={
    User,
    Picture,
    Like,
    Comment
}