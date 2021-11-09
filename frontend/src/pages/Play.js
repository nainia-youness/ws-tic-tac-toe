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
    const [isPlayerTurn,setIsPlayerTurn]=useState(is_host=='false' ? false : true)
    const [isGameEnded,setIsGameEnded]=useState(false)
    const [endGameState,setEndGameState]=useState('')

    const [endGameCardBgColor,setEndGameCardBgColor]=useState("")
    const [endGameCardMessage,setEndGameCardMessage]=useState("")
    const [endGameCardColor,setEndGameCardColor]=useState("")
    const [isGoHome, setIsGoHome] = useState(false);

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
    
 

    useEffect(()=>{
        if(endGameState=='win'){
            setEndGameCardBgColor('#81C784')
            setEndGameCardMessage('YOU WON')
            setEndGameCardColor('green')
        }
        else if(endGameState=='lose'){
            setEndGameCardBgColor('#EF9A9A')
            setEndGameCardMessage('YOU LOST')
            setEndGameCardColor('red')
        }
        else if(endGameState=='draw'){
            setEndGameCardBgColor('#90CAF9')
            setEndGameCardMessage('DRAW')
            setEndGameCardColor('blue')
        }
    },[endGameState])

    const goHome =()=>{
        //clear localstorage, except username and user_id
        const username=localStorage.getItem('username')
        const user_id=localStorage.getItem('user_id')
        const payload={
            method:'disconnect',
            user_id:localStorage.getItem('user_id'),
            game_id:localStorage.getItem('game_id'),
            chat_id:localStorage.getItem('chat_id'),
        }
        props.client.send(JSON.stringify(payload))
        localStorage.clear();
        localStorage.setItem('username',username);
        localStorage.setItem('user_id',user_id);   
        setIsGoHome(true)
    }

    
    if(isGoHome)
        return <Redirect to={"/createJoinGame"}/>

    return (
        <>  
        <Card componentToPassDown={
            <MDBContainer>
                {isGameEnded &&
                <MDBRow >
                    <MDBCol>
                    <div class="card text-center" style={{backgroundColor:endGameCardBgColor}}>
                        <div class="card-body">
                            <h5 class="card-title">
                                <span style={{fontSize:"30px",color:endGameCardColor}}>{endGameCardMessage}</span> 
                            </h5>
                            <button type="button" class="btn btn-outline-secondary" data-mdb-ripple-color="dark" onClick={goHome}>
                                Home
                            </button>
                        </div>
                        </div>
                    </MDBCol>
                </MDBRow>
                }

                <MDBRow >
                    <MDBCol>
                        <TicTacToe  client={props.client} updateResponse={updateResponse} setIsGameEnded={setIsGameEnded} setEndGameState={setEndGameState} setIsPlayerTurn={setIsPlayerTurn} />
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
                        <ChatRoom isGameEnded={isGameEnded} client={props.client} updateResponse={updateResponse}/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        } 
        title={username} sign={sign} isPlayerTurn={isPlayerTurn} client={props.client}></Card>         
        </>
    )
}