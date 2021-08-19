import React, {useState, useEffect, useContext} from 'react'
export const DocumentControlContext = React.createContext()
export const DocumentControlObj = () => useContext(DocumentControlContext)
import {Alerts} from "../components/Alerts"
import {FORM_VIEW, VIEW_DOCUMENT, CREATE_DOCUMENT, EDIT_DOCUMENT, TERMINUS_DANGER, TERMINUS_SUCCESS, PROGRESS_BAR_COMPONENT} from "../components/constants"
import {WOQLClientObj} from '../init-woql-client'
import {addNewDocument, updateDocument, getDocumentFrame, getCurrentDocumentInfo} from './DocumentControl'

export const DocumentControlProvider = ({children}) => {
    const {
        woqlClient
    } = WOQLClientObj()

    const [result, setResult] = useState(false)
    const [error, setError] = useState(false)
    const [documentObjectWithFrames, setDocumentObjectWithFrames]=useState(false)


    const [documentObject, setDocumentObject]=useState({
        type: false, // document class type
        action: false,  // create/ view/ edit
        view: FORM_VIEW,    // view in form or json
        submit: false,  // click on submit button to edit or create
        currentDocument: false, // current document id to view document details 
        frames: {}, // schema frames of document class
        filledFrame: {}, // filled frames of document id
        message: false, // success or error message related to action on a document 
        loading: false,  // loading bar
        update:false // to refresh updated info 
    })

    // on change of document view to JSON or frame
    useEffect(() => {
        let docObj = documentObjectWithFrames
        docObj = documentObject.view
        setDocumentObjectWithFrames(docObj)
    }, [documentObject.view])

    // on create of a document class
    useEffect(() => { 
        if(!documentObject.action) { // display all documents of a selected document class
            setDocumentObjectWithFrames(documentObject)
            return
        }
        else if(documentObject.action == VIEW_DOCUMENT) {
            getCurrentDocumentInfo(woqlClient, documentObject, false, setResult, setError)
            return
        }
        getDocumentFrame(woqlClient, documentObject, setResult, setError)
    }, [documentObject.type, documentObject.action])

    // on click of submit on create or edit
    useEffect(() => { 
        if(!documentObject.submit) return
        let newDocumentInfo=documentObject.frames
        if(documentObject.action == CREATE_DOCUMENT) {
            addNewDocument(woqlClient, newDocumentInfo, setResult, setError)
        }
        if(documentObject.action == EDIT_DOCUMENT) {
            updateDocument(woqlClient, documentObject, setDocumentObject, setError)
        }
    }, [documentObject.submit, documentObject.frames])

    

    useEffect(() => { // on success 
        if(result){
            setDocumentObjectWithFrames(result)
        }
    }, [result])

    useEffect(() => { // reporting error
        if(error) {
            let docObj = documentObject
            docObj.loading = false
            docObj.message=<Alerts message={error} type={TERMINUS_DANGER} onCancel={setError}/>
            setDocumentObjectWithFrames(docObj)
        }
    }, [error])

    return (
        <DocumentControlContext.Provider
            value={{
                setDocumentObject,
                documentObject,
                documentObjectWithFrames,
                setDocumentObjectWithFrames
            }}
        >
            {children}
        </DocumentControlContext.Provider>
    )
}

    