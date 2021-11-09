const Websocket=require('ws');
const express = require('express');
const router=express.Router();
const Game= require('../models/game.js')
const Chat= require('../models/chat.js')
const User= require('../models/user.js')
const Connection= require('../models/connection.js')
const {db}  = require ('../config/Database_config.js');


/**
 * @swagger
 * /api/connect:
 *  get:
 *      summary: connect the user to the websocket server
 *      responses:
 *          200:
 *              description: return confirmation
 *              content: application/json
*/
//you can add tags (like tag book where all the routes of book are)


let clients={}



router.ws('/', function(ws, req) {

    ws.on('connection', function(msg) {
        console.log(msg)
        console.log('i am connected')
      });
    ws.on('message', function(msg) {// accept request from user
        const result=JSON.parse(msg)
        console.log(result)
        const user_id=result.user_id
        handle_connection_changes(ws,user_id)
        if(result.method==='connect'){
            add_connection(ws,user_id)
        }
        else if(result.method==='create'){
            const sign=result.sign
            add_game_and_chat(ws,user_id,sign)
        }
        else if(result.method==='available'){
            const game_id=result.game_id
            update_game_is_available(ws,user_id,game_id)
        }
        else if(result.method==='join'){
            look_for_available_game_and_broadcast(ws,user_id)
        }
        else if(result.method==='chat'){
            const chat_id=result.chat_id
            const content=result.content
            add_chat(ws,user_id,chat_id,content)
        }
        else if(result.method==='play'){
            const game_id=result.game_id
            const move=result.move
            add_move(ws,user_id,game_id,move)
        }
        else if(result.method==='close'){
            const game_id=result.game_id
            const chat_id=result.chat_id
            remove_client(ws,user_id,game_id,chat_id)
        }
      });
    ws.on('close', function(msg) {
        console.log('user closed connection with no warning')
      });
  });

const handle_connection_changes = (ws,user_id)=>{
    if(clients[user_id]){//if connection exist
        if(clients[user_id] != ws)//connection has changed
            clients[user_id]=ws
    }
}

const update_game_is_available=async (ws,user_id,game_id)=>{
    try{
        const filter = {$or:[{ _id: game_id,host_gamer_id:{user_id:user_id,sign:'X'}},{ _id: game_id,host_gamer_id:{user_id:user_id,sign:'O'}}]};//:TODO
        const update = { is_available: true };
        const game= await Game.findOneAndUpdate(filter,update)
        if(!game) throw Error('game not found')
        ws.send(JSON.stringify({
            method:'available',
            message:'game is available',
            status:'200'
        }));
    }
    catch(err){
        ws.send(JSON.stringify({
            method:'available',
            status:500,
            error:err.message
        }))
    }
}


const remove_client= async(ws,user_id,game_id,chat_id)=>{
    try{
        //remove game
        const game= await Game.deleteOne({_id:game_id})
        //remove chat
        const chat= await Chat.deleteOne({_id:chat_id})
        //remove connection from client list
        delete clients[user_id];

        ws.send(JSON.stringify({
            method:'close',
            status:200,
            message:'game ended'
        }))
    }
    catch(err){
        ws.send(JSON.stringify({
            method:'close',
            status:500,
            error:err.message
        }))
    }
}


const add_chat= async(ws,user_id,chat_id,content)=>{
    try{
        const filter = {_id:chat_id};
        const update = {$push: { state: {user_id : user_id,content : content}  }};
        const chat= await Chat.findOneAndUpdate(filter,update)
        //no response
    }
    catch(err){
        ws.send(JSON.stringify({
            method:'chat',
            status:500,
            error:err.message
        }))
    }
}

const add_move= async(ws,user_id,game_id,move)=>{
    try{
        const filter={_id:game_id}
        const game= await Game.findOne(filter)
        if(!game) throw Error('game not found')
        if(game.state.length!=0){
            const is_last_move_from_this_user=game.state[game.state.length - 1].user_id===user_id
            if(is_last_move_from_this_user)
                throw Error('not users turn')
        }
        const is_in_game=(user_id==game.host_gamer_id.user_id || user_id==game.guest_gamer_id.user_id)
        if(!is_in_game){
            throw Error('user not in the game')
        }
        const update={$push: { state: {user_id : user_id,move : move} }}
        const updated_game= await Game.findOneAndUpdate({_id:game_id},update)
        //no response
    }
    catch(err){
        ws.send(JSON.stringify({
            method:'play',
            status:500,
            error:err.message
        }))
    }
}

const is_game_ended =(game_state,gamer1_id,gamer2_id)=>{

    if(game_state.length<5)
        return undefined
    const winning_combinations=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]]
    let boxList=['_','_','_','_','_','_','_','_','_']
    //add to boxList ex => ['u1', '_',  'u2','u2', 'u2', '_','u1', 'u1', 'u1']
    for(const i in game_state){
            const move= game_state[i].move
            if(game_state[i].user_id==gamer1_id){
                boxList[move]=gamer1_id
        }
        else if(game_state[i].user_id==gamer2_id){
            boxList[move]=gamer2_id
        }
    }
    //check if someone won
    for(const i in winning_combinations){
            const index1=winning_combinations[i][0]
            const index2=winning_combinations[i][1]
            const index3=winning_combinations[i][2]

            if(boxList[index1]!='_' && boxList[index1]==boxList[index2] && boxList[index1]==boxList[index3]){
                let is_host_won=false
                if(boxList[index1]==gamer1_id){
                    is_host_won=true                        
                }
                else{
                    is_host_won=false
                }
                const winner_id= is_host_won ? gamer1_id : gamer2_id
                const loser_id=  !is_host_won ? gamer1_id : gamer2_id
                return {
                        method:"game_end",
                        is_draw:false,
                        status:200,
                        winning_indexes:[index1,index2,index3],
                        end_game_state:{
                            winner_id:winner_id,
                            loser_id:loser_id
                        }
                }
            }
    }
    if(game_state.length==9)
        return {
            method:"game_end",
            status:200,
            is_draw:true
        }
    else{
        return undefined
    }
}


