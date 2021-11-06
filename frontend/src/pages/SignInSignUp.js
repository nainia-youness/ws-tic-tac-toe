import {React,useState} from 'react'
import TwoButtons from '../components/TwoButtons';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Card from '../components/Card';
import { Redirect } from 'react-router-dom';

export default function signInSignUp() {

    const [isSignUpRedirect, setIsSignUpRedirect] = useState(false);
    const [isSignInRedirect, setIsSignInRedirect] = useState(false);

    const sign_up=()=>{
        setIsSignUpRedirect(true)
    }

    const sign_in=()=>{
        setIsSignInRedirect(true)
    }

    if (isSignUpRedirect) {
        return <Redirect to={"/signUp"}/>
    }
    if (isSignInRedirect) {
        return <Redirect to={"/signIn"}/>
    }

    return (
        <>   
        <MDBContainer>
        <MDBRow>
            <MDBCol>
                <Card componentToPassDown={<TwoButtons button1Text="Sign Up"  button2Text="Sign In" button1OnClick={sign_up} button2OnClick={sign_in}/>} title=""></Card>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
        </>
    )
}
