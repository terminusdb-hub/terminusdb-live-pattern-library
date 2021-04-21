import React from 'react';
import {QueryPage} from './Components/QueryPage';
//import "./App.css"


const App= (props) =>{

    return <React.Fragment>
        <div className="container-fluid container-background">
            <div className="row">
                <QueryPage/>
            </div>
        </div>
    </React.Fragment>
}

export default App; 
