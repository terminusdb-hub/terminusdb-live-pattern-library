
import React, {useState, useEffect} from 'react';
import {WOQLClientObj} from '../init-woql-client'
import {TDBReactWorkerButtonGroup} from '@terminusdb-live/tdb-react-layout';
import {DOCUMENT_CLASS_BUTTONS_CONFIG, PROPERTY_BUTTONS_CONFIG, DOCUMENT_CLASS_LABEL, PROPERTIES_LABEL, NO_PROPERTIES} from "./constants.js"
import {getPropertiesOfClass, getPropertyRelation} from '../Queries/GeneralQueries'
import {isArray, shortenURL} from "../Functions/Utils"
import {useHook} from "./hook"

export const DatabaseButtons = ({setInteractiveQuery}) => {

    const {woqlClient} = WOQLClientObj()

    const [currentClass, setCurrentClass] = useState(false)
    const [query, setQuery]=useState(false)
    const [properties, setProperties]=useState(false)
    const [propertyResults]=useHook(woqlClient, query)


    useEffect(()=> {
        setProperties(propertyResults)
    }, [propertyResults])

    const handleClassButtonClick = (id) => {
        let q = getPropertiesOfClass(id)
        setCurrentClass(shortenURL(id))
        setQuery(q)
    }

    const handlePropertyClick = (property) => {
        let q = getPropertyRelation(property, currentClass)
        if(setInteractiveQuery) setInteractiveQuery(q)
    }

    return <React.Fragment>
        <h5 className="nav-labels">{DOCUMENT_CLASS_LABEL}</h5>
        <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
        <div className="flex-column mt-3 mb-5">
            <TDBReactWorkerButtonGroup  onLoad="https://hub-dev.dcm.ist/api/workers/admin/cg6zav1618490058380" config={DOCUMENT_CLASS_BUTTONS_CONFIG} onClick={handleClassButtonClick}/>
        </div>
        
        {isArray(properties) && <React.Fragment>
            <h5 className="nav-labels">{PROPERTIES_LABEL}</h5>
            <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
            <div className="flex-column mt-3">
                <TDBReactWorkerButtonGroup startData={properties} config={PROPERTY_BUTTONS_CONFIG} onClick={handlePropertyClick}/>
            </div>
        </React.Fragment>
        }

        {currentClass && !isArray(properties) && <React.Fragment>
            <h5 className="nav-labels">{PROPERTIES_LABEL}</h5>
            <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
            <div className="flex-column mt-3">
                <h6 className="nav-labels">{NO_PROPERTIES + currentClass}</h6>
            </div>
        </React.Fragment>
        }
    </React.Fragment>
}