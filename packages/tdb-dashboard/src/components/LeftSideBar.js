import React, {useState, useEffect} from "react"
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarContent} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {BsFillExclamationTriangleFill, BsBriefcase} from "react-icons/bs"
import {BiPlus} from "react-icons/bi"
import {FaPlus, FaInfo} from "react-icons/fa"
import {WOQLClientObj} from '../init-woql-client'
import {DBContextObj} from "../hooks/DBContext"


import {Badge, Button} from "react-bootstrap"
import {NewDatabaseModal} from "../components/NewDatabaseModal"
import {useCreateNewDataProductStates} from "../hooks/CreateNewDataProduct"
import {DatabaseInfoControl} from "../hooks/DatabaseInfoControl"
import {QueryPaneObj} from "../hooks/queryPaneContext"
import {getPropertiesOfClass, getPropertyRelation, getDocumentClasses} from '../queries/GeneralQueries'
import {GET_CLASSES_LINK, GET_PROPERTIES_LINK, GET_DOCUMENT_METADATA_LINK} from "./constants"
import {getClassesLib, getPropertiesLib, getDocumentMetadataLib} from "../queries/GeneralQueries"
import {PRODUCT_EXPLORER, DOCUMENT_EXPLORER} from "../routing/constants"

import {DataProductItems} from "../components/DatabaseList"
import {ConnectedDataProduct} from "../components/CurrentDataProductState"
import {DataProductDocuments, DocumentExplorerDocuments} from "../components/DataProductDocuments"
import {SampleQueries} from "../components/SampleQueries"


export const LeftSideBar = (props) => {
    const {dataProduct, route} = WOQLClientObj()

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
