
import React from "react"
import {CREATE_DOCUMENT, FORM_VIEW, PROGRESS_BAR_COMPONENT} from "./constants"
import {Loading} from "./Loading"

export function handleCreate (id, setDocumentObject) {  // on create on new document
    setDocumentObject({
        action: CREATE_DOCUMENT,
        type: id,
        view: FORM_VIEW,
        submit: false,
        currentDocument: false,
        frames: {},
        filledFrame: {},
        update:Date.now(),
        message:false,
        loading: <Loading message={`Fetching frames to create ${id} ...`} type={PROGRESS_BAR_COMPONENT}/>
    }) 
}


export function onDocumentTableRowClick (row) { // on click document tablw row
    setDocumentObject({
        action: VIEW_DOCUMENT,
        type: row.original["@type"], 
        view: documentObject,
        submit: false,
        currentDocument: row.original["@id"],
        frames: {},
        update: Date.now()
    })
}