import React from "react"
import ReactDOM from "react-dom"
import {App} from "./App"
import {WOQLClientProvider} from './init-woql-client'
import {localSettings} from "../localSettings"
import {auth0_conf} from '../auth_config'
import {Auth0Provider} from "./react-auth0-spa"
import history from "./routing/history"
import { DATA_PRODUCTS} from "./routing/constants"
import "./App.css" 

//const base_url= process.env.REACT_APP_BASE_ROUTER || ''
let redirect_uri=`${window.location.origin}/${process.env.REACT_APP_BASE_ROUTER}`
console.log("redirect_uri",redirect_uri)


const onRedirectCallback = appState => {
  history.replace(
      appState && appState.targetUrl
        ? appState.targetUrl
        : '/'
    );
  };


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
