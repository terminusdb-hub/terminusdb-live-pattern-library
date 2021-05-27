import React from "react"
import {createBrowserHistory} from "history"
import ReactDOM from "react-dom"
import {App} from "./App"
import {WOQLClientProvider} from './init-woql-client'
import {localSettings} from "../localSettings"
import {auth0_conf} from '../auth_config'
import {Auth0Provider} from "./react-auth0-spa"
import {ConsoleHistory} from "./routing/Router"
import { DATA_PRODUCTS} from "./routing/constants"
let redirect_uri=`${window.location.origin}`
console.log("redirect_uri",redirect_uri)

const onRedirectCallback = appState => {
    ConsoleHistory.push(
       DATA_PRODUCTS
    )
  }


ReactDOM.render(
    <Auth0Provider
        domain={auth0_conf.domain}
        client_id={auth0_conf.clientId}
        redirect_uri={redirect_uri}
        onRedirectCallback={onRedirectCallback}
        audience={auth0_conf.audience}
    >
        <WOQLClientProvider params={localSettings}>
            <App />
        </WOQLClientProvider>
    </Auth0Provider>
    , document.getElementById('root'))
