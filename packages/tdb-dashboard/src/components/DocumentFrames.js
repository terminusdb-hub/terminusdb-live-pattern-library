import React, {useEffect, useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {Col, Button, Card, Form, Row} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {FrameViewer} from './FrameViewer'
import {ToggleJsonAndFormControl} from "./ToggleJsonAndFormControl"
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {FORM_VIEW, JSON_VIEW, EDIT_DOCUMENT, CREATE_DOCUMENT} from "./constants"
import {DocumentSummary} from "./DocumentSummary"
import {JsonFrameViewer} from "./JsonFrameViewer"
import {PROGRESS_BAR_COMPONENT} from "./constants"

export const DocumentFrames = () => {
    const [update, setUpdate] = useState(Date.now())

    const {
        documentObject,
        setDocumentObject,
        loading,
        reportAlert
    } = WOQLClientObj()

    function handleClick (view) { // on toggle of json and form controls
        let docObj = documentObject
        docObj.view=view
        setDocumentObject(docObj)
        setUpdate(Date.now())
    } 

    console.log("documentObject in viewer", documentObject)

    return <main className="content mr-3 ml-3 w-100">
        <Row className="w-100">
            <Col md={9}> 
                {loading && <Loading message={`Add new ${documentObject.type} ...`} type={PROGRESS_BAR_COMPONENT}/>}
                {reportAlert && reportAlert}
                <Card>
                    <Card.Header className="d-flex">
                        <span className="col-md-10 d-flex">
                            {documentObject.action == CREATE_DOCUMENT && <h5>Create a new </h5>}
                            {documentObject.action == EDIT_DOCUMENT && <h5>Edit </h5>}
                            <strong className="text-success">{documentObject.type}</strong>
                        </span>
                        <ToggleJsonAndFormControl onClick={handleClick} documentObject={documentObject}/>
                    </Card.Header>
                    <Card.Body>
                        {(documentObject.view==FORM_VIEW) && documentObject.update && <FrameViewer/>}
                        {(documentObject.view==JSON_VIEW) && documentObject.update && <JsonFrameViewer
                                jsonFrame={JSON.stringify(documentObject.frames, null, 2)}/>
                        }
                    </Card.Body>
                </Card> 
            </Col>
            <Col md={3}>
                <h4 className="text-muted mb-3 fw-bold">Documents</h4>
                <DocumentSummary/>
            </Col>
        </Row>
    </main>
    
    
}
