import React from "react"
import {ManageProducts} from "./ManageProducts"
import {Sidebar} from "./Sidebar"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'

export const ManageProductPage = () => {
    const {woqlClient, setDataProduct} = WOQLClientObj()

    const setSelectedDataProduct = (dataProductID) =>{
        setDataProduct(dataProductID)
        ConsoleHistory.push(PRODUCT_MODELS)
    }
     
    return <Layout sideBarContent={<Sidebar setSelectedDataProduct={setSelectedDataProduct}></Sidebar>}>
        <main role="main" className="m-4">
            <ManageProducts/>
        </main>
    </Layout>
}