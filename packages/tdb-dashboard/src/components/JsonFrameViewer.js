import React, {useState} from "react"
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {EDITOR_WRITE_OPTIONS, EDIT_DOCUMENT, CREATE_DOCUMENT} from "./constants"
import {Button} from "react-bootstrap"
import {BiPlus,BiEditAlt} from "react-icons/bi"
import {WOQLClientObj} from '../init-woql-client'
import {PROGRESS_BAR_COMPONENT} from "./constants"

export const JsonFrameViewer = ({jsonFrame}) => {
    const [value, setValue]=useState(false) // sets value from editor 

    const {
        documentObject,
        setDocumentObject,
        reportAlert,
        loading
    } = WOQLClientObj()

    let options=EDITOR_WRITE_OPTIONS

    function handleCreateDocument () {
        setDocumentObject({
            action: CREATE_DOCUMENT,
            type: documentObject.type,
            view: documentObject.view,
            submit: true,
            frames: JSON.parse(value)
        })
    }

    function handleUpdateDocument () {
        setDocumentObject({
            action: EDIT_DOCUMENT,
            type: documentObject.type,
            view: documentObject.view,
            submit: true,
            frames: JSON.parse(value),
            message: false
        })
    }

    
    return <React.Fragment>
        {loading && <Loading message={`Add new ${documentObject.type} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        {reportAlert && reportAlert}
        <CodeMirror
            value={jsonFrame}
            options={options}
            onChange={(editor, data, value) => {
                setValue(value)
            }}
        />
        {
            documentObject.action==CREATE_DOCUMENT && 
                <Button className="btn btn-sm mt-2 float-right" variant="info" onClick={handleCreateDocument}>
                    <BiPlus className="mr-1"/>Create
                </Button>
        }
        {
            documentObject.action==EDIT_DOCUMENT && 
                <Button className="btn btn-sm mt-2 float-right" variant="info" onClick={handleUpdateDocument}>
                    <BiEditAlt className="mr-1"/>Update
                </Button>
        }
    </React.Fragment>
}