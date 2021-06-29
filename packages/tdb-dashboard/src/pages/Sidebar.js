import React from 'react'
import {DatabaseList} from "../components/DatabaseList"
import {TDBReactAccordian} from '@terminusdb-live/tdb-react-layout'
import {DatabaseHeader}from "../components/DatabaseList"
import {CurrentDataProductState, CurrentDataProductStateHeader} from "../components/CurrentDataProductState"
import {WOQLClientObj} from '../init-woql-client'
import {SearchBox} from "../components/SearchBox"
import {SEARCH_DATAPRODUCTS_PLACEHOLDER, SIMPLE_BAR_MAX_HEIGHT} from "../components/constants"
import SimpleBarReact from "simplebar-react"
import "simplebar/src/simplebar.css"

export const Sidebar= (props) =>{
    const {dataProduct} = WOQLClientObj() 

    const accordianDatabaseList = 
    [
        {
            id: 1,
            eventKey: "1",
            description: 
                <DatabaseList handleNew={props.handleNew} page={props.page}/>
            ,
            icon: 'fas fa-chevron-down',
            title: <DatabaseHeader handleNew={props.handleNew} page={props.page}/>
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
                data={accordianDatabaseList} />
            {dataProduct && <TDBReactAccordian
                defaultKey="1"
                data={connectedDatabase} />}
            {props.children}
        </div>
}
 