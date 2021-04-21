import React, {useEffect, useState} from 'react';
import {TDBReactButtonGroup} from '@terminusdb-live/tdb-react-layout';
import {DOCUMENT_CLASS_BUTTONS_CONFIG, PROPERTY_BUTTONS_CONFIG} from "./constants.js"
import {WOQLClientObj} from '../init-woql-client'
import {useHook} from "./hook"
import {getPropertiesOfClass, getPropertyRelation} from "../Queries/GeneralQueries"

export const Sidebar= (props) =>{

    const {woqlClient} = WOQLClientObj()

    const [query, setQuery]=useState(false)
    const [properties, setProperties]=useState(false)
    const [propertyResults]=useHook(woqlClient, query)

    useEffect(()=> {
        setProperties(propertyResults)
    }, [propertyResults])

    const handleClassButtonClick = (id) => {
        let q = getPropertiesOfClass(id)
        setQuery(q)
    }

    const handlePropertyClick = (property) => {
        let q = getPropertyRelation(property)
        if(props.setInteractiveQuery) props.setInteractiveQuery(q)
    }


    return <React.Fragment>
        <div className="flex-column mt-3">
            <TDBReactButtonGroup  onLoad="https://hub-dev.dcm.ist/api/workers/admin/cg6zav1618490058380" config={DOCUMENT_CLASS_BUTTONS_CONFIG} onClick={handleClassButtonClick}/>
        </div>
        {properties &&
            <div className="flex-column mt-3">
                <TDBReactButtonGroup startData={properties} config={PROPERTY_BUTTONS_CONFIG} onClick={handlePropertyClick}/>
            </div>
        }
    </React.Fragment>
    }
