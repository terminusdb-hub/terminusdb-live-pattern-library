import React, {useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {Col, Button, Card, Form, Row} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {FrameViewer} from './FrameViewer'
import {ToggleJsonAndFormControl} from "./ToggleJsonAndFormControl"
import {JsonViewer} from "./JsonViewer"

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

    return <main className="content mr-3 ml-5 w-100">
        <Row className="w-100">

            <Col md={9}> 
                    <Card>
                        <Card.Header className="d-flex">
                            <h5 className="col-md-11">Create a new <strong className="text-success">{createNewDocument}</strong></h5>
                            <ToggleJsonAndFormControl jsonView={jsonView} onClick={handleClick}/>
                        </Card.Header>
                        <Card.Body>
                            {!jsonView && frame && <FrameViewer
                                frame={frame}
                                mode="edit"
                            />}
                            {jsonView && frame && <JsonViewer
                                frame={frame}
                                mode="edit"/>}
                        </Card.Body>
                    </Card>
            </Col>
            <Col md={3}>
            </Col>
        </Row>
    </main>
    
    
}
