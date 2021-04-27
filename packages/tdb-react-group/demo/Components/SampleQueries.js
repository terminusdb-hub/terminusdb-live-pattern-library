import React from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {GET_CLASSES_LINK, GET_PROPERTIES_LINK, GET_DOCUMENT_METADATA_LINK} from "./constants"
import {getClassesLib, getPropertiesLib, getDocumentMetadataLib} from "../Queries/GeneralQueries"

export const SampleQueries = ({setInteractiveQuery}) => {


    function handleQuery(query) {
        var q
        if(query == GET_CLASSES_LINK) {
            q=getClassesLib()
        }
        else if (query == GET_PROPERTIES_LINK){
            q=getPropertiesLib()
        }
        else if (query == GET_DOCUMENT_METADATA_LINK){
            q=getDocumentMetadataLib()
        }
        setInteractiveQuery(q)
    }

    
    return <div className="d-grid">
        <TDBReactButton config={GET_CLASSES_LINK} onClick={(e) => handleQuery(GET_CLASSES_LINK)}/>
        <TDBReactButton config={GET_PROPERTIES_LINK} onClick={(e) => handleQuery(GET_PROPERTIES_LINK)}/>
        <TDBReactButton config={GET_DOCUMENT_METADATA_LINK} onClick={(e) => handleQuery(GET_DOCUMENT_METADATA_LINK)}/>
    </div>
}
