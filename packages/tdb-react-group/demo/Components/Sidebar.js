import React from 'react';
import {TDBReactAccordian} from '@terminusdb-live/tdb-react-layout';
import {DatabaseButtons} from "./DatabaseButtons"
import {SampleQueries} from "./SampleQueries"
import {SavedQueries} from "./SavedQueries"

import {DATABASE_TAB, SAVED_QUERIES, SAMPLE_QUERIES} from "./constants"

export const Sidebar= (props) =>{

    let accordianObject = 
    [
        {
            id: 1,
            eventKey: "panel-1",
            title: DATABASE_TAB,
            icon: "fas fa-database",
            description: <DatabaseButtons/>
        },
        {
            id: 2,
            eventKey: "panel-2",
            icon: "fas fa-heart",
            title: SAMPLE_QUERIES,
            description: <SampleQueries/>
        },
        {
            id: 3,
            eventKey: "panel-3",
            title: SAVED_QUERIES,
            icon: "fas fa-map-pin",
            description: <SavedQueries/>
        }
    ]

    return <React.Fragment>
        <TDBReactAccordian
            defaultKey="panel-1"
            data={accordianObject} />
    </React.Fragment>
    }
