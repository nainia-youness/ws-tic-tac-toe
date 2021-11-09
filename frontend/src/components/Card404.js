import {React,useState} from 'react'
import { Redirect} from 'react-router-dom';

function Card404() {

    const [isGoCreateJoinGame, setIsGoCreateJoinGame] = useState(false);
    const [isGoSignInSignUp, setIsGoSignInSignUp] = useState(false);
    
    const goCreateJoinGame=()=>{
        setIsGoCreateJoinGame(true)
    }

    const goSignInSignUp=()=>{
        setIsGoSignInSignUp(true)
    }

    if(isGoCreateJoinGame)
        return <Redirect to={"/createJoinGame"}/>
    if(isGoSignInSignUp)
        return <Redirect to={"/signInSignUp"}/>

    return (
        <>
                <div style={{backgroundColor:'#D2B4DE'}} >
                                <div class="card-body">
                                <h5 class="card-title" style={{color:"black",fontSize:"200px"}}>404</h5>
                                <p class="card-text" style={{color:"white",fontSize:"50px"}}>
                                    Page Not Found
                                </p>
                                {localStorage.getItem('user_id') && 
                                    <button type="button" class="btn btn-outline-secondary" data-mdb-ripple-color="dark" onClick={goCreateJoinGame}>
                                        Create Join Game
                                    </button>
                                }
                                {!localStorage.getItem('user_id') && 
                                    <button type="button" class="btn btn-outline-secondary" data-mdb-ripple-color="dark" onClick={goSignInSignUp}>
                                        Sign in Sign up
                                    </button>
                                }
                                </div>
                                </div>
        </>
    )
}

export default Card404
