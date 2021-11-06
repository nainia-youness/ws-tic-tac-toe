//const Websocket=require('Websocket')
const ws = require('ws');
const client = new ws('ws://localhost:4000/websocket');
//inputs from the client
//user1 Yahia
const user_id="618064966c964b4ec342416c"


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
