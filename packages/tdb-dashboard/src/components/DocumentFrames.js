import React, {useEffect, useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {Col, Button, Card, Form, Row} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {FrameViewer} from './FrameViewer'
import {ToggleJsonAndFormControl} from "./ToggleJsonAndFormControl"
import {JsonViewer} from "./JsonViewer"
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {EDITOR_READ_OPTIONS, FORM_VIEW, JSON_VIEW, EDIT_DOCUMENT, CREATE_DOCUMENT} from "./constants"
import {DocumentSummary} from "./DocumentSummary"

export const DocumentFrames = () => {
    const [update, setUpdate] = useState(Date.now())

    const {
        documentObject,
        setDocumentObject
    } = WOQLClientObj()



    function handleClick (view) { // on toggle of json and form controls
        let docObj = documentObject
        docObj.view=view
        setDocumentObject(docObj)
        setUpdate(Date.now())
    }


    let options=EDITOR_READ_OPTIONS

    return <main className="content mr-3 ml-3 w-100">
        <Row className="w-100">
            <Col md={9}> 
                    <Card>
                        <Card.Header className="d-flex">
                            <span className="col-md-10 d-flex">
                                {documentObject.action == CREATE_DOCUMENT && <h5>Create a new </h5>}
                                {documentObject.action == EDIT_DOCUMENT && <h5>Edit </h5>}
                                <strong className="text-success">{documentObject.type}</strong>
                            </span>
                            <ToggleJsonAndFormControl onChange={handleClick}/>
                        </Card.Header>
                        <Card.Body>
                            {(documentObject.view==FORM_VIEW) && update && <FrameViewer/>}
                            {(documentObject.view==JSON_VIEW) && update &&
                                <CodeMirror
                                    value={JSON.stringify(documentObject.frames, null, 2)}
                                    options={options}
                                />}
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
