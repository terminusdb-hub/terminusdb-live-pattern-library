import React from "react"
import {QueryView} from "../components/QueryView"
import {QueryPaneProvider} from "../hooks/queryPaneContext"
import {Layout} from "./Layout"
import {LeftSideBar} from "../components/LeftSideBar"

export const ProductsExplorer = () => {

    return <QueryPaneProvider>
        <Layout sideBarContent={<LeftSideBar/>}>
            <main role="main" className="content mr-3 ml-5">
                <QueryView/>
            </main>
        </Layout>
    </QueryPaneProvider>
}