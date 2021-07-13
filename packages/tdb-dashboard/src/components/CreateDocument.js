import React from "react"
import {WOQLClientObj} from '../init-woql-client'
import {Col, Button, Card, Form, Row} from "react-bootstrap"
import {DocumentControl} from "../hooks/DocumentControl"
import {FrameViewer} from './FrameViewer'
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT} from "./constants"


export const CreateDocument = () => {

    const {
        woqlClient, 
        createDocument
    } = WOQLClientObj()

    const {
        dataFrame,
        frame,
        loading
    } = DocumentControl()

    return <main className="content mr-3 ml-5 w-100">
        <Row className="w-100">

            <Col md={9}> 
                    {loading && <Loading message={`Loading ${createDocument} ...`} type={PROGRESS_BAR_COMPONENT}/>}
                    <Card>
                        <Card.Header>
                            <h5>Create <strong className="text-success">{createDocument}</strong></h5>
                        </Card.Header>
                        <Card.Body>
                            {frame && <FrameViewer
                                frame={frame}
                                mode="edit"
                            />}
                        </Card.Body>
                    </Card>
            </Col>
            <Col md={3}>
            </Col>
        </Row>
    </main>
    
    
}

/*
<FrameViewer
                            classframe={frame}
                            mode="edit"
                            view={dataframe}
                            type={(docView=="frame" ? "fancy": "table")}
                            client={woqlClient}
                            onExtract={setExtractedJSON}
                            errors={errors}
                            extract={extract}
                        />
*/                        