import {React,useState,useEffect} from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Chat from './Chat';

function ChatRoom(props) {

    const user_id=localStorage.getItem('user_id')
    const chat_id=localStorage.getItem('chat_id')
    const username=localStorage.getItem('username')
    const adv_username=localStorage.getItem('adv_username')

    const [chatRoom,setChatRoom]=useState([])
    const [chat,setChat]=useState('')

    const sendChat=()=>{//ca marche
        const payload={
            method:'chat',
            user_id:user_id,
            chat_id:chat_id,
            content:chat
        }
        props.client.send(JSON.stringify(payload))
        setChat('')
    }


    useEffect(()=>{
        if(props.updateResponse!=undefined){
            if(props.updateResponse.method==='update'){
                if(props.updateResponse.status!=200){
                    
                }
                else{
                    if(props.updateResponse.chat_state!=[]){
                        setChatRoom(props.updateResponse.chat_state)
                    }
                }   
            }
        }
    },[props.updateResponse])

    const updateChat=(e)=>{
        setChat(e.target.value)
    }

    return (
        <>
            <MDBContainer >
                <MDBRow>
                    <MDBCol>
                        <div class="card text-center" style={{backgroundColor:'#D2B4DE'}}>
                        <div class="card-header">CHAT ROOM</div>
                        <div class="card-body">
                            <p class="card-text">
                                {chatRoom.map((chat) => (
                                    <Chat username={chat.user_id==user_id ? username : adv_username} content={chat.content} status="chat"/>
                                ))}
                                <br/>
                                <Chat username="username1" status="writeChat" isGameEnded={props.isGameEnded} chat={chat} updateChat={updateChat} sendChat={sendChat}/>
                            </p>
                        </div>
                        </div>
                    </MDBCol>
                </MDBRow>
        </MDBContainer>
        </>
    )
}

export default ChatRoom
