import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {executeQueryHook} from "./executeQueryHook"
//import {getDocumentClasses, getDocumentsOfType} from "../queries/GeneralQueries"
import {SCHEMA_GRAPH_TYPE, TERMINUS_SUCCESS, TERMINUS_DANGER} from "../components/constants"
import {Alerts} from "../components/Alerts"

export const DocumentControl = () => {
    const [loading, setLoading]=useState(false)
    const [reportAlert, setReportAlert] = useState(false)

    const {
        woqlClient, 
        dataProduct, 
        setCurrentDocumentClass,
        createNewDocument,
        setCreateNewDocument,
        currentDocument
    } = WOQLClientObj()

    // get classes of data product
    const [documentClasses, setDocumentClasses] = useState(false)
    useEffect(() => {
        if(dataProduct) {
            setLoading(true)
            getDocumentClasses(woqlClient, setDocumentClasses, setLoading, setReportAlert)
        }
    }, [dataProduct])

    // get document class frames on click of new class document
    const [frame, setFrame]=useState(false)
    useEffect(() => { 
        if(!createNewDocument) return
        setLoading(true)
        getDocumentFrame(woqlClient, createNewDocument, setFrame,setLoading, setReportAlert)
    }, [createNewDocument])

    // add a new document 
    const [newDocumentInfo, setNewDocumentInfo] = useState(false)
    useEffect(() => {
        if(!newDocumentInfo) return
        setLoading(true)
        addNewDocument(woqlClient, setCurrentDocumentClass, setCreateNewDocument, newDocumentInfo, setNewDocumentInfo, setLoading, setReportAlert)
    }, [newDocumentInfo])

    // get documents of class for frames to display in select
    const [classOfInterest, setClassOfInterest] = useState(false)
    const [documentsOfClassOfInterest, setDocumentsOfClassOfInterest] = useState(false)
    useEffect(() => {
        if(!classOfInterest) return
        setLoading(true)
        getDocumentsOfClassOfInterest (woqlClient, classOfInterest, setDocumentsOfClassOfInterest, setLoading, setReportAlert)
    }, [classOfInterest]) 

    // get info of a chosen Document Id
    const [currentDocumentInfo, setCurrentDocumentInfo]= useState(false)
    useEffect(() => {
        if(!currentDocument) return
        setLoading(true)
        getCurrentDocumentInfo (woqlClient, currentDocument, setCurrentDocumentInfo, setLoading, setReportAlert)
    }, [currentDocument])

    return {
        documentClasses,
        frame,
        setNewDocumentInfo,
        setClassOfInterest,
        documentsOfClassOfInterest,
        currentDocumentInfo,
        loading, 
        setLoading,
        setReportAlert,
        reportAlert
    }
    
}

// gets document classes of dp 
async function getDocumentClasses (woqlClient, setDocumentClasses, setLoading, setReportAlert) {
    let db=woqlClient.db()
    await woqlClient.getClassDocuments(db).then((res) => {
        setLoading(false)
        setDocumentClasses(res)
    })
    .catch((err) =>  {
        let message=`Error in fetching document classes : ${err}`
        setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        setLoading(false)
    })
}

// gets document frames of a document class
export async function getDocumentFrame (woqlClient, createNewDocument, setFrame, setLoading, setReportAlert) {
    let db=woqlClient.db()
    await woqlClient.getSchemaFrame(createNewDocument, db).then((res) => {
        setLoading(false)
        console.log("resr", res)
        setFrame(res)
    })
    .catch((err) => {
        let message=`Error in fetching frames of class ${createNewDocument} : ${err}`
        setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        setLoading(false)
    })
}


//create a new document
async function addNewDocument(woqlClient, setCurrentDocumentClass, setCreateNewDocument, newDocumentInfo, setNewDocumentInfo, setLoading, setReportAlert) {
    let db=woqlClient.db()
    
    await woqlClient.addDocument(newDocumentInfo, null, db).then((res) => {
        //onDone(res)
        setNewDocumentInfo(false)
        setCurrentDocumentClass(newDocumentInfo["@type"])
        setCreateNewDocument(false)
        setLoading(false)
        let message=`Success in creating ${newDocumentInfo["@id"]}`
        setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert}/>)
    })
    .catch((err) => {
        let message=`Error in creating new Document of type ${newDocumentInfo["@type"]}: ${err}`
        setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        setLoading(false)
    })
}


// gets all documents of a class of interest (to show in select of frames)
async function getDocumentsOfClassOfInterest (woqlClient, classOfInterest, setDocumentsOfClassOfInterest, setLoading, setReportAlert) {
    let db=woqlClient.db()
    let params={}
    params['type'] = classOfInterest
    params['as_list'] = true
    await woqlClient.getDocument(params, db).then((res) => {
        setLoading(false)
        setDocumentsOfClassOfInterest(res)
    })
    .catch((err) => {
        let message=`Error in fetching documents of class ${classOfInterest}: ${err}`
        setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        setLoading(false)
    })
}

// gets info of a chosen document ID
async function getCurrentDocumentInfo (woqlClient, currentDocument, setCurrentDocumentInfo, setLoading, setReportAlert){
    let db=woqlClient.db()
    let params={}
    params['id'] = currentDocument
    params['as_list'] = true
    await woqlClient.getDocument(params, db).then((res) => {
        setLoading(false)
        setCurrentDocumentInfo(res)
       
    })
    .catch((err) => {
        let message=`Error in fetching info of document ${currentDocument}: ${err}`
        setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        setLoading(false)
    })
}


