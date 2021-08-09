import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {executeQueryHook} from "./executeQueryHook"
//import {getDocumentClasses, getDocumentsOfType} from "../queries/GeneralQueries"
import {SCHEMA_GRAPH_TYPE, TERMINUS_SUCCESS, TERMINUS_DANGER, CREATE_DOCUMENT, EDIT_DOCUMENT,VIEW_DOCUMENT, GET_FRAMES_DOCUMENT, FORM_VIEW} from "../components/constants"
import {Alerts} from "../components/Alerts"
import { getTotalNumberOfDocuments } from "../queries/GeneralQueries"
import {Loading} from "../components/Loading"
import {PROGRESS_BAR_COMPONENT} from "../components/constants"

export const DocumentControl = () => {
    const [loading, setLoading]=useState(false)
    const [reportAlert, setReportAlert] = useState(false)

    const [update, setUpdate]=useState(Date.now())
 
    const {
        woqlClient,  
        dataProduct, 
        setDocumentObject,
        documentObject
    } = WOQLClientObj()



    /***** REVIEW THIS BIT  *****/
    // get info of a chosen Document Id from a frame select
    const [subClassType, setSubClassType]= useState(false)
    const [subClassTypeResults, setSubClassTypeResults]= useState(false)
    useEffect(() => {
        if(!subClassType) return
        setLoading(true)
        getCurrentDocumentInfo (woqlClient, subClassType, setSubClassTypeResults, false, false,setLoading, setReportAlert)
    }, [subClassType])
    


    return {
        loading,
        setLoading,
        reportAlert,
        setReportAlert,
        setSubClassType,
        subClassTypeResults
        
    }
    
}

// gets document frames of a document class
export async function getDocumentFrame (woqlClient, documentObject, setDocumentObject, setFrame, setDocumentClasses) {
    let db=woqlClient.db()
    let documentType = documentObject.type
    await woqlClient.getSchemaFrame(documentType, db).then((res) => {
        setFrame(res)
    })
    .catch((err) => {
        let message=`Error in fetching frames of class ${documentType} : ${err}`
        let docObj = documentObject
        docObj.loading = false
        docObj.message=<Alerts message={message} type={TERMINUS_DANGER}/>
        setDocumentObject(docObj)
    })
}

// making a separate function for sub document frame so i dont have to alter document object 
export async function getSubDocumentFrame (woqlClient, documentType, setFrame) {
    let db=woqlClient.db()
    await woqlClient.getSchemaFrame(documentType, db).then((res) => {
        setFrame(res)
    })
    .catch((err) => {
        console.log(`error in fetching sub document ${documentType}`)
    })
}


//create a new document
export async function addNewDocument(woqlClient, setDocumentObject, newDocumentInfo, documentObject, setLoading, setReportAlert) {
    let db=woqlClient.db()
    
    await woqlClient.addDocument(newDocumentInfo, null, db).then((res) => {
        //onDone(res)
        if(setLoading) setLoading(false)
        let message=`Success in creating a new ${newDocumentInfo["@type"]}`
        if(setReportAlert) setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert}/>)
        let docObj={
            action: false, // reload everything and display all documents list
            type: documentObject.type,
            view: false,
            submit: false,
            currentDocument: false,
            frames: {},
            update: Date.now(),
            message: <Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert}/>
        }
        setDocumentObject(docObj)
    })
    .catch((err) => {
        let message=`Error in creating new Document of type ${newDocumentInfo["@type"]}: ${err}`
        let docObj=documentObject
        docObj.message = <Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>
        
        if(setReportAlert) setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        if(setLoading) setLoading(false)
    })
}


// gets all documents of a class of interest (to show in select of frames)
export async function getDocumentsOfClassOfInterest (woqlClient, classOfInterest, setDocumentsOfClassOfInterest, setLoading, setReportAlert) {
    let db=woqlClient.db()
    let params={}
    params['type'] = classOfInterest
    params['as_list'] = true
    await woqlClient.getDocument(params, db).then((res) => {
        if (setLoading) setLoading(false)
        setDocumentsOfClassOfInterest(res)
        return res
    })
    .catch((err) => {
        let message=`Error in fetching documents of class ${classOfInterest}: ${err}`
        if(setReportAlert) setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        if (setLoading) setLoading(false)
    })
}

