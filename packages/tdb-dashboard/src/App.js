import React, {useEffect} from "react"
import {Routes} from "./routing/Router"
import {WOQLClientObj} from './init-woql-client'
import {Loading} from "./components/Loading"
import {SERVER_LOADING_MESSAGE} from "./components/constants"
import {trackWithPendo} from "./trackWithPendo"
import {useAuth0} from "./react-auth0-spa"
import {ProductsExplorer} from "./pages/ProductsExplorer"

export function App (props){

    const {loadingServer} = WOQLClientObj()
    const {user} = useAuth0()

    useEffect(() => {
        trackWithPendo(user)
    }, [user])

    if(loadingServer) return <Loading message={SERVER_LOADING_MESSAGE}/>

    return <React.Fragment>
        <div className="container-fluid container-background h-100">
           
               <Routes/>
           
        </div>
    </React.Fragment>
}
