const express = require('express');
const router=express.Router();
const sign_up_route=require('./user/sign_up.js')
const sign_in_route=require('./user/sign_in.js')

router.use('/user',sign_in_route)
router.use('/user',sign_up_route)

module.exports=router