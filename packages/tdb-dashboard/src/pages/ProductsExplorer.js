import React from "react"
import {QueryView} from "../components/QueryView"
import {QueryPaneProvider} from "../hooks/queryPaneContext"
import {QuerySidebar} from "../components/QuerySidebar"
import {Sidebar} from "../pages/Sidebar"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'
import {LeftSideBar} from "../components/LeftSideBar"
import {PRODUCT_EXPLORER} from "../routing/constants"

export const ProductsExplorer = () => {

    const {woqlClient, setDataProduct} = WOQLClientObj()

    const setSelectedDataProduct = (dataProductID) =>{
        setDataProduct(dataProductID)
        ConsoleHistory.push(PRODUCT_MODELS)
    }

    /*return <QueryPaneProvider>
        <Layout sideBarContent={<Sidebar setSelectedDataProduct={setSelectedDataProduct}><QuerySidebar/></Sidebar>}>
            <main role="main" className="m-4">
                <QueryView/>
            </main>
        </Layout>
    </QueryPaneProvider>  */

    return <QueryPaneProvider>
        <Layout sideBarContent={<LeftSideBar route={PRODUCT_EXPLORER}/>}>
            <main role="main" className="m-4">
                <QueryView/>
            </main>
        </Layout>
    </QueryPaneProvider>
}