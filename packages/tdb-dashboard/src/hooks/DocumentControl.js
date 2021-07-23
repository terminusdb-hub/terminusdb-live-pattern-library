import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {executeQueryHook} from "./executeQueryHook"
//import {getDocumentClasses, getDocumentsOfType} from "../queries/GeneralQueries"
import {SCHEMA_GRAPH_TYPE, TERMINUS_SUCCESS, TERMINUS_DANGER, CREATE_DOCUMENT, EDIT_DOCUMENT,VIEW_DOCUMENT, GET_FRAMES_DOCUMENT} from "../components/constants"
import {Alerts} from "../components/Alerts"
import { getTotalNumberOfDocuments } from "../queries/GeneralQueries"

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


    // get classes of data product
    const [documentClasses, setDocumentClasses] = useState(false)
    useEffect(() => {
        if(dataProduct) {
            setLoading(true)
            getDocumentClasses(woqlClient, setDocumentClasses, setLoading, setReportAlert)
        }
    }, [dataProduct])

    // get frames of docuent based on action 
    const [frame, setFrame]=useState(false)
    const [filledFrame, setFilledFrame]=useState(false)
    useEffect(() => {
        // on create new document
        if(documentObject.action == false) return
        if(documentObject.action == CREATE_DOCUMENT) {
            getDocumentFrame(woqlClient, documentObject.type, setFrame, setLoading, setReportAlert)
        }
        if(documentObject.action == EDIT_DOCUMENT) {
            //getFilledFrames(woqlClient, documentObject, setFilledFrame, setLoading, setReportAlert)
            getDocumentFrame(woqlClient, documentObject.type, setFrame, setLoading, setReportAlert)
        }
        if(documentObject.action == VIEW_DOCUMENT) {
            getCurrentDocumentInfo (woqlClient, documentObject, setDocumentObject, false, setLoading, setReportAlert)
        }
    }, [documentObject.action, documentObject.type])

    // fill up frames of documentObject
    useEffect(() => {
        if(!frame) return
        if(documentObject.action == CREATE_DOCUMENT) {
            let docObj=documentObject
            docObj.frames = frame
            setDocumentObject(docObj)
        }
        
    }, [frame])

    // on submit of form for create/ edit document
    useEffect(() => {
        if(!documentObject.submit) return
        let newDocumentInfo=documentObject.frames
        addNewDocument(woqlClient, setDocumentObject, newDocumentInfo, setLoading, setReportAlert)
        //updateDocument(woqlClient, documentObject, setReportAlert, setLoading)
    }, [documentObject.submit])


    /***** REVIEW THIS BIT  *****/

    // get info of a chosen Document Id from a frame select
    const [subClassType, setSubClassType]= useState(false)
    const [subClassTypeResults, setSubClassTypeResults]= useState(false)
    useEffect(() => {
        if(!subClassType) return
        setLoading(true)
        getCurrentDocumentInfo (woqlClient, subClassType, setSubClassTypeResults, false, setLoading, setReportAlert)
    }, [subClassType])
    


    return {
        documentClasses,
        loading,
        setLoading,
        reportAlert,
        setReportAlert,
        setSubClassType,
        subClassTypeResults,
        frame
    }
    
}

// gets document classes of dp 
async function getDocumentClasses (woqlClient, setDocumentClasses, setLoading, setReportAlert) {
    let db=woqlClient.db()
    return await woqlClient.getClassDocuments(db).then((res) => {
        setLoading(false)
        setDocumentClasses(res)
        return res
    })
    .catch((err) =>  {
        let message=`Error in fetching document classes : ${err}`
        setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        setLoading(false)
    })
}

// gets document frames of a document class
export async function getDocumentFrame (woqlClient, documentType, setFrame, setLoading, setReportAlert) {
    let db=woqlClient.db()
    await woqlClient.getSchemaFrame(documentType, db).then((res) => {
        if(setLoading) setLoading(false)
        //console.log("resr", res)
        setFrame(res)
    })
    .catch((err) => {
        let message=`Error in fetching frames of class ${documentType} : ${err}`
        if(setReportAlert) setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        if(setLoading) setLoading(false)
    })
}


//create a new document
async function addNewDocument(woqlClient, setDocumentObject, newDocumentInfo, setLoading, setReportAlert) {
    let db=woqlClient.db()
    
    await woqlClient.addDocument(newDocumentInfo, null, db).then((res) => {
        //onDone(res)
        setLoading(false)
        let message=`Success in creating ${newDocumentInfo["@id"]}`
        setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert}/>)
        setDocumentObject({
            action: false, // reload everything and display all documents list
            type: false,
            view: false,
            submit: false,
            currentDocument: false,
            frames: {}
        })
    })
    .catch((err) => {
        let message=`Error in creating new Document of type ${newDocumentInfo["@type"]}: ${err}`
        setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        setLoading(false)
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
export async function getCurrentDocumentInfo (woqlClient, documentObject, setDocumentObject, asList, setLoading, setReportAlert){
    let db=woqlClient.db()
    let params={}
    params['id'] = documentObject.currentDocument
    params['as_list'] = asList
    await woqlClient.getDocument(params, db).then((res) => {
        if(setLoading) setLoading(false)
        let docObj=documentObject
        docObj.frames=res
        setDocumentObject(docObj)
    })
    .catch((err) => {
        let message=`Error in fetching info of document ${documentObject.currentDocument}: ${err}`
        if(setReportAlert) setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        if(setLoading) setLoading(false)
    })
}

// update document 
export async function updateDocument (woqlClient, documentObject, setReportAlert, setLoading) {

    let db=woqlClient.db()
    //const params={'graph_type':'schema'} 
    let params={}
    let json = documentObject.frames
    await woqlClient.updateDocument(json, params, db).then((res) => {
        setLoading(false)
        let message=`Successfully updated document ${json["@id"]}`
        setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert}/>)
        setDocumentObject({
            action: VIEW_DOCUMENT, // reload everything and display all documents list
            type: json["@type"],
            view: json.view,
            submit: false,
            currentDocument: json["@id"],
            frames: {}
        })
    })
    .catch((err) => {
        let message=`Error in updating document ${json["@id"]}: ${err}`
        setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        setLoading(false)
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
        let message=`Error in fetching Enuma of ${db}: ${err}`
        setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        setLoading(false)
    })
}