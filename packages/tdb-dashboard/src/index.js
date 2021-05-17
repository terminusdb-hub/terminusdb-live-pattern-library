  
import React from "react"
import ReactDOM from "react-dom"
import {App} from "./App"
import {WOQLClientProvider} from './init-woql-client'
import {localSettings} from "../localSettings"

ReactDOM.render(
    <WOQLClientProvider params={localSettings}>
        <App />
    </WOQLClientProvider>
    , document.getElementById('root'))


