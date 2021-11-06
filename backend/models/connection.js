const mongoose=require('mongoose')

const Schema= mongoose.Schema


const connectionSchema= new Schema({
    user_id:{
        type:String,
        required: true
    },
    connection:        
    {
        type:Object,
        required: true
    }
},{timestamps:true})


const Connection =mongoose.model('connection',connectionSchema)
module.exports=Connection



