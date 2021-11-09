import {React,useState,useEffect} from 'react'
import TwoButtons from '../components/TwoButtons';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Card from '../components/Card';
import { Redirect } from 'react-router-dom';

function CreateJoinGame(props) {

    const [button1Disable, setButton1Disable] = useState(false);
    const [button2Disable, setButton2Disable] = useState(false);
    const [isJoinGame, setIsJoinGame] = useState(false);
    const [isCreateGame, setIsCreateGame] = useState(false);
    const [isX, setIsX] = useState(true);
    const [isSpinner, setIsSpinner] = useState(false);
    const [isRedirectToPlay, setIsRedirectToPlay] = useState(false);
    const [error, setError] = useState(props.wsConnectionError);

    const username=localStorage.getItem('username') || 'no username'
    const user_id=localStorage.getItem('user_id')

    props.client.onmessage = (message) =>{
        const response=JSON.parse(message.data)
        console.log(response)
        if(response.method==='join'){
            if(response.status!=200){
                setError(response.error)
                setButton1Disable(false)
                setButton2Disable(false)
                setIsSpinner(false)
                setIsJoinGame(false)
            }
            else{
                localStorage.setItem('game_id',response.game_id);
                localStorage.setItem('chat_id',response.chat_id);
                if(user_id===response.gamers.guest_gamer.user_id)//user is a game guest
                {
                    localStorage.setItem('sign',response.gamers.guest_gamer.sign);
                    localStorage.setItem('adv_sign',response.gamers.host_gamer.sign);
                    localStorage.setItem('adv_username',response.gamers.host_gamer.username);
                    localStorage.setItem('adv_user_id',response.gamers.host_gamer.user_id);
                    localStorage.setItem('is_host',false);
                }
                else{//the user created the game
                    localStorage.setItem('sign',response.gamers.host_gamer.sign);
                    localStorage.setItem('adv_sign',response.gamers.guest_gamer.sign);
                    localStorage.setItem('adv_username',response.gamers.guest_gamer.username);
                    localStorage.setItem('adv_user_id',response.gamers.guest_gamer.user_id);
                    localStorage.setItem('is_host',true);
                }
                setIsRedirectToPlay(true)
            }
        }
        if(response.method==='create'){
            if(response.status!=200){
                setError(response.error)
                setButton1Disable(false)
                setButton2Disable(false)
                setIsSpinner(false)
                setIsCreateGame(false)
            }
            else{
                localStorage.setItem('game_id',response.game_id);
                localStorage.setItem('chat_id',response.chat_id);
            }
        }
    }


    if(isRedirectToPlay)
        return <Redirect to={"/play"}/>
    
    const join_game=()=>{
        setButton1Disable(true)
        setButton2Disable(true)
        setIsJoinGame(true)
        setIsSpinner(true)
        if(props.client.readyState==1){
            const payload={
                method:'join',
                user_id:user_id,
            }
            props.client.send(JSON.stringify(payload))
        }
        else{
            setButton1Disable(false)
            setButton2Disable(false)
            setIsSpinner(false)
            setIsJoinGame(false)
            setError("not connected to websocket")
        }
    }
    
    
    const create_game=()=>{
        setButton1Disable(true)
        setButton2Disable(true)
        setIsCreateGame(true)
    }

    const confirmOnclick=()=>{
        setIsSpinner(true)
        if(props.client.readyState==1){
            console.log('create request sent')
            const payload={
                method:'create',
                user_id:user_id,
                sign: (isX ? 'X' : 'O')
            }
            props.client.send(JSON.stringify(payload))
        }
        else{
            setButton1Disable(false)
            setButton2Disable(false)
            setIsSpinner(false)
            setIsCreateGame(false)
            setError("not connected to websocket")
        }
    }


    return (
        <>
            <Card componentToPassDown={
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            <TwoButtons button1Text="Join game"  button1Disable={button1Disable} button2Disable={button2Disable} button2Text="Create Game" button1OnClick={join_game} button2OnClick={create_game}/>
                        </MDBCol>
                    </MDBRow>
                <MDBRow >
                    <MDBCol style={{height:'20px'}}></MDBCol>
                </MDBRow>
                {isCreateGame && 
                    <>
                    <MDBRow>
                        <MDBCol>
                            <button type="button" class="btn btn-outline-secondary btn-rounded" onClick={()=>setIsX(!isX)} data-mdb-ripple-color="dark" disabled={!isX}>
                                X
                            </button>
                            <button type="button" class="btn btn-outline-secondary btn-rounded" onClick={()=>setIsX(!isX)} data-mdb-ripple-color="dark" disabled={isX}>
                                O
                            </button>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <button type="button" class="btn btn-outline-secondary" data-mdb-ripple-color="dark" onClick={confirmOnclick}>
                                Confirm
                            </button>
                        </MDBCol>
                    </MDBRow>
                    </>
                }
                {isSpinner &&
                    <MDBRow >
                        <MDBCol>
                            <div class="spinner-border text-secondary" role="status">
                                <span class="visually-hidden"></span>
                            </div>
                        </MDBCol>
                    </MDBRow>
                }
                    <MDBRow >
                        <MDBCol style={{color:"red"}}>
                            {error}
                        </MDBCol>
                    </MDBRow>
            </MDBContainer>
            } 
            title={username} client={props.client}>    
            </Card>

        </>
    )
}


export default CreateJoinGame
