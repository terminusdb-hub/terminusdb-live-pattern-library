import React from 'react'
import {Container} from "react-bootstrap"
import {MainNavBar} from '../components/MainNavBar'
import SplitPane from 'react-split-pane'
import {IconBar} from "../components/IconBar"
import {TimeTravelWidget} from "../components/TimeTravelWidget"
import {WOQLClientObj} from '../init-woql-client'

export const Layout = (props) => { 
    const {dataProduct} = WOQLClientObj()
    
    return <Container fluid className="p-0 flex-row">                              
            <SplitPane split="vertical" minSize={70} defaultSize={350} primary="first">                                                    
                <div className="side-black h-100 d-flex">
                    <IconBar />
                    {props.sideBarContent}
                </div>
                <div className="h-100 main-content">
                    <MainNavBar/>
                    <div class="container-fluid">
                       {props.children} 
                    </div>
                </div>
            </SplitPane>
        </Container>
}

//{dataProduct && <TimeTravelWidget/>  }    


