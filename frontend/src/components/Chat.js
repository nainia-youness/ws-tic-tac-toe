import React from 'react'
import '../css_pages/chat.css'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
function Chat(props) {

    return (
        <>
         <MDBContainer >
                <MDBRow>
                    <MDBCol sm="2">
                        {props.status=="chat" &&
                                <div class="card text-center" style={{ backgroundColor:'#E8DAEF'}}>
                                <div class="card-body">
                                    <p class="card-text">
                                        <span class="username">{props.username}</span>             
                                    </p>
                                </div>
                            </div>
                        }
                        {props.status=="writeChat" &&
                        <>
                            <div style={{height:"10px"}}></div>
                            <button style={{textAlign:"left"}} onClick={()=>props.sendChat()} type="button" class="btn btn-outline-secondary" data-mdb-ripple-color="dark" disabled={props.isGameEnded}>
                                Send
                            </button> 
                        </>
                        }
                    </MDBCol>
                    <MDBCol>
                        {props.status=="chat" &&
                            <div class="card text-center" style={{backgroundColor:'#E8DAEF'}}>
                                <div class="card-body">
                                    <p class="card-text">
                                        <span class="content">{props.content}</span>                
                                    </p>
                                </div>
                            </div>
                        }
                        {props.status=="writeChat" &&
                            <div class="card text-center" style={{backgroundColor:'#E8DAEF',height:"80px"}} >
                                <div class="card-body">
                                    <p class="card-text">
                                        <div class="form-outline">
                                            <input type="text" id="form12" value={props.chat} class="form-control" onChange={e => props.updateChat(e)} disabled={props.isGameEnded}/>
                                        </div>

                                    </p>
                                </div>
                            </div>
                        }
                    </MDBCol>
                </MDBRow>
        </MDBContainer>

        </>
    )
}

export default Chat
