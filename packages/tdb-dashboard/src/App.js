import React from "react"
import {Routes} from "./Routing/Router"
import {WOQLClientObj} from './init-woql-client'
import {Loading} from "./Components/Loading"
import {SERVER_LOADING_MESSAGE} from "./Components/constants"

export function App (props){

    const {loadingServer} = WOQLClientObj()

    if(loadingServer) return <Loading message={SERVER_LOADING_MESSAGE}/>

    return <React.Fragment>
        <div className="container-fluid container-background">
            <div className="row">
                <Routes/>
            </div>
        </div>
    </React.Fragment>
}