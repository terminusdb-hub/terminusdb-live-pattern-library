import React from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {GET_CLASSES_LINK, GET_PROPERTIES_LINK, GET_DOCUMENT_METADATA_LINK} from "./constants"
import {getClassesLib, getPropertiesLib, getDocumentMetadataLib} from "../Queries/GeneralQueries"
import {QueryPaneObj} from "../Hooks/queryPaneContext" 

export const SampleQueries = (props) => {

    const {addQueryPane} = QueryPaneObj()

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
        addQueryPane(q)
    }

    
    return <div className="d-grid">
        <h5 className="nav-labels mb-3 mt-3">{"SCHEMA QUERIES"}</h5>
        <TDBReactButton config={GET_CLASSES_LINK} onClick={(e) => handleQuery(GET_CLASSES_LINK)}/>
        <TDBReactButton config={GET_PROPERTIES_LINK} onClick={(e) => handleQuery(GET_PROPERTIES_LINK)}/>
        <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
        <h5 className="nav-labels mb-3 mt-3">{"DOCUMENT QUERIES"}</h5>
        <TDBReactButton config={GET_DOCUMENT_METADATA_LINK} onClick={(e) => handleQuery(GET_DOCUMENT_METADATA_LINK)}/>
        <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
        <h5 className="nav-labels mb-3 mt-3">{"IMPORT QUERIES"}</h5>
    </div>
}
