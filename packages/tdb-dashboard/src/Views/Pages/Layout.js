import React, {useState}  from 'react'
import {NavBar} from "../../Components/NavBar"
import SplitPane from 'react-split-pane'
import {Container} from 'react-bootstrap'

import {DataProductsHome} from "./DataProductsHome"


export const Layout = ({woqlClient}) => {

    const [width, setWidth] = useState("")

    function handleWidthChange(sz) {
        const maxWidth = 1000;
        const padding = 225;
        const paneWidth = maxWidth - sz - padding;
        setWidth({ width: paneWidth + "px" });
    }


    return <SplitPane split="vertical"
        defaultSize="15%"
        onChange={size => handleWidthChange(size)}>
            <div className="nav-item mb-4 mt-4 d-flex justify-content-center">
                <a href="https://terminusdb.com" target="_blank" className="nav-link">
                    <span>
                        <img src="https://terminusdb.com/img/logos/logo.svg" className="logo_img"/>
                    </span>
                </a>
            </div>
        <div height={width}>
            <main className="content">
                <NavBar/>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <DataProductsHome woqlClient={woqlClient}/>
                </div>
            </main>
        </div>
        
    </SplitPane>
}