// gets info of a chosen document ID  
export async function getCurrentDocumentInfo (woqlClient, documentObject, setDocumentObject, asList, setFilledFrame, setLoading, setReportAlert){
    let db=woqlClient.db()
    let params={}
    params['id'] = documentObject.currentDocument
    params['as_list'] = asList
    await woqlClient.getDocument(params, db).then((res) => {
        setFilledFrame(res)
    })
    .catch((err) => {
        let message=`Error in fetching info of document ${documentObject.currentDocument}: ${err}`
        let docObj=documentObject
        docObj.message=<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>
        docObj.loading=false
        setDocumentObject(docObj)
    })
}

// update document 
export async function updateDocument (woqlClient, documentObject, setDocumentObject, setReportAlert, setLoading) {

    let db=woqlClient.db()
    //const params={'graph_type':'schema'} 
    let params={}
    let json = documentObject.frames
    await woqlClient.updateDocument(json, params, db).then((res) => {
        let message = `Successfully updated document ${json["@id"]}`
        setDocumentObject({
            action: VIEW_DOCUMENT, // reload everything and display all documents list
            type: json["@type"],
            view: documentObject.view,
            submit: false,
            currentDocument: json["@id"],
            frames: {},
            message: <Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert}/>,
            update: Date.now(),
            loading: <Loading message={`Fetching document ${json["@id"]} ...`} type={PROGRESS_BAR_COMPONENT}/>
  
        })
    })
    .catch((err) => {
        let docObj=documentObject
        let message=`Error in updating document ${json["@id"]}: ${err}`
        docObj.message=<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>
        docObj.loading=false
        setDocumentObject(docObj)
    })
}


// get filled frame of document 
export async function getFilledFrames(woqlClient, documentObject, setFilledFrame, setLoading, setReportAlert) {
    let db=woqlClient.db()
    let params={}
    params['id'] = document["@id"]
    params['as_list'] = true

    let filledValueFrames = documentObject.frames

    await woqlClient.getSchemaFrame(documentObject.type, db).then((res) => {
        var schemaFrames = res
        let extractedFrames = {}
        // fill values of frame 
        for(var sFrame in schemaFrames) {
            for (var filledValues in filledValueFrames) {
                if(sFrame == filledValues) {
                    schemaFrames[sFrame] = filledValueFrames[filledValues]
                }
            }
        }
        setFilledFrame(schemaFrames)
        setLoading(false)
    })
    .catch((err) => {
        let message=`Error in fetching frames of class ${documentObject["@type"]} : ${err}`
        setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        setLoading(false)
    })
}

// get enum types 
export async function getEnums(woqlClient, setEnums, setLoading, setReportAlert) {
    let db=woqlClient.db()
    
    await woqlClient.getEnums(db).then((res) => {
        setLoading(false)
        setEnums(res)
    })
    .catch((err) => {
        let message=`Error in fetching Enum of ${db}: ${err}`
        setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        setLoading(false)
    })
}

export async function deleteDocument  (woqlClient, setDocumentObject, documentObject) {
    let db=woqlClient.db()

    const params={}
    params['id'] = documentObject.currentDocument
    
    await woqlClient.deleteDocument(params, db).then((res) => {
        let message=`Successfully deleted ${documentObject.currentDocument}`
        let docObj={
            action: false, // reload everything and display all documents list
            type: documentObject.type,
            view: false,
            submit: false,
            currentDocument: false,
            frames: {},
            message: <Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert}/>,
            loading: false
        }

        setDocumentObject(docObj)
    })
    .catch((err) => {
        let message=`Error in deleting document ${documentObject.currentDocument}: ${err}`
        let docObj=documentObject
        docObj.message=<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>
        docObj.loading=false
    })
 }

 export function resetDocumentObject (setDocumentObject) {
    setDocumentObject({
        type: false,
        action: false,
        view: FORM_VIEW,
        submit: false,
        currentDocument: false,
        frames: {},
        update: Date.now(),
        message: false,
        loading: false
    })
 }

 export function executeDocumentAction (woqlClient, setDocumentClasses, documentObject, setDocumentObject, setFrame, setFilledFrame) {
     // on create new document
     if(documentObject.action == false) return
     if(documentObject.action == CREATE_DOCUMENT) {
        getDocumentFrame(woqlClient, documentObject, setDocumentObject, setFrame, setDocumentClasses)
     }
     if(documentObject.action == EDIT_DOCUMENT) {
        getDocumentFrame(woqlClient, documentObject, setDocumentObject, setFrame, setDocumentClasses)
     }
     if(documentObject.action == VIEW_DOCUMENT) {
        getCurrentDocumentInfo (woqlClient, documentObject, setDocumentObject, false, setFilledFrame)
     }
 }

