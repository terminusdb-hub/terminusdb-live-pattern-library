import React  from "react"
import {Nav, Row, Col, Navbar} from "@themesberg/react-bootstrap"
import {DEFAULT_ICON_BAR_ACTIVE_KEY, IconBarConfig, TERMINUSDB_ICON} from "./constants"


export const IconBar =  ({setView}) => {

    return <Navbar fixed expand={false} className="navbar-light navbar-theme-soft h-100 nav-icon-bar">
        <Nav defaultActiveKey={IconBarConfig.dataProductView.key} className="flex-column">
            <Nav.Item>
                <Nav.Link className="nav-icon">
                    {IconBarConfig.logo.svg}
                </Nav.Link>
            </Nav.Item>
            <hr className="my-3 border-indigo dropdown-divider nav-bar-dropdown-divider" role="separator"></hr>
            <Nav.Item>
                <Nav.Link eventKey={IconBarConfig.dataProductView.key} 
                    title={IconBarConfig.dataProductView.title} 
                    className="nav-icon" 
                    onClick={(e)=> setView(IconBarConfig.dataProductView.key)}>
                    {IconBarConfig.dataProductView.icon}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey={IconBarConfig.dataProductModal.key} 
                    title={IconBarConfig.dataProductModal.title}  
                    className="nav-icon" 
                    onClick={(e)=> setView(IconBarConfig.dataProductModal.key)}>
                    {IconBarConfig.dataProductModal.icon}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey={IconBarConfig.dataProductExplorer.key} 
                    title={IconBarConfig.dataProductExplorer.title} 
                    className="nav-icon" 
                    onClick={(e)=> setView(IconBarConfig.dataProductExplorer.key)}>
                    {IconBarConfig.dataProductExplorer.icon}
                </Nav.Link>
            </Nav.Item>
            <hr className="my-3 border-indigo dropdown-divider nav-bar-dropdown-divider" role="separator"></hr>
            <Nav.Item>
                <Nav.Link eventKey={IconBarConfig.feedback.key}  
                    title={IconBarConfig.feedback.title} 
                    className="nav-icon"
                    onClick={(e)=> setView(IconBarConfig.feedback.key)}>
                    {IconBarConfig.feedback.icon}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey={IconBarConfig.tutorials.key}  
                    title={IconBarConfig.tutorials.title} 
                    className="nav-icon"
                    onClick={(e)=> setView(IconBarConfig.tutorials.key)}>
                    {IconBarConfig.tutorials.icon}
                </Nav.Link>
            </Nav.Item>
            <hr className="my-3 border-indigo dropdown-divider nav-bar-dropdown-divider" role="separator"></hr>
            <Nav.Item>
                <Nav.Link  eventKey={IconBarConfig.settings.key}  
                    title={IconBarConfig.settings.title} 
                    className="nav-icon"
                    onClick={(e)=> setView(IconBarConfig.settings.key)}>
                    {IconBarConfig.settings.icon}
                </Nav.Link>
            </Nav.Item>
        </Nav>            
   </Navbar>

}

