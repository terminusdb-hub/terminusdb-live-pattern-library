import React from 'react'
import {DatabaseList} from "../components/DatabaseList"
import {TDBReactAccordian} from '@terminusdb-live/tdb-react-layout'

export const Sidebar= (props) =>{

    const accordianDatabaseList = 
    [
        {
            id: 1,
            eventKey: "1",
            title: "Database List",
            description: <DatabaseList/>
        }
    ]

    return <div className="flex-column d-flex flex-grow-1">
            <TDBReactAccordian
                defaultKey="1"
                data={accordianDatabaseList} />
            {props.children}
        </div>
}