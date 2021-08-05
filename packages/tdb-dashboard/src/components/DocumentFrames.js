import React, {useEffect, useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {Col, Button, Card, Form, Row} from "react-bootstrap"
import {FrameViewer} from './FrameViewer'
import {ToggleJsonAndFormControl} from "./ToggleJsonAndFormControl"
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {FORM_VIEW, JSON_VIEW, EDIT_DOCUMENT, CREATE_DOCUMENT} from "./constants"
import {JsonFrameViewer} from "./JsonFrameViewer"
import {PROGRESS_BAR_COMPONENT} from "./constants"
import {DocumentationTypeFrame} from "./DocumentationTypeFrame"

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


    return <main className="content mr-3 ml-5 w-100">
        <Row className="w-100 mb-5">
            <Col md={11}>  
                <Card>
                    {documentObject.loading && documentObject.loading}
                    <Card.Header className="d-flex w-100">
                        <span className="col-md-9 d-flex">
                            {documentObject.action == CREATE_DOCUMENT && <h5>
                                Create a new 
                                <strong className="text-success ml-1">{documentObject.type}</strong>
                            </h5>}
                            {documentObject.action == EDIT_DOCUMENT && <h5>
                                Edit 
                                <strong className="text-success ml-1">{documentObject.type}</strong>
                            </h5>}
                        </span>
                        <ToggleJsonAndFormControl onClick={handleClick} documentObject={documentObject}/>
                    </Card.Header>
                    <Card.Body>
                        {documentObject.frames && 
                            documentObject.frames["@documentation"] && 
                            documentObject.frames["@documentation"]["@comment"] && 
                            <p className="text-muted fw-bold ml-3">
                            {documentObject.frames["@documentation"]["@comment"]}
                        </p>
                        }
                        {(documentObject.view==FORM_VIEW) && documentObject.update && <FrameViewer/>}
                        {(documentObject.view==JSON_VIEW) && documentObject.update && <JsonFrameViewer
                                jsonFrame={JSON.stringify(documentObject.frames, null, 2)}/>
                        }
                    </Card.Body>
                </Card> 
            </Col>
        </Row>
    </main>
    
    
}
