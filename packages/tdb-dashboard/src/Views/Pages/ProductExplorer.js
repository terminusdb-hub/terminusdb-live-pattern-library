import React from "react"
import {Sidebar} from "../../components/Sidebar"
import {QueryView} from "../../components/QueryView"
import {QueryPaneProvider} from "../../hooks/queryPaneContext"
import {MainLayout} from "@terminusdb-live/tdb-react-layout"

export const ProductsExplorer = (woqlClient) => {
     
    return <QueryPaneProvider>
        <main role="main" className="m-4 w-100 vh-100" style={{overflowY: "auto"}}>
            <QueryView/>
        </main>
    </QueryPaneProvider>

    /* return <QueryPaneProvider>
        <MainLayout sideBarContent={<Sidebar/>}>
            <main role="main" className="m-4">
                <QueryView/>
            </main>
        </MainLayout>
    </QueryPaneProvider>*/

}