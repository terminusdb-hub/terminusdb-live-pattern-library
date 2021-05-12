import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import {MAIN_PAGE, SETUP_LINK} from "./constants"
import {InitSetupPage} from "../Views/Pages/InitSetupPage"
import {Layout} from "../Views/Pages/Layout"
import {WOQLClientObj} from '../init-woql-client'

export const Routes = () => {

    const {woqlClient} = WOQLClientObj()
    woqlClient.setSystemDb()

    console.log("woqlClient", woqlClient)


    return <Router>
            <Switch>
                <Route path={MAIN_PAGE}>
                    <Layout woqlClient={woqlClient}/>
                </Route>
                <Route path={SETUP_LINK}>
                    <InitSetupPage woqlClient={woqlClient}/>
                </Route>
            </Switch>
    </Router>
  }
  