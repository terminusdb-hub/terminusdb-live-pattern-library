import React, {useEffect, useState} from 'react';
import {TDBReactButtonGroup} from '@terminusdb-live/tdb-react-layout';
import {DOCUMENT_CLASS_BUTTONS_CONFIG, DATA_PROPERTY_BUTTONS_CONFIG, OBJECT_PROPERTY_BUTTONS_CONFIG} from "./constants.js"
import {WOQLClientObj} from '../init-woql-client'
import {useHook} from "./hook"
import {getDataTypeProperties, getObjectTypeProperties} from "../Queries/GeneralQueries"

export const Sidebar= (props) =>{

    const {woqlClient} = WOQLClientObj()

    const [objectTypePropertyQuery, setObjectTypePropertyQuery]=useState(false)
    const [dataTypePropertyQuery, setDataTypePropertyQuery]=useState(false)
    const [objectTypeProperties, setObjectTypeProperties]=useState(false)
    const [dataTypeProperties, setDataTypeProperties]=useState(false)

    const [objectTypePropertyResults]= useHook(woqlClient, objectTypePropertyQuery)
    const [dataTypePropertyResults]= useHook(woqlClient, dataTypePropertyQuery)

    useEffect(()=> {
        setObjectTypeProperties(objectTypePropertyResults)
    }, [objectTypePropertyResults])

    useEffect(()=> {
        setDataTypeProperties(dataTypePropertyResults)
    }, [dataTypePropertyResults])

    const handleClassButtonClick = (id) => {
        let q = getObjectTypeProperties(id)
        setObjectTypePropertyQuery(q)
        let q1 = getDataTypeProperties(id)
        setDataTypePropertyQuery(q1)
    }



    return <React.Fragment>
        <div class="flex-column mt-3">
            <TDBReactButtonGroup  onLoad="https://hub-dev.dcm.ist/api/workers/admin/cg6zav1618490058380" config={DOCUMENT_CLASS_BUTTONS_CONFIG} onClick={handleClassButtonClick}/>
        </div>
        {objectTypeProperties &&
            <div class="flex-column mt-3">
                <TDBReactButtonGroup startData={objectTypeProperties} config={OBJECT_PROPERTY_BUTTONS_CONFIG}/>
            </div>
        }
        {dataTypeProperties &&
            <div class="flex-column mt-3">
                <TDBReactButtonGroup startData={dataTypeProperties} config={DATA_PROPERTY_BUTTONS_CONFIG}/>
            </div>
        }
    </React.Fragment>
    }
