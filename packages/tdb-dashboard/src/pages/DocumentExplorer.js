
import React from "react"
import {DocumentView} from "../components/DocumentView"
import {Layout} from "./Layout"
import {LeftSideBar} from "../components/LeftSideBar"
import {DocumentControlProvider} from "../hooks/DocumentControlContext"

export const DocumentExplorer = (props) => {

    return <DocumentControlProvider>
        <Layout sideBarContent={<LeftSideBar/>}>
            <main role="main" className="content mr-3 ml-5">
                <DocumentView/>
            </main>
        </Layout>
    </DocumentControlProvider>
} 