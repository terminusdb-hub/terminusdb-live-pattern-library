import React from "react"
import {QueryView} from "../components/QueryView"
import {QueryPaneProvider} from "../hooks/queryPaneContext"
import {QuerySidebar} from "../components/QuerySidebar"
import {Sidebar} from "../pages/Sidebar"
import {Layout} from "./Layout"
export const ProductsExplorer = () => {
     
return <QueryPaneProvider>
        <Layout sideBarContent={<Sidebar><QuerySidebar/></Sidebar>}>
            <main role="main" className="m-4">
                <QueryView/>
            </main>
        </Layout>
    </QueryPaneProvider>
}