import React, {useEffect, useState} from "react"
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
import {DocumentControlObj} from '../hooks/DocumentControlContext'

export const DocumentFrames = () => {

    const {
        documentObjectWithFrames,
        documentObject,
        setDocumentObject
    } = DocumentControlObj()


    const [currentView, setCurrentView]=useState(documentObject.view)

    function handleClick (view) { // on toggle of json and form controls
        let docObj = documentObjectWithFrames
        docObj.view=view
        setCurrentView(view)
        setDocumentObject(docObj)
    }  

    console.log("refreshedDocumentObject in doc frame", documentObjectWithFrames)

    return <main className="content mr-3 ml-5 w-100">
        <Row className="w-100 mb-5">
            <Col md={11}>   
                <Card> 
                    {documentObject.loading && !documentObjectWithFrames.frames &&documentObject.loading}
                    <Card.Header className="d-flex w-100">
                        <span className="w-100 float-left d-flex">
                            {documentObjectWithFrames.action == CREATE_DOCUMENT && <h5>
                                Create a new 
                                <strong className="text-success ml-1">{documentObjectWithFrames.type}</strong>
                            </h5>}
                            {documentObjectWithFrames.action == EDIT_DOCUMENT && <h5>
                                Edit 
                                <strong className="text-success ml-1">{documentObjectWithFrames.type}</strong>
                            </h5>}
                        </span>
                        <ToggleJsonAndFormControl onClick={handleClick} documentObjectWithFrames={documentObjectWithFrames}/>
                    </Card.Header>
                    <Card.Body>
                        {documentObjectWithFrames.frames && 
                            documentObjectWithFrames.frames["@documentation"] && 
                            documentObjectWithFrames.frames["@documentation"]["@comment"] && 
                            <p className="text-muted fw-bold ml-3">
                            {documentObjectWithFrames.frames["@documentation"]["@comment"]}
                        </p>
                        }
                        {(currentView==FORM_VIEW) && documentObjectWithFrames.frames && <FrameViewer/>}
                        {(currentView==JSON_VIEW) &&  documentObjectWithFrames.frames && <JsonFrameViewer/>
                        }
                    </Card.Body>
                </Card> 
            </Col>
        </Row>
    </main>
    
    
}
