import React,{useState} from "react"
import {Container, Button} from "react-bootstrap"
import { useAuth0 } from "../react-auth0-spa";
import history from "../routing/history"

export const VerifyEmail = (props) => { 
    const goHome = () =>{
        history.push('/')
    }
   
    return <Container className="text-warning h-100 d-flex flex-column align-items-center justify-content-center">
        <h1>PLEASE VERIFY YOUR EMAIL BEFORE GOING ON!!!</h1>
        <Button id = "qsLoginBtn"
            color = "primary"
            className = "btn-margin m-4 p-4"
            onClick = {goHome}>
            HOME PAGE
        </Button>
    </Container>

}