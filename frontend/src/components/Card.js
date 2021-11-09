import {React,useState} from 'react'
import { MDBContainer, MDBRow, MDBCol ,MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import arrow from '../images/arrow.png';
import { Redirect,useLocation } from 'react-router-dom';

function Card(props) {


    const [isGoHome, setIsGoHome] = useState(false);
    const [isDisconnect, setIsDisconnect] = useState(false);

    const Disconnect=()=>{
        console.log('disconnected')
        const payload={
            method:'disconnect',
            user_id:localStorage.getItem('user_id'),
            game_id:localStorage.getItem('game_id'),
            chat_id:localStorage.getItem('chat_id'),
        }
        props.client.send(JSON.stringify(payload))
        localStorage.clear();
        setIsDisconnect(true)
    }
    const location = useLocation();

    
    const GoHome=()=>{
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
        if(location.pathname!='/createJoinGame')
            setIsGoHome(true)
    }

    if(isGoHome)
        return <Redirect to={"/createJoinGame"}/>
    if(isDisconnect)
        return <Redirect to={"/signInSignUp"}/>

    return (
        <>
            <MDBContainer >
                <MDBRow >
                    <MDBCol style={{height:'150px'}}></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <div class="card text-center" style={{backgroundColor:'#E8DAEF'}}>
                        <div class="card-header">TIC TAC TOE</div>
                        <div class="card-body">
                            <h5 class="card-title">
                                {props.isPlayerTurn && <img src={arrow} alt="arrow image" style={{width:'25px',height:"25px"}}/>}

                                {props.title && <>
                                    <MDBDropdown>
                                <MDBDropdownToggle caret color="link" style={{fontSize:"18px",textDecoration:"none"}}>
                                   {props.title}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu basic>
                                    <MDBDropdownItem onClick={()=>GoHome()}>
                                         Home
                                    </MDBDropdownItem>
                                    <MDBDropdownItem onClick={()=>Disconnect()}>
                                         Disconnect
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                                </MDBDropdown>
                                </>}

                            </h5>
                            <h5 class="card-title">{props.sign}</h5>
                            <p class="card-text">
                                {props.componentToPassDown}  
                            </p>
                        </div>
                        </div>
                    </MDBCol>
                </MDBRow>
        </MDBContainer>
        </>
    )
}

export default Card
