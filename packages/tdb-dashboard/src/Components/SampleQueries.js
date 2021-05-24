import React from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {GET_CLASSES_LINK, GET_PROPERTIES_LINK, GET_DOCUMENT_METADATA_LINK} from "./constants"
import {getClassesLib, getPropertiesLib, getDocumentMetadataLib} from "../queries/GeneralQueries"
import {QueryPaneObj} from "../hooks/queryPaneContext" 

export const SampleQueries = ({woqlClient, dataProduct}) => {
 
    const {addQueryPane} = QueryPaneObj()

    function handleQuery(query) {
        var q
        if(query == GET_CLASSES_LINK) {
            q=getClassesLib(dataProduct, woqlClient)
        }
        else if (query == GET_PROPERTIES_LINK){
            q=getPropertiesLib(dataProduct, woqlClient)
        }
        else if (query == GET_DOCUMENT_METADATA_LINK){
            q=getDocumentMetadataLib(dataProduct, woqlClient)
        }
        addQueryPane(q)
    }

    
    return <div className="d-grid">
        <p className="nav-labels mb-3 mt-3 text-muted">{"SAMPLE QUERIES"}</p>
        <p className="nav-labels mb-3 mt-3 text-muted">{"MODEL QUERIES"}</p>
        <TDBReactButton config={GET_CLASSES_LINK} onClick={(e) => handleQuery(GET_CLASSES_LINK)}/>
        <TDBReactButton config={GET_PROPERTIES_LINK} onClick={(e) => handleQuery(GET_PROPERTIES_LINK)}/>
        
        <p className="nav-labels mb-3 mt-3 text-muted">{"DOCUMENT QUERIES"}</p>
        <TDBReactButton config={GET_DOCUMENT_METADATA_LINK} onClick={(e) => handleQuery(GET_DOCUMENT_METADATA_LINK)}/>
        
        <p className="nav-labels mb-3 mt-3 text-muted">{"IMPORT QUERIES"}</p>
    </div>
}