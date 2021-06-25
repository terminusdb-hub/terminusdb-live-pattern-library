import React from 'react';
import {TDBReactAccordian} from '@terminusdb-live/tdb-react-layout'
import {DatabaseList} from "./DatabaseList"
import {WOQLClientObj} from '../init-woql-client'
import {DatabaseHeader}from "./DatabaseList"
import {SearchBox} from "../components/SearchBox"
import {SEARCH_DATAPRODUCTS_PLACEHOLDER, SIMPLE_BAR_MAX_HEIGHT} from "./constants"
import {CurrentDataProductStateHeader, CurrentDataProductState} from "./CurrentDataProductState"
import {DocumentClasses} from "./DocumentClasses"
import {SidebarAccordianTitle} from "./SidebarAccordianTitle"
import SimpleBarReact from "simplebar-react"
import "simplebar/src/simplebar.css"

export const DocumentSidebar = (props) => {
    const {dataProduct} = WOQLClientObj()
  
    let accordianObject = 
    [
        {
            id: 1,
            eventKey: "1",
            description:  <DatabaseList handleNew={props.handleNew} page={props.page}/>,
            icon: 'fas fa-chevron-down',
            title: <DatabaseHeader handleNew={props.handleNew} page={props.page}/>
        }
    ]

    const DocumentClassesObject = [
        {
            id: 1,
            eventKey: "1",
            description: <SimpleBarReact style={{ maxHeight: SIMPLE_BAR_MAX_HEIGHT }}>
                <DocumentClasses/>
            </SimpleBarReact>,
            icon: 'fas fa-chevron-down',
            title: <SidebarAccordianTitle dataProduct={dataProduct}/>
        }
    ]

    const connectedDatabase = [
        {
            id: 1,
            eventKey: "1",
            description: <CurrentDataProductState />,
            icon: 'fas fa-chevron-down',
            title: <CurrentDataProductStateHeader/>
        }
    ]

    return <div className="flex-column d-flex flex-grow-1">
            <SearchBox placeholder={SEARCH_DATAPRODUCTS_PLACEHOLDER}/>
            <TDBReactAccordian
                defaultKey="1"
                data={accordianObject} />
            {dataProduct && <TDBReactAccordian
                defaultKey="1"
                data={connectedDatabase} />}
            {dataProduct && <TDBReactAccordian
                defaultKey="1"
                data={DocumentClassesObject} />}
            {props.children}
        </div>

}