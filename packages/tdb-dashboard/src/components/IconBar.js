import React  from "react"
import {Nav,Navbar} from "react-bootstrap"
import { NavLink as RouterNavLink } from "react-router-dom";

import {IconBarConfig} from  "./constants" 
import {WOQLClientObj} from '../init-woql-client'

export const IconBar =  () => {
    const {dataProduct, setRoute} = WOQLClientObj()
    let disabled =  {disabled:true} 

    if(dataProduct && dataProduct!=='_system'){
        disabled={}
    }
 
    return <Navbar fixed expand={false} className="pt-2 navbar navbar-dark bg-dark h-100 nav-icon-bar">
        <Nav defaultActiveKey={IconBarConfig.dataProductView.key} className="flex-column">
            <Nav.Item>
                <Nav.Link 
                    as={RouterNavLink}
                    className="nav-icon"
                    to={'/'}
                    exact>
                    {IconBarConfig.logo.svg}                
                </Nav.Link>
            </Nav.Item>
            <hr className="my-3" role="separator"></hr>
            <Nav.Item>
                <Nav.Link 
                    as={RouterNavLink} 
                    title={IconBarConfig.dataProductView.title} 
                    className="nav-icon"
                    onClick={(e) => setRoute(IconBarConfig.dataProductView.path)}
                    to={IconBarConfig.dataProductView.path} 
                    exact
                    id={IconBarConfig.dataProductView.key}
                    >
                    {IconBarConfig.dataProductView.icon}
                </Nav.Link>
            </Nav.Item> 
            <Nav.Item>
                <Nav.Link  as={RouterNavLink}
                    title={IconBarConfig.dataProductModal.title}  
                    className="nav-icon" 
                    {...disabled}
                    to={IconBarConfig.dataProductModal.path} 
                    exact
                    onClick={(e) => setRoute(IconBarConfig.dataProductModal.path)}
                    id={IconBarConfig.dataProductModal.key}>
                    {IconBarConfig.dataProductModal.icon}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  as={RouterNavLink}
                    title={IconBarConfig.documentExplorer.title} 
                    className="nav-icon" 
                    {...disabled}
                    to={IconBarConfig.documentExplorer.path} 
                    exact
                    onClick={(e) => setRoute(IconBarConfig.documentExplorer.path)}
                    id={IconBarConfig.documentExplorer.key}>
                    {IconBarConfig.documentExplorer.icon}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  as={RouterNavLink}
                    title={IconBarConfig.dataProductExplorer.title} 
                    className="nav-icon" 
                    {...disabled}
                    to={IconBarConfig.dataProductExplorer.path} 
                    onClick={(e) => setRoute(IconBarConfig.dataProductExplorer.path)}
                    exact
                    id={IconBarConfig.dataProductExplorer.key}>
                    {IconBarConfig.dataProductExplorer.icon}
                </Nav.Link>
            </Nav.Item>
            <hr className="my-3" role="separator"></hr>
            <div className="nav-icons-bottom">
                <hr className="my-3" role="separator"></hr>
                <Nav.Item className="mb-4"> 
                    <Nav.Link as={RouterNavLink} 
                        title={IconBarConfig.feedback.title} 
                        className="nav-icon"
                        to={IconBarConfig.feedback.path} 
                        exact
                        onClick={(e) => setRoute(IconBarConfig.feedback.path)}
                        id={IconBarConfig.feedback.key}
                        >
                        {IconBarConfig.feedback.icon}
                    </Nav.Link>
                </Nav.Item>
                {/*<Nav.Item> // commenting this for now
                    <Nav.Link as={RouterNavLink} 
                        title={IconBarConfig.tutorials.title} 
                        className="nav-icon"
                        to={IconBarConfig.tutorials.path} 
                        exact
                        onClick={(e) => setRoute(IconBarConfig.tutorials.path)}
                        id={IconBarConfig.tutorials.key}
                        >
                        {IconBarConfig.tutorials.icon}
                    </Nav.Link>
                </Nav.Item>*/}
            </div>
        </Nav>            
   </Navbar>
}



