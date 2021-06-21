import React from "react"
import {PROFILE_ROUTE} from "./constants"
import {AiOutlineUser, AiOutlinePoweroff} from "react-icons/ai"
import {Button, ButtonGroup, Dropdown, Form} from 'react-bootstrap';
import { useAuth0 } from "../react-auth0-spa";
import {Nav,Navbar} from "react-bootstrap"
import { NavLink as RouterNavLink } from "react-router-dom"
import {CurrentDataProductState} from "./CurrentDataProductState"

export const MainNavBar = (props) => {
    const { user, isAuthenticated, logout } = useAuth0();
    
    let profile_arg = `?console=console`


    const logoutWithRedirect = () =>
        logout({
            returnTo: window.location.origin
    })


    /*
    <Nav className="mr-auto">
                <CurrentDataProductState/>
            </Nav>
            */


    return <Navbar className="navbar-dark bg-dark p-0">
            
            <div className="d-flex flex-grow-1 justify-content-end">         
            <form className="d-flex align-items-end">              
                <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>              
            </form>
            {user && <Dropdown  as={ButtonGroup} className="me-2 mb-2">
                <Button size="sm" className="bg-transparent border-0">
                    <img src={user.picture}
                            alt={"Profile"}
                            className="nav__main__profile__img"
                            width="50"/>
                </Button>

                <Dropdown.Toggle split className="bg-transparent border-0" vairant="info">
                </Dropdown.Toggle>

                <Dropdown.Menu vairant="info">
                    <Dropdown.Item href={PROFILE_ROUTE+profile_arg}>
                        <AiOutlineUser className="mr-3 mb-1" />{"Profile"}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={(e) => logoutWithRedirect()}>
                        <AiOutlinePoweroff className="mr-3 mb-1" />
                        {"Logout"}
                    </Dropdown.Item>
                </Dropdown.Menu>

            </Dropdown>}
            </div>   
    </Navbar>
}