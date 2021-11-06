import {React,useState} from 'react'
import Card from '../components/Card';
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import InputField from '../components/InputField';
import { Redirect } from 'react-router-dom';

function SignUp(props) {

    const [error, setError] = useState(props.wsConnectionError);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);
    
    const updateUsername=(e)=>{
        setUsername(e.target.value)
    }

    const confirmOnClick=async()=>{
        try{
            const response=await axios.post('http://localhost:8080/api/user/sign_up', {username:username})
            const data=response.data
            console.log(data)
            if(!data) throw Error('')
            if(response.status!=200) throw Error('')
            if(!data.user_id) throw Error('')
            setUserId(data.user_id)
            localStorage.setItem('username',username);
            localStorage.setItem('user_id',data.user_id);
            if(props.client.readyState==1){
                const payload={
                    method:'connect',
                    user_id:data.user_id
                }
                props.client.send(JSON.stringify(payload))
            }
            else{
                setError("not connected to websocket")
            }
        }
        catch(err){
            console.log(err)
            setError(err.message)
        }
    }
    
    props.client.onmessage = (message) =>{
        const response=JSON.parse(message.data)
        if(response.method==='connect'){
            if(response.status!=200){
                setError(response.error)
            }
            else{
                if(props.client.readyState==1){
                    setIsRedirect(true)
                }
            }
        }
    }

    if(isRedirect){
        return <Redirect to={"/createJoinGame"}/>
    }


    return (
        <>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <Card componentToPassDown={<InputField title="SIGN UP" error={error} updateUsername={updateUsername}  confirmOnClick={confirmOnClick} />} title={localStorage.getItem('username')}></Card>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>  
        </>
    )
}

export default SignUp
