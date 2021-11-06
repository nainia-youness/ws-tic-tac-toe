//-------------------------send requests to server
const ws = require('ws');

//const Websocket=require('Websocket')

const client = new ws('ws://localhost:8080/websocket');
//inputs from the client
//user1 game host omar
const user_id="617db1068838627ab71fc3c9"


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
        //start playing
    }
    if(response.method==='play'){
        
    }
    if(response.method==='chat'){
        
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



//user1
setTimeout(()=>{
    console.log('create request sent')
    const payload={
        method:'create',
        user_id:user_id,
        sign:'X'
    }
    client.send(JSON.stringify(payload))
}, 2000);



/*
//user 1
game_id='6181074289195931dd5f1863' 
chat_id='6181074289195931dd5f1867'

setTimeout(()=>{
    console.log('available request sent')
    const payload={
        method:'available',
        user_id:user_id,
        game_id:game_id
    }
    client.send(JSON.stringify(payload))
}, 1000);



//user 1
setTimeout(()=>{
    console.log('chat request sent')
    const payload={
        method:'chat',
        user_id:user_id,
        chat_id:chat_id,
        content:"hello i'm Omar"
    }
    client.send(JSON.stringify(payload))
}, 60*1000);


/*
setTimeout(()=>{
    console.log('play request sent')
    const payload={
        method:'play',
        user_id:user_id,
        game_id:game_id,
        move:4
    }
    client.send(JSON.stringify(payload))
}, 1000);
*/


/*

setTimeout(()=>{
    console.log('close request sent')
    const payload={
        method:'close',
        user_id:user_id,
        chat_id:chat_id,
        game_id:game_id,
    }
    client.send(JSON.stringify(payload))
}, 1000);*/