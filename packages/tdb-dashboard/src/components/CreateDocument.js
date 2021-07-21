import React, {useState} from "react"
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
import {EDITOR_READ_OPTIONS} from "./constants"
import {DocumentSummary} from "./DocumentSummary"

export const CreateDocument = () => {
    const [jsonView, setJsonView] = useState(false)
    const {
        createNewDocument
    } = WOQLClientObj()

    const {
        frame
    } = DocumentControl()

    function handleClick () { // on toggle of json and form controls
        setJsonView(!jsonView)
    }

    let options=EDITOR_READ_OPTIONS

    return <main className="content mr-3 ml-3 w-100">
        <Row className="w-100">
            <Col md={9}> 
                    <Card>
                        <Card.Header className="d-flex">
                            <h5 className="col-md-10">Create a new <strong className="text-success">{createNewDocument}</strong></h5>
                            <ToggleJsonAndFormControl jsonView={jsonView} onClick={handleClick}/>
                        </Card.Header>
                        <Card.Body>
                            {!jsonView && frame && <FrameViewer
                                frame={frame}
                                mode="create"
                            />}
                            {jsonView && frame && <CodeMirror
                                value={JSON.stringify(frame, null, 2)}
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
