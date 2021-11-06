import React from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../css_pages/input_field.css'
function InputField(props) {
    return (
        <>
        <MDBContainer>
            <MDBRow >
                <MDBCol style={{fontSize:'25px'}}>
                    {props.title}
                </MDBCol> 
            </MDBRow>
            <MDBRow >
                <MDBCol style={{height:'20px'}}></MDBCol>
            </MDBRow>
            <MDBRow >
                <MDBCol></MDBCol>
                <MDBCol>
                <div class="form-outline">
                    <input type="text" id="form12" class="form-control" onChange={props.updateUsername}/>
                    <label class="form-label" for="form12">Username</label>
                </div>
                <div class="form-outline">
                    <label class="form-label" for="form12" id='error'>{props.error}</label>
                </div>
                </MDBCol> 
                <MDBCol></MDBCol>
            </MDBRow>
            <MDBRow >
                <MDBCol>
                    <button type="button" class="btn btn-secondary btn-rounded" onClick={props.confirmOnClick}>Confirm</button>
                </MDBCol> 
            </MDBRow>
        </MDBContainer>
        </>
    )
}

export default InputField
