import Card from '../components/Card';
import React from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Card404 from '../components/Card404';

function PageNotFound() {
    return (
        <>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <Card componentToPassDown={
                            <Card404></Card404>
                        } title={localStorage.getItem('username')}></Card>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>  
        </>
    )
}

export default PageNotFound
