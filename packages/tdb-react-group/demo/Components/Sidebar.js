import React from 'react';
import {TDBReactAccordian} from '@terminusdb-live/tdb-react-layout';
import {DatabaseButtons} from "./DatabaseButtons"
import {SampleQueries} from "./SampleQueries"

export const Sidebar= ({setInteractiveQuery, setInteractiveQueryString}) =>{

    let accordianObject = 
    [
        {
            id: 1,
            eventKey: "panel-1",
            title: "Database",
            icon: "fas fa-database",
            description: <DatabaseButtons setInteractiveQuery={setInteractiveQuery} setInteractiveQueryString={setInteractiveQueryString}/>
        },
        {
            id: 2,
            eventKey: "panel-2",
            icon: "fas fa-heart",
            title: "Sample Queries",
            description: <SampleQueries setInteractiveQuery={setInteractiveQuery} setInteractiveQueryString={setInteractiveQueryString}/>
        },
        {
            id: 3,
            eventKey: "panel-3",
            title: "Saved Queries",
            icon: "fas fa-map-pin",
            description: <div className="flex-column mt-3">
                "HELLO"
            </div>
        }
    ]

    return <React.Fragment>
        <TDBReactAccordian
            defaultKey="panel-1"
            data={accordianObject} />
    </React.Fragment>
    }
