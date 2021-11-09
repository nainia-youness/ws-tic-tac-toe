import React,{useState,useEffect} from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import TicTacToeBut from './TicTacToeBut';

const stylingObject = {
    col: {
        paddingLeft:'0px',
        paddingRight:'0px',
        paddingTop:'0px',
        paddingDown:'0px'
    },
    container:{
        textAlign:'center',
        width:'500px',
    }
  }


function TicTacToe(props) {


    const adv_sign=localStorage.getItem('adv_sign')
    const sign=localStorage.getItem('sign')
    const user_id=localStorage.getItem('user_id')
    const adv_user_id=localStorage.getItem('adv_user_id')
    const is_host=localStorage.getItem('is_host')
    const game_id=localStorage.getItem('game_id')

    const [boxList,setBoxList]=useState(['_','_','_','_','_','_','_','_','_'])
    const [playerSign,setPlayerSign]=useState(sign)
    const [butsState,setButsState]=useState(['btn btn-outline-secondary','btn btn-outline-secondary',
        'btn btn-outline-secondary','btn btn-outline-secondary','btn btn-outline-secondary','btn btn-outline-secondary',
        'btn btn-outline-secondary','btn btn-outline-secondary','btn btn-outline-secondary'
    ])
    const [isPlayerTurn,setIsPlayerTurn]=useState(is_host=='false' ? false : true)
    const [isGameEnded,setIsGameEnded]=useState(false)
    const [endGameState,setEndGameState]=useState('')

    useEffect(()=>{
        props.setIsPlayerTurn(isPlayerTurn)
    },[isPlayerTurn])

    /*useEffect(()=>{
        setIsGameEnded(true)
        props.setIsGameEnded(true)
        setEndGameState('draw')
        props.setEndGameState('draw')
    },[])*/
   

    function setBoxState(boxIndex){
        if(isPlayerTurn && boxList[boxIndex]=='_' && !isGameEnded){
            let boxState
            if(boxList[boxIndex]=='_')
                boxState=playerSign
            else if(boxList[boxIndex]==playerSign)
                boxState=playerSign
            setBoxList(boxList=>({
                ...boxList,
                [boxIndex]: sign
             }))
            setIsPlayerTurn(false)
            const payload={
                method:'play',
                user_id:user_id,
                game_id:game_id,
                move:boxIndex
            }
            props.client.send(JSON.stringify(payload))
        }
    }


    useEffect(() => {
        if(props.updateResponse!=undefined){
            const response=props.updateResponse
        if(response.method==='update'){
            if(response.status!=200){
                console.log('not your turn')
            }
            else{
                const game_state=response.game_state
                if(game_state!=[]){
                    for(const i in game_state){
                        const state_move=game_state[i].move
                        const state_user_id=game_state[i].user_id
                        let state_user_sign
                        if(state_user_id==user_id)
                            state_user_sign=sign
                        else if(state_user_id==adv_user_id)
                            state_user_sign=adv_sign
                        if(boxList[state_move]!=state_user_sign){//the state is new 
                            setIsPlayerTurn(true)
                            setBoxList(boxList=>({
                                ...boxList,
                                [state_move]: state_user_sign
                             }))
                        }
                    }
                }
            }   
        }
        else if(response.method=='game_end'){
            if(response.status!=200){
                console.log('not your turn')
            }
            else{
                if(response.is_draw){
                    setButsState(["btn btn-primary","btn btn-primary","btn btn-primary","btn btn-primary","btn btn-primary",
                    "btn btn-primary","btn btn-primary","btn btn-primary","btn btn-primary"])
                    setEndGameState('draw')
                    props.setEndGameState('draw')
                }
                else{
                    if(response.winning_indexes){
                        let butState
                        if(user_id==response.end_game_state.winner_id){
                            butState='btn btn-outline-success'
                            setEndGameState('win')
                            props.setEndGameState('win')
                        }
                        else{
                            butState='btn btn-outline-danger'
                            setEndGameState('lose')
                            props.setEndGameState('lose')
                        }
                        const winning_indexes=response.winning_indexes
                        setButsState(butsState=>({
                            ...butsState,
                            [winning_indexes[0]]: butState,
                            [winning_indexes[1]]: butState,
                            [winning_indexes[2]]: butState
                        }))
                    }
                    else{
                        setEndGameState('win')
                        props.setEndGameState('win')
                        setButsState(['btn btn-outline-success','btn btn-outline-success','btn btn-outline-success','btn btn-outline-success',
                        'btn btn-outline-success','btn btn-outline-success','btn btn-outline-success','btn btn-outline-success','btn btn-outline-success'])
                    }
                }
                setIsGameEnded(true)
                props.setIsGameEnded(true)
            }
        }
        }
    }, [props.updateResponse])
    

    return (
        <>
            <MDBContainer style={stylingObject.container}>
                <MDBRow >
                    <MDBCol style={stylingObject.col}><TicTacToeBut isGameEnded={isGameEnded} onClick={() => setBoxState(0)} butState={butsState[0]} boxState={boxList[0]}/></MDBCol>
                    <MDBCol style={stylingObject.col}><TicTacToeBut isGameEnded={isGameEnded} onClick={() => setBoxState(1)} butState={butsState[1]}  boxState={boxList[1]}/></MDBCol>
                    <MDBCol style={stylingObject.col}><TicTacToeBut isGameEnded={isGameEnded} onClick={() => setBoxState(2)} butState={butsState[2]} boxState={boxList[2]}/></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol style={stylingObject.col}><TicTacToeBut isGameEnded={isGameEnded} onClick={() => setBoxState(3)} butState={butsState[3]} boxState={boxList[3]}/></MDBCol>
                    <MDBCol style={stylingObject.col}><TicTacToeBut  isGameEnded={isGameEnded} onClick={() => setBoxState(4)} butState={butsState[4]} boxState={boxList[4]}/></MDBCol>
                    <MDBCol style={stylingObject.col}><TicTacToeBut isGameEnded={isGameEnded} onClick={() => setBoxState(5)} butState={butsState[5]} boxState={boxList[5]}/></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol style={stylingObject.col} ><TicTacToeBut isGameEnded={isGameEnded} onClick={() => setBoxState(6)} butState={butsState[6]} boxState={boxList[6]}/></MDBCol>
                    <MDBCol style={stylingObject.col}><TicTacToeBut  isGameEnded={isGameEnded} onClick={() => setBoxState(7)} butState={butsState[7]}  boxState={boxList[7]}/></MDBCol>
                    <MDBCol style={stylingObject.col}><TicTacToeBut  isGameEnded={isGameEnded} onClick={() => setBoxState(8)} butState={butsState[8]}  boxState={boxList[8]}/></MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}

export default TicTacToe
