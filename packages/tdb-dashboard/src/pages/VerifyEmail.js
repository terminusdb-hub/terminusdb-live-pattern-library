import React,{useState} from "react"
import {Container, Button} from "react-bootstrap"
import { useAuth0 } from "../react-auth0-spa";

export const VerifyEmail = (props) => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    
    const redirect_uri=`${window.location.origin}`

    const logoutWithRedirect = () =>
    logout({
        returnTo: redirect_uri
    });
    return <Container className="h-100 d-flex justify-content-center">
        PLEASE VERIFY YOUR EMAIL BEFORE GOING ON!!!!!!!!!!!!!!!!!!
        <Button id = "qsLoginBtn"
            color = "primary"
            className = "btn-margin m-4"
            onClick = {logoutWithRedirect}>
            LOG OUT TEST....
        </Button>
    </Container>

}