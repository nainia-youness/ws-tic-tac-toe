import {React,useState,useEffect} from 'react'
import TicTacToe from '../components/TikTacToe';
import { MDBContainer, MDBRow, MDBCol , MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import Card from '../components/Card';
import ChatRoom from '../components/ChatRoom';
import arrow from '../images/arrow.png';

export default function Play(props) {
    const user_id=localStorage.getItem('user_id')
    const game_id=localStorage.getItem('game_id')
    const username=localStorage.getItem('username')
    const adv_username=localStorage.getItem('adv_username')
    const adv_user_id=localStorage.getItem('adv_user_id')
    const adv_sign=localStorage.getItem('adv_sign')
    const sign=localStorage.getItem('sign')
    const is_host=localStorage.getItem('is_host')
    const [boxList,setBoxList]=useState(['_','_','_','_','_','_','_','_','_'])
    const [isPlayerTurn,setIsPlayerTurn]=useState(is_host=='false' ? false : true)

    const [modal,setModal]=useState(false)
    const [showModal,setShowModal]=useState(false)



    const [updateResponse,setUpdateResponse]=useState(undefined)
    props.client.onmessage = (message) =>{
        const response=JSON.parse(message.data)
        console.log(response)
        if(response.method==='update'){
            setUpdateResponse(response)
        }
        if(response.method==='game_end'){
            setUpdateResponse(response)
        }
    }

    const toggle = () => {
        setModal(!modal)
    }

    return (
        <>   
        <Card componentToPassDown={
            <MDBContainer>
                <MDBRow >
                    <MDBCol>
                        <TicTacToe  client={props.client} updateResponse={updateResponse} setIsPlayerTurn={setIsPlayerTurn} setBoxList={setBoxList}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow >
                    <MDBCol style={{height:"50px"}}>
                    </MDBCol>
                </MDBRow>
                <MDBRow >
                    <MDBCol>
                        {!isPlayerTurn && <img src={arrow} alt="arrow image" style={{width:'25px',height:"25px"}}/>}
                        vs {adv_username}
                    </MDBCol>
                </MDBRow>
                <MDBRow >
                    <MDBCol>
                        {adv_sign}
                    </MDBCol>
                </MDBRow>
                <MDBRow >
                    <MDBCol>
                        <ChatRoom client={props.client} updateResponse={updateResponse}/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        } 
        title={username} sign={sign} isPlayerTurn={isPlayerTurn}></Card>         
        </>
    )
}//setChatRoom={setChatRoom}
/*
                <MDBRow >
                    <MDBCol>
                        <MDBBtn onClick={()=>setModal(true)}>Modal</MDBBtn>
                        <MDBModal isOpen={modal} toggle={()=>setModal(!modal)}>
                            <MDBModalHeader toggle={()=>setModal(!modal)}>Result</MDBModalHeader>
                            <MDBModalBody>
                            (...)
                            </MDBModalBody>
                            <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={()=> setModal(!modal)}>Close</MDBBtn>
                            <MDBBtn color="primary">Save changes</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBCol>
                </MDBRow>

*/