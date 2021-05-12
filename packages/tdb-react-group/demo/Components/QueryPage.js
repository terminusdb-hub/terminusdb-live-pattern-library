import React, {useState, useEffect} from "react"
import {Sidebar} from "./Sidebar"
import {View} from "./View"
import {MainLayout} from '@terminusdb-live/tdb-react-layout'
import {QueryPaneProvider} from "../Hooks/queryPaneContext"
import {WOQLClientObj} from '../init-woql-client'

export const QueryPage = (props) => {


    /*let [myDBs, setMyDBs] = useState(false)
    const {woqlClient} = WOQLClientObj()

    function get_dbs_to_show(){
        let mdbs = []
        let dbs = woqlClient.databases()
        console.log("dbs", dbs)
        for(var i = 0; i<dbs.length; i++){
            if(dbs[i].id) mdbs.push(dbs[i])
        }
        return mdbs
    }

    useEffect(() => {
        if(woqlClient){
            let mdbs = get_dbs_to_show()
            setMyDBs(mdbs)
        }
    }, [woqlClient])

  
    return <MainLayout list={myDBs}/> */
    
    return <QueryPaneProvider>
    <React.Fragment>
        <nav className="col-md-2 vh-100 position-fixed d-flex flex-column d-md-block bg-custom-blue sidebar">
            <div className="sidebar-sticky">
                <div className="nav-item mb-4 mt-4 d-flex justify-content-center">
                    <a href="/" target="_blank" className="nav-link">
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
    </React.Fragment>
     </QueryPaneProvider> 

}


