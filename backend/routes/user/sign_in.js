const express = require('express');
const router=express.Router();
const User= require('../../models/user.js')


router.post('/sign_in', async (req,res)=>{
    if(!req.body.username) return res.status(400).json({'message':'username must be sent'})
    try{
        const username = req.body.username;  
        const user= await User.findOne({
            username: username
       })
       if(!user) return res.status(500).json({'error':'wrong username'})
       return res.status(200).json({'user_id':user._id,'message':'user signed in'}) 
    }
    catch(err){
        return res.status(500).json({'error':err.message})
    }
})

module.exports=router
