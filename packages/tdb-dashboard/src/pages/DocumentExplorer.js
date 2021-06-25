
import React from "react"
import {DocumentView} from "../components/DocumentView"
import {DocumentSidebar} from "../components/DocumentSidebar"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'

export const DocumentExplorer = (props) => {
    const {setDataProduct} = WOQLClientObj()

    const setSelectedDataProduct = (dataProductID) =>{
        setDataProduct(dataProductID)
    } 
     
    return <Layout sideBarContent={<DocumentSidebar/>}>
            <main role="main" className="m-4">
                <DocumentView/>
            </main>
        </Layout>
} 