import React from "react";
import ReactDOM from "react-dom";
/*import App from "./App";*/
import App from "./App"
import {WOQLClientProvider} from './init-woql-client'

ReactDOM.render(
    <WOQLClientProvider params={{
        server: "https://hub-dev-server.dcm.ist",
        key: "THISISAVERYSTRONGPASSWORDFOROURTESTLMAOSHOULDBECHANGED",
        user: "admin",
        db: "GitHub_Metrics"
    }}>
        <App />
    </WOQLClientProvider>
    , document.getElementById('root'));
/*ReactDOM.render(<App />, document.getElementById('root'));*/