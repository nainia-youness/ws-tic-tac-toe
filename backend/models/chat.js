const mongoose=require('mongoose')

const Schema= mongoose.Schema


const chatSchema= new Schema({
    game_id:{
        type:String,
        required: true
    },
    state:        
    [   
        {    
            user_id:{type:String,required: true},
            content:{type:String,required: true}
        } 
    ]
},{timestamps:true})

const Chat =mongoose.model('chat',chatSchema)


module.exports=Chat