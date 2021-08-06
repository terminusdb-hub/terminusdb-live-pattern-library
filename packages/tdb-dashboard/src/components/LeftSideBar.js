import React, {useEffect} from "react"
import {ProSidebar, Menu, SidebarContent} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {WOQLClientObj} from '../init-woql-client'
import {PRODUCT_EXPLORER, DOCUMENT_EXPLORER} from "../routing/constants"
import {DataProductItems} from "../components/DatabaseList"
import {ConnectedDataProduct} from "../components/CurrentDataProductState"
import {DataProductDocuments, DocumentExplorerDocuments} from "../components/DataProductDocuments"
import {SampleQueries} from "../components/SampleQueries"
import {resetDocumentObject} from "../hooks/DocumentControl"

export const LeftSideBar = (props) => {
    const {
        dataProduct, 
        route,
        setDocumentObject
    } = WOQLClientObj()

    useEffect(() =>{
        resetDocumentObject(setDocumentObject)
    }, [route])


    return <ProSidebar>
        <SidebarContent>
            <Menu> 
                <DataProductItems/>
                {dataProduct && <ConnectedDataProduct/>}
                {dataProduct && route==DOCUMENT_EXPLORER && <DocumentExplorerDocuments/>}
                {dataProduct && route==PRODUCT_EXPLORER && <DataProductDocuments/>}
                {dataProduct && route==PRODUCT_EXPLORER && <SampleQueries/>}
            </Menu>
        </SidebarContent>
      </ProSidebar>
}