const update_game_state =async (game_id,chat_id,host_id,guest_id)=>{

    const host_connection=clients[host_id] 
    const guest_connection= clients[guest_id]
    try{
        if(!host_connection || !guest_connection) throw Error('players not connected')
        const game= await Game.findOne({_id:game_id})
        const chat= await Chat.findOne({_id:chat_id})
        if(!chat) throw Error('chat not found')
        if(!game) throw Error('game not found')
        const payload={
            method:'update',
            status:'200',
            game_state:game.state,
            chat_state:chat.state
        }

        host_connection.send(JSON.stringify(payload));
        guest_connection.send(JSON.stringify(payload));
        let is_game_end = is_game_ended (game.state,host_id,guest_id);
        
        if( is_game_end !=undefined){//game ended
            host_connection.send(JSON.stringify(is_game_end));
            guest_connection.send(JSON.stringify(is_game_end));
            return;
        }
    }
    catch(err){
        if(err.message=='players not connected'){
            if(!host_connection && guest_connection){
                //delete game/chat
                //send to guest that he won
            }
            else if(!guest_connection && host_connection){
                //delete game/chat
                //send to host that he won
            }
            else if(!host_connection && !guest_connection){
                //delete game/chat
            }
        }
        console.log(err)
        const error={
            method:'update',
            status:500,
            error:err.message
        }
        host_connection.send(JSON.stringify(error));
        guest_connection.send(JSON.stringify(error));
        return;
    }
    setTimeout(() => {update_game_state(game_id,chat_id,host_id,guest_id)},100)//called every 500 ms

}

const add_connection =async (ws,user_id)=>{
    try {
        clients[user_id]=ws
        //TODO: Store user connection in database
       /* const connection= new Connection({
            user_id:user_id,
            connection:ws
        })
        const saved_connection= await connection.save()*/
        ws.send(JSON.stringify({
            method:'connect',
            message:'user connected',
            status:'200'
        }));
    }
    catch(err){
        ws.send(JSON.stringify({
            method:'connect',
            status:500,
            error:err.message
        }))
    }
}



const look_for_available_game_and_broadcast=async (ws,user_id)=>{
    try{
        const filter={is_available:true}
        const game= await Game.findOne(filter)
        if(!game) throw Error('game not found')
        const update={is_available:false,guest_gamer_id:{user_id:user_id,sign:inverse_sign(game.host_gamer_id.sign)}}
        const updated_game= await Game.findOneAndUpdate({_id:game._id},update)
        const chat= await Chat.findOne({game_id:game._id})
        if(!chat) throw Error('chat not found')
        //find connections
        const host_connection=clients[updated_game.host_gamer_id.user_id] 
        const guest_connection= clients[user_id]
        //TODO: Get user connection in database
        /*const host_connection= await Connection.findOne({user_id:updated_game.host_gamer_id.user_id})
        const guest_connection= await Connection.findOne({user_id:user_id})*/
        if(!host_connection || !guest_connection) throw Error('connection not found')

        const guest_id=user_id
        const host_id=updated_game.host_gamer_id.user_id
        const guest_user= await User.findOne({_id:guest_id})
        const host_user= await User.findOne({_id:host_id})
        if(!guest_user || !host_user){
            throw Error('users not found')
        }
        const gamers={
            host_gamer:{
                user_id:host_id,
                sign:updated_game.host_gamer_id.sign,
                username:host_user.username
            },
            guest_gamer:{
                user_id:guest_id,
                sign:inverse_sign(game.host_gamer_id.sign),
                username:guest_user.username
            }
        }


        //send request
        const payload={
            method:'join',
            game_id:updated_game._id,
            chat_id:chat._id,
            gamers:gamers,
            message:'game start',
            status:'200'
        }

        host_connection.send(JSON.stringify(payload))
        guest_connection.send(JSON.stringify(payload))

        //TODO: Send message to users
        //host_connection.connection.send(JSON.stringify(payload))
        //guest_connection.connection.send(JSON.stringify(payload))
  
        update_game_state(updated_game._id,chat._id,host_id,guest_id)
    }
    catch(err){
        ws.send(JSON.stringify({
            method:'join',
            status:500,
            error:err.message
        }))
    }
}

const add_game_and_chat=async (ws,user_id,sign)=>{
    const game= new Game({
        is_available:true,//or false if you add available request
        host_gamer_id:{user_id:user_id,sign:sign},
        guest_gamer_id:{},
        state:[]
    })
    try{
        const saved_game= await game.save()
        const chat= new Chat({
            game_id:saved_game._id,
            state:[]
        })
        const saved_chat= await chat.save()
        ws.send(JSON.stringify({
            method:'create',
            status:200,
            game_id:saved_game._id,
            chat_id:saved_chat._id
        }))
    }
    catch(err){
        ws.send(JSON.stringify({
            method:'create',
            status:500,
            error:err.message
        }))
    }
}

const inverse_sign=(host_gamer_sign)=>{
    if(host_gamer_sign=='O')
        return 'X'
    return 'O'
}

module.exports=router
