import React from "react"
import {ManageProducts} from "./ManageProducts"
import {Sidebar} from "./Sidebar"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'
import {ConsoleHistory} from "../routing/Router"
import {PRODUCT_MANAGE} from "../routing/constants"

export const ManageProductPage = () => {
    const {woqlClient, setDataProduct} = WOQLClientObj()

    const setSelectedDataProduct = (dataProductID) =>{
        setDataProduct(dataProductID)
        ConsoleHistory.push(PRODUCT_MANAGE)
    }
     
    return <Layout sideBarContent={<Sidebar setSelectedDataProduct={setSelectedDataProduct}></Sidebar>}>
        <main role="main" className="m-4">
            <ManageProducts/>
        </main>
    </Layout>
} 