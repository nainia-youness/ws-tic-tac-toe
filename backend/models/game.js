const mongoose=require('mongoose')

const Schema= mongoose.Schema


const gameSchema= new Schema({
    is_available:{
        type:Boolean,
        required: true
    },
    host_gamer_id:{
        user_id:{type:String,required: true},
        sign:{type:String,required: true},
    },
    guest_gamer_id:{
            user_id:{type:String,required: false},
            sign:{type:String,required: false},
    },
    state:        
    [   
        {    
            user_id:{type:String,required: true},
            move:{type:Number,required: true}
        } 
    ]
},{timestamps:true})

const Game =mongoose.model('game',gameSchema)


module.exports=Game
