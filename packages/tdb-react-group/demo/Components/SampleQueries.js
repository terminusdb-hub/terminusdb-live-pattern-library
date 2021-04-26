import React from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {GET_CLASSES_LINK, GET_PROPERTIES_LINK, GET_DOCUMENT_METADATA_LINK} from "./constants"
import {getClassesLib} from "../Queries/GeneralQueries"

export const SampleQueries = ({setInteractiveQuery, setInteractiveQueryString}) => {

    function handleQuery() {
        let q = getClassesLib()
        setInteractiveQueryString(q)
    }
    
    return <div className="d-grid">
    
       <TDBReactButton config={GET_CLASSES_LINK} onClick={handleQuery}/>
       <TDBReactButton config={GET_PROPERTIES_LINK}/>
       <TDBReactButton config={GET_DOCUMENT_METADATA_LINK}/>
    </div>
}
