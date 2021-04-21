import React, {useState} from "react"
import {Sidebar} from "./Sidebar"
import {View} from "./View"

export const QueryPage = (props) => {

    const [interactiveQuery, setInteractiveQuery]=useState(false)

    return <React.Fragment>
        <nav className="col-md-2 vh-100 d-flex flex-column d-md-block bg-custom-blue sidebar">
            <div className="sidebar-sticky p-4">
                <div className="nav-item mb-3">
                    <a href="https://terminusdb.com" className="nav-link">
                        <span>
                            <img src="https://terminusdb.com/img/logos/logo.svg" className="logo_img"/>
                        </span>
                    </a>
                </div>
                <Sidebar setInteractiveQuery={setInteractiveQuery}/>
            </div>
            </nav>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <View interactiveQuery={interactiveQuery}/>
            </main>
    </React.Fragment>
    
}


