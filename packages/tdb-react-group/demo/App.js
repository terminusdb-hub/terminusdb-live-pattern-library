import React from 'react';
import {Sidebar} from './Components/Sidebar';
import {View} from './Components/View';
//import "./App.css"


const App= (props) =>{

    return <React.Fragment>
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-2 vh-100 d-flex flex-column d-md-block bg-custom-blue sidebar">
                    <div className="sidebar-sticky p-4">
                        <div className="nav-item mb-3">
                            <a href="https://terminusdb.com" className="nav-link">
                            <span>
                                <img src="https://terminusdb.com/img/logos/logo.svg" className="logo_img"/>
                            </span>
                            </a>
                        </div>
                        <Sidebar/>
                    </div>
                </nav>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <View/>
                </main>
            </div>
        </div>
    </React.Fragment>
}

export default App; 
