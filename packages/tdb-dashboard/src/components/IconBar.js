import React  from "react"
import {Nav,Navbar} from "react-bootstrap"
import { NavLink as RouterNavLink } from "react-router-dom";

import {IconBarConfig} from  "./constants" 
import {WOQLClientObj} from '../init-woql-client'

export const IconBar =  () => {
    const {dataProduct} = WOQLClientObj()
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
                   // activeClassName="nav-icon--selected"
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
                        id={IconBarConfig.dataProductModal.key}>
                        {IconBarConfig.dataProductModal.icon}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link  as={RouterNavLink}
                        title={IconBarConfig.dataProductExplorer.title} 
                        className="nav-icon" 
                        {...disabled}
                        to={IconBarConfig.dataProductExplorer.path} 
                        exact
                        id={IconBarConfig.dataProductExplorer.key}>
                        {IconBarConfig.dataProductExplorer.icon}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link  as={RouterNavLink}
                        title={IconBarConfig.dataProductManage.title} 
                        className="nav-icon" 
                        {...disabled}
                        to={IconBarConfig.dataProductManage.path} 
                        exact
                        id={IconBarConfig.dataProductManage.key}>
                        {IconBarConfig.dataProductManage.icon}
                    </Nav.Link>
                </Nav.Item>
            <hr className="my-3" role="separator"></hr>
            <Nav.Item>
                <Nav.Link as={RouterNavLink} 
                    title={IconBarConfig.feedback.title} 
                    className="nav-icon"
                    to={IconBarConfig.feedback.path} 
                    exact
                    id={IconBarConfig.feedback.key}
                    >
                    {IconBarConfig.feedback.icon}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={RouterNavLink} 
                    title={IconBarConfig.tutorials.title} 
                    className="nav-icon"
                    to={IconBarConfig.tutorials.path} 
                    exact
                    id={IconBarConfig.tutorials.key}
                    >
                    {IconBarConfig.tutorials.icon}
                </Nav.Link>
            </Nav.Item>
            <hr className="my-3" role="separator"></hr>
            <Nav.Item>
                <Nav.Link as={RouterNavLink} 
                    title={IconBarConfig.settings.title} 
                    className="nav-icon"
                    to={IconBarConfig.settings.path} 
                    exact
                    id={IconBarConfig.settings.key}
                    >
                    {IconBarConfig.settings.icon}
                </Nav.Link>
            </Nav.Item>
        </Nav>            
   </Navbar>
}



