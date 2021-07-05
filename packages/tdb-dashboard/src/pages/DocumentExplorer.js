
import React from "react"
import {DocumentView} from "../components/DocumentView"
import {Layout} from "./Layout"
import {LeftSideBar} from "../components/LeftSideBar"

export const DocumentExplorer = (props) => {
    
    return <Layout sideBarContent={<LeftSideBar/>}>
            <main role="main" className="m-4">
                <DocumentView/>
            </main>
        </Layout>
} 