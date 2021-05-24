import React, {useEffect} from "react"
import {Routes} from "./Routing/Router"
import {WOQLClientObj} from './init-woql-client'
import {Loading} from "./components/Loading"
import {SERVER_LOADING_MESSAGE} from "./components/constants"
import {trackWithPendo} from "./trackWithPendo"
import {useAuth0} from "./react-auth0-spa"


export function App (props){

    const {loadingServer} = WOQLClientObj()
    const {user} = useAuth0()

    useEffect(() => {
        trackWithPendo(user)
    }, [user])

    if(loadingServer) return <Loading message={SERVER_LOADING_MESSAGE}/>

    return <React.Fragment>
        <div className="container-fluid container-background">
            <div className="row">
                <Routes/>
            </div>
        </div>
    </React.Fragment>
}
>>>>>>> 37f95a23c4a67688a0a307941322cab2d851f4f8
