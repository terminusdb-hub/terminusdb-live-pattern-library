import React from "react";
import ReactDOM from "react-dom";
/*import App from "./App";*/
import App from "./App"
import {WOQLClientProvider} from './init-woql-client'


let localSettings = {
    bff: "https://terminusdb.com/",
    key: "THISISAVERYSTRONGPASSWORDFOROURTESTLMAOSHOULDBECHANGED",
    remote: "https://hub.terminusdb.com/",
    server: "https://hub-dev-server.dcm.ist",
    user: "admin",
    db: "GitHub_Metrics"
}

ReactDOM.render(
    <WOQLClientProvider params={localSettings}>
        <App />
    </WOQLClientProvider>
    , document.getElementById('root'));
/*ReactDOM.render(<App />, document.getElementById('root'));*/

