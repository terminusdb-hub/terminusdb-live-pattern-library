import React from "react"
import {ModelBuilder} from "./ModelBuilder"
import {Sidebar} from "./Sidebar"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'
import {ConsoleHistory} from "../routing/Router"
import {LeftSideBar} from "../components/LeftSideBar"
import {PRODUCT_MODELS} from "../routing/constants"

export const ModelProductPage = () => {
    const {woqlClient, setDataProduct} = WOQLClientObj()

    const setSelectedDataProduct = (dataProductID) =>{
        setDataProduct(dataProductID)
        //ConsoleHistory.push(PRODUCT_MODELS)
    }

    return <Layout sideBarContent={<LeftSideBar route={PRODUCT_MODELS}/>}>
        <main role="main" className="m-4">
            <ModelBuilder/>
        </main>
    </Layout>
     
    /*return <Layout sideBarContent={<Sidebar setSelectedDataProduct={setSelectedDataProduct}></Sidebar>}>
        <main role="main" className="m-4">
            <ModelBuilder/>
        </main>
    </Layout>*/
}