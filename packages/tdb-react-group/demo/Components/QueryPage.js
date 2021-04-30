import React, {useEffect, useState} from "react"
import {Sidebar} from "./Sidebar"
import {View} from "./View"

export const QueryPage = (props) => {

    const [interactiveQuery, setInteractiveQuery]=useState(false)

    const [woqlQuery, setWOQLQuery]=useState()
    const [qp, setQp] = useState([{index: 0, woqlQuery: woqlQuery, setWOQLQuery: setWOQLQuery}])

    useEffect(() => {
        if (interactiveQuery) {
            setQp(arr => [...arr, {index: qp.length, 
                woqlQuery: interactiveQuery, 
                setWOQLQuery: setWOQLQuery}])
        }
    }, [interactiveQuery])


    return <React.Fragment>
        <nav className="col-md-2 vh-100 position-fixed d-flex flex-column d-md-block bg-custom-blue sidebar">
            <div className="sidebar-sticky">
                <div className="nav-item mb-4 mt-4 d-flex justify-content-center">
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
            <View setQp={setQp} qp={qp} setWOQLQuery={setWOQLQuery}/>
        </main>
    </React.Fragment>
}


