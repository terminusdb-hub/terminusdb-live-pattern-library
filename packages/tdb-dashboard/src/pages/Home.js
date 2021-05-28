import React,{useState} from "react"
import {Container, Button} from "react-bootstrap"
import { useAuth0 } from "../react-auth0-spa";
import history from "../routing/history"

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

    const goToDash =()=>{
        history.push('/products')
    }

    return <Container className="h-100 d-flex justify-content-center"  style={{maxHeight:"200px"}}>
        {!isAuthenticated &&
        <Button id = "qsLoginBtn"
            className = "btn-margin m-4"
            onClick = {loginToAuth0}>
            LOG IN TEST....
        </Button>}
        {isAuthenticated &&  
        <React.Fragment>          
            <Button id = "qsLoginBtn"
                className = "btn-margin m-4 btn-warning"
                onClick = {logoutWithRedirect}>
                LOG OUT TEST....
            </Button>
            <Button id = "qsLoginBtn"
                className = "btn-margin m-4"
                onClick = {goToDash}>
                DASHBOARD
                </Button>
        </React.Fragment>
        }
    </Container>

}