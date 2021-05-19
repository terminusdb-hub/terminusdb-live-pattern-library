import React, {useState} from "react"
import {Sidebar} from "./Sidebar"
import {View} from "./View"
import {QueryPaneProvider} from "../Hooks/queryPaneContext"
import {MainLayout} from "@terminusdb-live/tdb-react-layout"
export const QueryPage = (props) => {
    
    return <QueryPaneProvider>
        <MainLayout sideBarContent={<Sidebar/>}>
            <main role="main" className="m-4">
                <View/>
            </main>
        </MainLayout>
    </QueryPaneProvider>

}


