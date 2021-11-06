import React from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

function TwoButtons(props) {
    return (
        <MDBContainer>
            <MDBRow >
                <MDBCol>
                    <button type="button" class="btn btn-secondary btn-rounded" onClick={props.button1OnClick} disabled={props.button1Disable || false}>{props.button1Text}</button>
                </MDBCol> 
            </MDBRow>
            <MDBRow >
                <MDBCol style={{height:'20px'}}></MDBCol>
            </MDBRow>
            <MDBRow >
                <MDBCol>
                    <button type="button" class="btn btn-secondary btn-rounded" onClick={props.button2OnClick} disabled={props.button2Disable || false}>{props.button2Text}</button>
                </MDBCol> 
            </MDBRow>
        </MDBContainer>
    )
}
export default TwoButtons
