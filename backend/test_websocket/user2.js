//-------------------------send requests to server
const ws = require('ws');
//const Websocket=require('Websocket')

const client = new ws('ws://localhost:8080/websocket');
//inputs from the client

//user2 Imad joins the game
const user_id="617db24ea5c48f5de489d05a" 

let game_id
let chat_id



client.onmessage = (message) =>{//i receive the responses here (no need to add a listener)
    const response=JSON.parse(message.data)
    if(response.method==='connect'){
        
    }
    if(response.method==='create'){
        game_id=response.game_id
        chat_id=response.chat_id
    }
    if(response.method==='create'){

    }
    if(response.method==='join'){
        
    }
    console.log(response)
}



setTimeout(()=>{
    console.log('connect request sent')
    const payload={
        method:'connect',
        user_id:user_id
    }
    client.send(JSON.stringify(payload))
}, 1000); 


//user2
setTimeout(()=>{
    console.log('join request sent')
    const payload={
        method:'join',
        user_id:user_id,
    }
    client.send(JSON.stringify(payload))
}, 1000); 

/*

game_id='6181074289195931dd5f1863' 
chat_id='6181074289195931dd5f1867'
/*
setTimeout(()=>{
    console.log('play request sent')
    const payload={
        method:'play',
        user_id:user_id,
        game_id:game_id,
        move:5
    }
    client.send(JSON.stringify(payload))
}, 1000);*/





