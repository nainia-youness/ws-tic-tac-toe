const express = require('express');
const router=express.Router();
const User= require('../../models/user.js')

router.post('/sign_up', async(req,res)=>{
    if(!req.body.username) return res.status(400).json({'message':'username must be sent'})
    try{
        const username = req.body.username;   
        const user = await User.findOne({
            username: username
        })
        if(user) return res.status(500).json({'error':'username already used'})
        const saved_user= await new User({username:username}).save()
        return res.status(200).json({message:'user created',user_id:saved_user._id})
    }
    catch(err){
        return  res.status(500).json({'error':err.message})
    }
})

module.exports=router