
import React, {useEffect, useState} from "react"
import {Form, Row, Card, Col, Button} from "react-bootstrap"
import {AiOutlineDelete} from "react-icons/ai"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT, EDITOR_READ_OPTIONS, EDITOR_WRITE_OPTIONS} from "./constants"
import {DocumentControl} from "../hooks/DocumentControl"
import {ToggleJsonAndFormControl} from "./ToggleJsonAndFormControl" 
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {BiEdit, BiEditAlt} from "react-icons/bi"
import {FrameViewer} from './FrameViewer'
import {WOQLClientObj} from '../init-woql-client'

export const DocumentInfo = ({documentIdInfo, chosenDocument}) => {

    const [documentInfo, setDocumentInfo] = useState(documentIdInfo)

    const {
        editDocument,
        setEditDocument
    } = WOQLClientObj()
    
    const {
        setDeleteDocument,
        loading,
        reportAlert,
        jsonView, 
        setJsonView,
        frame,
        updateJson, 
        setUpdateJson,
        currentDocumentInfo
    } = DocumentControl()

    console.log("currentDocumentInfo in doc info", currentDocumentInfo)

    useEffect(() => {
        setDocumentInfo(currentDocumentInfo)
    }, [currentDocumentInfo])

    const DocumentContents = ({documentInfo}) => {
        let contents = [], docInfo = documentInfo
        for (var key in docInfo) {
            contents.push(
                <Form.Group controlId={key}>
                    <Form.Label className="mr-5 text-muted fw-bold" style={{minWidth: "150px"}}>
                        {key}
                    </Form.Label>
                    <Form.Label>
                        {docInfo[key]}
                    </Form.Label>
                </Form.Group>
            )
        }
        return contents
    }

    const DocumentForm = ({documentInfo, frame, mode}) => {
        if(!mode) return <DocumentContents documentInfo={documentInfo}/>
        else return <FrameViewer
            frame={frame}
            mode="edit"/>
    }

    const DocumentJsonView = ({documentInfo, mode, setUpdateJson}) => {
        let docInfo = documentInfo
        var options = EDITOR_READ_OPTIONS
        if(mode) options =EDITOR_WRITE_OPTIONS // on edit 
        
        const [value, setValue]=useState(false) // sets value from editor 
        
        function onUpdate(e) {
            setUpdateJson(JSON.parse(value))
        }

        return <React.Fragment>
                {!mode && <CodeMirror
                    value={JSON.stringify(docInfo, null, 2)}
                    readOnly= {true}
                    options={options}
                />}
                {mode && <React.Fragment>
                    <CodeMirror
                        value={JSON.stringify(docInfo, null, 2)}
                        options={options}
                        onChange={(editor, data, value) => {
                            setValue(value)
                            console.log("value change", value)
                        }}
                        onBlur={(editor, data) => {
                            console.log("value blur", data)
                        }}
                    />
                    <Button className="btn btn-sm mt-2 float-right" variant="info" onClick={onUpdate}>
                        <BiEditAlt className="mr-1"/>Update
                    </Button>
                </React.Fragment>
                }
        </React.Fragment>
    }

    if(!documentInfo) return <div/>

    function handleClick () { // on toggle of json and form controls
        setJsonView(!jsonView)
    }

    function handleEdit () {
        setEditDocument(documentInfo)
    }

    return <main className="content mr-3 ml-5 w-100">
        <Row className="w-100">
            <Col md={9}> 
                {loading && <Loading message={`Deleting ${chosenDocument} ...`} type={PROGRESS_BAR_COMPONENT}/>}
                {reportAlert && reportAlert}
                <Card className="d-flex w-100">
                    <Card.Header className="d-flex w-100">
                        {!editDocument && <h5 className="col-md-9"><strong className="text-success">{chosenDocument}</strong></h5>}
                        {editDocument && <h5 className="col-md-9">Edit <strong className="text-success">{` ${chosenDocument}`}</strong></h5>}
                        
                        <Button className="btn btn-sm btn-light mr-2" onClick={handleEdit} title={`Edit ${chosenDocument}`}>
                            <BiEdit className="mr-1"/> Edit
                        </Button>

                        <ToggleJsonAndFormControl jsonView={jsonView} onClick={handleClick}/>
                        
                        <Button className="btn btn-sm btn-danger" onClick={(e) => setDeleteDocument(chosenDocument)} title={`Delete ${chosenDocument}`}>
                            <AiOutlineDelete className="mr-1"/> Delete
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        {!jsonView && 
                            <Form>
                                <DocumentForm documentInfo={documentInfo} mode={editDocument} frame={frame}/>
                            </Form>
                        }
                        {jsonView && <DocumentJsonView documentInfo={documentInfo} mode={editDocument} setUpdateJson={setUpdateJson}/>}
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}>
            </Col>
        </Row>
    </main>
}
