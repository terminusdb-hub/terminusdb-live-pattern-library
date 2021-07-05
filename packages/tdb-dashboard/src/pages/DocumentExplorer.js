
import React from "react"
import {DocumentView} from "../components/DocumentView"
import {DocumentSidebar} from "../components/DocumentSidebar"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'
import {LeftSideBar} from "../components/LeftSideBar"
import { DOCUMENT_EXPLORER } from "../routing/constants"

export const DocumentExplorer = (props) => {
    const {setDataProduct} = WOQLClientObj()

    const setSelectedDataProduct = (dataProductID) =>{
        setDataProduct(dataProductID)
    } 
     
    return <Layout sideBarContent={<LeftSideBar route={DOCUMENT_EXPLORER}/>}>
            <main role="main" className="m-4">
                <DocumentView/>
            </main>
        </Layout>
} 