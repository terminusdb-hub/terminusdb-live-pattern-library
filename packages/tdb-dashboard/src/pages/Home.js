import React,{useState} from "react"
import {Container, Button} from "react-bootstrap"
import { useAuth0 } from "../react-auth0-spa";

export const Home = (props) => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    
    const redirect_uri=`${window.location.origin}`

    const userName= user ? user['http://terminusdb.com/schema/system#agent_name'] : '';

    const loginToAuth0 = () =>{
        const path=`${window.location.origin}/products`;

        loginWithRedirect({returnTo: path})
    }

    const logoutWithRedirect = () =>
        logout({
            returnTo: redirect_uri
    });

    return <Container className="h-100 d-flex justify-content-center">
        {!isAuthenticated &&
        <Button id = "qsLoginBtn"
            color = "primary"
            className = "btn-margin m-4"
            onClick = {loginToAuth0}>
            LOG IN TEST....
        </Button>}
        {isAuthenticated &&  <Button id = "qsLoginBtn"
            color = "secondary"
            className = "btn-margin m-4"
            onClick = {logoutWithRedirect}>
            LOG OUT TEST....
        </Button>}
    </Container>

}