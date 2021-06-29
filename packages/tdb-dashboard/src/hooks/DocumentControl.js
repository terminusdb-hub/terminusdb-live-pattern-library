import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {executeQueryHook} from "./executeQueryHook"
import {getDocumentClasses, getDocumentsOfType} from "../queries/GeneralQueries"

export const DocumentConrtol = () => {
    const {woqlClient, dataProduct, currentDocument} = WOQLClientObj()
    
    // classes
    const [documentTypeQuery, setDocumentTypeQuery]=useState(getDocumentClasses(dataProduct))
    const [documentTypeDataProvider] = executeQueryHook(woqlClient, documentTypeQuery)

    // documents of selected class 
    const [documentsOfTypeQuery, setdocumentsOfTypeQuery] = useState(false)
    //const [documentsOfTypeDataProvider] = executeQueryHook(woqlClient, documentsOfTypeQuery)

    //console.log("documentsOfTypeDataProvider", documentsOfTypeDataProvider)
    useEffect(() => {
        if(dataProduct) {
            setDocumentTypeQuery(getDocumentClasses(dataProduct))
        }
    }, [dataProduct])

    useEffect(() => { // get all documents of selected class
        setdocumentsOfTypeQuery(getDocumentsOfType(currentDocument))
    }, [currentDocument])

    return {
        documentTypeDataProvider,
        documentsOfTypeQuery
    }
}