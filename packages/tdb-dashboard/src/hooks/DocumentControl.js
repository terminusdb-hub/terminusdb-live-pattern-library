import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {executeQueryHook} from "./executeQueryHook"
import {getDocumentClasses, getDocumentsOfType} from "../queries/GeneralQueries"
import {loadFrameViewer} from "../components/ViewConfig"
import {SCHEMA_GRAPH_TYPE} from "../components/constants"

export const DocumentControl = () => {
    const [loading, setLoading]=useState(false)
    const [result, setResult] = useState(false)

    const {
        woqlClient, 
        dataProduct, 
        currentDocument,
        createDocument,
        setCreateDocument
    } = WOQLClientObj()
    

    //frame
    const [frame, setFrame]=useState(false)
    const [dataFrame, setDataFrame]=useState(false)

    // documents of selected class 
    const [documentsOfTypeQuery, setdocumentsOfTypeQuery] = useState(false)

    // get document types
    const [documentTypes, setDocumentTypes] = useState(false)

    useEffect(() => {
        if(dataProduct) {
            setLoading(true)
            getDocumentTypesFromSchema(woqlClient, setDocumentTypes, setLoading)
        }
    }, [dataProduct])


    useEffect(() => { // get all documents of selected class
        setdocumentsOfTypeQuery(getDocumentsOfType(currentDocument))
    }, [currentDocument])

    useEffect(() => { // get document class frame
        if(!createDocument) return
        setLoading(true)
        getDocumentFrame(woqlClient, createDocument, setFrame,setLoading)
    }, [createDocument])

    useEffect(() => {
        if(!frame) return 
        let df = loadFrameViewer("table")
        setDataFrame(df)
    }, [frame])

    // new document types 
    const [newDocument, setNewDocument]=useState(false)

    useEffect(() => {
        if(!newDocument) return
        addNewDocument(woqlClient, setCreateDocument, setNewDocument, newDocument, setLoading)
    }, [newDocument])

    return {
        documentTypes,
        documentsOfTypeQuery,
        loading, 
        setLoading,
        dataFrame,
        frame,
        setNewDocument,
        newDocument
    }
}

// gets document classes from schema of dp 
async function getDocumentTypesFromSchema (woqlClient, setDocumentTypes, setLoading) {
    let db=woqlClient.db()
    await woqlClient.classes(db).then((res) => {
        setLoading(false)
        //onDone(res)
        setDocumentTypes(res)
    })
    .catch((err) => console.log(err))
}

// gets document frames from schema of dp
async function getDocumentFrame (woqlClient, currentDocument, setFrame, setLoading) {
    let db=woqlClient.db()
    await woqlClient.schema(currentDocument, db).then((res) => {
        setLoading(false)
        console.log("resr", res)
        //onDone(res)
        setFrame(res)
    })
    .catch((err) => console.log(err))
}

async function addNewDocument(woqlClient, setCreateDocument, setNewDocument, newDocument, setLoading) {
    let db=woqlClient.db()
    
    await woqlClient.addDocument(newDocument, null, db).then((res) => {
        setLoading(false)
        console.log("resr", res)
        //onDone(res)
        setNewDocument(false)
        //setCreateDocument(false)
    })
    .catch((err) => console.log(err))
}