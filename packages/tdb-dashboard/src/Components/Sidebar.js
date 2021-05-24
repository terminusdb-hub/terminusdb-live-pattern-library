import React from 'react';
import {TDBReactAccordian} from '@terminusdb-live/tdb-react-layout'
import {DatabaseButtons} from "./DatabaseButtons"
import {SampleQueries} from "./SampleQueries"
import {SavedQueries} from "./SavedQueries"
import {Accordion, Card} from "react-bootstrap"
import {DATABASE_TAB, SAVED_QUERIES, SAMPLE_QUERIES} from "./constants"

export const Sidebar= (props) =>{

    let accordianObject = 
    [
        {
            id: 1,
            eventKey: "1",
            title: DATABASE_TAB,
            icon: "fas fa-database",
            description: <DatabaseButtons/>
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