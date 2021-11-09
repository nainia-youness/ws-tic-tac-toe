require('dotenv').config()
const mongoose = require('mongoose');
//connect to mangodb
const dbUri=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@tic-tac-toe.83hb5.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`

function connect(){
        return new Promise((resolve,reject)=>{
            mongoose.connect(dbUri,{useNewUrlParser: true,useUnifiedTopology:true})
            .then((result)=>{
                resolve()
            })
            .catch((err)=>{
                reject(err)
            })
        })    
}


function disconnect(){
    return mongoose.disconnect()
}




module.exports ={
    connect,disconnect
}
