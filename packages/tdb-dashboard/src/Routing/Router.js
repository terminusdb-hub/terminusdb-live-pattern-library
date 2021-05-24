import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import {ORGANIZATION, DATA_PRODUCTS} from "./constants"
import {InitSetupPage} from "../views/pages/InitSetupPage"
import {Layout} from "../views/pages/Layout"
import {WOQLClientObj} from '../init-woql-client'
 
export const Routes = () => {

    const {woqlClient} = WOQLClientObj()
    woqlClient.setSystemDb()

    return <Router>
            <Switch>
                <Route path={DATA_PRODUCTS}>
                    <Layout woqlClient={woqlClient}/>
                </Route>
                <Route path={ORGANIZATION}>
                    <InitSetupPage woqlClient={woqlClient}/>
                </Route>
            </Switch>
    </Router>
  }
  