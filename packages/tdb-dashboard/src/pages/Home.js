import React,{useState} from "react"
import {Container, Button} from "react-bootstrap"
import { MdCopyright } from "react-icons/md";
import { useAuth0 } from "../react-auth0-spa";
import history from "../routing/history"

export const Home = (props) => {
    const { user, isAuthenticated, loginWithRedirect, logout,loginWithPopup } = useAuth0();
    
    let redirect_uri=`${window.location.origin}/${process.env.REACT_APP_BASE_ROUTER}`

    const userName= user ? user['http://terminusdb.com/schema/system#agent_name'] : '';

    const loginToAuth0 = () =>{
        const path="http://localhost:3030/my_product_test?refid=testttjdfjlfwkeowo3ponvjgie4u3iw&team=team0" //`${window.location.origin}/my_product_test?refid=jdfjlfwkeowo3ponvjgie4u3iw%26team=team01`;
        //loginWithPopup()
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