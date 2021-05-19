import React from "react"
import {Sidebar} from "../components/Sidebar"
import {View} from "../components/View"
import {QueryPaneProvider} from "../hooks/queryPaneContext"
import {MainLayout} from "@terminusdb-live/tdb-react-layout"

export const ProductsExplorer = () => {
    
     return( <QueryPaneProvider>
            <MainLayout sideBarContent={<Sidebar/>}>
                <main role="main" className="m-4">
                    <View/>
                </main>
            </MainLayout>
           </QueryPaneProvider>)

}