import React from "react"
import {PROFILE_ROUTE} from "./constants"
import {AiOutlineUser, AiOutlinePoweroff} from "react-icons/ai"
import {Button, ButtonGroup, Dropdown, Form} from 'react-bootstrap';
import { useAuth0 } from "../react-auth0-spa";
import {Nav,Navbar} from "react-bootstrap"
import {NewDataProduct} from "./NewDataProduct"
import {TimeTravelWidget} from "./TimeTravelWidget"
import {WOQLClientObj} from '../init-woql-client'
import {PROFILE} from "../routing/constants"
import {NavLink as RouterNavLink} from "react-router-dom"

export const MainNavBar = ({setShowTimeTravel}) => {
    const { user, isAuthenticated, logout } = useAuth0()
    const {dataProduct, setRoute} = WOQLClientObj()
    const base_url =process.env.REACT_APP_BASE_ROUTER || ''

    let profile_arg = `?console=console`

    const base_router = process.env.REACT_APP_BASE_ROUTER ||  '';
    const redirect_uri=`${window.location.origin}/${base_router}`

    const logoutWithRedirect = () =>
        logout({
            returnTo:redirect_uri
    })

    return <Navbar className="navbar-dark bg-dark p-0">           
        <div className="d-flex flex-grow-1 justify-content-end align-items-center">         
        
            {dataProduct && <TimeTravelWidget setShowTimeTravel={setShowTimeTravel}/>}  

            <NewDataProduct css={"btn-sm"}/>

            {user && <Dropdown  as={ButtonGroup} className="me-2 mt-1">
                <Button size="sm" className="bg-transparent border-0">
                    <img src={user.picture}
                        alt={"Profile"}
                        className="nav__main__profile__img"
                        width="50"/>
                </Button>

                <Dropdown.Toggle split className="bg-transparent border-0" vairant="info">
                </Dropdown.Toggle>

                <Dropdown.Menu vairant="info">
                   {/* <Dropdown.Item onClick={(e) => setRoute(PROFILE)}>
                        <AiOutlineUser className="mr-3 mb-1" />{"Profile"}
                    </Dropdown.Item>*/}
                    <Nav.Item>
                        <Nav.Link  as={RouterNavLink}
                            title={"View Profile Page"}  
                            className="dropdown-item"
                            to={PROFILE} 
                            exact
                            onClick={(e) => setRoute(PROFILE)}
                            id={"Profile"}>
                                <AiOutlineUser className="mr-3 mb-1" />Profile
                        </Nav.Link>
                    </Nav.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="nav-link" onClick={(e) => logoutWithRedirect()}>
                        <AiOutlinePoweroff className="mr-3 mb-1" />
                        {"Logout"}
                    </Dropdown.Item>
                </Dropdown.Menu>

            </Dropdown>}
        </div>   
    </Navbar>
}

