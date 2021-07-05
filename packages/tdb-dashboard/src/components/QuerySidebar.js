import React from 'react';
import {TDBReactAccordian} from '@terminusdb-live/tdb-react-layout'
import {DatabaseButtons} from "./DatabaseButtons"
import {SampleQueries} from "./SampleQueries"
import {SavedQueries} from "./SavedQueries"
import {DATABASE_TAB, SAVED_QUERIES, SAMPLE_QUERIES, SIMPLE_BAR_MAX_HEIGHT} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import {SidebarAccordianTitle} from "./SidebarAccordianTitle"
import SimpleBarReact from "simplebar-react"
import "simplebar/src/simplebar.css"
  
export const QuerySidebar= (props) =>{
    const {dataProduct} = WOQLClientObj()
  
    let accordianObject = 
    [
        {
            id: 1,
            eventKey: "1",
            title: <SidebarAccordianTitle dataProduct={dataProduct || DATABASE_TAB} status={"text-success"}/>,
            icon: "fas fa-database",
            description: <SimpleBarReact style={{ maxHeight: SIMPLE_BAR_MAX_HEIGHT }}><DatabaseButtons/></SimpleBarReact>
        },
        {
            id: 2,
            eventKey: "2",
            icon: "fas fa-heart",
            title: SAMPLE_QUERIES,
            description: <SampleQueries/>
        }, 
        {
            id: 3,
            eventKey: "3",
            title: SAVED_QUERIES,
            icon: "fas fa-map-pin",
            description: <SavedQueries/>
        }
    ]

    return <React.Fragment>
        <div className="flex-column d-flex flex-grow-1">
        <TDBReactAccordian
            defaultKey="1"
            data={accordianObject} />
        </div>
    </React.Fragment>
}