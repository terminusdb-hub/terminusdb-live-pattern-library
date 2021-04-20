import React from 'react';
import {Sidebar} from './Components/Sidebar';
//import {View} from './Components/View';
//import "./App.css"
import {CodeEditor} from '@terminusdb/terminusdb-react-components'

const App= (props) =>{

    return <React.Fragment>
        <div class="container-fluid">
            <div class="row">
                <nav class="col-md-2 vh-100 d-flex flex-column d-md-block bg-custom-blue sidebar">
                    <div class="sidebar-sticky p-4">
                        <div class="nav-item mb-3">
                            <a href="https://terminusdb.com" class="nav-link">
                            <span>
                                <img src="https://terminusdb.com/img/logos/logo.svg" class="logo_img"/>
                            </span>
                            </a>
                        </div>
                        <Sidebar/>
                    </div>
                </nav>
            </div>
        </div>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <CodeEditor/>
        </main>
    </React.Fragment>
}

export default App; 
