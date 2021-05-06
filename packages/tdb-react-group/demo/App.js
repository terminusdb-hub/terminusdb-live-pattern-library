import React from 'react';
import {QueryPage} from './Components/QueryPage';
//import "./App.css"

const App= (props) =>{  
    //onLoad="https://hub-dev.dcm.ist/api/workers/admin/a15d7h1616496639611"
    return <React.Fragment>
        <div className="container-fluid container-background">
            <div className="row">
                <QueryPage/>
            </div>
        </div>
    </React.Fragment>
}

export default App; 
